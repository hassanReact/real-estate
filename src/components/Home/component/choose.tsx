import React from 'react';
import { IoDocumentsSharp, IoHomeOutline } from "react-icons/io5";
import { FaCalculator } from 'react-icons/fa';
import { BsPersonSquare } from "react-icons/bs";
const ChooseUs = () => {
  return (
    <div className='p-10 md:py-20 bg-foreground text-background'>
      <h2 className='text-2xl text-center  md:text-3xl lg:text-4xl font-bold '>Why Choose ZYCK Property?</h2>
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5  mt-10 max-w-7xl">
        {/* Section 1 */}
        <div className="border-t-2 border-primary p-8 sm:p-10 w-full flex gap-2    hover:bg-primary  hover:bg-opacity-50">
          <BsPersonSquare size={30} className='w-36' />
          <div>

            <h3 className="mb-3 text-xl md:text-2xl font-semibold">
              Wide Range of Listings
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              Find apartments, houses, and rentals with ZYCK Property—cozy apartments, luxurious villas, and more options nationwide.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="border-t-2 border-primary p-8 sm:p-10 flex gap-2  w-full   hover:bg-primary  hover:bg-opacity-50">
          <IoDocumentsSharp size={30} className='w-36' />
          <div>
            <h3 className="mb-3 text-xl md:text-2xl font-semibold">
              Trusted Expertise
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              ZYCK Property strives for transparency and reliability, using expert guidance to guide you in your real estate choices with confidence.
            </p>
          </div>
        </div>
        <div className="border-t-2 border-primary p-8 sm:p-10 flex gap-2  w-full  hover:bg-primary hover:bg-opacity-50">
          <FaCalculator size={30} className='w-36' />
          <div>
            <h3 className="mb-3 text-xl md:text-2xl font-semibold">
              User-friendly platform
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
            Navigate easily through our user-friendly website to find exactly what you are looking for. Use advanced search filters, interactive maps, and detailed property profiles to make your journey easier. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
