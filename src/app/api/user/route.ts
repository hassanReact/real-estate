import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
 
// Creating User API
export async function GET() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if (!user?.id) {
    return NextResponse.json({error: "unauthorized"}, {status: 402})
    }

    try{
        const dbUser = await prisma.user.findUnique({
            where:{id: user.id},
            include:{
                Property: true,
                subscription: {include:{plan: true }}
            }
        })
        return NextResponse.json(dbUser)
    }catch(error){
        return NextResponse.json({error: "Error Fetching User"}, {status: 404})
    }
}

// Updating User API
export async function PUT(req: Request){
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if (!user?.id) {
        return NextResponse.json({error: "unauthorized"}, {status: 402})
    }
    try {
     const json = await req.json();
     const updatedUser = await prisma.user.update({
        where:{id: user.id},
        data: { firstName: json.firstName, lastName: json.lastName, avatarUrl: json.avatarUrl}
     });
     return NextResponse.json(updatedUser)
    } catch (error) {
        return NextResponse.json({error: "Error Updating User"}, {status: 404})
    }
}