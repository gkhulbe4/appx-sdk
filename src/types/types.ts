import type { AppxSdk } from "../node/index.js";

export type Course = {
  id: string;
  title: string;
  description: string;
};

export type User = {
  id: string;
  email: string;
  name?: string;
};

export type AppxContextType = {
  sdk: AppxSdk;
  user: User | null;
  loading: boolean;
  loginPass: (email: string, password: string) => Promise<User>;
  loginOtp: (email: string) => Promise<User>;
};
