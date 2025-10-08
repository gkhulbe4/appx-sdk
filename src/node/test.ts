import { AxiosInstance } from "axios";
import { TestSeriesResponse } from "../types/testTypes";

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
    search: string,
    clientApiUrl: string,
    examId: string
  ): Promise<TestSeriesResponse> {
    try {
      const { data } = await this.client.get(
        `/get/test_series?start=${start}0&search=${search}&client_api_url=${clientApiUrl}&exam_id=${examId}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching all tests failed");
    }
  }

  async getTestDetails(testId: string) {
    try {
      const { data } = await this.client.get(
        `Test_Series/test_series_by_id?id=${testId}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching test details failed");
    }
  }
}
