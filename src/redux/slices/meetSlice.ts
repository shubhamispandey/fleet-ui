import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "@lib/config";
import makeApiCall from "@lib/makeApi";
import {
  ApiError,
  ApiResponse,
  createMeetParams,
  getMeetInfoParams,
} from "../../types";

const meetEndPoints = config.apiEndPoints.meet;

// THUNKS
export const createMeetThunk = createAsyncThunk(
  "meet/create",
  async (payload: createMeetParams, { rejectWithValue }) => {
    try {
      const response: ApiResponse<{ meetingCode: string }> = await makeApiCall({
        url: `${meetEndPoints.baseUrl}${meetEndPoints.createMeet}`,
        method: "POST",
        data: payload,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error as ApiError)?.response?.data?.message ||
          "Failed to create meeting."
      );
    }
  }
);

export const getMeetInfoThunk = createAsyncThunk(
  "meet/getInfo",
  async (payload: getMeetInfoParams, { rejectWithValue }) => {
    try {
      const response: ApiResponse<unknown> = await makeApiCall({
        url: `${meetEndPoints.baseUrl}${meetEndPoints.getMeetInfo}`,
        method: "POST",
        data: payload,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error as ApiError)?.response?.data?.message ||
          "Failed to fetch meeting info."
      );
    }
  }
);

interface MeetData {
  meetingCode?: string;
  // Add other properties from getMeetInfoThunk as they become known
}

interface MeetingState {
  loading: boolean;
  data: MeetData | null;
  error: string | null;
}

interface RootState {
  meeting: MeetingState;
}

const initialState: RootState = {
  meeting: {
    loading: false,
    data: null,
    error: null,
  },
};

const meetSlice = createSlice({
  initialState,
  name: "meet",
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createMeetThunk
      .addCase(createMeetThunk.pending, (state) => {
        state.meeting.loading = true;
        state.meeting.error = null;
      })
      .addCase(createMeetThunk.fulfilled, (state, action) => {
        state.meeting.loading = false;
        state.meeting.data = action.payload;
      })
      .addCase(createMeetThunk.rejected, (state, action) => {
        state.meeting.loading = false;
        state.meeting.data = null;
        state.meeting.error = action.payload as string;
      })

      // getMeetInfoThunk
      .addCase(getMeetInfoThunk.pending, (state) => {
        state.meeting.loading = true;
        state.meeting.error = null;
      })
      .addCase(getMeetInfoThunk.fulfilled, (state, action) => {
        state.meeting.loading = false;
        state.meeting.data = action.payload as MeetData;
      })
      .addCase(getMeetInfoThunk.rejected, (state, action) => {
        state.meeting.loading = false;
        state.meeting.data = null;
        state.meeting.error = action.payload as string;
      });
  },
});

export default meetSlice.reducer;
