import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import config from "@lib/config";
import makeApiCall from "@lib/makeApi";
import {
  getConversationsThunk,
  getMessagesThunk,
  selectConversation,
  setSelectedMessage,
} from "@redux/slices/conversationsSlice";
import SOCKET_EVENTS from "@lib/socketEvents";
import {
  Conversation,
  CreateConversationPayload,
  HandleGetMessages,
  MessageType,
  UserResponseType,
  UsersType,
  UserType,
} from "../types";

import { useMemo } from "react";

const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    allConversations: conversations,
    selectedConversation,
    messages,
  } = useSelector((state: RootState) => state.conversations);
  const socket = useSelector((state: RootState) => state.socket.socket);

  // ID of the currently selected conversation
  const conversationId = selectedConversation?.data?._id;

  const hasConversationMessages =
    conversationId && messages.data.messages?.[conversationId];

  // Array of messages for the selected conversation
  const selectedConversationMessages = useMemo(
    () =>
      hasConversationMessages ? messages.data.messages[conversationId] : [],
    [hasConversationMessages, messages.data.messages, conversationId]
  );

  // Message object including data for current conversation
  const conversationMessages = useMemo(
    () => ({
      ...messages,
      data: {
        ...messages.data,
        messages: {
          ...messages.data.messages,
          ...(conversationId
            ? {
                [conversationId]: selectedConversationMessages,
              }
            : {}),
        },
      },
    }),
    [conversationId, messages, selectedConversationMessages]
  );

  // Logged-in user object
  const currentUser = useSelector((state: RootState) => state.users.user.data);

  // Other users in the current conversation (excludes current user)
  const recipientUsers = useMemo(
    () =>
      selectedConversation.data?.participants.filter(
        (p) => p._id !== currentUser?._id
      ) ?? [],
    [selectedConversation.data?.participants, currentUser?._id]
  );

  // Single recipient user (used in private chat context)
  const recipient = useMemo(
    () => (!!recipientUsers?.length ? recipientUsers?.[0] : null),
    [recipientUsers]
  );

  // HANDLE: Search users or chats from navbar
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

  // HANDLE: Fetch all conversations for the current user
  const handleGetConversations = useCallback(
    ({ search = "" }) => {
      dispatch(
        getConversationsThunk({
          search,
        })
      );
    },
    [dispatch]
  );

  const handleCreateConversation = useCallback(
    ({ participantId, type, name }: CreateConversationPayload) => {
      if (!socket) return;
      socket.emit(SOCKET_EVENTS.CREATE_CONVERSATION, {
        participantId,
        type,
        name,
      });
    },
    [socket]
  );

  // HANDLE: Select an existing conversation
  const handleSelectConversation = ({
    conversation,
  }: {
    conversation: Conversation | null;
  }) => {
    dispatch(
      selectConversation({
        loading: false,
        data: conversation,
        error: null,
      })
    );
  };

  // HANDLE: Select a user to either continue or start a conversation
  const handleSelectUser = (user: UserType) => {
    const conversation = conversations.data.conversations.find(
      (conv: Conversation) =>
        conv.participants.find((p) => p._id === user._id) &&
        conv.type === "private"
    );
    if (conversation) {
      handleSelectConversation({ conversation });
    } else {
      handleCreateConversation({
        participantId: user._id,
        type: "private",
        name: `Private Chat started by ${currentUser?.name} with ${user.name}`,
      });
    }
  };

  // HANDLE: Fetch messages for the selected conversation
  const handleGetMessages: HandleGetMessages = useCallback(() => {
    if (!conversationId || selectedConversationMessages.length) return;
    dispatch(
      getMessagesThunk({
        conversationId,
      })
    );
  }, [conversationId, selectedConversationMessages.length, dispatch]);

  const handleNotifyTyping = useCallback(
    (isTyping: boolean) => {
      if (!socket) return;
      socket.emit(SOCKET_EVENTS.TYPING_INDICATOR, {
        conversationId,
        isTyping,
      });
    },
    [socket, conversationId]
  );

  // EDIT MESSAGE
  const handleEditMessage = ({ message }: { message: MessageType }) => {
    dispatch(setSelectedMessage({ message, type: "edit" }));
  };

  return {
    // FUNCTIONS
    handleSearchNavbar,
    handleGetConversations,
    handleCreateConversation,
    handleSelectUser,
    handleSelectConversation,
    handleGetMessages,
    handleNotifyTyping,
    handleEditMessage,

    // UTILS
    conversationId,
    selectedConversation,
    conversationMessages,
    selectedConversationMessages,
    currentUser,
    recipientUsers,
    recipient,
  };
};

export default useDashboard;
