import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){

    const detailsType = await prisma.propertyTypeDetail.findMany(); // Ensure this query exists
    
    return NextResponse.json(detailsType);
}