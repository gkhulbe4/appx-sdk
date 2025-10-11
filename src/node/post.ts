import { AxiosInstance } from "axios";
import { Post } from "../types/postTypes";

export class PostApi {
  constructor(private client: AxiosInstance) {}

  private handleError(error: unknown, fallbackMessage: string): never {
    const err = error as any;
    const message =
      err.response?.data?.message || err.message || fallbackMessage;
    throw new Error(message);
  }

  async getPosts(
    start: string,
    courseId: string
  ): Promise<{
    data: Post[];
    message: string;
    status: number;
    total: number;
  }> {
    try {
      const { data } = await this.client.get(
        `get/getposts?course_id=${courseId}&start=${start}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching posts failed");
    }
  }
}
