export interface RegisterParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface VerifyOtpParams {
  email: string;
  otp: string;
}
