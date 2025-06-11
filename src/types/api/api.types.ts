export interface ApiResponse<T> {
  data: T;
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
