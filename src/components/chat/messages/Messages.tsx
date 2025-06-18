import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Message from "./MessageItem";
import useDashboard from "@hooks/useDashboard";
import TypingIndicator from "./TypingIndicator";

const LoadingSkeleton = () => (
  <div className="p-2 h-full flex flex-col items-center justify-center">
    <div className="animate-pulse select-none flex flex-col items-center">
      <div className="w-14 h-14 bg-indigo-300 rounded-full mb-4" />
      <div className="h-4 w-48 bg-indigo-300 rounded mb-2" />
      <div className="h-3 w-32 bg-indigo-200 rounded" />
    </div>
    <span className="text-slate-400 block text-center mt-5">
      Please wait while we fetch your messages...
    </span>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full text-gray-400 select-none">
    <svg
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 24 24"
      className="mb-2"
    >
      <path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
    <span className="text-lg font-medium">No messages yet</span>
    <span className="text-sm">Start the conversation!</span>
  </div>
);

const MessagesList = () => {
  const { handleGetMessages } = useDashboard();

  const {
    selectedConversation,
    conversationMessages,
    selectedConversationMessages: allMessages,
    currentUser,
  } = useDashboard();
  const currentUserId = currentUser?._id;
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract participant IDs for read status
  const participants =
    selectedConversation?.data?.participants?.map((p) => p._id) || [];

  // Get participant data for context menu
  const participantData = selectedConversation?.data?.participants || [];

  useEffect(() => {
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [allMessages]);

  // Auto-scroll when typing indicators change
  useEffect(() => {
    if (containerRef.current) {
      const scrollToBottom = () => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      };

      // Small delay to ensure DOM has updated
      const timeoutId = setTimeout(scrollToBottom, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedConversation?.data?.typing]);

  useEffect(handleGetMessages, [handleGetMessages]);

  const renderMessages = () => (
    <div className="flex-1 overflow-hidden">
      <div
        ref={containerRef}
        className="overflow-auto h-full px-4 py-6 space-y-6"
      >
        {conversationMessages.loading ? (
          <LoadingSkeleton />
        ) : !allMessages.length ? (
          <EmptyState />
        ) : (
          <>
            {/* Conversation name/message at the top */}
            {selectedConversation?.data?.name && (
              <div className="flex justify-center mb-4">
                <span className="bg-indigo-50 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                  {selectedConversation.data.name}
                </span>
              </div>
            )}
            <AnimatePresence>
              {allMessages.map((message) => (
                <motion.div
                  key={message._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Message
                    message={message}
                    isGroupChat={selectedConversation?.data?.type === "group"}
                    currentUserId={currentUserId ?? ""}
                    participants={participants}
                    participantData={participantData}
                  />
                </motion.div>
              ))}
              {/* Typing indicator below messages */}
              <TypingIndicator
                typing={selectedConversation?.data?.typing}
                participants={selectedConversation?.data?.participants}
                currentUserId={currentUserId}
              />
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );

  return renderMessages();
};

export default MessagesList;
