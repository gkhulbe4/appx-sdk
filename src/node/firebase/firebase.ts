import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Database,
  getDatabase,
  ref,
  push,
  onChildAdded,
  query,
  limitToLast,
  get,
  onValue,
  off,
  onChildRemoved,
  onChildChanged,
  Unsubscribe,
} from "firebase/database";
import { fetchFirebaseConfig, FirebaseConfig } from "./firebaseConfig";
import { FormattedRawMessage, RawMessage } from "../../types/liveClassTypes";

export class Firebase {
  public app?: FirebaseApp;
  public db?: Database;
  private initPromise?: Promise<void>;

  constructor(domain: string) {
    this.initPromise = this.init(domain);
  }

  private async init(domain: string) {
    try {
      const config: FirebaseConfig = await fetchFirebaseConfig(domain);
      this.app = initializeApp(config);
      this.db = getDatabase(this.app);
      console.log("Firebase initialized for domain:", domain);
    } catch (err) {
      console.error("Firebase init failed:", err);
      throw err;
    }
  }

  public async waitForReady() {
    if (this.initPromise) {
      await this.initPromise;
    }
  }

  public isReady(): boolean {
    return !!this.app && !!this.db;
  }

  // LIVE CHAT
  listenToLiveChat(
    streamId: string,
    onMessageAdded: (msg: FormattedRawMessage) => void,
    onMessageRemoved: (id: string) => void,
    onMessageChanged: (id: string) => void,
    onError?: (err: Error) => void
  ) {
    const chatRef = ref(this.db!, `youtubedata/${streamId}`);

    const incomingMessage: Unsubscribe = onChildAdded(
      chatRef,
      (snapshot) => {
        const msg = snapshot.val();
        onMessageAdded({
          id: snapshot.key as string,
          pinstatus: msg.pinstatus,
          userComment: msg.userComment,
          userName: msg.userName,
          userId: msg.userId,
          userTime: msg.userTime,
          postedAt: msg.postedAt,
          userFlag: msg.userFlag || undefined,
        });
      },
      onError
    );

    const messageRemoved: Unsubscribe = onChildRemoved(
      chatRef,
      (snapshot) => {
        onMessageRemoved(snapshot.key as string);
      },
      onError
    );

    const messageChanged: Unsubscribe = onChildChanged(
      chatRef,
      (snapshot) => {
        onMessageChanged(snapshot.key as string);
      },
      onError
    );

    return () => {
      incomingMessage();
      messageRemoved();
      messageChanged();
    };
  }

  public async getAllLiveChats(
    streamId: string
  ): Promise<FormattedRawMessage[]> {
    const chatRef = ref(this.db!, `youtubedata/${streamId}`);
    const snapshot = await get(chatRef);
    // console.log("SNAPSHOT", snapshot);
    if (!snapshot.exists()) return [];
    const data = snapshot.val();
    // console.log("CHAT DATA:", data);

    const formattedChatData: FormattedRawMessage[] = Object.entries(data).map(
      ([key, value]) => {
        return {
          id: key as string,
          ...(value as RawMessage),
        };
      }
    );

    return formattedChatData;
  }

  public async sendMessage(streamId: string, message: RawMessage) {
    if (!this.db) throw new Error("Firebase not ready");
    const chatRef = ref(this.db, `youtubedata/${streamId}`);
    await push(chatRef, {
      pinstatus: message.pinstatus,
      userComment: message.userComment,
      userName: message.userName,
      userId: message.userId,
      userTime: message.userTime,
      postedAt: message.postedAt,
    });
  }

  // CHAT SWITCHER
  public listenToChatSwitcher(
    streamId: string,
    callback: (isEnabled: boolean) => void
  ) {
    const chatSwitcherRef = ref(this.db!, `chat_switcher/${streamId}`);

    const unsubscribe: Unsubscribe = onValue(chatSwitcherRef, (snapshot) => {
      const val = snapshot.val();
      callback(val === true);
    });

    return unsubscribe;
  }

  // LIVE CHAT SWITCHER
  public listenToLiveChatSwitcher(
    streamId: string,
    callback: (isLiveChatEveryone: number) => void
  ) {
    const liveChatSwitcherRef = ref(
      this.db!,
      `data/live_chat_switcher/${streamId}`
    );

    const unsubscribe: Unsubscribe = onValue(
      liveChatSwitcherRef,
      (snapshot) => {
        const val = snapshot.val();
        callback(val);
      }
    );

    return unsubscribe;
  }

  // HAND RAISE
  public async sendHandRaise(
    streamId: string,
    userId: string,
    userName: string
  ) {
    const handRaiseRef = ref(this.db!, `hand_raise/${streamId}`);
  }
}
