"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Building2, MapPin, FileCheck, Phone, X, ImageIcon, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs"
import type { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import Image from "next/image"
import { uploadImages } from "@/lib/upload" // Using the correct import path

const formSchema = z.object({
  // Basic Information
  name: z.string().min(3, "Agency name must be at least 3 characters"),
  tagline: z.string().optional(),
  establishedYear: z.string(),
  agencyType: z.enum(["RESIDENTIAL", "COMMERCIAL", "BOTH"]),

  // Location
  officeAddress: z.string().min(5, "Office address is required"),
  areasCovered: z.array(z.string()).min(1, "Select at least one area"),

  // Contact
  phoneNumber: z.string().min(5, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().url().optional().or(z.string().length(0)),

  // Social Media
  socialMedia: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
  }),

  // Business Details
  registrationNumber: z.string().optional(),
  license: z.string().optional(),
  totalAgents: z.string(),
  servicesOffered: z.array(z.string()).min(1, "Select at least one service"),
  totalListings: z.string(),
  propertyTypes: z.array(z.string()).min(1, "Select at least one property type"),
  exclusive: z.boolean().optional().default(false),
  listingLink: z.string().url().optional().or(z.string().length(0)),

  // Ratings
  responseTime: z.enum(["WITHIN_HOURS", "SAME_DAY", "WITHIN_DAYS"]),
  overallRating: z.string().optional(),

  // Images
  logo: z.string().url("Please provide a valid logo URL").optional(),
  businessCertificate: z.string().url("Please provide a valid certificate URL").optional(),

  // Property Details
  propertyDetails: z.array(z.string()).min(1, "Select at least one property type detail"),

  // Other
  testimonials: z
    .array(
      z.object({
        name: z.string(),
        comment: z.string(),
        rating: z.number(),
      }),
    )
    .optional()
    .default([]),
  verificationStatus: z.enum(["PENDING", "VERIFIED"]).default("PENDING"),
})

const propertyTypeOptions = [
  { id: "HOME", label: "Home" },
  { id: "PLOTS", label: "Plots" },
  { id: "COMMERCIAL", label: "Commercial" },
  { id: "CO_WORK_SPACE", label: "Co-working Space" },
]

const propertyTypeDetailsOptions = [
  { id: "House", label: "House" },
  { id: "Flat", label: "Flat" },
  { id: "Upper_Portion", label: "Upper Portion" },
  { id: "Lower_Portion", label: "Lower Portion" },
  { id: "Farm_House", label: "Farm House" },
  { id: "Room", label: "Room" },
  { id: "Penthouse", label: "Penthouse" },
  { id: "Residential_Plot", label: "Residential Plot" },
  { id: "Commercial_Plot", label: "Commercial Plot" },
  { id: "Agriculture_Land", label: "Agriculture Land" },
  { id: "Industrial_Land", label: "Industrial Land" },
  { id: "Plot_File", label: "Plot File" },
  { id: "PLot_Form", label: "Plot Form" },
  { id: "Office", label: "Office" },
  { id: "Shop", label: "Shop" },
  { id: "Factory", label: "Factory" },
  { id: "Warehouse", label: "Warehouse" },
  { id: "Building", label: "Building" },
  { id: "Other", label: "Other" },
  { id: "Office_Room", label: "Office Room" },
  { id: "Software_House", label: "Software House" },
]

const areaOptions = [
  { id: "KARACHI", label: "Karachi" },
  { id: "LAHORE", label: "Lahore" },
  { id: "ISLAMABAD", label: "Islamabad" },
  { id: "RAWALPINDI", label: "Rawalpindi" },
  { id: "PESHAWAR", label: "Peshawar" },
]

const serviceOptions = [
  { id: "BUY_SELL", label: "Buy/Sell" },
  { id: "RENTAL", label: "Rental" },
  { id: "INVESTMENT", label: "Investment" },
  { id: "MARKETING", label: "Marketing" },
]

