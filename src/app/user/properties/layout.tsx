import AddPorpertyBtn from "@/components/custom/AddPorpertyBtn";
import Link from "next/link";
import React, { ReactNode } from "react";


const PropertiesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>

           {
        children
      }
      
    </div>
  );
};

export default PropertiesLayout;
