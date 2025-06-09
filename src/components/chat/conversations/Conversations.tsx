import React, { useCallback, useEffect, useState } from "react";
import List from "./ConversationList";
import EmptyConversations from "./EmptyConversations";
import { Plus, Search } from "lucide-react";
import useDashboard from "@hooks/useDashboard";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { debouncedSearch } from "@lib/helperFunctions";
import Spinner from "@components/spinner/Spinner";

const Conversations = () => {
  const { handleGetConversations } = useDashboard();

  const conversations = useSelector(
    (state: RootState) => state.conversations.allConversations
  );

  const [search, setSearch] = useState<string>("");

  const debouncedGetConversations = useCallback(
    (...args: [Record<string, unknown>]) =>
      debouncedSearch(handleGetConversations, 300)(...args),
    [handleGetConversations]
  );

  const onSearch = useCallback(
    () => debouncedGetConversations({ search }),
    [debouncedGetConversations, search]
  );

  useEffect(onSearch, [onSearch]);

  return (
    <aside className="w-full md:w-80 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col">
      <div className="px-6 py-6 border-b border-gray-200 ">
        <div className="relative">
          <label htmlFor="chat-search" className="sr-only">
            Search chats
          </label>
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600"
            size={20}
          />
          <input
            id="chat-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chats..."
            className="pl-12 pr-4 py-2 rounded-full border border-gray-200 bg-white shadow focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 text-base transition-all w-full text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>
      {conversations.loading ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto">
            {!conversations.data.conversations.length ? (
              <EmptyConversations isSearchEnabled={!!search} />
            ) : (
              <List />
            )}
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 transition">
              <Plus size={18} />
              New Chat
            </button>
          </div>
        </>
      )}
    </aside>
  );
};

export default Conversations;
