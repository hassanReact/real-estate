import { NextResponse } from "next/server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { prisma } from "@/lib/prisma"
import { uploadImages } from "@/lib/upload"
import type { Specialization, ServiceType, VerificationStatus } from "@prisma/client"

export async function POST(request: Request) {
  try {
    // Get the authenticated user
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse the request body
    const data = await request.json()
    console.log("Received agent data:", JSON.stringify(data, null, 2))

    // Parse specialization from string array to enum array
    const parsedSpecialization = data.specialization.map((spec: string) => {
      return spec as Specialization
    })

    // Parse services offered from string array to enum array
    const parsedServicesOffered = data.servicesOffered.map((service: string) => {
      return service as ServiceType
    })

    // Format the agent data
    const agentData = {
      fullName: data.fullName,
      profilePicture: data.profilePicture || null,
      agentType: data.agentType,
      experience: data.experience,
      specialization: parsedSpecialization,
      phoneNumber: data.phoneNumber,
      email: data.email,
      officeAddress: data.officeAddress || null,
      agencyName: data.agencyName || null,
      agencyLogo: data.agencyLogo || null,
      agencyRegNumber: data.agencyRegNumber || null,
      areasCovered: data.areasCovered,
      servicesOffered: parsedServicesOffered,
      totalListings: Number(data.totalListings),
      listingLink: data.listingLink || null,
      testimonials: Array.isArray(data.testimonials)
        ? data.testimonials
        : typeof data.testimonials === "string"
          ? data.testimonials.split("\n").filter((t: string) => t.trim() !== "")
          : [],
      overallRating: Number(data.overallRating) || 0,
      responseTime: data.responseTime,
      cnicVerification: Boolean(data.cnicVerification),
      licenseCertificate: data.licenseCertificate || null,
      approvalStatus: "PENDING" as VerificationStatus,
      userId: user.id,
    }

    // Create social media links object
    const socialMediaLinks = {
      facebook: data.facebook || null,
      instagram: data.instagram || null,
      linkedin: data.linkedin || null,
    }

    try {
      // Create the agent with social media links
      const agent = await prisma.agent.create({
        data: {
          ...agentData,
          socialMediaLinks: {
            create: socialMediaLinks
          }
        },
        include: {
          socialMediaLinks: true
        }
      })

      console.log("Agent created successfully:", agent)

      // Return a clean response
      return NextResponse.json(
        {
          message: "Agent registration submitted successfully",
          agent
        },
        { status: 201 },
      )
    } catch (dbError: any) {
      console.error("Database error creating agent:", dbError)
      return NextResponse.json({ 
        error: "Failed to create agent in database",
        details: dbError.message
      }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Error creating agent:", error)
    return NextResponse.json({ 
      error: "Failed to create agent",
      details: error.message
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const agents = await prisma.agent.findMany({
      include: {
        socialMediaLinks: true
      }
    })
    return NextResponse.json(agents)
  } catch (error) {
    console.error("Error fetching agents:", error)
    return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 })
  }
}
