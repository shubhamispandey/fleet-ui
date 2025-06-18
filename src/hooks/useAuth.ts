import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  loginThunk,
  registerThunk,
  resendOtpThunk,
  verifyOtpThunk,
} from "@redux/slices/authSlice";
import { AppDispatch } from "@redux/store";
import { LoginParams, RegisterParams, VerifyOtpParams } from "../types";
import UseDrawers from "@hooks/useDrawers"; // Assuming this hook provides notifications

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { notify } = UseDrawers();

  const register = useCallback(
    async (payload: RegisterParams, redirect: (path: string) => void) => {
      try {
        const resultAction = await dispatch(registerThunk(payload));
        const originalPromiseResult = unwrapResult(resultAction);
        if (originalPromiseResult) {
          notify({ message: "Registration successful!", type: "success" });
          redirect(`/verify-otp/?email=${payload.email}`);
        }
      } catch (error) {
        notify({ message: error as string, type: "error" });
      }
    },
    [dispatch, notify]
  );

  const verifyOtp = useCallback(
    async (payload: VerifyOtpParams, redirect: (path: string) => void) => {
      try {
        const resultAction = await dispatch(verifyOtpThunk(payload));
        unwrapResult(resultAction);
        notify({ message: "OTP verified successfully!", type: "success" });
        redirect("/login");
      } catch (error) {
        notify({ message: error as string, type: "error" });
      }
    },
    [dispatch, notify]
  );

  const resendOtp = useCallback(
    async (email: string) => {
      try {
        const resultAction = await dispatch(resendOtpThunk({ email }));
        unwrapResult(resultAction);
        notify({ message: "A new OTP has been sent.", type: "success" });
      } catch (error) {
        notify({ message: error as string, type: "error" });
      }
    },
    [dispatch, notify]
  );

  const login = useCallback(
    async (params: LoginParams, redirect: (path: string) => void) => {
      try {
        const resultAction = await dispatch(loginThunk(params));
        unwrapResult(resultAction);
        // No success notification needed here as the user is redirected
        redirect("/dashboard");
      } catch (error) {
        notify({ message: error as string, type: "error" });
      }
    },
    [dispatch, notify]
  );

  return { login, register, verifyOtp, resendOtp };
};

export default useAuth;
