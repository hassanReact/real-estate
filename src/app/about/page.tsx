import Heading from '@/components/views/Heading'
import React from 'react'
import AboutNavbar from './_components/AboutNavbar'
import CompanyHistory from './_components/CompanyHistory'
import OurLeaderShip from './_components/OurLeaderShip'
import OfficeLocations from './_components/OfficesLocation'
import WorkingwithUs from './_components/WorkingwithUs'

const page = () => {
  return (
    <div className='overflow-x-hidden'>
      <div style={{
        backgroundImage: "url(/about.jpg)",
      }}>
        <div className='bg-blue-900 bg-opacity-60'>
          <div >
          <Heading title='About Us' />
          </div>
        </div>
      </div>
      <AboutNavbar/>
      <CompanyHistory/>
      <OurLeaderShip/>
      <OfficeLocations/>
      <WorkingwithUs/>
    </div>
  )
}

export default page