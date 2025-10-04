import type { AxiosInstance } from "axios";
import type {
  CourseDetails,
  CurrencyRates,
  FeaturedCoursesResponse,
  NewCoursesResponse,
  UserPurchasesResponse,
  WebSliderResponse,
} from "../types/coursesTypes";
import {
  FolderContentResponse,
  ParentFolderResponse,
  RootFolderContentResponse,
} from "../types/folderTypes";

export class CoursesApi {
  constructor(private client: AxiosInstance) {}

  private handleError(error: unknown, fallbackMessage: string): never {
    const err = error as any;
    const message =
      err.response?.data?.message || err.message || fallbackMessage;
    throw new Error(message);
  }

  async getCourse(courseId: string): Promise<{
    message: string;
    msg: string;
    status: number;
    data: CourseDetails[];
  }> {
    try {
      const { data } = await this.client.get(
        `get/coursenew_by_idv2?id=${courseId}`
      );
      return data;
    } catch (err) {
      this.handleError(err, "Fetching course failed");
    }
  }

  async getNewCourses(
    start: string,
    parentId: string
  ): Promise<NewCoursesResponse> {
    try {
      const { data } = await this.client.get(
        `get/folder_courses?start=${start}&parent_id=${parentId}`
      );
      return data;
    } catch (err) {
      this.handleError(err, "Fetching new courses failed");
    }
  }

  // TODO: fix response types
  async getCourseCategories(folderCourse: string): Promise<NewCoursesResponse> {
    try {
      const { data } = await this.client.get(
        `get/coursecategories?folder_course=${folderCourse}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching new courses failed");
    }
  }

  async getPurchasedCourses(
    userId: string,
    itemType: string
  ): Promise<UserPurchasesResponse> {
    try {
      const { data } = await this.client.get(
        `get/get_all_purchases?userid=${userId}&item_type=${itemType}`
      );
      return data;
    } catch (err) {
      this.handleError(err, "Fetching purchased courses failed");
    }
  }

  async getFeaturedCourses(start: string): Promise<FeaturedCoursesResponse> {
    try {
      const { data } = await this.client.get(
        `get/featuredcourselistnewv2?start=${start}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching featured courses failed");
    }
  }

  async getWebSliderCourses(): Promise<WebSliderResponse> {
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

  // root folder contents
  async getRootFolderContents(
    courseId: string,
    parentId: string | "-1",
    windowsapp: string | "false",
    start: string
  ): Promise<RootFolderContentResponse> {
    try {
      const { data } = await this.client.get(
        `https://harkiratapi.classx.co.in/get/folder_contentsv3?course_id=${courseId}&parent_id=${parentId}&windowsapp=${windowsapp}&start=${start}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching root folder contents failed");
    }
  }

  async getFolderContents(
    courseId: string,
    parentId: string,
    start: string
  ): Promise<FolderContentResponse> {
    try {
      const { data } = await this.client.get(
        `get/folder_contentsv3?course_id=${courseId}&parent_id=${parentId}&start=${start}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching folder contents failed");
    }
  }

  async getParentFolder(
    courseId: string,
    currentFolderId: string
  ): Promise<ParentFolderResponse> {
    try {
      const { data } = await this.client.get(
        `get/parent_folder_contents?course_id=${courseId}&current_folder_id=${currentFolderId}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching parent folder failed");
    }
  }
}
