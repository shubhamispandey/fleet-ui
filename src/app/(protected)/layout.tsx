"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@components/auth/useAuth";
import Loader from "@components/page-loader/Loader";
import SocketManager from "@sockets/SocketManager";
import useUser from "@hooks/useUser";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const { getCurrentUser } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getCurrentUser();
      } catch {
        // Redirect to login if fetching user fails
        router.push("/login");
      }
    };

    if (!isLoading && isAuthenticated) {
      fetchUser();
    }
  }, [isLoading, isAuthenticated, getCurrentUser, router]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!isLoading && !isAuthenticated) {
    if (typeof window !== "undefined") {
      router.push("/login");
    }
    return null;
  }

  return (
    <div>
      <SocketManager />
      {children}
    </div>
  );
};

export default Layout;
