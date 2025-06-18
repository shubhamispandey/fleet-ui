import React, { useEffect, useRef } from "react";
import Header from "./Header";
import Messages from "./Messages";
import InputArea from "./InputArea";
import useDashboard from "@hooks/useDashboard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@redux/store";
import SOCKET_EVENTS from "@lib/socketEvents";
import { clearUnreadCount } from "@redux/slices/conversationsSlice";

const Container = () => {
  const { selectedConversation, handleSelectConversation } = useDashboard();
  const socket = useSelector((state: RootState) => state.socket.socket);
  const dispatch = useDispatch();
  const showBackButton = !!selectedConversation.data;
  const onBack = () => handleSelectConversation({ conversation: null });
  const lastMarkedMessageId = useRef<string | null>(null);

  // Mark conversation as read when it's selected or when new messages arrive
  useEffect(() => {
    if (selectedConversation.data && socket) {
      const conversationId = selectedConversation.data._id;
      const lastMessage = selectedConversation.data.lastMessage;

      if (
        conversationId &&
        lastMessage &&
        lastMessage._id !== lastMarkedMessageId.current
      ) {
        lastMarkedMessageId.current = lastMessage._id;
        socket.emit(SOCKET_EVENTS.MARK_CONVERSATION_AS_READ, {
          conversationId,
          lastMessageId: lastMessage._id,
        });

        // Clear unread count when conversation is viewed
        dispatch(clearUnreadCount({ conversationId }));
      }
    }
  }, [
    selectedConversation?.data?._id,
    selectedConversation?.data?.lastMessage?._id,
    socket,
    dispatch,
    selectedConversation?.data,
  ]);

  // Mark as read when conversation is first loaded
  useEffect(() => {
    if (selectedConversation.data && socket) {
      const conversationId = selectedConversation.data._id;
      const lastMessage = selectedConversation.data.lastMessage;

      if (conversationId && lastMessage) {
        // Small delay to ensure the conversation is fully loaded
        const timeoutId = setTimeout(() => {
          socket.emit(SOCKET_EVENTS.MARK_CONVERSATION_AS_READ, {
            conversationId,
            lastMessageId: lastMessage._id,
          });

          // Clear unread count when conversation is loaded
          dispatch(clearUnreadCount({ conversationId }));
        }, 500);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [
    selectedConversation?.data?._id,
    socket,
    dispatch,
    selectedConversation?.data,
  ]);

  if (!selectedConversation.data) return null;

  return (
    <main className="flex-1 flex flex-col relative bg-white">
      {selectedConversation ? (
        <>
          {showBackButton && (
            <button
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border-b border-gray-200 text-indigo-600 font-medium shadow-sm z-20"
              onClick={onBack}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
          )}
          <Header />
          <Messages />
          <InputArea />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          {/* Empty state UI here if needed */}
        </div>
      )}
    </main>
  );
};

export default Container;
