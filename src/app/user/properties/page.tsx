"use client"
import { useState } from "react"
import PropertyTable from "./_components/PropertiesTable"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import ProfileCompletionDialog from "@/components/custom/ProfileCompelteDialog"
import { redirect } from "next/navigation"

const PropertiesPage = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddProperty = () => {
    if (!user?.ProfileComplete) {
      setIsDialogOpen(true)
    } else {
      redirect('/user/properties/add')
    }
  }

  return (
    <div className="h-full w-full mb-64">
      <div className="bg-green-500 flex justify-between items-center p-2">
        <h2 className="text-white text-xl font-semibold px-2">User Properties</h2>
        <div>
          <button onClick={handleAddProperty} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
            Add Property
          </button>
        </div>
      </div>
      <PropertyTable />
      <ProfileCompletionDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  )
}

export default PropertiesPage

