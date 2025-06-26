import Link from 'next/link'
import React from 'react'

const AboutNavbar = () => {
  return (

      <nav>
      <div className="flex justify-center items-center flex-wrap p-5">
        <div className="flex justify-center items-center w-36 border-b border-primary">
          <Link
            href={"#company-history"}
            className="w-36 p-5 bg-black text-white text-md transition-all font-medium hover:bg-green-700 text-center duration-300"
          >
            Company History
          </Link>
        </div>
        <div className="flex justify-center items-center w-36 ">
          <Link
            href={"#our-leadership"}
            className="w-36 p-5 bg-black text-white text-md font-medium hover:bg-green-700 transition-colors text-center duration-300"
          >
            Our Leadership
          </Link>
        </div>
        <div className="flex justify-center items-center w-36">
          <Link
            href={"#offices-location"}
            className="w-36 p-5 bg-black text-white text-md font-medium hover:bg-green-700 transition-colors text-center duration-300"
          >
            Offices Location
          </Link>
        </div>
        <div className="flex justify-center items-center w-36">
          <Link
            href={"#working-with-us"}
            className="w-36 p-5 bg-black text-white text-md font-medium hover:bg-green-700 transition-colors text-center duration-300"
          >
            Working with Us
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default AboutNavbar
