"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/components/auth/useAuth";
import Loader from "@/components/loader/Loader";
import useUser from "@/hooks/useUser";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const { getCurrentUser } = useUser();

  useEffect(() => {
    if (!isLoading && isAuthenticated) getCurrentUser(router.push);
  }, [isLoading, isAuthenticated, getCurrentUser, router.push]);

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

  return <div>{children}</div>;
};

export default Layout;
