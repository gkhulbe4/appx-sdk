import type { AppxSdk } from "../node/index.js";

export type AppxContextType = {
  sdk: AppxSdk;
  user: CurrentUser | null;
  setUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

export type AppxSdkOptions = {
  baseUrl: string;
  getToken?: () => string | null;
  defaultHeaders?: Record<string, string>;
};

export type CurrentUser = {
  aadhar_status: string;
  app_category: string;
  dob: string;
  email: string;
  gender: string;
  height: string;
  info_1: string;
  is_tester: boolean;
  name: string;
  phone: string;
  photo: string;
  state: string;
  token: string;
  userid: string;
  username: string;
  weight: string;
};
