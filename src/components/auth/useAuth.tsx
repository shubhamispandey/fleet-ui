"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { status } = useSession();
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else if (status === "unauthenticated" && !accessToken) {
      setIsAuthenticated(false);
      setIsLoading(false);
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [status, accessToken, router]);

  return { isAuthenticated, isLoading };
};

export default useAuth;
