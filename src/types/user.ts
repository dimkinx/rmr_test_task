type RawDay = {
  Date: string;
  Start: string;
  End: string;
};

type RawUser = {
  id: number;
  Fullname: string;
  Days: Array<RawDay>;
};

type Day = {
  date: string;
  duration: string;
};

type User = {
  id: string;
  fullName: string;
  days: Array<Day>;
  totalDuration: string;
};

export type {RawUser, User};
