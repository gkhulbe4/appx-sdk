import { AxiosInstance } from "axios";
import { QuizTitleResponse, QuizUniqueResponse } from "../types/quizTypes";

export class QuizApi {
  constructor(private client: AxiosInstance) {}

  private handleError(error: unknown, fallbackMessage: string): never {
    const err = error as any;
    const message =
      err.response?.data?.message || err.message || fallbackMessage;
    throw new Error(message);
  }

  async getQuizUniqueExams(start: string): Promise<QuizUniqueResponse> {
    try {
      const { data } = await this.client.get(
        `get/quizuniqueexams?start=${start}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching quiz unique exams failed");
    }
  }

  async getQuizTitles(
    start: string,
    uniqueExam: string = "",
    userId: string = "-1"
  ): Promise<QuizTitleResponse> {
    try {
      const { data } = await this.client.get(
        `get/quiztitles?start=${start}&uniqueexam=${uniqueExam}&userid=${userId}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching quiz titles failed");
    }
  }
}
