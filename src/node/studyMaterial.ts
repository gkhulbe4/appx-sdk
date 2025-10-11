import { AxiosInstance } from "axios";
import {
  StudyMaterialByType,
  StudyMaterialByTypeResponse,
} from "../types/studyMaterialTypes";

export class StudyMaterialApi {
  constructor(private client: AxiosInstance) {}

  private handleError(error: unknown, fallbackMessage: string): never {
    const err = error as any;
    const message =
      err.response?.data?.message || err.message || fallbackMessage;
    throw new Error(message);
  }

  async getStudyMaterialByType(
    start: string,
    type: string
  ): Promise<StudyMaterialByTypeResponse> {
    try {
      const { data } = await this.client.get(
        `get/studymaterialbytype?start=${start}&type=${type}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Failed to get study material by type");
    }
  }

  async getStudyMaterialById(
    studyMaterialId: string,
    type: string
  ): Promise<{
    data: StudyMaterialByType;
    message: string;
    msg: string;
    status: number;
  }> {
    try {
      const { data } = await this.client.get(
        `get/studymaterial_by_id?id=${studyMaterialId}&type=${type}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Failed to get study material by id");
    }
  }
}
