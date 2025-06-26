import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center items-center w-full min-h-screen bg-cover bg-center' style={{backgroundImage: 'url(/bg-login.jpeg)'}}>
        <div className='bg-white rounded-lg shadow-md p-8 max-w-md w-full'>
            <h1 className='text-3xl font-bold text-center mb-4 text-green-700'>Sign Up</h1>
            <p className='text-sm text-center mb-6 text-gray-500'>Register Your Account.</p>
            
            <div className='flex flex-col gap-3'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <input type="text" placeholder='First Name' className='w-full text-black pl-5 pr-5 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300' />
                <input type="text" placeholder='Last Name' className='w-full text-black px-5 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300' />
                </div>
                <input type="text" placeholder='Email' className='w-full text-black px-5 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300' />
                <input type="password" placeholder='Password' className='w-full text-black px-5 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300' />
                <input type="password" placeholder='Conform Password' className='w-full text-black px-5 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300' />
                {/* <button className='w-full bg-green-500 text-white hover:bg-green-600 rounded-lg py-2 transition duration-200'> */}
                  <RegisterLink>
                  Create your account
                  </RegisterLink>

                  {/* </button> */}
                <button className='w-full flex gap-1 justify-center items-center bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 transition duration-200 '>
                    <Image src={'/google.webp'} width={30} height={20} alt='' />
                    Sign Up With Google</button>
            </div>
        </div>

      
    </div>
  )
}

export default page
