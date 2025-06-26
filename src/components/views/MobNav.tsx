"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { ChevronDown, ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"
// If you are using shadcn/ui, the correct import is:
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
// If this file does not exist, generate it using shadcn/ui CLI or create the components manually.

const MobNav = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [pagesOpen, setPagesOpen] = useState(false)
  const [listingsOpen, setListingsOpen] = useState(false)

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (href: string) => pathname === href

  return (
    <div>
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <button className="text-foreground focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              <span className="sr-only">Navigation Menu</span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-1 mt-6">
            <Link
              href="/"
              className={`py-3 px-2 text-lg font-semibold rounded-md transition-colors ${isActive("/") ? "text-green-500 bg-muted" : "hover:bg-muted"}`}
              onClick={closeMenu}
            >
              HOME
            </Link>

            {/* PAGES Dropdown */}
            <Collapsible open={pagesOpen} onOpenChange={setPagesOpen}>
              <CollapsibleTrigger className="flex justify-between items-center w-full py-3 px-2 text-lg font-semibold rounded-md hover:bg-muted transition-colors">
                <span>PAGES</span>
                {pagesOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4">
                <Link
                  href="/properties/sell"
                  className={`block py-2 px-2 rounded-md transition-colors ${isActive("/properties/sell") ? "text-green-500" : "hover:bg-muted"}`}
                  onClick={closeMenu}
                >
                  SELL
                </Link>
                <Link
                  href="/properties/buy"
                  className={`block py-2 px-2 rounded-md transition-colors ${isActive("/properties/buy") ? "text-green-500" : "hover:bg-muted"}`}
                  onClick={closeMenu}
                >
                  BUY
                </Link>
                <Link
                  href="/user/properties"
                  className={`block py-2 px-2 rounded-md transition-colors ${isActive("/user/properties") ? "text-green-500" : "hover:bg-muted"}`}
                  onClick={closeMenu}
                >
                  RENT
                </Link>
                <Link
                  href="/projects"
                  className={`block py-2 px-2 rounded-md transition-colors ${isActive("/projects") ? "text-green-500" : "hover:bg-muted"}`}
                  onClick={closeMenu}
                >
                  PROJECTS
                </Link>
                <Link
                  href="/agents"
                  className={`block py-2 px-2 rounded-md transition-colors ${isActive("/agents") ? "text-green-500" : "hover:bg-muted"}`}
                  onClick={closeMenu}
                >
                  AGENTS
                </Link>
                <Link
                  href="/agencies"
                  className={`block py-2 px-2 rounded-md transition-colors ${isActive("/agencies") ? "text-green-500" : "hover:bg-muted"}`}
                  onClick={closeMenu}
                >
                  AGENCIES
                </Link>
              </CollapsibleContent>
            </Collapsible>

            {/* LISTINGS Dropdown */}
            <Collapsible open={listingsOpen} onOpenChange={setListingsOpen}>
              <CollapsibleTrigger className="flex justify-between items-center w-full py-3 px-2 text-lg font-semibold rounded-md hover:bg-muted transition-colors">
                <span>LISTINGS</span>
                {listingsOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4">
                <Link
                  href="/listings/projects-signup"
                  className={`block py-2 px-2 rounded-md transition-colors ${isActive("/listings/projects-signup") ? "text-green-500" : "hover:bg-muted"}`}
                  onClick={closeMenu}
                >
                  Projects Signup
                </Link>
                <Link
                  href="/listings/agents-signup"
                  className={`block py-2 px-2 rounded-md transition-colors ${isActive("/listings/agents-signup") ? "text-green-500" : "hover:bg-muted"}`}
                  onClick={closeMenu}
                >
                  Agents Signup
                </Link>
                <Link
                  href="/listings/agencies-signup"
                  className={`block py-2 px-2 rounded-md transition-colors ${isActive("/listings/agencies-signup") ? "text-green-500" : "hover:bg-muted"}`}
                  onClick={closeMenu}
                >
                  Agencies Signup
                </Link>
              </CollapsibleContent>
            </Collapsible>

            <Link
              href="/about"
              className={`py-3 px-2 text-lg font-semibold rounded-md transition-colors ${isActive("/about") ? "text-green-500 bg-muted" : "hover:bg-muted"}`}
              onClick={closeMenu}
            >
              ABOUT US
            </Link>
            <Link
              href="/FAQs"
              className={`py-3 px-2 text-lg font-semibold rounded-md transition-colors ${isActive("/FAQs") ? "text-green-500 bg-muted" : "hover:bg-muted"}`}
              onClick={closeMenu}
            >
              FAQS
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobNav
