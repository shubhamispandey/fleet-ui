import { createSlice } from "@reduxjs/toolkit";
import { createMeetThunk, getMeetInfoThunk } from "../actions/meet";

interface MeetingState {
  loading: boolean;
  data: any;
}

interface RootState {
  meeting: MeetingState;
}

const initialState: RootState = {
  meeting: {
    loading: false,
    data: null,
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
      })
      .addCase(createMeetThunk.fulfilled, (state, action) => {
        state.meeting.loading = false;
        state.meeting.data = action.payload.data;
      })
      .addCase(createMeetThunk.rejected, (state) => {
        state.meeting.loading = false;
        state.meeting.data = null;
      })

      // getMeetInfoThunk
      .addCase(getMeetInfoThunk.pending, (state) => {
        state.meeting.loading = true;
      })
      .addCase(getMeetInfoThunk.fulfilled, (state, action) => {
        state.meeting.loading = false;
        state.meeting.data = action.payload;
      })
      .addCase(getMeetInfoThunk.rejected, (state) => {
        state.meeting.loading = false;
        state.meeting.data = null;
      });
  },
});

export default meetSlice.reducer;
