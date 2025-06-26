import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

// Adding image to property
export async function POST(req : Request, { params }: { params: Promise<{ id: string }> } ){

    const id = (await params).id
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user.id) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    try {
    const json = await req.json();
    const subscription = await prisma.subscriptions.findFirst({
        where:{ userId: user.id },
        include: {plan: true}
    })        

    if(!subscription){
        return NextResponse.json({error: "No subscription found"}, {status: 404});
    }

    const imagesCount = await prisma.propertyImage.count({
        where: { propertyId: parseInt(id)}
    })

    if(imagesCount >= subscription.plan.ImagePerPropertyLimit){
        return NextResponse.json({error: "Image limit reached"}, {status: 400});
    } 

    const image = await prisma.propertyImage.create({
        data: {
            url: json.url,
            propertyId: parseInt(id)
        }
    });

    return NextResponse.json(image);
    } catch (error) {
        return NextResponse.json({error: "Error Adding Image"}, {status: 500});
    }
}

// Delete image from property


export async function DELETE(req: Request,  { params }: { params: Promise<{ id: string }> } ) {
    const id = (await params).id
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user.id) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }
    try {
        const json = await req.json();
        await prisma.propertyImage.delete({
            where: {
                id: json.imageId,
                propertyId: parseInt(id)
            }
        });

        return NextResponse.json({message: "Image Deleted Successfully"});
    } catch (error) {
        return NextResponse.json({error: "Error Deleting Image"}, {status: 500});
    }
}