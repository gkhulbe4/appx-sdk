import { AxiosInstance } from "axios";
import {
  Doubt,
  SubjectsResponse,
  TestSeries,
  TestSeriesResponse,
} from "../types/testTypes";

export class TestApi {
  constructor(private client: AxiosInstance) {}

  private handleError(error: unknown, fallbackMessage: string): never {
    const err = error as any;
    const message =
      err.response?.data?.message || err.message || fallbackMessage;
    throw new Error(message);
  }

  async getAllTests(
    start: string,
    search: string = "",
    clientApiUrl: string = "",
    examId: string = ""
  ): Promise<TestSeriesResponse> {
    try {
      const { data } = await this.client.get(
        `/get/test_series?start=${start}&search=${search}&client_api_url=${clientApiUrl}&exam_id=${examId}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching all tests failed");
    }
  }

  async getTestDetails(testId: string): Promise<{
    data: TestSeries;
    message: string;
    msg: string;
    status: number;
  }> {
    try {
      const { data } = await this.client.get(
        `Test_Series/test_series_by_id?id=${testId}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching test details failed");
    }
  }

  async getTestSeriesSubjects(testId: string): Promise<{
    data: SubjectsResponse;
    message: string;
    status: number;
  }> {
    try {
      const { data } = await this.client.get(
        `get/testseries_subjects?testseries_id=${testId}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching test subjects failed");
    }
  }

  async getFreeTestSeries(start: string): Promise<{
    data: TestSeries[];
    message: string;
    msg: string;
    status: number;
    total: number;
  }> {
    try {
      const { data } = await this.client.get(
        `get/test_series_free?start=${start}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching free test series failed");
    }
  }

  async getTestTitleV2(
    testId: string,
    subjectId: string,
    userId: string,
    search: string,
    start: string
  ) {
    try {
    } catch (error) {
      this.handleError(error, "Fetching test series v2 failed");
    }
  }

  async getDoubtExams(
    courseId: string,
    userId: string = "-1",
    start: string = "-1"
  ): Promise<{
    data: {
      datetime: string;
      exam_name: string;
      id: string;
      status: string;
    }[];
    message: string;
    msg: string;
    status: number;
  }> {
    try {
      const { data } = await this.client.get(
        `doubt/get_doubt_exams?courseid=${courseId}&user_id=${userId}&start=${start}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching doubt exams failed");
    }
  }

  async getDoubtList(
    courseId: string,
    userId: string = "",
    start: string = "-1"
  ): Promise<{
    data: Doubt[];
    message: string;
    msg: string;
    status: number;
  }> {
    try {
      const { data } = await this.client.get(
        `doubt/get_doubt_list?course_id=${courseId}&user_id=${userId}&start=${start}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching doubt list failed");
    }
  }
}
