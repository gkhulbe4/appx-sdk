export type RawMessage = {
  pinstatus: string;
  userComment: string;
  userName: string;
  userId: string;
  postedAt?: number;
  userTime: string;
  userFlag?: string;
};

export type FormattedRawMessage = {
  id: string;
  pinstatus: string;
  userComment: string;
  userName: string;
  userId: string;
  postedAt?: number;
  userTime: string;
  userFlag?: string;
};
