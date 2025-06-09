import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import config from "@lib/config";
import makeApiCall from "@lib/makeApi";
import actions from "@redux/actions";
import {
  Conversation,
  CreateConversationPayload,
  UserResponseType,
  UsersType,
  UserType,
} from "../types";

const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const conversations = useSelector(
    (state: RootState) => state.conversations.allConversations
  );
  const currentUser = useSelector((state: RootState) => state.users.user.data);

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

  const handleGetConversations = useCallback(
    ({ search = "" }) => {
      try {
        dispatch(
          actions.conversations.getConversationsThunk({
            search,
          })
        );
      } catch (error) {
        console.error("Error fetching conversations:", error);
        // Handle error appropriately, e.g., show a notification
      }
    },
    [dispatch]
  );

  const handleCreateConversation = useCallback(
    ({ participantId, type, name }: CreateConversationPayload) => {
      try {
        dispatch(
          actions.conversations.createConversationThunk({
            payload: {
              participantId,
              type,
              name,
            },
          })
        );
      } catch (error) {
        console.error("Error creating conversation:", error);
        // Handle error appropriately, e.g., show a notification
      }
    },
    [dispatch]
  );

  const handleSelectConversation = ({
    conversation,
  }: {
    conversation: Conversation;
  }) => {
    dispatch(
      actions.conversations.selectConversation({
        loading: false,
        data: conversation,
        error: null,
      })
    );
  };

  const handleSelectUser = (user: UserType) => {
    const conversation = conversations.data.conversations.find(
      (conv: Conversation) =>
        conv.participants.find((p) => p._id === user._id) &&
        conv.type === "private"
    );
    if (conversation) {
      handleSelectConversation({ conversation });
      console.log("Selected conversation:", conversation);
    } else {
      console.warn("No conversation found for user:", user._id);
      handleCreateConversation({
        participantId: user._id,
        type: "private",
        name: `Private Chat started by ${currentUser?.name} with ${user.name}`,
      });
    }
  };

  return {
    handleSearchNavbar,
    handleGetConversations,
    handleCreateConversation,
    handleSelectUser,
    handleSelectConversation,
  };
};

export default useDashboard;
