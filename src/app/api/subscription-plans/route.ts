import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET subscription plans
export async function GET() {
    try {
        const plans = await prisma.subscriptionPlan.findMany();
        return NextResponse.json(plans)
    } catch (error) {
        return NextResponse.json({ error: "Error Fetching Subscription Plans" }, { status: 500 });
    }
}