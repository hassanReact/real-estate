import React from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
const Heroend = () => {
  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: "url(/bg.jpg)" }}
    >
      <div className="mx-auto flex flex-wrap justify-evenly gap-5 p-5 md:py-20 mt-10 max-w-7xl">
        {/* Section 1 */}
        <div className="bg-blue-900 bg-opacity-90 p-8 sm:p-10 w-full md:w-5/12 flex gap-2  text-white ">
          <HiOutlineMagnifyingGlass size={30} className='w-36' />
          <div>

            <h2 className="mb-3 text-xl md:text-2xl font-semibold">
              Searching for Your Dream Home?
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              Find your dream home effortlessly with ZYCK Property—stylish apartments, family homes, and luxury retreats.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-blue-900 bg-opacity-90 p-8 sm:p-10 flex gap-2  w-full md:w-5/12  text-white ">
          <IoHomeOutline size={30} className='w-36' />
          <div>
            <h2 className="mb-3 text-xl md:text-2xl font-semibold">
              Ready to Sell Your Home?
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
            Sell your home fast with ZYCK Property—expert guidance, wide reach, and seamless platform support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heroend;
