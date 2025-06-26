import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";


// // GET subscriptions
// export async function GET(){
//     // const {getUser} = getKindeServerSession();
//     // const user = await getUser();

//     const user = {
//         id: "test-user-id",
//         email: "testuser@example.com",
//     };

//     if (!user.id) {
//         return NextResponse.json({error: "Unauthorized"}, {status: 401});
//     }

//     try{
//         const subscriptions = await prisma.subscriptions.findMany({
//             where:{
//                 userId: user.id
//             },
//             include: {plan: true}
//         });

//         return NextResponse.json(subscriptions);
//     } catch (error) {
//         return NextResponse.json({error: "Error Fetching Subscriptions"}, {status: 500});
//     }
// }

// POST subscriptions

export async function POST(req : Request){
    const {getUser} = getKindeServerSession();
    const user = await getUser();
   
    
    
    if (!user.id) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    try {
        const json = await req.json();
        const subscription = await prisma.subscriptions.create({
            data: {
                paymentId: json.paymentId,
                planId: json.planId,
                userId: user.id
            },
            include: {plan: true}
        });

        return NextResponse.json(subscription);

    } catch (error) {
        return NextResponse.json({error: "Error Creating Subscription"}, {status: 500});
    }
}