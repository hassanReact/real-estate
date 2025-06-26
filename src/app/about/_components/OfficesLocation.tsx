"use client"
import React, { useState } from 'react';

const OfficeLocations = () => {
  const [activeLocation, setActiveLocation] = useState<'Headquarter' | 'BufferZone'>('Headquarter');

  const locationContent: { [key in 'Headquarter' | 'BufferZone']: { text: string; inquiryType: string; email: string; mapUrl: string } } = {
    Headquarter: {
      text: "Our mission is to help people find a home and community where they can feel comfortable, meaningful, and attached to a place where they can come and make connections. Every day, we are working toward making the world more neighborly and connected.",
      inquiryType: "Press & Media Inquiries",
      email: "info@zyck.com",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7236.689130934655!2d67.07687209999999!3d24.9203292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f394a11b79f%3A0xe124ecf1bce27cd!2sQuran%20Accadmy%20A-One%20Cottages!5e0!3m2!1sen!2s!4v1737706784270!5m2!1sen!2s"
    },
    BufferZone: {
      text: "You can also visit our BufferZone office at [Address] where local experts are here to assist you in all your property needs in this vibrant and growing area.",
      inquiryType: "Vacancies Inquiries",
      email: "info@zyck.com",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14469.611876406734!2d67.06043435108244!3d24.952400895906376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb341a0f8a94187%3A0xfae77f0ad39a1726!2sBufferzone%20Gulshan%20E%20Waseem!5e0!3m2!1sen!2s!4v1737706663508!5m2!1sen!2s"
    }
  };

  const locations: { id: 'Headquarter' | 'BufferZone'; label: string }[] = [
    { id: 'Headquarter', label: 'Headquarter' },
    { id: 'BufferZone', label: 'BufferZone Office' }
  ];

  return (
    <section id='offices-location'>
    <div className="max-w-6xl mx-auto p-8">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-gray-100 mb-8">
        Offices Location
      </h2>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-8">
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => setActiveLocation(location.id)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeLocation === location.id
                ? 'bg-emerald-500 text-white'
                : 'text-gray-400 hover:bg-gray-100'
            }`}
          >
            {location.label}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Text Content */}
        <div className="space-y-6 flex flex-col justify-center">
          <p className="text-gray-100 leading-relaxed">
            {locationContent[activeLocation].text}
          </p>
          
          <div className="text-gray-100">
            {locationContent[activeLocation].inquiryType}:{' '}
            <a 
              href={`mailto:${locationContent[activeLocation].email}`}
              className="text-primary hover:underline"
            >
              {locationContent[activeLocation].email}
            </a>
          </div>
        </div>

        {/* Right Column - Map */}
        <div className="relative h-[400px] bg-gray-100 rounded-lg overflow-hidden">
          {/* Map Header */}
          <div className="absolute top-0 left-0 right-0 bg-gray-700 text-white p-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-2">
              <span>Real Estate</span>
              <span className="text-gray-400 text-sm">★</span>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-600 rounded">
                <ShareIcon className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-600 rounded">
                <ExpandIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Map Iframe */}
          <iframe
            src={locationContent[activeLocation].mapUrl}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
    </section>
  );
};

// Simple icon components
const ShareIcon = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const ExpandIcon = ({ className }: { className : string}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-2V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
  </svg>
);

export default OfficeLocations;