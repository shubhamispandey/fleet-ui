import React from "react";
import { Paperclip, Smile, ArrowUpRight } from "lucide-react";

interface ChatInputProps {
  inputValue: string;
  setInputValue: (val: string) => void;
  onSendMessage: (msg: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  setInputValue,
  onSendMessage,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    onSendMessage(inputValue);
  };
  return (
    <form
      className="flex items-center gap-3 px-3 py-4 bg-white border-t border-gray-100 rounded-2xl shadow-lg w-full sticky bottom-0"
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
        onChange={(e) => setInputValue(e.target.value)}
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
