import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Work = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-14 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Column - Image */}
        <div className="relative">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/hyderabad.jpeg"
              width={800}
              height={500}
              alt="White cat with black spots in office"
              className="w-full h-[400px] object-cover"
            />
            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <h2 className="text-white text-2xl font-semibold">
                Working with Us
              </h2>
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-gray-200">
            Working with Us
          </h2>
          <p className="text-xl text-gray-200">
            Join a team that's inspired by creativity, collaboration, and innovation in everything we do.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Come build meaningful solutions, support each other, and push what's possible at ZYCK Property. From generating new ideas to celebrating successes, we cultivate a dynamic, inspiring work environment that helps everyone feel valued and empowered to deliver an impact every day.          
          </p>
          <div className="mt-8">
            <div className="text-lg font-medium text-gray-400 mb-4">
              Want to join our team?
            </div>
            <Link
              href="#"
              className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-green-700 transition-colors"
            >
              SEE OPEN POSITIONS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;