export default function AddAgency() {
  const [formData, setFormData] = useState<any>(null)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null)
  const [isLogoUploading, setIsLogoUploading] = useState(false)
  const [isCertificateUploading, setIsCertificateUploading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tagline: "",
      establishedYear: new Date().getFullYear().toString(),
      agencyType: "BOTH",
      officeAddress: "",
      areasCovered: [],
      phoneNumber: "",
      email: "",
      website: "",
      socialMedia: {
        facebook: "",
        instagram: "",
        linkedin: "",
      },
      registrationNumber: "",
      license: "",
      totalAgents: "1",
      servicesOffered: [],
      totalListings: "0",
      propertyTypes: [],
      propertyDetails: [],
      exclusive: false,
      listingLink: "",
      responseTime: "SAME_DAY",
      overallRating: "0",
      logo: "",
      businessCertificate: "",
      testimonials: [],
      verificationStatus: "PENDING",
    },
  })

  const userId = useSelector((state: RootState) => state.auth.user?.id)

  // Handle logo upload
  const handleLogoUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) return

      setIsLogoUploading(true)
      const file = e.target.files[0]

      try {
        // Use the uploadImages function to upload to storage
        const imageUrls = await uploadImages([file])

        if (imageUrls && imageUrls.length > 0) {
          const logoUrl = imageUrls[0]
          setLogoUrl(logoUrl)
          form.setValue("logo", logoUrl)
        }

        // Clear the input
        e.target.value = ""
      } catch (error) {
        console.error("Error uploading logo:", error)
      } finally {
        setIsLogoUploading(false)
      }
    },
    [form],
  )

  // Handle certificate upload
  const handleCertificateUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) return

      setIsCertificateUploading(true)
      const file = e.target.files[0]

      try {
        // Use the uploadImages function to upload to storage
        const imageUrls = await uploadImages([file])

        if (imageUrls && imageUrls.length > 0) {
          const certUrl = imageUrls[0]
          setCertificateUrl(certUrl)
          form.setValue("businessCertificate", certUrl)
          toast.success("Business certificate uploaded successfully")
        }

        // Clear the input
        e.target.value = ""
      } catch (error) {
        console.error("Error uploading certificate:", error)
        toast.error("Failed to upload certificate. Please try again.")
      } finally {
        setIsCertificateUploading(false)
      }
    },
    [form],
  )

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Format the data to match the expected JSON structure
    try {
      const formattedData = {
        id: userId,
        ...values,
        // Make sure logo and businessCertificate are included
        logo: values.logo || null,
        businessCertificate: values.businessCertificate || null,
        // Convert string numbers to actual numbers
        establishedYear: values.establishedYear,
        totalAgents: values.totalAgents,
        totalListings: values.totalListings,
        overallRating: values.overallRating || "0",
        // Include property details
        propertyDetails: values.propertyDetails || [],
      }

      // Log to console for debugging
      console.log("Form Data:", JSON.stringify(formattedData, null, 2))
      const loadingToast = toast.loading("Registering your agency...")

      // Here you would typically send the data to your API
      const response = await fetch("/api/agency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      })

      if (!response.ok) {
        console.error("Response status:", response.status)
        try {
          const errorText = await response.text()
          console.error("Error response:", errorText)
        } catch (e) {
          console.error("Could not parse error response")
        }
      }

      // Update toast based on response
      toast.dismiss(loadingToast)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Error Status ${response.status}` }))
        console.error("API Error:", errorData)
        toast.error(errorData.message || `Failed to register Agency (Status: ${response.status})`)
        return
      }

      const responseData = await response.json()
      console.log("API Response:", responseData)
      toast.success("Agency Registered Successfully")

      // Redirect to a success page or dashboard
      router.push("/")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("An unexpected error occurred. Please try again.")
    }
  }

  const { isAuthenticated } = useKindeAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth")
    }
  }, [isAuthenticated, router])
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div
        className="relative h-[300px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Register Your Agency</h1>
              <p className="text-xl text-gray-200">Join our platform and connect with potential clients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <p className="text-gray-600 text-center">
              Complete the form below with accurate details about your real estate agency
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Basic Agency Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Agency Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Premier Real Estate" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tagline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tagline (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Your Dream Home Awaits" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="establishedYear"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Established Year</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="agencyType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Agency Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="RESIDENTIAL">Residential</SelectItem>
                                  <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                                  <SelectItem value="BOTH">Both</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Logo Upload */}
                    <div className="space-y-4">
                      <FormLabel>Agency Logo</FormLabel>
                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-[200px] bg-gray-50">
                        {logoUrl ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={logoUrl || "/placeholder.svg"}
                              alt="Agency Logo"
                              width={200}
                              height={200}
                              className="object-contain mx-auto h-full"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setLogoUrl(null)
                                form.setValue("logo", "")
                              }}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <label
                            htmlFor="logo-upload"
                            className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                          >
                            <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Upload your agency logo</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                            <Input
                              id="logo-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleLogoUpload}
                              disabled={isLogoUploading}
                            />
                          </label>
                        )}
                        {isLogoUploading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location & Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="officeAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Office Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your complete office address"
                            className="min-h-[80px] bg-white text-gray-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="areasCovered"
                    render={() => (
                      <FormItem>
                        <FormLabel>Areas Covered</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {areaOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="areasCovered"
                              render={({ field }) => {
                                return (
                                  <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.id])
                                            : field.onChange(field.value?.filter((value) => value !== option.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{option.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., +924201234567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="e.g., contact@agency.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., https://www.youragency.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator className="my-4" />

                  <h3 className="text-md font-medium mb-2">Social Media (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="socialMedia.facebook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facebook</FormLabel>
                          <FormControl>
                            <Input placeholder="Facebook URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="socialMedia.instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram</FormLabel>
                          <FormControl>
                            <Input placeholder="Instagram URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="socialMedia.linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input placeholder="LinkedIn URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Business Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5" />
                    Business Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="registrationNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Registration Number (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., REA-2023-12345" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="license"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>License Details (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Real Estate License #12345" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="totalAgents"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Total Agents</FormLabel>
                              <FormControl>
                                <Input type="number" min="1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="totalListings"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Total Listings</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Business Certificate Upload */}
                    <div className="space-y-4">
                      <FormLabel>Business Certificate (Optional)</FormLabel>
                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-[200px] bg-gray-50">
                        {certificateUrl ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={certificateUrl || "/placeholder.svg"}
                              alt="Business Certificate"
                              width={200}
                              height={200}
                              className="object-contain mx-auto h-full"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setCertificateUrl(null)
                                form.setValue("businessCertificate", "")
                              }}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <label
                            htmlFor="certificate-upload"
                            className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                          >
                            <FileText className="h-12 w-12 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Upload business certificate</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 5MB</p>
                            <Input
                              id="certificate-upload"
                              type="file"
                              accept="image/*,.pdf"
                              className="hidden"
                              onChange={handleCertificateUpload}
                              disabled={isCertificateUploading}
                            />
                          </label>
                        )}
                        {isCertificateUploading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <FormField
                    control={form.control}
                    name="servicesOffered"
                    render={() => (
                      <FormItem>
                        <FormLabel>Services Offered</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {serviceOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="servicesOffered"
                              render={({ field }) => {
                                return (
                                  <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.id])
                                            : field.onChange(field.value?.filter((value) => value !== option.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{option.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="propertyTypes"
                    render={() => (
                      <FormItem>
                        <FormLabel>Property Types Handled</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {propertyTypeOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="propertyTypes"
                              render={({ field }) => {
                                return (
                                  <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.id])
                                            : field.onChange(field.value?.filter((value) => value !== option.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{option.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Property Type Details */}
                  <FormField
                    control={form.control}
                    name="propertyDetails"
                    render={() => (
                      <FormItem>
                        <FormLabel>Property Type Details</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {propertyTypeDetailsOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="propertyDetails"
                              render={({ field }) => {
                                return (
                                  <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.id])
                                            : field.onChange(field.value?.filter((value) => value !== option.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{option.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="exclusive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Exclusive Listings</FormLabel>
                            <p className="text-sm text-gray-500">Check if you offer exclusive listings</p>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="responseTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Response Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select response time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="WITHIN_HOURS">Within Hours</SelectItem>
                              <SelectItem value="SAME_DAY">Same Day</SelectItem>
                              <SelectItem value="WITHIN_DAYS">Within Days</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="listingLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Listing Link (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., https://www.yourwebsite.com/listings" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Register Agency
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
