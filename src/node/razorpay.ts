import axios, { AxiosInstance } from "axios";
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

  async getRazorPayKey(baseUrl: string, token: string) {
    try {
      const { data } = await axios.get(
        `https://tempapi.classx.co.in/get/websiteconfig?domain=${baseUrl}`,
        {
          headers: {
            "auth-key": "appxapi",
            "client-service": "Appx",
            source: "website",
            Authorization: token,
          },
        }
      );
      return data.web_razorpaykey;
    } catch (error) {
      this.handleError(error, "Failed to get razorpay key");
    }
  }

  async insertLeadsData(
    userId: string,
    itemId: string,
    itemType: string,
    remarks: string = "Payment cancelled",
    source: string = "website"
  ): Promise<{
    data: string;
    message: string;
    status: number;
  }> {
    try {
      const formData = new FormData();
      formData.append("userid", userId);
      formData.append("itemid", itemId);
      formData.append("itemtype", itemType);
      formData.append("remarks", remarks);
      formData.append("source", source);

      const { data } = await this.client.post(`post/insertleadsdata`, formData);
      return data;
    } catch (error) {
      this.handleError(error, "Failed to insert leads data");
    }
  }

  async cancelPayment(
    orderId: string
  ): Promise<{ data: any[]; message: string; status: number }> {
    try {
      const { data } = await this.client.put(
        `payments/orders/${orderId}/cancel`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Failed to cancel payment");
    }
  }
}
