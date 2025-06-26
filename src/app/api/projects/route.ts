
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        const projects = await prisma.project.findMany()

        if (!projects) {
            return NextResponse.json({ error: "Projects are not Available" }, { status: 400 });
        }

        return NextResponse.json(
             projects ,
            { status: 200 }
        );

    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json();
  
    const {
      id,
      name,
      developerName,
      projectType,
      projectStatus,
      launchDate,
      expectedCompletion,
      city,
      area,
      googleMapsLink,
      nearbyLandmarks,
      availableUnits,
      sizesAndLayouts,
      paymentPlan,
      basicAmenities,
      luxuryFeatures,
      nearbyFacilities,
      governmentApprovals,
      registrationDetails,
      developerPhone,
      authorizedAgents,
      bookingProcedure,
      priceRange,
      projectImages
    } = body;
  
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
  
    try {
      const user = await prisma.user.findUnique({
        where: { id }
      });
  
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      const project = await prisma.project.create({
        data: {
          name,
          images : projectImages,
          developerName,
          projectType,
          projectStatus,
          launchDate,
          expectedCompletion,
          city,
          area,
          googleMapsLink,
          nearbyLandmarks,
          availableUnits,
          sizesAndLayouts,
          paymentPlan,
          basicAmenities,
          luxuryFeatures,
          nearbyFacilities,
          governmentApprovals,
          registrationDetails,
          developerPhone,
          bookingProcedure,
          authorizedAgents: {
            create: authorizedAgents.map((agent: any) => ({
              email: agent.email,
              phone: agent.phone
            }))
          },
          priceRange: {
            create: {
              minPrice: priceRange.minPrice,
              maxPrice: priceRange.maxPrice
            }
          },
          user: {
            connect: { id }
          }
        }
      });
  
      return NextResponse.json({ message: 'Project created successfully', project }, { status: 201 });
  
    } catch (error) {
      console.error('Error creating project:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
  