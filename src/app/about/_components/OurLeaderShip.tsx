import Image from 'next/image';
import React from 'react';
import { FaLinkedinIn } from 'react-icons/fa';

const teamCard = [

    { img: "/S.bilal.jpg", passion: "Founder and CEO", name: "S.Bilal Ali Jafri", phone: "+92 337 330 1864", linkedin: 'https://www.linkedin.com/in/sbilalalijafri/' },
    { img: "/talhakhan.jpg", passion: "Co-Founder and CTO", name: "Talha Khan ", phone: "+92 342 263 0693", linkedin: 'https://www.linkedin.com/in/talha-khan-46177b13b/' },
    { img: "/unknown.jpeg", passion: "Senior Manager SEO", name: "Syed Sohaib", phone: "+92 335 262 2491", linkedin: 'https://www.linkedin.com/in/syed-sohaib-amir-860382261/' },
];

const OurLeadership = () => {
    return (
        <section id='our-leadership' className="text-gray-600 body-font">
            <div className="container px-5 py-16 mx-auto w-3/4">
                <h2 className="text-3xl font-semibold text-gray-100 mb-24">
                    Our Leadership
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto">
                    {teamCard.map((item, index) => (
                        <div
                            className="border-2 border-gray-200 border-opacity-60 rounded-md h-96 overflow-hidden"
                            key={index}
                        >
                            <Image
                                className="lg:h-48 md:h-36 w-full object-cover object-center"
                                width={500}
                                height={500}
                                src={item.img}
                                alt={item.passion}
                            />
                            <div className="p-6">
                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                    {item.passion}
                                </h2>
                                <h1 className="title-font text-lg font-medium text-gray-200 mb-3">
                                    {item.name}
                                </h1>
                                <p className="leading-relaxed mb-3">Phone: {item.phone}</p>
                                <a
                                    href={item.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-500 hover:text-blue-700"
                                >
                                    <FaLinkedinIn className="w-5 h-5 mr-2" />
                                    LinkedIn
                                </a>
                                <div className="flex items-center flex-wrap mt-4">
                                    <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                        <svg
                                            className="w-4 h-4 mr-1"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx={12} cy={12} r={3} />
                                        </svg>
                                        1.2K
                                    </span>
                                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                        <svg
                                            className="w-4 h-4 mr-1"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                        </svg>
                                        6
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurLeadership;
