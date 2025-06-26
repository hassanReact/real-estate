"use client"
import store from '@/redux/store'
import { KindeProvider } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'
import {Provider} from "react-redux"

 function Providers({children}:{
    children:React.ReactNode
}) {
  return (
    <Provider store={store}  >
  <KindeProvider
          domain="https://zyckrealestate.kinde.com" // Replace with your Kinde domain
          clientId="0b529d71a0d849b49679faf2fe6e4458" // Replace with your client ID
        >

          {children}
          
        </KindeProvider>
          </Provider>
  )
}

export {Providers}
