import type { CurrentUser } from "./appxTypes.js";

export type UserLoginResponse = {
  data: CurrentUser | null;
  message: string;
  status: number;
};

export type VerifyOtpResponse = {
  status: number;
  message: string;
  data: string;
  user?: Partial<CurrentUser> & { is_blank: boolean };
};

export type UserSignupResponse = {
  status: number;
  message: string;
  data: {
    user_id: number;
    userid: string;
    username: string;
    name: string;
    email: string;
    mobile: string;
    phone: string;
    city: string;
    state: string;
    source: string;
    date_time: string;
    token: string;
  } | null;
};

export type CheckUserExists = {
  status: number;
  msg: string;
  data: boolean;
};
