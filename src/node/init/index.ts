// init.ts
import { UserApi } from "../user";
import { CoursesApi } from "../courses";
import { VideoApi } from "../video";
import { TestApi } from "../test";
import { QuizApi } from "../quiz";
import { RazorpayApi } from "../razorpay";
import { StudyMaterialApi } from "../studyMaterial";
import { createClient } from "./client";
import { Database } from "firebase/database";
import type { AppxSdkOptions } from "../../types/appxTypes";
import { setupFirebase } from "../firebase/setupFirebase";
import { FirebaseApp } from "firebase/app";

export class AppxSdk {
  public user: UserApi;
  public courses: CoursesApi;
  public video: VideoApi;
  public test: TestApi;
  public quiz: QuizApi;
  public razorpay: RazorpayApi;
  public studyMaterial: StudyMaterialApi;

  public firebaseApp?: FirebaseApp;
  public firebaseDb?: Database;

  private firebaseInitPromise: Promise<void>;

  constructor(options: AppxSdkOptions) {
    const client = createClient(options.baseUrl, options.getToken);

    this.user = new UserApi(client);
    this.courses = new CoursesApi(client);
    this.video = new VideoApi(client);
    this.test = new TestApi(client);
    this.quiz = new QuizApi(client);
    this.razorpay = new RazorpayApi(client);
    this.studyMaterial = new StudyMaterialApi(client);

    this.firebaseInitPromise = this.initFirebase(options.domainUrl);
  }

  private async initFirebase(domain: string): Promise<void> {
    try {
      const { app, db } = await setupFirebase(domain);
      this.firebaseApp = app;
      this.firebaseDb = db;
    } catch (err) {
      console.error("Firebase initialization failed:", err);
      throw err;
    }
  }

  public async waitForFirebase(): Promise<void> {
    await this.firebaseInitPromise;
  }

  public isFirebaseReady(): boolean {
    return this.firebaseApp !== undefined && this.firebaseDb !== undefined;
  }
}
