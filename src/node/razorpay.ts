import { AxiosInstance } from "axios";
import { RazorpayOptions } from "../types/razorTypes";

export class RazorpayApi {
  constructor(private client: AxiosInstance) {}

  private handleError(error: unknown, fallbackMessage: string): never {
    const err = error as any;
    const message =
      err.response?.data?.message || err.message || fallbackMessage;
    throw new Error(message);
  }

  async insertRazorPayOptions(options: RazorpayOptions) {
    try {
      const { data } = await this.client.post(
        `post/insert_rzp_options`,
        options
      );
      return data;
    } catch (error) {
      this.handleError(error, "Failed to insert razorpay options");
    }
  }
}
