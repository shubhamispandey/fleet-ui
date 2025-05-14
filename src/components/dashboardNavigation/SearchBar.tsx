// components/SearchBar.tsx
"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string, category: "people" | "chats") => void;
  searchResults: Array<any>; // Adjust the type based on your data structure
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchResults }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"people" | "chats">("people");

  // Debounced search logic
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) onSearch(query, category);
    }, 500);
    return () => clearTimeout(handler);
  }, [query, category, onSearch]);

  // Select category and search
  const handleCategorySelect = (selectedCategory: "people" | "chats") => {
    setCategory(selectedCategory);
    if (query.trim()) onSearch(query, selectedCategory);
  };

  // Utility function to get placeholder icon
  const getCategoryPlaceholder = (icon = true) =>
    icon ? (
      <span className="flex items-center gap-2">
        {getIcon()} {category === "people" ? "People" : "Chats"}
      </span>
    ) : category === "people" ? (
      `People`
    ) : (
      `Chats`
    );

  const getIcon = () =>
    category === "people" ? (
      <i className="lni lni-user"></i>
    ) : (
      <i className="lni lni-comments"></i>
    );

  return (
    <div className="mx-auto relative">
      <div className="flex">
        {/* Dropdown Menu */}
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="flex items-center py-2.5 px-4 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 focus:ring-1 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600">
            {getCategoryPlaceholder()}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </MenuButton>

          <MenuItems className="absolute top-full mt-1 w-full max-w-48 bg-white divide-y divide-gray-100 rounded-lg overflow-hidden shadow dark:bg-gray-700">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => handleCategorySelect("people")}
                  className={`${
                    active || category === "people"
                      ? "bg-slate-100 dark:bg-gray-600"
                      : "hover:bg-gray-100 dark:hover:bg-gray-600"
                  } flex items-center gap-2 w-full px-4 py-2 text-sm dark:text-white`}
                >
                  <i className="lni lni-user"></i> People
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => handleCategorySelect("chats")}
                  className={`${
                    active || category === "chats"
                      ? "bg-slate-100 dark:bg-gray-600"
                      : "hover:bg-gray-100 dark:hover:bg-gray-600"
                  } flex items-center gap-2 w-full px-4 py-2 text-sm dark:text-white`}
                >
                  <i className="lni lni-comments"></i> Chats
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>

        {/* Search Input */}
        <input
          type="text"
          className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-slate-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none z-20"
          placeholder={`Search ${getCategoryPlaceholder(false)}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Search Results */}
      {query.trim() && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 dark:bg-gray-700 dark:border-gray-600">
          {searchResults.length > 0 ? (
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {searchResults.map((result, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    {category === "people" ? result.name : result.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 ">
              No {getCategoryPlaceholder(false)} found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
