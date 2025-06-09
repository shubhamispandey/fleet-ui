"use client";

import { useState, useEffect, useRef } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  Search,
  User,
  MessageSquare,
  ChevronDown,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import useDashboard from "@hooks/useDashboard";
import { UsersType } from "../../../types";

interface SearchBarProps {
  onSearch: (query: string, category: "people" | "chats") => void;
  searchResults: UsersType;
}

const SearchBar = ({ onSearch, searchResults }: SearchBarProps) => {
  const { handleSelectUser } = useDashboard();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"people" | "chats">("people");
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) onSearch(query, category);
    }, 300);
    return () => clearTimeout(handler);
  }, [query, category, onSearch]);

  // Hide results on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setQuery("");
      }
    }
    if (query.trim())
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [query]);

  const handleCategorySelect = (selectedCategory: "people" | "chats") => {
    setCategory(selectedCategory);
    if (query.trim()) onSearch(query, selectedCategory);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl md:mx-4">
      <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent">
        {/* Category Dropdown */}
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl overflow-hidden text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors w-32">
            {category === "people" ? (
              <User className="text-indigo-500 w-5 h-5" />
            ) : (
              <MessageSquare className="text-indigo-500 w-5 h-5" />
            )}
            <span className="inline">
              {category === "people" ? "People" : "Chats"}
            </span>
            <ChevronDown className="text-gray-400 w-4 h-4" />
          </MenuButton>

          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-1 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-1 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute sm:fixed left-0 sm:left-0 sm:right-0 mt-2 sm:top-16 w-56 sm:w-full origin-top-left bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-200 dark:border-gray-700">
              <div className="py-1">
                <MenuItem>
                  {({ focus }) => (
                    <button
                      onClick={() => handleCategorySelect("people")}
                      className={`${
                        focus || category === "people"
                          ? "bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400"
                          : "text-gray-700 dark:text-gray-200"
                      } flex items-center gap-2 w-full px-4 py-2 text-sm`}
                    >
                      <User className="text-indigo-500 w-5 h-5" />
                      People
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      onClick={() => handleCategorySelect("chats")}
                      className={`${
                        focus || category === "chats"
                          ? "bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400"
                          : "text-gray-700 dark:text-gray-200"
                      } flex items-center gap-2 w-full px-4 py-2 text-sm`}
                    >
                      <MessageSquare className="text-indigo-500 w-5 h-5" />
                      Chats
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>

        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-3 border-0 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 focus:border-transparent focus:outline-none sm:text-sm"
            placeholder={`Search ${
              category === "people" ? "people" : "chats"
            }...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Search Results */}
      {query.trim() && (
        <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700 overflow-hidden">
          {searchResults.loading ? (
            <div className="p-4 flex justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-500"></div>
            </div>
          ) : searchResults.data.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
              {searchResults.data.map((result) => {
                const { _id, avatar, email, name, isVerified, status } = result;
                const avatarUrl = `/img/avatars/${avatar || "user.webp"}`;
                const isOnline = status === "online";
                return (
                  <li key={_id} className="cursor-pointer">
                    <button
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                      onClick={() => {
                        setQuery("");
                        handleSelectUser(result);
                      }}
                    >
                      <div className="flex-shrink-0 relative">
                        <Image
                          className="h-10 w-10 rounded-full object-cover"
                          src={avatarUrl}
                          alt={name}
                          width={40}
                          height={40}
                        />
                        {/* Online/Offline Dot */}
                        <span
                          className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white dark:ring-gray-800 ${
                            isOnline ? "bg-green-500" : "bg-gray-400"
                          }`}
                          title={isOnline ? "Online" : "Offline"}
                        ></span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {category === "people" ? email : ""}
                        </p>
                      </div>
                      {isVerified && (
                        // Tick bold icon for verified users
                        <div className="flex-shrink-0" title="Verified User">
                          <CheckCircle className="text-green-500 w-5 h-5" />
                        </div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No {category} found for &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
