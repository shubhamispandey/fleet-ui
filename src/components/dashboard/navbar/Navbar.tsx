"use client";

import { useState } from "react";
import { RootState } from "@/redux/store";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { UsersType } from "@/types";
import useDashboard from "@/hooks/useDashboard";
import {
  Bell,
  LogOut,
  Settings,
  User,
  Menu as LucideMenu,
  X,
} from "lucide-react";

export default function Navbar() {
  const session = useSession();
  const user = useSelector((state: RootState) => state.users.user.data);
  const [searchResults, setSearchResults] = useState<UsersType>({
    loading: false,
    data: [],
    error: null,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { handleSearchNavbar } = useDashboard();

  const handleSignOut = () => {
    signOut();
    localStorage.clear();
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <LucideMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Logo and search */}
          <div className="flex flex-1 items-center justify-between md:justify-start">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                alt="Company Logo"
                src="/img/landing/logo/logo-color-square.svg"
                className="h-8 w-auto"
                width={32}
                height={32}
                priority
              />
            </Link>

            {/* Search - Hidden on mobile */}
            <div className="hidden md:block md:ml-6 md:flex-1 md:max-w-md lg:max-w-xl">
              <SearchBar
                onSearch={(query, category) =>
                  handleSearchNavbar(query, category, setSearchResults)
                }
                searchResults={searchResults.data}
                isLoading={searchResults.loading}
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center">
            {/* Notifications */}
            <button
              type="button"
              className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none relative"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="flex rounded-full bg-gray-100 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full overflow-hidden relative">
                    <Image
                      alt="User profile"
                      src={
                        session.data?.user?.image ||
                        `/img/avatars/${user?.avatar || "default.webp"}`
                      }
                      className="object-cover"
                      fill
                      sizes="32px"
                    />
                  </div>
                </MenuButton>
              </div>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-1 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-1 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-200 dark:border-gray-700">
                  <div className="py-1">
                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          href="/profile"
                          className={`${
                            focus ? "bg-gray-100 dark:bg-gray-700" : ""
                          } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                        >
                          <div className="flex items-center gap-2">
                            <User className="text-gray-500 w-4 h-4" />
                            Your Profile
                          </div>
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          href="/settings"
                          className={`${
                            focus ? "bg-gray-100 dark:bg-gray-700" : ""
                          } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                        >
                          <div className="flex items-center gap-2">
                            <Settings className="text-gray-500 w-4 h-4" />
                            Settings
                          </div>
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) => (
                        <button
                          onClick={handleSignOut}
                          className={`${
                            focus ? "bg-gray-100 dark:bg-gray-700" : ""
                          } w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2`}
                        >
                          <LogOut className="text-gray-500 w-4 h-4" />
                          Sign out
                        </button>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Transition
        show={mobileMenuOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-1 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-1 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-2">
            <SearchBar
              onSearch={(query, category) =>
                handleSearchNavbar(query, category, setSearchResults)
              }
              searchResults={searchResults.data}
              isLoading={searchResults.loading}
            />
          </div>
        </div>
      </Transition>
    </nav>
  );
}
