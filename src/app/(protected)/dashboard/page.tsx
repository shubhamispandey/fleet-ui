// Dashboard.tsx
"use client";

import React, { useState, useEffect } from "react";
import Container from "@components/chat/Container";
import Sidebar from "@components/chat/Sidebar";
import { Message, Chat } from "@components/chat/types";
import { MessagesSquare } from "lucide-react";

const EmptyChatList = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <div className="bg-indigo-100 p-4 rounded-full mb-4">
      <MessagesSquare className="text-indigo-600" size={32} />
    </div>
    <h3 className="text-lg font-medium text-gray-800">No conversations yet</h3>
    <p className="mt-1 text-gray-500 max-w-xs">
      Start a new conversation by clicking the button below
    </p>
    <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
      Start a chat
    </button>
  </div>
);

const Dashboard = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Simulate loading data
  useEffect(() => {
    setTimeout(() => {
      setChats([
        {
          id: "1",
          name: "Design Team",
          avatar: "/img/avatars/g1.webp",
          lastMessage: "Let's schedule the UX review for tomorrow",
          timestamp: "2h ago",
          unread: 3,
          isOnline: true,
        },
        {
          id: "2",
          name: "Alex Johnson",
          avatar: "/img/avatars/b7.webp",
          lastMessage: "Sent the project requirements document",
          timestamp: "Yesterday",
          unread: 0,
          isOnline: false,
        },
        {
          id: "3",
          name: "Marketing Group",
          avatar: "/img/avatars/g2.webp",
          lastMessage: "Campaign results are looking positive!",
          timestamp: "Mar 12",
          unread: 12,
          isOnline: true,
        },
      ]);
      setActiveChat("1");
    }, 500);
  }, []);

  // Load messages when chat is selected
  useEffect(() => {
    if (activeChat) {
      setTimeout(() => {
        setMessages([
          {
            id: "1",
            content:
              "Hi team! I've completed the initial UI mockups for the new dashboard. When can we review them?",
            timestamp: "10:33 AM",
            sender: "user",
            avatar: "/img/avatars/g1.webp",
          },
          {
            id: "2",
            content:
              "Thanks Sarah! Let's schedule a review tomorrow at 11 AM. Does that work for everyone?",
            timestamp: "10:35 AM",
            sender: "self",
            status: "read",
          },
          {
            id: "3",
            content:
              "That works for me. I'll prepare the feedback document in advance.",
            timestamp: "10:40 AM",
            sender: "user",
            avatar: "/img/avatars/b7.webp",
          },
          {
            id: "4",
            content: "11 AM works. Should I invite the product team as well?",
            timestamp: "10:42 AM",
            sender: "user",
            avatar: "/img/avatars/g2.webp",
          },
          {
            id: "5",
            content: "Yes, please include Michael and Lisa from product.",
            timestamp: "10:45 AM",
            sender: "self",
            status: "delivered",
          },
        ]);
      }, 1000);
    } else {
      setMessages([]);
    }
  }, [activeChat]);

  const handleSendMessage = (msg: string) => {
    if (msg.trim() === "") return;
    const newMessage: Message = {
      id: Date.now().toString(),
      content: msg,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "self",
      status: "sent",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    if (activeChat) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            content:
              "Got it! I'll prepare the conference room and send calendar invites to everyone.",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            sender: "user",
            avatar: chats.find((c) => c.id === activeChat)?.avatar,
          },
        ]);
      }, 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-66px)] bg-gray-50">
      {/* Sidebar */}
      {(!isMobile || !activeChat) && (
        <Sidebar
          chats={chats}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          EmptyChatList={EmptyChatList}
        />
      )}
      {/* Chat Area */}
      {(!isMobile || activeChat) && (
        <Container
          chats={chats}
          messages={messages}
          activeChat={activeChat}
          onSendMessage={handleSendMessage}
          inputValue={inputValue}
          setInputValue={setInputValue}
          showBackButton={isMobile && !!activeChat}
          onBack={() => setActiveChat(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
