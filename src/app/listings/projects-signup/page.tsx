"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Building2, MapPin, Home, Camera, FileCheck, Phone, Plus, Trash2, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import DataDisplay from "./data-display"
import { useRouter } from "next/navigation"
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs"
import type { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import Image from "next/image"
import { uploadImages } from "@/lib/upload" // Using the correct import path

const formSchema = z.object({
  // Basic Information
  name: z.string().min(3, "Project name must be at least 3 characters"),
  developerName: z.string().min(3, "Developer name must be at least 3 characters"),
  projectType: z.enum(["RESIDENTIAL", "COMMERCIAL", "MIXED_USE"]),
  projectStatus: z.enum(["ONGOING", "COMPLETED", "UPCOMING"]),
  launchDate: z.string(),
  expectedCompletion: z.string(),

  // Location
  city: z.string().min(2, "City name is required"),
  area: z.string().min(2, "Area name is required"),
  googleMapsLink: z.string().url().optional().or(z.string()),
  nearbyLandmarks: z.string(),

  // Property Details
  availableUnits: z.array(z.string()).min(1, "Select at least one property type"),
  sizesAndLayouts: z.string(),
  minPrice: z.string(),
  maxPrice: z.string(),
  paymentPlan: z.enum(["INSTALLMENTS", "FULL_PAYMENT", "BOTH"]),

  // Amenities
  basicAmenities: z.array(z.string()),
  luxuryFeatures: z.array(z.string()),
  nearbyFacilities: z.string(),

  // Legal
  governmentApprovals: z.array(z.string()),
  registrationDetails: z.string(),

  // Contact
  developerPhone: z.string(),
  authorizedAgents: z
    .array(
      z.object({
        email: z.string().email(),
        phone: z.string(),
      }),
    )
    .optional()
    .default([]),
  bookingProcedure: z.string(),
  projectImages: z
    .array(
      z.object({
        url: z.string().url("Please provide a valid image URL"),
        description: z.string().optional(),
      }),
    )
    .optional()
    .default([]),
})

const propertyTypeOptions = [
  { id: "APARTMENTS", label: "Apartments" },
  { id: "VILLAS", label: "Villas" },
  { id: "PLOTS", label: "Plots" },
  { id: "SHOPS", label: "Shops" },
  { id: "OFFICES", label: "Offices" },
]

const amenityOptions = [
  { id: "24/7 Security", label: "24/7 Security" },
  { id: "Underground Electricity", label: "Underground Electricity" },
  { id: "Water Filtration Plant", label: "Water Filtration Plant" },
  { id: "Sewerage System", label: "Sewerage System" },
  { id: "Waste Management", label: "Waste Management" },
]

const luxuryFeatureOptions = [
  { id: "Olympic-size Swimming Pool", label: "Swimming Pool" },
  { id: "State-of-the-art Gym", label: "Gym" },
  { id: "Community Clubhouse", label: "Community Center" },
  { id: "Landscaped Parks", label: "Parks" },
  { id: "Jogging Tracks", label: "Jogging Tracks" },
  { id: "Children's Play Area", label: "Children's Play Area" },
]

const approvalOptions = [
  { id: "LDA Approved", label: "LDA Approved" },
  { id: "RERA Registered", label: "RERA Registered" },
  { id: "Environmental Clearance", label: "Environmental Clearance" },
]

export default function AddProject() {
  const [formData, setFormData] = useState<any>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      developerName: "",
      projectType: "RESIDENTIAL",
      projectStatus: "UPCOMING",
      launchDate: "",
      expectedCompletion: "",
      city: "",
      area: "",
      googleMapsLink: "",
      nearbyLandmarks: "",
      availableUnits: [],
      sizesAndLayouts: "",
      minPrice: "",
      maxPrice: "",
      paymentPlan: "INSTALLMENTS",
      basicAmenities: [],
      luxuryFeatures: [],
      nearbyFacilities: "",
      governmentApprovals: [],
      registrationDetails: "",
      developerPhone: "",
      authorizedAgents: [{ email: "", phone: "" }],
      bookingProcedure: "",
      projectImages: [],
    },
  })

  const userId = useSelector((state: RootState) => state.auth.user?.id)

  const [uploadedImages, setUploadedImages] = useState<Array<{ url: string; description: string }>>([])
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) return

      setIsUploading(true)
      const files = Array.from(e.target.files)

      try {
        // Use the uploadImages function to upload to Supabase
        const imageUrls = await uploadImages(files)

        // Create new image objects with the returned URLs
        const newImages = imageUrls.map((url: string) => ({ url, description: "" }))

        // Add the new images to the state
        setUploadedImages((prev) => [...prev, ...newImages])

        // Update the form value
        const currentImages = form.getValues("projectImages") || []
        form.setValue("projectImages", [...currentImages, ...newImages])

        // Clear the input
        e.target.value = ""

        toast.success(`${files.length} image${files.length > 1 ? "s" : ""} uploaded successfully`)
      } catch (error) {
        console.error("Error uploading images:", error)
        toast.error("Failed to upload images. Please try again.")
      } finally {
        setIsUploading(false)
      }
    },
    [form],
  )

  const removeImage = useCallback(
    (index: number) => {
      setUploadedImages((prev) => prev.filter((_, i) => i !== index))

      const currentImages = form.getValues("projectImages") || []
      form.setValue(
        "projectImages",
        currentImages.filter((_, i) => i !== index),
      )
    },
    [form],
  )

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Format the data to match the expected JSON structure
    try {
      const formattedData = {
        id: userId,
        ...values,
        priceRange: {
          minPrice: Number(values.minPrice),
          maxPrice: Number(values.maxPrice),
        },
        // Format the project images to match the expected API format
        // The API expects either a string or ProjectCreateimagesInput
        images: values.projectImages.map((image) => image.url),
        // Remove fields that aren't in the final JSON
        minPrice: undefined,
        maxPrice: undefined,
        projectImages: undefined,
        // Convert dates to ISO format if needed
        launchDate: new Date(values.launchDate).toISOString(),
        expectedCompletion: new Date(values.expectedCompletion).toISOString(),
      }

      // Just store the data in state
      setFormData(formattedData)

      // Log to console for debugging
      console.log("Form Data:", formattedData)
      const loadingToast = toast.loading("Registering your project...")

      // Here you would typically send the data to your API
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      })

      // Update toast based on response
      toast.dismiss(loadingToast)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Error Status ${response.status}` }))
        console.error("API Error:", errorData)
        toast.error(errorData.message || `Failed to register Project (Status: ${response.status})`)
        return
      }

      const responseData = await response.json()
      console.log("API Response:", responseData)
      toast.success("Project Registered Successfully")
      router.push("/")
    } catch (error) {
      console.error("Error submitting form:", error)
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
            'url("https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">List Your Project</h1>
              <p className="text-xl text-gray-200">Share your property project with potential buyers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <p className="text-gray-600 text-center">
              Complete the form below with accurate details about your property project
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Basic Project Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Emerald Heights Residency" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="developerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Developer Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Prestige Developers Ltd." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="RESIDENTIAL">Residential</SelectItem>
                              <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                              <SelectItem value="MIXED_USE">Mixed Use</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="projectStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select project status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ONGOING">Ongoing</SelectItem>
                              <SelectItem value="COMPLETED">Completed</SelectItem>
                              <SelectItem value="UPCOMING">Upcoming</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="launchDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Launch Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="expectedCompletion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Completion</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Location Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Karachi, Lahore, Islamabad" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area</FormLabel>
                          <FormControl>
                            <Input placeholder="DHA, Gulshan, Johar" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="googleMapsLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Maps Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Google Maps Link" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nearbyLandmarks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nearby Landmarks</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter nearby landmarks"
                            className="min-h-[100px] bg-white text-gray-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Property Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Property Types & Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="availableUnits"
                    render={() => (
                      <FormItem>
                        <FormLabel>Available Units</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {propertyTypeOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="availableUnits"
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
                    name="sizesAndLayouts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Sizes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter available sizes (e.g., 5 Marla to 2 Kanal plots, 1500-5000 sq ft apartments)"
                            className="bg-white text-gray-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="minPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Starting Price (PKR)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter starting price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="maxPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Price (PKR)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter maximum price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="paymentPlan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Plan</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment plan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="INSTALLMENTS">Installments Only</SelectItem>
                            <SelectItem value="FULL_PAYMENT">Full Payment Only</SelectItem>
                            <SelectItem value="BOTH">Both Options Available</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Features & Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Features & Amenities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="basicAmenities"
                    render={() => (
                      <FormItem>
                        <FormLabel>Basic Amenities</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {amenityOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="basicAmenities"
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
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={form.control}
                    name="luxuryFeatures"
                    render={() => (
                      <FormItem>
                        <FormLabel>Luxury Features</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {luxuryFeatureOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="luxuryFeatures"
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
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nearbyFacilities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nearby Facilities</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter nearby facilities (e.g., Lahore American School (2km), Shaukat Khanum Hospital (5km))"
                            className="min-h-[100px] bg-white text-gray-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Legal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5" />
                    Legal & Approval Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="governmentApprovals"
                    render={() => (
                      <FormItem>
                        <FormLabel>Government/NOC Approvals</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {approvalOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="governmentApprovals"
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
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="registrationDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter registration details (e.g., Registered with Punjab Housing Authority under File No. PHA-2024-5678)"
                            className="min-h-[100px] bg-white text-gray-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Project Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Project Images
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <FormLabel>Upload Property Images</FormLabel>
                    <div className="flex items-center gap-4">
                      <label
                        htmlFor="image-upload"
                        className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-6 w-6 text-gray-500 mb-2" />
                          <p className="text-xs text-gray-500">Upload Image</p>
                        </div>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                        />
                      </label>

                      {isUploading && (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                          <span>Uploading...</span>
                        </div>
                      )}
                    </div>

                    {uploadedImages.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Uploaded Images</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {uploadedImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square relative overflow-hidden rounded-lg border">
                                <Image
                                  src={image.url || "/placeholder.svg"}
                                  alt={`Project image ${index + 1}`}
                                  width={200}
                                  height={200}
                                  className="object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-4 w-4" />
                              </button>
                              <FormField
                                control={form.control}
                                name={`projectImages.${index}.description`}
                                render={({ field }) => (
                                  <FormItem className="mt-1">
                                    <FormControl>
                                      <Input placeholder="Image description" className="text-xs" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-gray-500 mt-2">
                      Upload high-quality images of your property. Recommended size: 1200x800px.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="developerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Developer Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., +924201234567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Authorized Agents */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Authorized Agents</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const currentAgents = form.getValues("authorizedAgents") || []
                          form.setValue("authorizedAgents", [...currentAgents, { email: "", phone: "" }])
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Agent
                      </Button>
                    </div>

                    {form.watch("authorizedAgents")?.map((_, index) => (
                      <div key={index} className="space-y-4 p-4 border rounded-md">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Agent {index + 1}</h4>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const currentAgents = form.getValues("authorizedAgents")
                                form.setValue(
                                  "authorizedAgents",
                                  currentAgents.filter((_, i) => i !== index),
                                )
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`authorizedAgents.${index}.email`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="agent@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`authorizedAgents.${index}.phone`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="+923331234567" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <FormField
                    control={form.control}
                    name="bookingProcedure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Booking Procedure</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter booking procedure details (e.g., 20% down payment at booking, remaining in 8 quarterly installments)"
                            className="min-h-[100px] bg-white text-gray-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Submit Project
                </Button>
              </div>
            </form>
          </Form>

          {/* Display submitted data */}
          {formData && <DataDisplay data={formData} />}
        </div>
      </div>
    </div>
  )
}
