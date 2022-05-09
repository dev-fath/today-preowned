export interface ApiResponse<T> {
  result: {
    code: number;
    message: string;
  };
  data?: T;
}

export interface ApiErrorResponse {
  error: {
    result: { message: string; code: number };
  };
}
