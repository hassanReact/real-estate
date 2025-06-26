"use server";

import { prisma } from "@/lib/prisma";
import { Property, Features } from "@/lib/type";
import { AreaType } from "@prisma/client";

export const getAllPorpertyList = async () => {
    try {
        const propertiesList = await prisma.property.findMany({
            include: {
                type: true,
                status: true,
                location: {
                    select: {
                        city: true,
                        stateId: true
                    }
                },
                feature: true, // Ensure to include the feature relation
                images: true,
                contact: true,
            }
        });

        if (!propertiesList) {
            return { success: false, error: "Cannot find properties." };
        }

        // // Map properties to ensure the `feature` has all required fields
        // const formattedProperties = propertiesList.map((property) => {
        //     // Default feature properties if feature is null
        //     const feature: any = property.feature ?? {
        //         area: 0,
        //         areaType: "SquareFeet" as AreaType,  // Assuming "SquareFeet" is a valid value in your AreaType enum
        //         bathrooms: 0,
        //         bedrooms: 0,
        //         hasBalcony: false,
        //         hasGarage: false,
        //         hasGarden: false,
        //         hasPool: false,
        //         hasGardenYard: false,
        //         hasSwimmingPool: false,
        //         parkingSpots: 0,
        //         propertyId: property.id,  // Assign the propertyId
        //     };

        //     return {
        //         ...property,
        //         feature,
        //         status: property.status?.value,
        //         type: property.type?.value,
        //         location: {
        //             city: property.location?.city?.value,
        //             stateId: property.location?.stateId ?? 0,
        //         },
        //         contact: {
        //             email: property.contact?.email ?? '',
        //             name: property.contact?.name ?? '',
        //             phone: property.contact?.phone ?? '',
        //         },
        //     };
        // });

        return {
            success: true,
            data: propertiesList,
        };
    } catch (error) {
        console.error("Database error:", error);
        return { success: false, error: "Internal server error. Please try again later." };
    }
};



