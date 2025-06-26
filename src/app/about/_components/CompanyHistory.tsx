import Image from 'next/image'
import React from 'react'
import BlogWidget from './SocialButton'

const CompanyHistory = () => {
  return (
    <section id="company-history" className="text-gray-600 body-font overflow-y-hidden mt-5">
      <div className="container flex flex-col md:flex-row items-center px-[5%] ">
        {/* Image Section */}
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full mb-10 md:mb-0">
          <h2 className="text-3xl font-semibold text-gray-100 mb-24">
            Company History
          </h2>
          <Image
            width={600}
            height={100}
            className="object-cover object-center rounded w-full h-auto"
            alt="hero"
            src="/about-1.jpg"
          />
        </div>

        {/* Content Section */}
        <div className="lg:flex-grow md:w-1/2 w-full lg:pl-24 md:pl-16 flex flex-col items-center md:items-start text-center md:text-left">
          <Image
            className="mb-6"
            src="/logo.png"
            width={200}
            height={80}
            alt="About-Zyck"
          />
          <p className="title-font text-lg sm:text-xl md:text-xl mb-5 font-semibold text-white">
            At ZYCK Property, we believe finding the right property is not just about a house but rather about finding a space that matches your lifestyle, values, and dreams, where community, convenience, and quality come together to create a true sense of home.
          </p>
          <p className="mb-8 text-gray-100 leading-relaxed">
            That is why we go beyond the typical listings, by sourcing insights
            straight from locals and offering over 34 neighborhood map overlays, to
            give people a deeper understanding of what living in a home and
            neighborhood is really like.
          </p>
          <p className="mb-8 text-gray-100 leading-relaxed">
            Our mission is to help people find a place where they can build meaningful connections and feel truly at home, fostering a stronger sense of community and belonging. Every day, we work to create a more neighborly and connected world.
          </p>
          <div className="flex justify-center">
            <div className="inline-flex py-2 px-6 rounded text-lg">
              <BlogWidget />
            </div>
          </div>
        </div>
      </div>
    </section>


  )
}

export default CompanyHistory
