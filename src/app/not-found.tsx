import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center px-4 py-10 md:px-10 md:py-20 max-w-lg w-full">
        <h1 className="text-5xl font-extrabold mb-4 animate__animated animate__fadeIn">Oops! Page Not Found</h1>
        <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-1s">
          We couldn't find the page you're looking for.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 text-lg font-semibold text-[#008000] bg-white rounded-full shadow-lg transition-all hover:bg-pink-100 transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>

  );
};

export default NotFound;
