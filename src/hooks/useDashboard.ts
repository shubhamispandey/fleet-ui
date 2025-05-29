import config from "@/lib/config";
import makeApiCall from "@/lib/makeApi";
import { UsersType } from "@/types";
import { useCallback } from "react";

const useDashboard = () => {
  const handleSearchNavbar = useCallback(
    async (
      query: string,
      category: "people" | "chats",
      setSearchResults: React.Dispatch<React.SetStateAction<UsersType>>
    ) => {
      console.log(`Searching for ${query} in ${category}`);
      const response = await makeApiCall({
        url: `${config.apiEndPoints.users.baseUrl}${config.apiEndPoints.users.search}`,
        method: "GET",
        params: { q: query },
      });
      console.log(response);
      setSearchResults({
        loading: true,
        data: [],
        error: null,
      });
    },
    []
  );

  return { handleSearchNavbar };
};

export default useDashboard;
