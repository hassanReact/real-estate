import React from 'react'
import { Searchbar } from './Searchbar'


const Hero = () => {
  
  return (
    <>
    <div
    className="hero min-h-screen"
    style={{
      backgroundImage: "url(/background.jpg)",
    }}>
    <div className="hero-overlay bg-opacity-60 "></div>
    <div className="hero-content text-center text-white">
      <div className="max-w-md">
        <h1 className="mb-5 text-4xl font-bold">The Best Way To</h1>
        <h1 className="mb-5 text-5xl font-bold">Find Your Dream Home.</h1>
       <Searchbar/>
      </div>
    </div>
  </div>
    </>
  )
}

export default Hero