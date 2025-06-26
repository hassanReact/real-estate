import React from "react";
import { MdRealEstateAgent } from "react-icons/md";// Import Button from shadcn/ui
import PartnerSlider from "../PartnerSlider";

const PartnersSection = () => {
  return (
    <section>
        {/* headersection */}
        <div className="bg-primary text-foreground flex items-center justify-around p-5 md:p-10 ">
         <div className="flex  gap-2 items-center">
            <MdRealEstateAgent size={30}  className=""/> 
            <h1 className="lg:text-3xl md:text-2xl text-xl font-bold  ">Become A Real Estate Agent</h1>
            </div> 
            <button className=" py-4 px-8 border border-black hover:bg-foreground hover:text-black">
            

                Register Now
                
                </button>   
    
        </div>

        {/* partner section */}
        <PartnerSlider/>
     
    </section>
  );
};

export default PartnersSection;
