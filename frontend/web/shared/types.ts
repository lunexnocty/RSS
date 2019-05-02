export type UserRole = 'normal' | 'sourceAdmin' | 'userAdmin';

export type SourceQueryResult = {
  sourceId: string;
  unit: string;
  prefecture: string;
  activeness: string;
  availableDate: Date;
};

export type PersonalLogQueryResult = {
  sourceId: string;
  personInCharge: string;
  usage: string;
  borrowDate: string;
  returnDate: Date;
  storePlace: Date;
};

export type SourceApplication = {
  applicant: string;
  place: string;
  Date: string;
  usage: string;
};

export type LoginFormData = {
  name: string;
  password: string;
};

export type LinkProps = {
  url: string;
  name: string;
};
