import { type AxiosInstance } from "axios";
export declare class AppxSdk {
    client: AxiosInstance;
    constructor(baseUrl: string);
    signup(email: string, password: string): Promise<any>;
    loginWithPass(email: string, password: string): Promise<any>;
    loginWithOtp(email: string): Promise<any>;
    me(): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map