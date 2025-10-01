import type { AxiosInstance } from "axios";
import type {
  CheckUserExists,
  UserLoginResponse,
  UserSignupResponse,
  VerifyOtpResponse,
} from "../types/userTypes";

export class UserApi {
  constructor(private client: AxiosInstance) {}

  private handleError(error: unknown, fallbackMessage: string): never {
    const err = error as any;
    const message =
      err.response?.data?.message || err.message || fallbackMessage;
    throw new Error(message);
  }

  async signup(
    fullName: string,
    email: string,
    phone: string,
    password: string,
    state: string
  ): Promise<UserSignupResponse> {
    try {
      const formData = new FormData();
      formData.append("source", "website");
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("state", state);
      formData.append("username", "");
      const { data } = await this.client.post(
        "post/userSignup?extra_details=0",
        formData
      );
      return data;
    } catch (err) {
      this.handleError(err, "Signup failed");
    }
  }

  async loginWithPass(
    email_or_phone: string,
    password: string
  ): Promise<UserLoginResponse> {
    try {
      const formData = new FormData();
      formData.append("source", "website");
      formData.append("phone", email_or_phone);
      formData.append("email", email_or_phone);
      formData.append("password", password);
      formData.append("extra_details", "1");
      const { data } = await this.client.post(
        "post/userLogin?extra_details=0",
        formData
      );
      return data;
    } catch (err) {
      this.handleError(err, "Login failed");
    }
  }

  async sendOtp(
    email_or_phone: string
  ): Promise<{ data: string; message: string; status: number }> {
    try {
      const { data } = await this.client.get(
        `get/sendotp?phone=${email_or_phone}`
      );
      return data;
    } catch (err) {
      this.handleError(err, "OTP sending failed");
    }
  }

  async verifyOtp(
    email_or_phone: string,
    otp: string,
    deviceId: string
  ): Promise<VerifyOtpResponse> {
    try {
      const { data } = await this.client.get(
        `get/otpverify?useremail=${email_or_phone}&otp=${otp}&device_id=${deviceId}&mydeviceid=&mydeviceid2=`
      );
      return data;
    } catch (err) {
      this.handleError(err, "OTP verification failed");
    }
  }

  async resendOtpWithCall(): Promise<{
    data: string;
    message: string;
    status: number;
  }> {
    try {
      const { data } = await this.client.post("post/resend_otp_with_call");
      return data;
    } catch (error) {
      this.handleError(error, "Failed to resend OTP with call");
    }
  }

  async checkUserExists(email_or_phone: string): Promise<CheckUserExists> {
    try {
      const { data } = await this.client.get(
        `get/check_user_exist?email_or_phone=${email_or_phone}`
      );
      return data;
    } catch (err) {
      this.handleError(err, "User check failed");
    }
  }

  async getUserLikedItems() {}
}
