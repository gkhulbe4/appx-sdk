import { createClient } from "./client";
import { UserApi } from "./user";
import { CoursesApi } from "./courses";
import type { AppxSdkOptions } from "../types/appxTypes";
import { VideoApi } from "./video";

export class AppxSdk {
  public user: UserApi;
  public courses: CoursesApi;
  public video: VideoApi;

  constructor(options: AppxSdkOptions) {
    const client = createClient(options.baseUrl, options.getToken);
    this.user = new UserApi(client);
    this.courses = new CoursesApi(client);
    this.video = new VideoApi(client);
  }
}
