import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { getCurrentUserThunk } from "@redux/slices/usersSlice";
import { AppDispatch } from "@redux/store";

const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getCurrentUser = useCallback(async () => {
    try {
      const resultAction = await dispatch(getCurrentUserThunk());
      return unwrapResult(resultAction);
    } catch (error) {
      // The component that calls this will be responsible for redirection.
      console.error("Failed to fetch user:", error);
      // Re-throw the error to allow the calling component to handle it
      throw error;
    }
  }, [dispatch]);

  return { getCurrentUser };
};

export default useUser;
