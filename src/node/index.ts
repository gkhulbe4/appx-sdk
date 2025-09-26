import axios, { type AxiosInstance } from "axios";

export class AppxSdk {
  client: AxiosInstance;

  constructor(baseUrl: string) {
    this.client = axios.create({ baseURL: baseUrl });
  }

  async signup(email: string, password: string) {
    const { data } = await this.client.post("/auth/signup", {
      email,
      password,
    });
    return data;
  }

  async loginWithPass(email: string, password: string) {
    if (!password) throw new Error("Password is required for loginWithPass");
    try {
      const { data } = await this.client.post("/auth/login/pass", {
        email,
        password,
      });
      return data;
    } catch (error: any) {
      throw new Error(error?.message || "Login with password failed");
    }
  }

  async loginWithOtp(email: string) {
    try {
      const { data } = await this.client.post("/auth/login/otp", { email });
      return data;
    } catch (error: any) {
      throw new Error(error?.message || "Login with OTP failed");
    }
  }

  async me() {
    try {
      const { data } = await this.client.get("/auth/me");
      return data;
    } catch (error: any) {
      throw new Error(error?.message || "Failed to fetch current user");
    }
  }
}
