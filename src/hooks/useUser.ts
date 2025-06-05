import { useCallback } from "react";
import { useDispatch } from "react-redux";
import actions from "@redux/actions";
import { AppDispatch } from "@redux/store";

const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getCurrentUser = useCallback(
    (redirect: (path: string) => void): void => {
      dispatch(actions.users.getCurrentUserThunk(redirect));
    },
    [dispatch]
  );

  return { getCurrentUser };
};

export default useUser;
