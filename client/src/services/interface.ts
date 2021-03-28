export interface IResponseError {
  err: string;
  data: null;
}

export interface IResponseData<T> {
  err: null;
  data: T;
}

export interface IResponsePageData<T> {
  data: T[];
  err: null;
  count: number;
  total: number;
}

export interface IMovie {
  _id?: string;
  name: String;
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
