import Image from 'next/image';
import React from 'react';

const cities = [
  { name: "Karachi", image: "/Karachi.jpg" },
  { name: "Lahore", image: "/Lahore.jpeg" },
  { name: "Islamabad", image: "/Islamabd.jpg" },
  { name: "Peshawar", image: "/Peshawar.jpg" },
  { name: "Quetta", image: "/quetta.jpeg" },
];

const Cities = () => {
  return (

    <div>
      <div className="w-full px-4 sm:px-10 lg:w-4/5 my-10 mx-auto" >
        <div className="px-6 py-12 sm:px-10 sm:py-16">
          <h2 className="text-2xl  md:text-3xl lg:text-4xl font-bold ">
            Properties by Cities
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">

          <div

            className=" rounded-md shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 "
          >
            {/* Image Container */}
            <div className=" relative w-full h-64 ">
              <Image
                src={cities[0].image}
                alt={cities[0].name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-md  "
              />
              <div className="  flex bg-black  p-4 absolute bg-opacity-30 h-full w-full  text-white text-center flex-col justify-end items-center">
                <h3 className="text-lg font-bold">{cities[0].name}</h3>
                <p className="">14 Properties</p>
              </div>
            </div>
          </div>
          {/* City Information */}
          <div

            className=" rounded-md shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 "
          >
            {/* Image Container */}
            <div className=" relative w-full h-64 ">
              <Image
                src={cities[1].image}
                alt={cities[1].name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-md  "
              />
              <div className="  flex bg-black  p-4 absolute bg-opacity-30 h-full w-full  text-white text-center flex-col justify-end items-center">
                <h3 className="text-lg font-bold">{cities[1].name}</h3>
                <p className="">14 Properties</p>
              </div>
            </div>
            {/* City Information */}
          </div>

        </div>


        <div className="grid grid-cols-1  md:grid-cols-3 gap-6">

          <div

            className=" rounded-md shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 "
          >
            {/* Image Container */}
            <div className=" relative w-full h-64 ">
              <Image
                src={cities[3].image}
                alt={cities[3].name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-md  "
              />
              <div className="  flex bg-black  p-4 absolute bg-opacity-30 h-full w-full  text-white text-center flex-col justify-end items-center">
                <h3 className="text-lg font-bold">{cities[3].name}</h3>
                <p className="">14 Properties</p>
              </div>
            </div>
            {/* City Information */}
          </div>
          <div

            className=" rounded-md shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 "
          >
            {/* Image Container */}
            <div className=" relative w-full h-64 ">
              <Image
                src={cities[4].image}
                alt={cities[4].name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-md  "
              />
              <div className="  flex bg-black  p-4 absolute bg-opacity-30 h-full w-full  text-white text-center flex-col justify-end items-center">
                <h3 className="text-lg font-bold">{cities[4].name}</h3>
                <p className="">14 Properties</p>
              </div>
            </div>
            {/* City Information */}
          </div>
          <div

            className=" rounded-md shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 "
          >
            {/* Image Container */}
            <div className=" relative w-full h-64 ">
              <Image
                src={cities[2].image}
                alt={cities[2].name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-md  "
              />
              <div className="  flex bg-black  p-4 absolute bg-opacity-30 h-full w-full  text-white text-center flex-col justify-end items-center">
                <h3 className="text-lg font-bold">{cities[2].name}</h3>
                <p className="">14 Properties</p>
              </div>
            </div>
            {/* City Information */}
          </div>



        </div>
      </div>
    </div>
  );
};

export default Cities;
