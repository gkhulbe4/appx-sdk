import { UserApi } from "../user";
import { CoursesApi } from "../courses";
import type { AppxSdkOptions } from "../../types/appxTypes";
import { VideoApi } from "../video";
import { TestApi } from "../test";
import { createClient } from "./client";
import { QuizApi } from "../quiz";
import { RazorpayApi } from "../razorpay";

export class AppxSdk {
  public user: UserApi;
  public courses: CoursesApi;
  public video: VideoApi;
  public test: TestApi;
  public quiz: QuizApi;
  public razorpay: RazorpayApi;

  constructor(options: AppxSdkOptions) {
    const client = createClient(options.baseUrl, options.getToken);
    this.user = new UserApi(client);
    this.courses = new CoursesApi(client);
    this.video = new VideoApi(client);
    this.test = new TestApi(client);
    this.quiz = new QuizApi(client);
    this.razorpay = new RazorpayApi(client);
  }
}
