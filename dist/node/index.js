import axios, {} from "axios";
export class AppxSdk {
    constructor(baseUrl) {
        this.client = axios.create({ baseURL: baseUrl });
    }
    async signup(email, password) {
        const { data } = await this.client.post("/auth/signup", {
            email,
            password,
        });
        return data;
    }
    async loginWithPass(email, password) {
        if (!password)
            throw new Error("Password is required for loginWithPass");
        try {
            const { data } = await this.client.post("/auth/login/pass", {
                email,
                password,
            });
            return data;
        }
        catch (error) {
            throw new Error(error?.message || "Login with password failed");
        }
    }
    async loginWithOtp(email) {
        try {
            const { data } = await this.client.post("/auth/login/otp", { email });
            return data;
        }
        catch (error) {
            throw new Error(error?.message || "Login with OTP failed");
        }
    }
    async me() {
        try {
            const { data } = await this.client.get("/auth/me");
            return data;
        }
        catch (error) {
            throw new Error(error?.message || "Failed to fetch current user");
        }
    }
}
//# sourceMappingURL=index.js.map