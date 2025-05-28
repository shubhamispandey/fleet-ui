import { ApiError } from "../api/api.types";

export interface DataState<T> {
  loading: boolean;
  error: string | null | ApiError;
  data: T | unknown;
}

export type ToastType = "info" | "success" | "warning" | "error";

export type NotifyProps = {
  message: string;
  type: ToastType;
};
