import type { AppxSdk } from "../node/init/index";

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
  email: string;
  name: string;
  phone: string;
  token: string;
  userid: string;
  username: string;
};
