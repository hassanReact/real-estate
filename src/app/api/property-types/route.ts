import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET property types 
export async function GET(){
    try {
        const types = await prisma.propertyType.findMany();
        return NextResponse.json(types);
    } catch (error) {
        return NextResponse.json({error: "Error Fetching Property Types"}, {status: 500});
    }
}
