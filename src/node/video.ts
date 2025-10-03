import { AxiosInstance } from "axios";
import { VideoDetailsResponse } from "../types/videoTypes";

export class VideoApi {
  constructor(private client: AxiosInstance) {}

  private handleError(error: unknown, fallbackMessage: string): never {
    const err = error as any;
    const message =
      err.response?.data?.message || err.message || fallbackMessage;
    throw new Error(message);
  }

  async canViewVideo(
    courseId: string,
    videoId: string,
    userId: string,
    ytFlag: string | "0",
    folderWiseCourse: string
  ): Promise<{
    data: {
      time_left: string;
      video_views: number;
    };
    message: string;
    status: number;
  }> {
    try {
      const { data } = await this.client.get(
        `get/canviewvideo?course_id=${courseId}&live_course_id=${videoId}&user_id=${userId}&ytFlag=${ytFlag}&folder_wise_course=${folderWiseCourse}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching video details failed");
    }
  }

  async fetchVideoDetailsById(
    courseId: string,
    videoId: string,
    ytFlag: string | "0",
    folderWiseCourse: string
  ): Promise<VideoDetailsResponse> {
    try {
      const { data } = await this.client.get(
        `get/fetchVideoDetailsById?course_id=${courseId}&video_id=${videoId}&ytflag=${ytFlag}&folder_wise_course=${folderWiseCourse}&linked_course_id=&lc_app_api_url=`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching video details failed");
    }
  }

  async watchVideo(
    courseId: string,
    videoId: string,
    userId: string,
    ytFlag: string | "0",
    folderWiseCourse: string
  ): Promise<{
    data: number;
    message: string;
    status: number;
  }> {
    try {
      const formData = new FormData();
      formData.append("course_id", courseId);
      formData.append("live_course_id", videoId);
      formData.append("user_id", userId);
      formData.append("ytFlag", ytFlag);
      formData.append("folder_wise_course", folderWiseCourse);
      const { data } = await this.client.post(
        `post/watch_videov2?video_id=${videoId}`,
        formData
      );
      return data;
    } catch (error) {
      this.handleError(error, "Watching video failed");
    }
  }

  async updateVideoViews(
    courseId: string,
    videoId: string,
    userId: string,
    watchTime: string,
    currentPosition: string,
    ytFlag: string | "0",
    folderWiseCourse: string
  ): Promise<{
    message: string;
    status: number;
  }> {
    try {
      const formData = new FormData();
      formData.append("course_id", courseId);
      formData.append("live_course_id", videoId);
      formData.append("user_id", userId);
      formData.append("watch_time", watchTime);
      formData.append("current_position", currentPosition);
      formData.append("ytFlag", ytFlag);
      formData.append("folder_wise_course", folderWiseCourse);
      const { data } = await this.client.post(
        `post/update_video_views_watch_time`,
        formData
      );
      return data;
    } catch (error) {
      this.handleError(error, "Updating video views failed");
    }
  }
}

// curl 'https://tempapi.appx.co.in/get/folder_courses?start=0&parent_id=-1' \
//   -H 'accept: */*' \
//   -H 'accept-language: en-US,en;q=0.9,bn;q=0.8,nl;q=0.7' \
//   -H 'auth-key: appxapi' \
//   -H 'authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjM2OTk2IiwiZW1haWwiOiJtb2hpdGdvdXR0YW1AZ21haWwuY29tIiwidGltZXN0YW1wIjoxNzU4MTgxMTI4LCJ0ZW5hbnRUeXBlIjoidXNlciIsInRlbmFudE5hbWUiOiJ0ZW1wX2RiIiwidGVuYW50SWQiOiIiLCJkaXNwb3NhYmxlIjpmYWxzZX0.jqAd6dFkGQGxo0qT979ZUTsoG7mMSc1yeou8tjOIAXI' \
//   -H 'cache-control: no-cache' \
//   -H 'client-service: Appx' \
//   -H 'device-type;' \
//   -H 'origin: https://tempnewwebsite.classx.co.in' \
//   -H 'pragma: no-cache' \
//   -H 'priority: u=1, i' \
//   -H 'referer: https://tempnewwebsite.classx.co.in/' \
//   -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'sec-ch-ua-platform: "Linux"' \
//   -H 'sec-fetch-dest: empty' \
//   -H 'sec-fetch-mode: cors' \
//   -H 'sec-fetch-site: cross-site' \
//   -H 'source: website' \
//   -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36' \
//   -H 'user-id: 36996'
// yxj-ppyt-zeq
