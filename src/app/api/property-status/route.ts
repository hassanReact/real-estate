import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get property statuses
export async function GET(){
    try {
        const statuses = await prisma.propertyStatus.findMany();
        return NextResponse.json(statuses)
    } catch (error) {
        return NextResponse.json({error: "Error Fetching Property Statuses"}, {status: 500});
    }
}