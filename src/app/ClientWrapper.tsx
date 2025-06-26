// app/ClientWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/views/Navbar";
import Footer from "@/components/views/Footer";
import SignInPanel from "@/components/ui/SignInPanel";
import React from "react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const loginPage =
    pathname === "/auth" || pathname === "/register" || pathname === "/forgot-password";

  return (
    <>
      {!loginPage && (
        <Navbar>
          <SignInPanel />
        </Navbar>
      )}
      {children}
      {!loginPage && <Footer />}
    </>
  );
}
