import { createAsyncThunk } from "@reduxjs/toolkit";
import actionTypes from "../actionTypes";
import UseDrawers from "@/hooks/useDrawers";
import config from "@/lib/config";
import makeApiCall from "@/lib/makeApi";
import { ApiResponse, createMeetParams, getMeetInfoParams } from "@/types";

const meetEndPoints = config.apiEndPoints.meet;

export const createMeetThunk = createAsyncThunk(
  actionTypes.meet.CREATE_MEET,
  async ({
    payload,
    redirect,
  }: {
    payload: createMeetParams;
    redirect: any;
  }) => {
    const { notify } = UseDrawers();
    const response: ApiResponse = await makeApiCall({
      url: `${meetEndPoints.baseUrl}${meetEndPoints.createMeet}`,
      method: "POST",
      data: payload,
    });
    notify({
      message: response.message,
      type: response.status === 201 ? "success" : "error",
    });
    response.status === 201 &&
      response.data?.meetingCode &&
      redirect(`/auth/meet/${response.data?.meetingCode}`);

    return response.data;
  }
);

export const getMeetInfoThunk = createAsyncThunk(
  actionTypes.meet.GET_MEET,
  async (
    {
      payload,
      redirect,
    }: { payload: getMeetInfoParams; redirect: (path: string) => void },
    { rejectWithValue }
  ) => {
    try {
      const response: ApiResponse = await makeApiCall({
        url: `${meetEndPoints.baseUrl}${meetEndPoints.getMeetInfo}`,
        method: "POST",
        data: payload,
      });

      // Handle success response
      if (response.status === 200) {
        return response.data;
      }

      // Handle known error responses
      if (response.status === 404) {
        redirect("/auth/dashboard");
        return rejectWithValue({ message: "Meeting not found", status: 404 });
      }

      if (response.status === 400) {
        redirect("/auth/dashboard");
        return rejectWithValue({
          message: "Invalid meeting code",
          status: 400,
        });
      }

      // Handle unexpected status codes
      return rejectWithValue({
        message: "Unexpected error",
        status: response.status,
      });
    } catch (error: any) {
      // Handle network or other unexpected errors
      console.error("Error fetching meeting info:", error);

      // Redirect if the error is critical (optional)
      if (error?.response?.status === 500) {
        redirect("/auth/dashboard");
      }

      return rejectWithValue({
        message:
          error?.response?.data?.message || "Failed to fetch meeting info",
        status: error?.response?.status || 500,
      });
    }
  }
);
