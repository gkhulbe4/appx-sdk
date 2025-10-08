import { createClient } from "./client";
import { UserApi } from "./user";
import { CoursesApi } from "./courses";
import type { AppxSdkOptions } from "../types/appxTypes";
import { VideoApi } from "./video";
import { TestApi } from "./test";

export class AppxSdk {
  public user: UserApi;
  public courses: CoursesApi;
  public video: VideoApi;
  public test: TestApi;

  constructor(options: AppxSdkOptions) {
    const client = createClient(options.baseUrl, options.getToken);
    this.user = new UserApi(client);
    this.courses = new CoursesApi(client);
    this.video = new VideoApi(client);
    this.test = new TestApi(client);
  }
}
