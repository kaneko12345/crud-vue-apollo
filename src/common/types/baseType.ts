export interface IDictionary<T = any> {
  [key: string]: T;
}

export interface Pagination {
  descending: boolean
  rowsPerPage: number
}

export interface ImageResponse {
  containar: string,
  url: string,
  fileName: string,
  key: string,
  type: string,
  size: number,
}
