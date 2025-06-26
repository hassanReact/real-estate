"use client";
import Link from "next/link";
import React, { ReactNode, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import MobNav from "./MobNav";

interface Props {
  children: ReactNode;
}

const Navbar = ({ children }: Props) => {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string>(pathname);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isListingsOpen, setIsListingsOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const listingsTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT US" },
    { href: "/FAQs", label: "FAQS" },
  ];

  const isActive = (href: string) => activePath === href;

  // Handle hover for "PAGES" dropdown
  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setIsDropdownOpen(false), 200);
  };

  // Handle hover for "LISTINGS" dropdown
  const handleListingsEnter = () => {
    if (listingsTimeout.current) clearTimeout(listingsTimeout.current);
    setIsListingsOpen(true);
  };

  const handleListingsLeave = () => {
    listingsTimeout.current = setTimeout(() => setIsListingsOpen(false), 200);
  };

  return (
    <div className="navbar bg-background lg:px-10 px-4">
      {/* Navbar for Small Screens */}
      <div className="flex w-full lg:hidden items-center justify-between">
        <MobNav />
        <div className="flex justify-center">
          <Link href="/">
            <Image className="lg:w-28 md:w-28 sm:w-20" src="/logo.png" width={150} height={150} alt="zyck" />
          </Link>
        </div>
        <div>{children}</div>
      </div>

      {/* Navbar for Large Screens */}
      <div className="hidden lg:flex w-full justify-around">
        {/* Navbar Start */}
        <div className="navbar-start">
          <Link href="/">
            <Image src="/logo.png" width={150} height={150} alt="zyck" />
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1">
            {navLinks.map((link) => {
              if (link.label === "HOME") {
                return (
                  <React.Fragment key={link.href}>
                    {/* Render HOME tab */}
                    <li>
                      <Link href={link.href} className={isActive(link.href) ? "text-green-500 font-bold" : ""}>
                        {link.label}
                      </Link>
                    </li>

                    {/* Render PAGES dropdown */}
                    <li className="relative z-[10000]" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                      <span className="cursor-pointer">PAGES</span>
                      {isDropdownOpen && (
                        <ul className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md w-40 flex flex-col">
                          <li><Link href="/properties/sell" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">SELL</Link></li>
                          <li><Link href="/properties/buy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">BUY</Link></li>
                          <li><Link href="/user/properties" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">RENT</Link></li>
                          {/* <li><Link href="/co-workspace" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">CO-WORK SPACE</Link></li> */}
                          <li><Link href="/projects" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">PROJECTS</Link></li>
                          <li><Link href="/agents" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">AGENTS</Link></li>
                          <li><Link href="/agencies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">AGENCIES</Link></li>
                        </ul>
                      )}
                    </li>

                    {/* FIXED LISTINGS DROPDOWN */}
                    <li className="relative z-[10000]" onMouseEnter={handleListingsEnter} onMouseLeave={handleListingsLeave}>
                      <span className="cursor-pointer">LISTINGS</span>
                      {isListingsOpen && (
                        <ul className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md w-40 flex flex-col">
                          <li><Link href="/listings/projects-signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Projects Signup</Link></li>
                          <li><Link href="/listings/agents-signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Agents Signup</Link></li>
                          <li><Link href="/listings/agencies-signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Agencies Signup</Link></li>
                        </ul>
                      )}
                    </li>
                  </React.Fragment>
                );
              }
              return (
                <li key={link.href}>
                  <Link href={link.href} className={isActive(link.href) ? "text-green-500 font-bold" : ""}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="flex navbar-end justify-end">{children}</div>
      </div>
    </div>
  );
};

export default Navbar;