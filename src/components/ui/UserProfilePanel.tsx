"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { User as PrismaUser } from "@prisma/client";
import Link from "next/link";
import * as React from "react";
import Image from "next/image";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserType } from "@/redux/reducer/authSlice";

interface Props {
  user: UserType;
}


const UserProfilePanel = ({ user }: Props) => {
  return (
   <div className="flex items-center gap-1">
   <DropdownMenu>
      {/* Trigger button */}

      <DropdownMenuTrigger className="flex items-center gap-2 w-10 rounded-full">
      
        <Image
          src={user.avatarUrl || "/profile.png"}
          alt={`${user.firstName} ${user.lastName}`}
          width={40}
          height={40}
          className="rounded-full"
        />
      
        
      </DropdownMenuTrigger>

      {/* Dropdown menu */}
      <DropdownMenuContent className="dropdown-content menu p-2 shadow rounded-box w-52 bg-background text-foreground">
      <DropdownMenuItem>
          <Link href="/user/profile" className="text-lg ">
            {user.firstName} {user.lastName}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/user/profile" className="text-lg ">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/user/properties/add" className="text-lg ">
            Add Property
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/user/properties" className="text-lg">
            Properties
          </Link>
        </DropdownMenuItem>
        {user.isAdmin &&   <DropdownMenuItem>
          <Link href="http://localhost:3001" className="text-lg">
            Admin Panel
          </Link>
        </DropdownMenuItem>}
        <DropdownMenuItem>
          <LogoutLink className="text-lg text-red-500">
            Log Out
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
   
   
   </div>
   
   
  );
};

export default UserProfilePanel;
