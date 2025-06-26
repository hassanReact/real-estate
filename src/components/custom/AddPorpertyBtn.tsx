'use client'
import { RootState } from '@/redux/store'
import { redirect } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function AddPorpertyBtn() {


    const {user} = useSelector((state:RootState)=>state.auth)
    const   handleAddProperty  = ()=>{
   
        if(!user?.ProfileComplete){
            toast.error("plz complete your profile")
            redirect('/user/profile')
        }else{
            redirect('/user/properties/add')
        }

    }


  return (
    <div>
              <button onClick={handleAddProperty} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                Add Property
              </button> 
    </div>
  )
}

export default AddPorpertyBtn
