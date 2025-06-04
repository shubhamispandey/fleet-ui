import React from "react";
import Header from "./Header";
import Messages from "./Messages";
import InputArea from "./InputArea";
import { Message, Chat } from "./types";

interface ContainerProps {
  chats: Chat[];
  messages: Message[];
  activeChat: string | null;
  onSendMessage: (msg: string) => void;
  inputValue: string;
  setInputValue: (val: string) => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

const Container: React.FC<ContainerProps> = ({
  chats,
  messages,
  activeChat,
  onSendMessage,
  inputValue,
  setInputValue,
  showBackButton,
  onBack,
}) => {
  return (
    <main className="flex-1 flex flex-col h-full relative bg-white">
      {activeChat ? (
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
          <Header chats={chats} activeChat={activeChat} />
          <Messages messages={messages} />
          <InputArea
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSendMessage={onSendMessage}
          />
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
