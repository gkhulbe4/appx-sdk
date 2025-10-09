import { AxiosInstance } from "axios";
import {
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
}
