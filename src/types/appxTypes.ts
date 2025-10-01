import type { AppxSdk } from "../node/index";

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
  dob?: string;
  email?: string;
  name?: string;
  phone?: string;
  token?: string;
  userid?: string;
  username?: string;
};
