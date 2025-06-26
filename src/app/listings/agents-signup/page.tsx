"use client"

import type React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Building2, MapPin, User, FileCheck, Phone, Briefcase, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs"
import { useEffect, useState, useCallback } from "react"
import { toast } from "react-toastify"
import Image from "next/image"
import { uploadImages } from "@/lib/upload" // Import the upload function

// Enums matching the Prisma schema
const Specialization = {
  RESIDENTIAL: "RESIDENTIAL",
  COMMERCIAL: "COMMERCIAL",
  PLOTS: "PLOTS",
  PROJECTS: "PROJECTS",
} as const

const ServiceType = {
  BUY_SELL: "BUY_SELL",
  RENTAL: "RENTAL",
  INVESTMENT: "INVESTMENT",
  MARKETING: "MARKETING",
} as const

const VerificationStatus = {
  VERIFIED: "VERIFIED",
  PENDING: "PENDING",
} as const

// Form schema aligned with the Prisma model
const formSchema = z.object({
  // Basic Agent Information
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  profilePicture: z.string().optional(),
  agentType: z.string().min(1, "Agent type is required"),
  experience: z.string().min(1, "Experience is required"),
  specialization: z.array(z.nativeEnum(Specialization)).min(1, "Select at least one specialization"),

  // Contact Details
  phoneNumber: z.string().min(10, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  officeAddress: z.string().optional(),

  // Social Media Links
  facebook: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),

  // Business Details
  agencyName: z.string().optional(),
  agencyLogo: z.string().optional(),
  agencyRegNumber: z.string().optional(),
  areasCovered: z.array(z.string()).min(1, "Select at least one area"),

  // Services Offered
  servicesOffered: z.array(z.nativeEnum(ServiceType)).min(1, "Select at least one service"),

  // Listings & Ratings
  totalListings: z.number().min(0, "Must be a positive number"),
  listingLink: z.string().url().optional().or(z.literal("")),
  testimonials: z.string(),
  overallRating: z.number().min(0).max(5),
  responseTime: z.string(),

  // Verification & Approvals
  cnicVerification: z.boolean().default(false),
  licenseCertificate: z.string().optional(),
})

const specializationOptions = [
  { id: Specialization.RESIDENTIAL, label: "Residential" },
  { id: Specialization.COMMERCIAL, label: "Commercial" },
  { id: Specialization.PLOTS, label: "Plots" },
  { id: Specialization.PROJECTS, label: "Projects" },
]

const areaOptions = [
  { id: "dha_karachi", label: "DHA Karachi" },
  { id: "bahria_town", label: "Bahria Town" },
  { id: "gulshan", label: "Gulshan" },
  { id: "clifton", label: "Clifton" },
  { id: "johar", label: "Johar" },
  { id: "model_town", label: "Model Town" },
]

const serviceOptions = [
  { id: ServiceType.BUY_SELL, label: "Buying & Selling Assistance" },
  { id: ServiceType.RENTAL, label: "Rental Services" },
  { id: ServiceType.INVESTMENT, label: "Investment Consultation" },
  { id: ServiceType.MARKETING, label: "Project Marketing" },
]

