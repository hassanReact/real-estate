
"use client";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

interface Props {
  children : ReactNode
}
const Navbar = ({children} : Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="navbar bg-background px-10">
      {/* Navbar Start */}
      <div className="navbar-start">
        <Link href={"/"}>
          <Image src={"/logo.png"} width={150} height={150} alt="zyck" />
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/"}>HOME</Link>
          </li>
          <li>
            <details>
              <summary>LISTINGS</summary>
              <ul className="p-2 bg-background">
                <li>
                  <Link href={{
                    pathname: "/search",
                    query: {
                      type: "featured"
                    }
                  }}>
                    FEATURED
                  </Link>
                </li>
                <li>
                  <Link href={{
                    pathname: "/search",
                    query: {
                      type: "sale"
                    }
                  }} >
                    Sale
                  </Link>
                </li>
                <li>
                  <Link href={{
                    pathname: "/search",
                    query: {
                      type: "rent"
                    }
                  }} >
                    Rent
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link href={"/about"}>ABOUT US</Link>
          </li>

          <li>
            <Link href={"/FAQs"}>FAQS</Link>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end hidden lg:flex gap-2">
            {children}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="navbar-end gap-3 lg:hidden">
        <Button>
          <LoginLink>
          Sign In
          </LoginLink>
        </Button>
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </button>
      </div>

      {/* Side Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-black transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-20`}
      >
        <div className=" flex flex-col h-full p-6 space-y-4 text-white font-semibold relative">
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-0 text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Menu Links */}
          <Link href={"/"} onClick={toggleMenu}>
            HOME
          </Link>
          <details>
            <summary>LISTINGS</summary>
            <ul className="pl-4 space-y-2">
              <li>
                <Link href={{
                  pathname: "/search",
                  query: {
                    type: "featurd"
                  }
                }} onClick={toggleMenu}>
                  FEATURED
                </Link>
              </li>
              <li>
                <Link href={{
                  pathname: "/search",
                  query: {
                    type: "sale"
                  }
                }} onClick={toggleMenu}>
                  Sale
                </Link>
              </li>
              <li>
                <Link href={{
                  pathname: "/search",
                  query: {
                    type: "rent"
                  }
                }} onClick={toggleMenu}>
                  Rent
                </Link>
              </li>

            </ul>
          </details>

          <Link href={"/contact"} onClick={toggleMenu}>
            CONTACT
          </Link>
          <Link href={"/about"} onClick={toggleMenu}>
            ABOUT US
          </Link>
          <Link href={"/FAQs"} onClick={toggleMenu}>
            FAQS
          </Link>
          <Button onClick={toggleMenu}>
            <Link href={"/"}>Add Property</Link>
          </Button>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black opacity-50 z-10"
        />
      )}
    </div>
  );
};

export default Navbar;

