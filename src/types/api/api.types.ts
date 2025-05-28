export interface ApiResponse<T> {
  data: T | unknown;
  message: string;
  status: number;
}

export interface ApiError {
  response?: {
    data: {
      message: string;
    };
  };
}
