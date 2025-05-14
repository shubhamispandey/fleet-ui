import { createAsyncThunk } from "@reduxjs/toolkit";
import actionTypes from "../actionTypes";
import makeApiCall from "@/lib/makeApi";
import config from "@/lib/config";
import UseDrawers from "@/hooks/useDrawers";
import {
  ApiResponse,
  LoginParams,
  RegisterParams,
  VerifyOtpParams,
} from "@/types";

const authEndPoints = config.apiEndPoints.auth;

export const registerThunk = createAsyncThunk(
  actionTypes.auth.REGISTER,
  async ({ payload, redirect }: { payload: RegisterParams; redirect: any }) => {
    const { notify } = UseDrawers();
    const response: ApiResponse = await makeApiCall({
      url: `${authEndPoints.baseUrl}${authEndPoints.register}`,
      method: "POST",
      data: payload,
    });
    notify({
      message: response.message,
      type: response.status === 201 ? "success" : "error",
    });
    response.status === 201 && redirect("/verify-otp/?email=" + payload.email);
  }
);

export const verifyOtpThunk = createAsyncThunk(
  actionTypes.auth.VERIFYOTP,
  async ({
    payload,
    redirect,
  }: {
    payload: VerifyOtpParams;
    redirect: any;
  }) => {
    const { notify } = UseDrawers();
    const response: ApiResponse = await makeApiCall({
      url: `${authEndPoints.baseUrl}${authEndPoints.verifyOtp}`,
      method: "POST",
      data: payload,
    });
    notify({
      message: response.message,
      type: response.status === 200 ? "success" : "error",
    });
    response.status === 200 && redirect("/login");
  }
);

export const resendOtpThunk = createAsyncThunk(
  actionTypes.auth.RESENDOTP,
  async ({ payload }: { payload: Omit<VerifyOtpParams, "otp"> }) => {
    const { notify } = UseDrawers();
    const response: ApiResponse = await makeApiCall({
      url: `${authEndPoints.baseUrl}${authEndPoints.resendOtp}`,
      method: "POST",
      data: payload,
    });
    notify({
      message: response.message,
      type: response.status === 200 ? "success" : "error",
    });
  }
);

export const loginThunk = createAsyncThunk(
  actionTypes.auth.LOGIN,
  async ({ payload, redirect }: { payload: LoginParams; redirect: any }) => {
    const { notify } = UseDrawers();

    try {
      const response: ApiResponse = await makeApiCall({
        url: `${authEndPoints.baseUrl}${authEndPoints.login}`,
        method: "POST",
        data: payload,
      });

      if (response.status === 200) {
        if (Object.keys(response.data).includes("accessToken")) {
          localStorage.setItem(
            "accessToken",
            (response.data as any).accessToken
          );
        }

        redirect("/auth/dashboard");
      } else {
        notify({
          message: response.message,
          type: "error",
        });
      }

      return response;
    } catch (error) {
      notify({
        message:
          (error as any)?.response?.data?.message ||
          "An error occurred while logging in. Please try again.",
        type: "error",
      });

      console.error("Login Error:", error);

      throw error;
    }
  }
);
export const getUserThunk = createAsyncThunk(
  actionTypes.auth.GETUSER,
  async (redirect: (path: string) => void, { rejectWithValue }) => {
    try {
      const response: ApiResponse = await makeApiCall({
        url: `${authEndPoints.baseUrl}${authEndPoints.getUser}`,
        method: "GET",
      });

      if (response.status === 200) {
        return response;
      }

      // localStorage.clear();
      // redirect("/");

      return rejectWithValue(response.message || "Failed to get user details.");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";

      // localStorage.clear();
      // redirect("/");

      return rejectWithValue(errorMessage);
    }
  }
);
