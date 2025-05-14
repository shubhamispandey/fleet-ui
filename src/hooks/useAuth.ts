import { useCallback } from "react";
import { useDispatch } from "react-redux";
import actions from "@/redux/actions";
import { AppDispatch } from "@/redux/store";
import { LoginParams, RegisterParams, VerifyOtpParams } from "@/types";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const register = useCallback(
    (payload: RegisterParams, redirect: (path: string) => void): void => {
      dispatch(actions.auth.registerThunk({ payload, redirect }));
    },
    [dispatch]
  );

  const verifyOtp = useCallback(
    ({ email, otp }: VerifyOtpParams, redirect: any): void => {
      const payload: VerifyOtpParams = {
        email,
        otp,
      };

      dispatch(actions.auth.verifyOtpThunk({ payload, redirect }));
    },
    [dispatch]
  );

  const resendOtp = useCallback(
    (email: string): void => {
      dispatch(actions.auth.resendOtpThunk({ payload: { email } }));
    },
    [dispatch]
  );

  const login = useCallback(
    (params: LoginParams, redirect: (path: string) => void): void => {
      dispatch(actions.auth.loginThunk({ payload: params, redirect }));
    },
    [dispatch]
  );

  const getUser = useCallback(
    (redirect: (path: string) => void): void => {
      dispatch(actions.auth.getUserThunk(redirect));
    },
    [dispatch]
  );

  return { login, register, verifyOtp, resendOtp, getUser };
};

export default useAuth;
