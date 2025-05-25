export type ToastType = "info" | "success" | "warning" | "error";

export type NotifyProps = {
  message: string;
  type: ToastType;
};
