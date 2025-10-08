export type UserLoginResponse = {
  data: {
    userid: string;
    token: string;
    email: string;
    phone: string;
    photo: string;
    name: string;
    username: string;
    aadhar_status: string;
    state: string;
    info_1: string;
    app_category: string;
    is_tester: boolean;
    gender: "male" | "female" | "other" | string;
    height: string;
    weight: string;
    dob: string;
  } | null;
  message: string;
  status: number;
};

export type VerifyOtpResponse = {
  status: number;
  message: string;
  data: string;
  user?: Partial<UserLoginResponse["data"]> & { is_blank: boolean };
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

export type UserDetails = {
  aadhar_image: string;
  aadhar_status: "0" | "1";
  datetime: string;
  district: string;
  email: string;
  id: string;
  info_1: string;
  info_2: string;
  info_3: string;
  info_4: string;
  info_5: string;
  is_blank: boolean;
  name: string;
  password: string;
  phone: string;
  photo: string;
  refer_code: string;
  refer_credits: string;
  state: string;
  userid: string;
  username: string;
};
