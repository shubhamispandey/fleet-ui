import React, { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Message from "./MessageItem";
import { Message as MessageType } from "./types";
import { motion } from "framer-motion";

interface MessagesListProps {
  messages: MessageType[];
}

const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
    >
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Message message={message} isGroupChat />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MessagesList;
