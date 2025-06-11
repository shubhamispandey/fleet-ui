import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Message from "./MessageItem";
import useDashboard from "@hooks/useDashboard";

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

  useEffect(() => {
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [allMessages]);

  useEffect(handleGetMessages, [handleGetMessages]);

  const renderMessages = () => (
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
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
    >
      {conversationMessages.loading ? (
        <LoadingSkeleton />
      ) : !allMessages.length ? (
        <EmptyState />
      ) : (
        renderMessages()
      )}
    </div>
  );
};

export default MessagesList;
