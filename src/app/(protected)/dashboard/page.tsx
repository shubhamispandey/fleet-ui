// Dashboard.tsx
"use client";

import React, { useState, useEffect } from "react";
import Container from "@components/chat/messages/Container";
import Conversations from "@components/chat/conversations/Conversations";
import useDashboard from "@hooks/useDashboard";

const Dashboard = () => {
  const { selectedConversation } = useDashboard();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Sidebar */}
      {(!isMobile || !selectedConversation.data) && <Conversations />}
      {/* Chat Area */}
      {(!isMobile || selectedConversation.data) && <Container />}
    </>
  );
};

export default Dashboard;
