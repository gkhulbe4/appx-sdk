import { createClient } from "./client.js";
import { UserApi } from "./user.js";
import { CoursesApi } from "./courses.js";
import type { AppxSdkOptions } from "../types/appxTypes.js";

export class AppxSdk {
  public user: UserApi;
  public courses: CoursesApi;

  constructor(options: AppxSdkOptions) {
    const client = createClient(options.baseUrl, options.getToken);
    this.user = new UserApi(client);
    this.courses = new CoursesApi(client);
  }
}
