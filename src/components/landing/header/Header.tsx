"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef<null | HTMLDivElement>(null);
  const navbarLogoRef = useRef<null | HTMLImageElement>(null);
  const [activeMenu, setActiveMenu] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const navbar = navbarRef.current as HTMLDivElement | null;
      const navbarLogo = navbarLogoRef.current as HTMLImageElement | null;
      if (navbar && navbarLogo) {
        if (window.scrollY > navbar.offsetTop) {
          navbar.classList.add(styles.sticky);
          navbarLogo.src = "/img/landing/logo/logo-color.svg";
        } else {
          navbar.classList.remove(styles.sticky);
          navbarLogo.src = "/img/landing/logo/logo-white.svg";
        }
      }
      const splittedPath = window.location.href.split("/#");
      setActiveMenu(splittedPath.length > 1 ? splittedPath[1] : "home");
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeMenu]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Control body overflow based on menu state
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "visible";
    // Cleanup body overflow when component unmounts
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isMenuOpen]);

  const renderMenuItem = (href: string, label: string, active: boolean) => {
    const activeClasses = `after:w-[100%] after:rounded-sm`;
    const hoverClasses = `after:w-0 hover:after:w-full hover:transition-all hover:duration-700 hover:text-[#5e69ff] md:hover:text-slate-200`;

    return (
      <li className="h-10">
        <Link
          href={href}
          className={`after:bottom-1 text-slate-900 md:text-slate-100 h-full flex items-center justify-center w-full relative after:content-[''] md:after:bottom-3 after:left-0 after:bg-yellow-500 after:h-1 after:absolute transition ${
            active ? activeClasses : ""
          } ${hoverClasses}`}
        >
          {label}
        </Link>
      </li>
    );
  };

  return (
    <header
      className="w-full top-0 left-0 transition-all duration-300 relative z-10 bg-transparent"
      ref={navbarRef}
      id="#navbar"
    >
      <div className="container mx-auto">
        <nav className="flex items-center justify-between py-5">
          <Link href="/" passHref>
            <Image
              ref={navbarLogoRef}
              src="/img/landing/logo/logo-white.svg"
              alt="logo"
              width={100}
              height={100}
              priority={true}
            />
          </Link>

          <ul
            id="nav"
            className={`fixed top-0 h-screen w-72 gap-2 bg-gray-100 transition-all duration-300 p-7 flex flex-col text-lg ${
              isMenuOpen ? "left-0" : "-left-full"
            } md:flex md:flex-row md:h-auto md:top-0 md:left-0 md:items-center md:gap-8 md:static md:opacity-100 md:w-auto md:bg-transparent md:p-0`}
          >
            {renderMenuItem("#home", "Home", activeMenu === "home")}
            {renderMenuItem("#features", "Features", activeMenu === "features")}
            {renderMenuItem("/engage", "Participate", false)}
            {renderMenuItem("/dashboard", "Dashboard", false)}
            <li className="h-10 mt-auto mx-auto">
              <button
                onClick={() => router.push("/login")}
                className="bg-[#5e69ff] text-white md:bg-white rounded-md md:text-primary py-3 px-4 gap-2 leading-4 flex items-center md:mx-0"
              >
                <i className="lni lni-google"></i> Sign In
              </button>
            </li>
          </ul>

          <button
            className="w-10 h-10 text-xl rounded-sm flex items-center justify-center bg-white text-slate-900 md:hidden"
            onClick={handleMenuToggle}
          >
            <i className="lni lni-menu"></i>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
