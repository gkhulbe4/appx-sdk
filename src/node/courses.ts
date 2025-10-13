import type { AxiosInstance } from "axios";
import type {
  CourseCategoryResponse,
  CourseDetails,
  CourseListResponse,
  CurrencyRates,
  Exam,
  FeaturedCoursesResponse,
  FreeContentResponse,
  NewCoursesResponse,
  PaymentDetails,
  UserPurchasesResponse,
  WebSliderResponse,
  YoutubeClassStudyByTopic,
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

  async getCourseCategories(
    folderCourse: string
  ): Promise<CourseCategoryResponse> {
    try {
      const { data } = await this.client.get(
        `get/coursecategories?folder_course=${folderCourse}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching new courses failed");
    }
  }

  async getCourseList(
    start: string,
    examName: string = ""
  ): Promise<CourseListResponse> {
    try {
      const { data } = await this.client.get(
        `get/courselist?exam_name=${examName}&start=${start}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching course list failed");
    }
  }

  async getCourseFreeContent(
    courseId: string,
    start: string,
    folderWiseCourse: string
  ): Promise<FreeContentResponse> {
    try {
      const { data } = await this.client.get(
        `get/course_class_freecontentv2?courseid=${courseId}&start=${start}&folder_wise_course=${folderWiseCourse}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching course free content failed");
    }
  }

  async getFaqByCourseId(courseId: string) {
    try {
      const { data } = await this.client.get(`get/faqs?course_id=${courseId}`);
      return data;
    } catch (error) {
      this.handleError(error, "Fetching faq failed");
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

  async getWebSliderCourses(start: string): Promise<WebSliderResponse> {
    try {
      const { data } = await this.client.get(
        `get/web_slider?userid=1&start=${start}`
      );
      return data;
    } catch (err) {
      this.handleError(err, "Fetching web slider failed");
    }
  }

  async getCurrency(
    baseCurrency: string,
    currencies: string
  ): Promise<{
    data: {
      data: CurrencyRates;
    };
  }> {
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
        `get/folder_contentsv3?course_id=${courseId}&parent_id=${parentId}&windowsapp=${windowsapp}&start=${start}`
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

  async getUserFilterCourse(courseId: string): Promise<{
    data: string;
    message: string;
    msg: string;
    status: number;
  }> {
    try {
      const { data } = await this.client.get(
        `get/userfiltercourse?courseid=${courseId}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching user filter course failed");
    }
  }

  async discountCoupon(
    couponCode: string,
    userId: string,
    itemId: string,
    itemType: string,
    installmentNo: string
  ): Promise<{ message: string; status: string }> {
    try {
      const { data } = await this.client.get(
        `/get/discount_coupon?coupon_code=${couponCode}&user_id=${userId}&item_id=${itemId}&item_type=${itemType}&installment_no=${installmentNo}&user_id=22468&item_id=16&item_type=10&installment_no=`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching discount coupon failed");
    }
  }

  async createOrder(
    userId: string,
    itemId: string,
    itemType: string,
    couponCode: string,
    currency: string
  ): Promise<PaymentDetails> {
    try {
      const formData = new FormData();
      formData.append("userid", userId);
      formData.append("itemid", itemId);
      formData.append("itemtype", itemType);
      formData.append("coupon_code", couponCode || "");
      formData.append("currency", currency);
      const { data } = await this.client.post(`/post/createOrderv2`, formData);
      return data;
    } catch (error) {
      this.handleError(error, "Failed to create order");
    }
  }

  async getExamList(): Promise<{
    data: Exam[];
    message: string;
    status: number;
  }> {
    try {
      const { data } = await this.client.get("get/examslist");
      return data;
    } catch (error) {
      this.handleError(error, "Failed to get exam list");
    }
  }

  async getYoutubeClassStudy(
    examId: string,
    start: string = "-1"
  ): Promise<{
    data: {
      sortingparam: string;
      subjectid: string;
      subjectlogo: string;
      subjectname: string;
    };
    message: string;
    msg: string;
    status: number;
  }> {
    try {
      const { data } = await this.client.get(
        `get/youtubeclassstudyapi?examid=${examId}&start=${start}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Failed to get youtube class study");
    }
  }

  async getLiveUpcomingFreeCourseClass(
    examId: string,
    start: string = "-1"
  ): Promise<{
    data: any[];
    message: string;
    msg: string;
    status: number;
    total: number;
  }> {
    try {
      const { data } = await this.client.get(
        `get/live_upcoming_free_course_classv2?examid=${examId}&start=${start}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Failed to get live upcoming free class");
    }
  }

  async getYoutubeClassStudyBySubject(
    examId: string,
    subjectId: string,
    start: string = "-1"
  ): Promise<{
    data: {
      sortingparam: string;
      topicid: string;
      topiclogo: string;
      topicname: string;
    };
    message: string;
    msg: string;
    status: number;
  }> {
    try {
      const { data } = await this.client.get(
        `get/youtubeclasstopicapi?examid=${examId}&subjectid=${subjectId}&start=${start}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Failed to get youtube class study by subject");
    }
  }

  async getYoutubeClassStudyByTopic(
    examId: string,
    subjectId: string,
    topicId: string,
    start: string
  ): Promise<{
    data: YoutubeClassStudyByTopic[];
    message: string;
    msg: string;
    status: number;
  }> {
    try {
      const { data } = await this.client.get(
        `get/youtubeclassbyexamsubtopconceptapiv2?examid=${examId}&subjectid=${subjectId}&topicid=${topicId}&start=${start}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Failed to get youtube class study by topic");
    }
  }
}
