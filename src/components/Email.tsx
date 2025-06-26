"use client";
import React, {useState} from "react";
import styles from "../app/page.module.css";
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function EmailInput() {
    const [email, setEmail] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    return (
        <div className='flex gap-3'>
            <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={handleEmailChange}
                className='w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300'
            />
            <LoginLink
                authUrlParams={{
                    connection_id: process.env.NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_PASSWORDLESS!,
                    login_hint: email
                }}
                className='w-[18%] p-3 bg-green-500 hover:bg-green-600 rounded-md'
            >
                NEXT
            </LoginLink>
        </div>
    );
}