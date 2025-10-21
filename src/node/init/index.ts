import { UserApi } from "../user";
import { CoursesApi } from "../courses";
import type { AppxSdkOptions } from "../../types/appxTypes";
import { VideoApi } from "../video";
import { TestApi } from "../test";
import { createClient } from "./client";
import { QuizApi } from "../quiz";
import { RazorpayApi } from "../razorpay";
import { StudyMaterialApi } from "../studyMaterial";
import { Database } from "firebase/database";
import { initFirebase } from "../firebase/initFirebase";
import {
  fetchFirebaseConfig,
  FirebaseConfig,
} from "../firebase/firebaseConfig";

export class AppxSdk {
  public user: UserApi;
  public courses: CoursesApi;
  public video: VideoApi;
  public test: TestApi;
  public quiz: QuizApi;
  public razorpay: RazorpayApi;
  public studyMaterial: StudyMaterialApi;
  public firebaseDb?: Database;

  constructor(options: AppxSdkOptions) {
    const client = createClient(options.baseUrl, options.getToken);
    this.user = new UserApi(client);
    this.courses = new CoursesApi(client);
    this.video = new VideoApi(client);
    this.test = new TestApi(client);
    this.quiz = new QuizApi(client);
    this.razorpay = new RazorpayApi(client);
    this.studyMaterial = new StudyMaterialApi(client);
  }

  async fetchFirebaseConfig(domain: string): Promise<FirebaseConfig> {
    return await fetchFirebaseConfig(domain);
  }

  async initFirebaseWithConfig(config: FirebaseConfig): Promise<Database> {
    this.firebaseDb = initFirebase(config);
    return this.firebaseDb;
  }

  async initFirebaseForDomain(domain: string): Promise<Database> {
    if (!domain)
      throw new Error("Domain is required for fetching Firebase config");
    const config = await this.fetchFirebaseConfig(domain);
    if (!config) throw new Error("Firebase config not returned from API");

    return await this.initFirebaseWithConfig(config);
  }
}
