import React, { useState, useCallback, useRef, useEffect } from "react";
import { Paperclip, Smile, ArrowUpRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import SOCKET_EVENTS from "@lib/socketEvents";
import useDashboard from "@hooks/useDashboard";

const ChatInput = () => {
  const { recipient, handleNotifyTyping, conversationId } = useDashboard();
  const [inputValue, setInputValue] = useState("");
  const socket = useSelector((state: RootState) => state.socket.socket);

  // Typing state management
  const isTypingRef = useRef(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTypingTime = useRef<number>(0);

  // Constants
  const TYPING_TIMEOUT = 3000; // 3 seconds

  // Cleanup function
  const cleanup = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    if (isTypingRef.current) {
      handleNotifyTyping(false);
      isTypingRef.current = false;
    }
  }, [handleNotifyTyping]);

  // Start typing indicator
  const startTyping = useCallback(() => {
    if (!isTypingRef.current) {
      isTypingRef.current = true;
      handleNotifyTyping(true);
    }
    lastTypingTime.current = Date.now();

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing
    typingTimeoutRef.current = setTimeout(() => {
      if (isTypingRef.current) {
        isTypingRef.current = false;
        handleNotifyTyping(false);
      }
    }, TYPING_TIMEOUT);
  }, [handleNotifyTyping]);

  // Stop typing indicator
  const stopTyping = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    if (isTypingRef.current) {
      isTypingRef.current = false;
      handleNotifyTyping(false);
    }
  }, [handleNotifyTyping]);

  // Enhanced input change handler
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      // Only start typing if there's actual content
      if (value.trim().length > 0) {
        startTyping();
      } else {
        stopTyping();
      }
    },
    [startTyping, stopTyping]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    // Stop typing indicator immediately when message is sent
    stopTyping();

    socket?.emit(SOCKET_EVENTS.SEND_PRIVATE_MESSAGE, {
      receiverId: recipient?._id,
      content: inputValue,
    });
    setInputValue("");
  };

  // Cleanup on unmount or conversation change
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  useEffect(() => {
    // Stop typing when conversation changes
    stopTyping();
  }, [conversationId, stopTyping]);

  return (
    <form
      className="flex items-center gap-3 px-3 py-4 bg-white border-t-2 border-gray-100 rounded-2xl shadow-xl w-full"
      onSubmit={handleSubmit}
    >
      <div className="hidden md:flex items-center gap-2 px-2 w-auto">
        <button
          className="p-2 bg-gray-100 hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 rounded-full transition"
          type="button"
        >
          <Paperclip size={20} />
        </button>
        <button
          className="p-2 bg-gray-100 hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 rounded-full transition"
          type="button"
        >
          <Smile size={20} />
        </button>
      </div>
      <input
        id="sendMessage"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={stopTyping}
        placeholder="Type your message..."
        className="flex-1 h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-base focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition placeholder-gray-400 text-gray-900"
        autoComplete="off"
      />
      {/* Mobile: round button, no label */}
      <button
        type="submit"
        disabled={inputValue.trim() === ""}
        className={`ml-2 w-12 h-12 rounded-full transition shadow-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 md:hidden ${
          inputValue.trim() === ""
            ? "bg-gray-300 text-white cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105"
        }`}
        aria-label="Send"
      >
        <ArrowUpRight size={20} />
      </button>
      {/* Desktop: pill button with label */}
      <button
        type="submit"
        disabled={inputValue.trim() === ""}
        className={`ml-2 px-5 py-3 rounded-full transition shadow-md hidden md:flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 ${
          inputValue.trim() === ""
            ? "bg-gray-300 text-white cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105"
        }`}
        aria-label="Send"
      >
        <span className="font-medium">Send</span>
        <ArrowUpRight size={20} />
      </button>
    </form>
  );
};

export default ChatInput;
