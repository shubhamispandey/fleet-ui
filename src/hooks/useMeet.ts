import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { createMeetThunk, getMeetInfoThunk } from "@redux/slices/meetSlice";
import { AppDispatch } from "@redux/store";
import { createMeetParams, getMeetInfoParams } from "../types";
import UseDrawers from "./useDrawers";

const useMeet = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { notify } = UseDrawers();

  const handleStartMeeting = useCallback(
    async (payload: createMeetParams) => {
      try {
        const resultAction = await dispatch(createMeetThunk(payload));
        const result = unwrapResult(resultAction);
        if (result?.meetingCode) {
          notify({ message: "Meeting created successfully!", type: "success" });
          router.push(`/auth/meet/${result.meetingCode}`);
        }
      } catch (error) {
        notify({ message: error as string, type: "error" });
      }
    },
    [dispatch, router, notify]
  );

  const getMeetInfo = useCallback(
    async (payload: getMeetInfoParams) => {
      try {
        await dispatch(getMeetInfoThunk(payload)).unwrap();
        // If successful, we can assume the user has joined the meeting.
        // Or perhaps the component handles the next step.
      } catch (error) {
        notify({ message: error as string, type: "error" });
        router.push("/dashboard");
      }
    },
    [dispatch, router, notify]
  );

  return { handleStartMeeting, getMeetInfo };
};

export default useMeet;
