"use client";

import React from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label = "Submit", className, ...props }) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      disabled={pending}
      className={`btn ${pending ? "btn-disabled loading" : "btn-primary"} ${className}`}
    >
      {pending ? "Loading..." : label}
    </button>
  );
};

export default SubmitButton;
