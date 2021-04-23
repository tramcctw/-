export interface IResponseError {
  err: string;
  data: null;
}

export interface IResponseData<T> {
  err: null;
  data: T;
}

export interface IUploadResponse {
  err: string | null;
  data: string | null;
}

export interface IResponsePageData<T> {
  data: T[];
  err: null;
  count: number;
  total: number;
}

export enum SwitchType {
  isComming = "isComming",
  isHot = "isHot",
  isClassic = "isClassic",
}

export interface IMovie {
  _id?: string;
  name: string;
  types: string[];
  areas: string[];
  timeLong: number;
  isHot: boolean;
  isComming: boolean;
  isClassic: boolean;
  description?: string;
  poster?: string;
}

export interface ISearchCondition {
  page?: number;
  limit?: number;
  key?: string;
}

export interface ILoginRes {
  _id?: string;
  username: string;
  password: string;
}

export interface INotes {
  _id?: string;
  content: string;
}