import { AxiosInstance } from "axios";
import { VideoDetails, VideoDetailsResponse } from "../types/videoTypes";

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

  async getPreviousLiveVideos(
    courseId: string,
    start: string,
    folderWiseCourse: string,
    userId: string
  ): Promise<{
    data: VideoDetails[];
    message: string;
    status: number;
    total: number;
  }> {
    try {
      const { data } = await this.client.get(
        `get/get_previous_live_videos?course_id=${courseId}&start=${start}&folder_wise_course=${folderWiseCourse}&userid=${userId}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Failed to get previous live videos");
    }
  }
}
