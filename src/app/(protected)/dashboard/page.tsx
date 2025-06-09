// Dashboard.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "@components/chat/messages/Container";
import Conversations from "@components/chat/conversations/Conversations";
import { RootState } from "@redux/store";

const Dashboard = () => {
  const selectedConversation = useSelector(
    (state: RootState) => state.conversations.selectedConversation
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load messages when chat is selected
  // useEffect(() => {
  //   if (activeChat) {
  //     setTimeout(() => {
  //       setMessages([
  //         {
  //           id: "1",
  //           content:
  //             "Hi team! I've completed the initial UI mockups for the new dashboard. When can we review them?",
  //           timestamp: "10:33 AM",
  //           sender: "user",
  //           avatar: "/img/avatars/g1.webp",
  //         },
  //         {
  //           id: "2",
  //           content:
  //             "Thanks Sarah! Let's schedule a review tomorrow at 11 AM. Does that work for everyone?",
  //           timestamp: "10:35 AM",
  //           sender: "self",
  //           status: "read",
  //         },
  //         {
  //           id: "3",
  //           content:
  //             "That works for me. I'll prepare the feedback document in advance.",
  //           timestamp: "10:40 AM",
  //           sender: "user",
  //           avatar: "/img/avatars/b7.webp",
  //         },
  //         {
  //           id: "4",
  //           content: "11 AM works. Should I invite the product team as well?",
  //           timestamp: "10:42 AM",
  //           sender: "user",
  //           avatar: "/img/avatars/g2.webp",
  //         },
  //         {
  //           id: "5",
  //           content: "Yes, please include Michael and Lisa from product.",
  //           timestamp: "10:45 AM",
  //           sender: "self",
  //           status: "delivered",
  //         },
  //       ]);
  //     }, 1000);
  //   } else {
  //     setMessages([]);
  //   }
  // }, [activeChat]);

  // const handleSendMessage = (msg: string) => {
  //   if (msg.trim() === "") return;
  //   const newMessage: Message = {
  //     id: Date.now().toString(),
  //     content: msg,
  //     timestamp: new Date().toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //     sender: "self",
  //     status: "sent",
  //   };
  //   setMessages((prev) => [...prev, newMessage]);
  //   setInputValue("");
  //   if (activeChat) {
  //     setTimeout(() => {
  //       setMessages((prev) => [
  //         ...prev,
  //         {
  //           id: (Date.now() + 1).toString(),
  //           content:
  //             "Got it! I'll prepare the conference room and send calendar invites to everyone.",
  //           timestamp: new Date().toLocaleTimeString([], {
  //             hour: "2-digit",
  //             minute: "2-digit",
  //           }),
  //           sender: "user",
  //           avatar: chats.find((c) => c.id === activeChat)?.avatar,
  //         },
  //       ]);
  //     }, 2000);
  //   }
  // };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-66px)] bg-gray-50">
      {/* Sidebar */}
      {(!isMobile || !selectedConversation.data) && <Conversations />}
      {/* Chat Area */}
      {(!isMobile || selectedConversation.data) && <Container />}
    </div>
  );
};

export default Dashboard;
