import type { AxiosInstance } from "axios";
import type {
  Course,
  CurrencyRates,
  FolderContentsResponse,
  UserPurchasesResponse,
  WebSliderResponse,
} from "../types/coursesTypes.js";

export class CoursesApi {
  constructor(private client: AxiosInstance) {}

  private handleError(error: unknown, fallbackMessage: string): never {
    const err = error as any;
    const message =
      err.response?.data?.message || err.message || fallbackMessage;
    throw new Error(message);
  }

  async getNewCourses(): Promise<Course[]> {
    try {
      const { data } = await this.client.get("new-courses");
      return data;
    } catch (err) {
      this.handleError(err, "Fetching new courses failed");
    }
  }

  async getPurchasedCourses(
    userId: string,
    itemType: string
  ): Promise<UserPurchasesResponse[]> {
    try {
      const { data } = await this.client.get(
        `get/get_all_purchases?userid=${userId}&item_type=${itemType}`
      );
      return data;
    } catch (err) {
      this.handleError(err, "Fetching purchased courses failed");
    }
  }

  async getWebSliderCourses(): Promise<WebSliderResponse[]> {
    try {
      const { data } = await this.client.get("get/web_slider?userid=1&start=0");
      return data;
    } catch (err) {
      this.handleError(err, "Fetching web slider failed");
    }
  }

  async getCurrency(
    baseCurrency: string,
    currencies: string
  ): Promise<CurrencyRates> {
    try {
      const { data } = await this.client.get(
        `get/get_currency_conversion?base_currency=${baseCurrency}&currencies=${currencies}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching currency failed");
    }
  }

  async getFolderContents(
    courseId: string,
    parentId: string,
    start: string
  ): Promise<FolderContentsResponse> {
    try {
      const { data } = await this.client.get(
        `get/folder_contentsv3?course_id=${courseId}&parent_id=${parentId}&start=${start}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching folder contents failed");
    }
  }
}
