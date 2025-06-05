import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import actions from "@redux/actions";
import { AppDispatch } from "@redux/store";
import { createMeetParams, getMeetInfoParams } from "@types";

const useMeet = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const redirect = router.push;

  const handleStartMeeting = useCallback(
    (payload: createMeetParams) => {
      dispatch(actions.meet.createMeetThunk({ payload, redirect }));
    },
    [dispatch, redirect]
  );

  const getMeetInfo = useCallback(
    (payload: getMeetInfoParams) => {
      dispatch(actions.meet.getMeetInfoThunk({ payload, redirect }));
    },
    [dispatch, redirect]
  );

  return { handleStartMeeting, getMeetInfo };
};

export default useMeet;
