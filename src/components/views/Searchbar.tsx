import React, { useState } from "react"; // Import useState for state management
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import Select components from ShadCN
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Searchbar() {
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  return (
    <Tabs defaultValue="BUY" className="w-full">
      {/* Tabs List */}
      <TabsList className="w-full flex items-center justify-around">
        <TabsTrigger value="BUY" className="text-sm">
          BUY
        </TabsTrigger>
        <TabsTrigger value="SELL" className="text-sm">
          RENT
        </TabsTrigger>
        <TabsTrigger value="RENT" className="text-sm">
          PROJECTS
        </TabsTrigger>

        {/* Arrow Down Dropdown */}
        <div className="relative flex items-center ml-2 md:hidden">
          {/* Dropdown Toggle */}
          <button
            className="flex items-center justify-center p-2 text-sm text-white"
            onClick={() => setShowDropdown((prev) => !prev)}
            aria-label="Toggle Dropdown"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          </button>

          {/* Dropdown Content */}
          {showDropdown && (
            <div
              className="absolute top-full -left-24 mt-2 w-max bg-gray-500 border border-gray-200 rounded-md shadow-md z-10"
              style={{ minWidth: "150px" }} // Ensure dropdown width doesn't break responsiveness
            >
              <TabsTrigger
                value="CO-WORK SPACE"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)} // Close dropdown on selection
              >
                AGENTS
              </TabsTrigger>
              <TabsTrigger
                value="PROJECT"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)} // Close dropdown on selection
              >
                AGENCIES
              </TabsTrigger>
            </div>
          )}
        </div>

        {/* Full Tabs on Larger Screens */}
        <TabsTrigger value="CO-WORK SPACE" className="hidden md:block text-sm">
          AGENTS
        </TabsTrigger>
        <TabsTrigger value="PROJECT" className="hidden md:block text-sm">
          AGENCIES
        </TabsTrigger>
      </TabsList>

      {/* Tabs Content */}
      {["BUY", "SELL", "RENT", "CO-WORK SPACE", "PROJECT"].map((tab) => (
        <TabsContent key={tab} value={tab}>
          <Card className="w-full max-w">
            <CardContent className="w-full flex flex-col p-2 bg-background text-white gap-3">
              {/* Search Input */}
              {/* <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="plot">Plot</SelectItem>
                </SelectContent>
              </Select> */}
              <div className="flex gap-2 justify-center items-center">
              <label htmlFor="">City</label>
              <Input placeholder="Karachi, Lahore, Islamabad" />
              </div>
              <div className="flex gap-2 justify-center items-center">
              <label htmlFor="">Areas</label>
              <Input placeholder="DHA, Gulshan, Johar" />
              </div>
              {/* <Input
                id={`${tab.toLowerCase()}-search`}
                placeholder="Search"
                className="w-full"
              /> */}

              {/* Search Button */}
              
              <Link href={'/properties/buy'}>
              <Button className="w-full" >Search</Button>
              
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
