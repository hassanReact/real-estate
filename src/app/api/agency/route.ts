import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { propertyType, ServiceType, VerificationStatus, propertyTypeDetails } from "@prisma/client"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log("Received data:", JSON.stringify(body, null, 2))

    const {
      id,
      name,
      logo,
      tagline,
      establishedYear,
      agencyType,
      officeAddress,
      phoneNumber,
      email,
      website,
      socialMedia,
      registrationNumber,
      license,
      areasCovered,
      totalAgents,
      servicesOffered,
      totalListings,
      propertyTypes,
      exclusive,
      listingLink,
      testimonials,
      overallRating,
      responseTime,
      businessCertificate,
      verificationStatus,
      propertyDetails,
    } = body

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Validate required fields
    if (!name || !officeAddress || !phoneNumber || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    try {
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id },
      })

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      // Check if email is already in use by another agency
      const existingAgency = await prisma.agency.findUnique({
        where: { email },
      })

      if (existingAgency && existingAgency.userId !== id) {
        return NextResponse.json({ error: "Email already in use by another agency" }, { status: 400 })
      }

      // Parse service types from string array to enum array
      const parsedServiceTypes = servicesOffered.map((service: string) => {
        return service as ServiceType
      })

      // Parse property types from string array to enum array
      const parsedPropertyTypes = propertyTypes.map((type: string) => {
        return type as propertyType
      })

      // Parse property details from string array to enum array
      const parsedPropertyDetails = propertyDetails.map((detail: string) => {
        return detail as propertyTypeDetails
      })

      // Create agency with logo and business certificate URLs
      const agency = await prisma.agency.create({
        data: {
          name,
          logo: logo || null, // URL from the upload.ts function
          tagline: tagline || null,
          establishedYear: Number(establishedYear),
          agencyType,
          officeAddress,
          phoneNumber,
          email,
          website: website || null,
          socialMedia: socialMedia || {}, // Ensure this is a valid JSON object
          registrationNumber: registrationNumber || null,
          license: license || null,
          areasCovered,
          totalAgents: Number(totalAgents),
          servicesOffered: parsedServiceTypes,
          totalListings: Number(totalListings),
          propertyTypes: parsedPropertyTypes,
          exclusive: exclusive || false,
          listingLink: listingLink || null,
          testimonials: testimonials || [],
          overallRating: Number(overallRating || 0),
          responseTime,
          businessCertificate: businessCertificate || null, // URL from the upload.ts function
          verificationStatus: (verificationStatus as VerificationStatus) || "PENDING",
          userId: id,
          // Handle property details as enum array
          propertyDetails: parsedPropertyDetails,
        },
      })

      return NextResponse.json(
        {
          message: "Agency created successfully",
          agency,
        },
        { status: 201 },
      )
    } catch (error: any) {
      console.error("Database error:", error)
      return NextResponse.json(
        {
          error: "Database error",
          details: error.message,
          stack: error.stack,
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Error creating agency:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}

// Get all agencies
export async function GET() {
  try {
    const agencies = await prisma.agency.findMany()
    return NextResponse.json(agencies)
  } catch (error) {
    console.error("Error fetching agencies:", error)
    return NextResponse.json({ error: "Failed to fetch agencies" }, { status: 500 })
  }
}
