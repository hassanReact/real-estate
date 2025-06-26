"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { updateProfile } from "@/lib/actions/user/updateProfile"
import { ProfilePageSkeleton } from "./skeleton/ProfileSkeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { toast } from "react-toastify"
import { redirect } from "next/navigation"

const provinceCityMap: Record<string, string[]> = {
  "Sindh": [
    "Karachi",
    "Hyderabad",
    "Sukkur",
    "Larkana",
    "Mirpur Khas",
    "Nawabshah",
    "Jacobabad",
    "Shikarpur",
    "Dadu",
    "Thatta",
    "Badin",
    "Tando Adam",
    "Tando Allahyar",
    "Khairpur",
    "Kotri"
  ],
  "Punjab": [
    "Lahore",
    "Multan",
    "Faisalabad",
    "Rawalpindi",
    "Gujranwala",
    "Sialkot",
    "Bahawalpur",
    "Sargodha",
    "Sheikhupura",
    "Gujrat",
    "Sahiwal",
    "Jhelum",
    "Rahim Yar Khan",
    "Kasur",
    "Okara",
    "Wah Cantonment",
    "Dera Ghazi Khan",
    "Chiniot",
    "Kamoke",
    "Hafizabad"
  ],
  "Khyber Pakhtunkhwa": [
    "Peshawar",
    "Abbottabad",
    "Mardan",
    "Mingora",
    "Kohat",
    "Dera Ismail Khan",
    "Swabi",
    "Nowshera",
    "Bannu",
    "Charsadda",
    "Mansehra",
    "Tank",
    "Chitral",
    "Hangu",
    "Karak"
  ],
  "Balochistan": [
    "Quetta",
    "Gwadar",
    "Turbat",
    "Khuzdar",
    "Chaman",
    "Sibi",
    "Zhob",
    "Pishin",
    "Loralai",
    "Mastung",
    "Kalat",
    "Dera Murad Jamali",
    "Hub",
    "Dera Allah Yar",
    "Nushki"
  ],
  "Gilgit-Baltistan": [
    "Gilgit",
    "Skardu",
    "Hunza",
    "Chilas",
    "Ghizer",
    "Aliabad",
    "Yasin",
    "Gahkuch",
    "Khaplu",
    "Shigar",
    "Astore",
    "Danyore",
    "Juglot",
    "Karimabad",
    "Nagar"
  ]
};

const profileSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth)
  const [isLoading, setIsLoading] = useState(true)
  const [availableCities, setAvailableCities] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phoneNumber: "",
      address: "",
      city: "",
      province: "",
    },
  })

  const selectedProvince = watch("province")

  useEffect(() => {
    if (user) {
      setValue("phoneNumber", user.phoneNumber || "")
      setValue("address", user.streetAddress || "")
      setValue("city", user.city || "")
      setValue("province", user.province || "")
      setIsLoading(false)
    }
  }, [user, setValue])

  useEffect(() => {
    if (selectedProvince) {
      setAvailableCities(provinceCityMap[selectedProvince] || [])
      setValue("city", "") // Reset city when province changes
    }
  }, [selectedProvince, setValue])

  const onSubmit = async (data: ProfileFormData) => {
    const response = await updateProfile(data)

    if (response.success) {
      toast.success("Updated")
      redirect('/user/properties/add')

    } else {
      toast.error("Some thing When Wrong")
    }
  }

  if (isLoading) return <ProfilePageSkeleton />

  return (    <div className="min-h-screen  bg-zinc-900 text-white">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <Avatar className="h-24 w-24 rounded-3xl">
            <AvatarImage className="rounded-full" src={user?.avatarUrl || ""} alt="User Avatar" />
            <AvatarFallback>{user?.firstName.slice(0,1)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">{user?.firstName } {user?.lastName}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" placeholder="Enter your phone number" {...register("phoneNumber")} />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="province">Province</Label>
              <Controller
                name="province"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a province" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(provinceCityMap).map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.province && <p className="text-red-500 text-sm">{errors.province.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value} disabled={!selectedProvince}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address"> Complete Address
              </Label>
              <Input id="address" placeholder="House No., Street No, Area" {...register("address")} />
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>
          </div>
          <Button type="submit" className="w-full md:w-auto">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  )
}
