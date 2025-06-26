import Image from 'next/image';
import React from 'react';
import Heading from './Heading';

const cities = [
  { name: "Karachi", image: "/Karachi.jpg" },
  { name: "Lahore", image: "/Lahore.jpeg" },
  { name: "Islamabad", image: "/Islamabd.jpg" },
  { name: "Peshawar", image: "/Peshawar.jpg" },
  { name: "Quetta", image: "/quetta.jpeg" },
  { name: "Hyderabad", image: "/hyderabad.jpeg" },
];

const Cities = () => {
  return (
    
    <div>
      <Heading title="Properties By Cities"/>
    <div className="w-full px-4 sm:px-10 lg:w-4/5 my-10 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            {/* Image Container */}
            <div className="relative w-full h-64">
              <Image
                src={city.image}
                alt={city.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-md"
              />
            </div>
            {/* City Information */}
            <div className="p-4 bg-green-600 text-center">
              <h3 className="text-lg font-bold">{city.name}</h3>
              <p className="">Explore properties in {city.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Cities;
