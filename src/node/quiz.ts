import { AxiosInstance } from "axios";
import {
  QuizAttemptQuestion,
  QuizTitle,
  QuizTitleResponse,
  QuizUniqueResponse,
  SavedQuestion,
} from "../types/quizTypes";

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

  async getQuizTitleById(
    quizTitleId: string,
    userId: string
  ): Promise<{
    data: QuizTitle;
    message: string;
    msg: string;
    status: number;
  }> {
    try {
      const { data } = await this.client.get(
        `/get/quiztitlebyid?quiz_title_id=${quizTitleId}&userid=${userId}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching quiz title by id failed");
    }
  }

  async getQuizTitleQuestions(quizTitleId: string): Promise<{
    data: QuizAttemptQuestion[];
    message: string;
    status: number;
    total: number;
  }> {
    try {
      const { data } = await this.client.get(
        `get/quizquestion?start=-1&quizid=${quizTitleId}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Fetching quiz questions failed");
    }
  }

  async generateTencentWebsitePresignedUrl(): Promise<{
    data: {
      actualUrl: string;
      presignedUrl: string;
    };
    msg: string;
    status: number;
  }> {
    try {
      const { data } = await this.client.post(
        "post/generateTencentWebsitePresignedUrl"
      );
      return data;
    } catch (error) {
      this.handleError(
        error,
        "Failed to generate tencent website presigned url"
      );
    }
  }

  async getQuizRank(
    maxMarks: string,
    quizId: string,
    marks: string,
    userId: string
  ): Promise<{
    data: {
      full_scorers: number;
      rank: number;
      total: number;
    };
    message: string;
    status: number;
  }> {
    try {
      const { data } = await this.client.get(
        `get/get_quiz_rank?max_marks=${maxMarks}&quiz_id=${quizId}&marks=${marks}&user_id=${userId}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Failed to get quiz rank");
    }
  }

  async getSavedQuestions(): Promise<{
    data: SavedQuestion[];
    message: string;
    status: number;
  }> {
    try {
      const { data } = await this.client.get(`Test_Series/getSavedQuestions`);
      return data;
    } catch (error) {
      this.handleError(error, "Failed to get saved questions");
    }
  }

  async toggleSavedQuestion(
    questionId: string,
    testId: string,
    testSeriesId: string
  ): Promise<{
    data: any[];
    message: string;
    status: number;
  }> {
    try {
      const { data } = await this.client.get(`Test_Series/toggleSaveQuestion`);
      return data;
    } catch (error) {
      this.handleError(error, "Failed to toggle saved question");
    }
  }
}
