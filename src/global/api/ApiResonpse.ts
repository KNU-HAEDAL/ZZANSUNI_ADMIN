export interface ApiResponse<T> {
  result: 'SUCCESS' | 'FAIL';
  data: T;
  message: string;
  errorCode: string;
}

export interface PagingRequest {
  page: number;
  size: number;
}

export interface PagingResponse<T> {
  totalPage: number;
  hasNext: boolean;
  data: T[];
}