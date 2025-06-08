import { useCallback } from "react";
import { useDispatch } from "react-redux";
import config from "@lib/config";
import makeApiCall from "@lib/makeApi";
import { UserResponseType, UsersType } from "../types";
import actions from "@redux/actions";
import { AppDispatch } from "@redux/store";

const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchNavbar = useCallback(
    async (
      query: string,
      category: "people" | "chats",
      setSearchResults: React.Dispatch<React.SetStateAction<UsersType>>
    ) => {
      setSearchResults((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response: UserResponseType = await makeApiCall({
          url: `${config.apiEndPoints.users.baseUrl}${config.apiEndPoints.users.search}`,
          method: "GET",
          params: { q: query },
        });
        setSearchResults({
          loading: false,
          data: response.data,
          error: null,
        });
      } catch (error) {
        setSearchResults({
          loading: false,
          data: [],
          error:
            error instanceof Error
              ? error.message
              : "An error occurred while searching.",
        });
      }
    },
    []
  );

  const handleGetConversations = useCallback(() => {
    dispatch(actions.conversations.getConversationsThunk());
    try {
    } catch (error) {
      console.error("Error fetching conversations:", error);
      // Handle error appropriately, e.g., show a notification
    }
  }, [dispatch]);

  return { handleSearchNavbar, handleGetConversations };
};

export default useDashboard;