export default function AgentSignUp() {
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)
  const [agencyLogoPreview, setAgencyLogoPreview] = useState<string | null>(null)
  const [licensePreview, setLicensePreview] = useState<string | null>(null)
  const [isProfileUploading, setIsProfileUploading] = useState(false)
  const [isAgencyLogoUploading, setIsAgencyLogoUploading] = useState(false)
  const [isLicenseUploading, setIsLicenseUploading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      profilePicture: "",
      agentType: "",
      experience: "",
      specialization: [],
      phoneNumber: "",
      email: "",
      officeAddress: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      agencyName: "",
      agencyLogo: "",
      agencyRegNumber: "",
      areasCovered: [],
      servicesOffered: [],
      totalListings: 0,
      listingLink: "",
      testimonials: "",
      overallRating: 0,
      responseTime: "",
      cnicVerification: false,
      licenseCertificate: "",
    },
  })

  // Handle profile picture upload
  const handleProfileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) return

      setIsProfileUploading(true)
      const file = e.target.files[0]

      try {
        // Use the uploadImages function to upload to storage
        const imageUrls = await uploadImages([file])

        if (imageUrls && imageUrls.length > 0) {
          const profileUrl = imageUrls[0]
          setProfileImagePreview(profileUrl)
          form.setValue("profilePicture", profileUrl)
          toast.success("Profile picture uploaded successfully")
        }

        // Clear the input
        e.target.value = ""
      } catch (error) {
        console.error("Error uploading profile picture:", error)
        toast.error("Failed to upload profile picture. Please try again.")
      } finally {
        setIsProfileUploading(false)
      }
    },
    [form],
  )

  // Handle agency logo upload
  const handleAgencyLogoUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) return

      setIsAgencyLogoUploading(true)
      const file = e.target.files[0]

      try {
        // Use the uploadImages function to upload to storage
        const imageUrls = await uploadImages([file])

        if (imageUrls && imageUrls.length > 0) {
          const logoUrl = imageUrls[0]
          setAgencyLogoPreview(logoUrl)
          form.setValue("agencyLogo", logoUrl)
          toast.success("Agency logo uploaded successfully")
        }

        // Clear the input
        e.target.value = ""
      } catch (error) {
        console.error("Error uploading agency logo:", error)
        toast.error("Failed to upload agency logo. Please try again.")
      } finally {
        setIsAgencyLogoUploading(false)
      }
    },
    [form],
  )

  // Handle license certificate upload
  const handleLicenseUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) return

      setIsLicenseUploading(true)
      const file = e.target.files[0]

      try {
        // Use the uploadImages function to upload to storage
        const imageUrls = await uploadImages([file])

        if (imageUrls && imageUrls.length > 0) {
          const licenseUrl = imageUrls[0]
          setLicensePreview(licenseUrl)
          form.setValue("licenseCertificate", licenseUrl)
          toast.success("License certificate uploaded successfully")
        }

        // Clear the input
        e.target.value = ""
      } catch (error) {
        console.error("Error uploading license certificate:", error)
        toast.error("Failed to upload license certificate. Please try again.")
      } finally {
        setIsLicenseUploading(false)
      }
    },
    [form],
  )

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Format the data to match the database schema
      const formattedData = {
        ...values,
        // Convert testimonials string to array
        testimonials: values.testimonials.split("\n").filter((t) => t.trim() !== ""),
        // Set default approval status
        approvalStatus: VerificationStatus.PENDING,
      }

      console.log("Form Submission Values:", formattedData)

      const loadingToast = toast.loading("Registering your agent...")

      // Here you would typically send the data to your API
      const response = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      })

      // Update toast based on response
      toast.dismiss(loadingToast)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Error Status ${response.status}` }))
        console.error("API Error:", errorData)
        toast.error(errorData.message || `Failed to register Agent (Status: ${response.status})`)
        return
      }

      const responseData = await response.json()
      console.log("API Response:", responseData)
      toast.success("Agent Registered Successfully")

      // Redirect to dashboard or success page
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
            'url("https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Agent Network</h1>
              <p className="text-xl text-gray-200">Sign up as a property agent and grow your business</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <p className="text-gray-600 text-center">
              Complete the form below with accurate details about your real estate practice
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Agent Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Basic Agent Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <FormField
                        control={form.control}
                        name="profilePicture"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Profile Picture</FormLabel>
                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 h-[150px] bg-gray-50">
                              {profileImagePreview ? (
                                <div className="relative w-full h-full flex items-center justify-center">
                                  <Image
                                    src={profileImagePreview || "/placeholder.svg"}
                                    alt="Profile preview"
                                    width={100}
                                    height={100}
                                    className="w-20 h-20 object-cover rounded-full border"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setProfileImagePreview(null)
                                      form.setValue("profilePicture", "")
                                    }}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <line x1="18" y1="6" x2="6" y2="18"></line>
                                      <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                  </button>
                                </div>
                              ) : (
                                <label
                                  htmlFor="profile-upload"
                                  className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                                >
                                  <User className="h-10 w-10 text-gray-400 mb-2" />
                                  <p className="text-sm text-gray-500">Upload profile picture</p>
                                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                                  <Input
                                    id="profile-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleProfileUpload}
                                    disabled={isProfileUploading}
                                  />
                                </label>
                              )}
                              {isProfileUploading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                </div>
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="agentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agent Type</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Residential Agent, Commercial Specialist" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 5+ Years in Real Estate" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialization"
                    render={() => (
                      <FormItem>
                        <FormLabel>Specialization</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                          {specializationOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="specialization"
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

              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (WhatsApp Preferred)</FormLabel>
                          <FormControl>
                            <Input placeholder="+92 333 1234567" {...field} />
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
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="officeAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Office Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your office address"
                            className="min-h-[100px] bg-white text-gray-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-4">
                    <p className="text-sm font-medium">Social Media Links</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="facebook"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facebook</FormLabel>
                            <FormControl>
                              <Input placeholder="https://facebook.com/profile" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="instagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Instagram</FormLabel>
                            <FormControl>
                              <Input placeholder="https://instagram.com/profile" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn</FormLabel>
                            <FormControl>
                              <Input placeholder="https://linkedin.com/in/profile" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Business Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="agencyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agency Name (if applicable)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., ABC Real Estate" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="agencyRegNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agency Registration Number (if any)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter registration number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="agencyLogo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agency Logo</FormLabel>
                          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 h-[150px] bg-gray-50">
                            {agencyLogoPreview ? (
                              <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                  src={agencyLogoPreview || "/placeholder.svg"}
                                  alt="Agency logo preview"
                                  width={100}
                                  height={100}
                                  className="w-32 h-auto object-contain border rounded p-1"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setAgencyLogoPreview(null)
                                    form.setValue("agencyLogo", "")
                                  }}
                                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <label
                                htmlFor="agency-logo-upload"
                                className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                              >
                                <Building2 className="h-10 w-10 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">Upload agency logo</p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                                <Input
                                  id="agency-logo-upload"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleAgencyLogoUpload}
                                  disabled={isAgencyLogoUploading}
                                />
                              </label>
                            )}
                            {isAgencyLogoUploading && (
                              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                              </div>
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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

              {/* Services Offered */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Services Offered
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="servicesOffered"
                    render={() => (
                      <FormItem>
                        <FormLabel>Services</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
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
                </CardContent>
              </Card>

              {/* Listings Managed */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Listings Managed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="totalListings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Active Listings</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 25"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="listingLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link to Listings</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/your-listings" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Customer Reviews & Ratings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Customer Reviews & Ratings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="testimonials"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Testimonials (one per line)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter testimonials from your clients (one per line)"
                            className="min-h-[100px] bg-white text-gray-800"
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
                      name="overallRating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Overall Rating (0-5)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="5"
                              step="0.1"
                              placeholder="e.g., 4.5"
                              {...field}
                              onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="responseTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Response Time</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Replies within 24 hours" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Verification & Approvals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5" />
                    Verification & Approvals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="cnicVerification"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>CNIC Verification</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            I confirm that my CNIC information is valid and can be verified
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div>
                    <FormField
                      control={form.control}
                      name="licenseCertificate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License/Registration Certificate (if applicable)</FormLabel>
                          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 h-[150px] bg-gray-50">
                            {licensePreview ? (
                              <div className="relative w-full h-full flex items-center justify-center">
                                {licensePreview.startsWith("data:image") ? (
                                  <Image
                                    src={licensePreview || "/placeholder.svg"}
                                    alt="License preview"
                                    width={100}
                                    height={100}
                                    className="w-32 h-auto object-contain border rounded p-1"
                                  />
                                ) : (
                                  <div className="flex flex-col items-center justify-center">
                                    <FileCheck className="h-10 w-10 text-green-500 mb-2" />
                                    <p className="text-sm text-gray-500">File uploaded successfully</p>
                                  </div>
                                )}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setLicensePreview(null)
                                    form.setValue("licenseCertificate", "")
                                  }}
                                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <label
                                htmlFor="license-upload"
                                className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                              >
                                <FileCheck className="h-10 w-10 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">Upload license certificate</p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 5MB</p>
                                <Input
                                  id="license-upload"
                                  type="file"
                                  accept="image/*,.pdf"
                                  className="hidden"
                                  onChange={handleLicenseUpload}
                                  disabled={isLicenseUploading}
                                />
                              </label>
                            )}
                            {isLicenseUploading && (
                              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                              </div>
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Submit Application
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
