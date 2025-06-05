import config from "@/lib/config";
import makeApiCall from "@/lib/makeApi";
import { UserResponseType, UsersType } from "@/types";
import { useCallback } from "react";

const useDashboard = () => {
  const handleSearchNavbar = useCallback(
    async (
      query: string,
      category: "people" | "chats",
      setSearchResults: React.Dispatch<React.SetStateAction<UsersType>>
    ) => {
      setSearchResults((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response: UserResponseType = await makeApiCall({
          url: `${config.apiEndPoints.users.baseUrl}${config.apiEndPoints.users.search}`,
          method: "GET",
          params: { q: query },
        });
        setSearchResults({
          loading: false,
          data: response.data,
          error: null,
        });
      } catch (error) {
        setSearchResults({
          loading: false,
          data: [],
          error:
            error instanceof Error
              ? error.message
              : "An error occurred while searching.",
        });
      }
    },
    []
  );

  return { handleSearchNavbar };
};

export default useDashboard;
