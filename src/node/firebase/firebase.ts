import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Database,
  getDatabase,
  ref,
  push,
  onChildAdded,
  query,
  limitToLast,
} from "firebase/database";
import { fetchFirebaseConfig, FirebaseConfig } from "./firebaseConfig";

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

  public listenToChat(
    streamId: string,
    callback: (msg: {
      id: string;
      text: string;
      sender: string;
      timestamp: number;
    }) => void
  ) {
    if (!this.db) throw new Error("Firebase not ready");
    const chatRef = ref(this.db, `/data/CourseRoomChat/${streamId}`);
    const recentQuery = query(chatRef, limitToLast(50));

    return onChildAdded(recentQuery, (snapshot) => {
      const msg = snapshot.val();
      callback({
        id: snapshot.key || Date.now().toString(),
        text: msg.text,
        sender: msg.sender,
        timestamp: msg.timestamp,
      });
    });
  }

  public async sendMessage(streamId: string, text: string, sender: string) {
    if (!this.db) throw new Error("Firebase not ready");
    const chatRef = ref(this.db, `chats/${streamId}`);
    await push(chatRef, { text, sender, timestamp: Date.now() });
  }
}
