export interface IConstraints {
  [type: string]: string;
}

export interface ISeacrchRes<T> {
  count: number;
  data: T[];
  errors: string[];
}
