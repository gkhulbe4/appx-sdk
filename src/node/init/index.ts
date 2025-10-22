import { UserApi } from "../user";
import { CoursesApi } from "../courses";
import { VideoApi } from "../video";
import { TestApi } from "../test";
import { QuizApi } from "../quiz";
import { RazorpayApi } from "../razorpay";
import { StudyMaterialApi } from "../studyMaterial";
import { createClient } from "./client";
import type { AppxSdkOptions } from "../../types/appxTypes";
import { Firebase } from "../firebase/firebase";

export class AppxSdk {
  public user: UserApi;
  public courses: CoursesApi;
  public video: VideoApi;
  public test: TestApi;
  public quiz: QuizApi;
  public razorpay: RazorpayApi;
  public studyMaterial: StudyMaterialApi;

  public firebase?: Firebase;

  constructor(options: AppxSdkOptions) {
    const client = createClient(options.baseUrl, options.getToken);

    this.user = new UserApi(client);
    this.courses = new CoursesApi(client);
    this.video = new VideoApi(client);
    this.test = new TestApi(client);
    this.quiz = new QuizApi(client);
    this.razorpay = new RazorpayApi(client);
    this.studyMaterial = new StudyMaterialApi(client);
    this.firebase = new Firebase(options.domainUrl);
  }

  public async waitForFirebase() {
    if (this.firebase) {
      await this.firebase.waitForReady();
    }
  }
}
