"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const profileSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  city: z.string().min(1, "City is required"),
  longitude: z.string().optional(), // Fixed validation
  latitude: z.string().optional(),  // Fixed validation
  province: z.string().min(1, "Province is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

export async function updateProfile(data: unknown) {
  try {
    // Validate input data
    const validatedData = profileSchema.parse(data);

    // Get authenticated user
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      return { success: false, error: "User is not authenticated." };
    }

    const user = await getUser();
    if (!user?.id) {
      return { success: false, error: "User ID is missing." };
    }

    // Update user profile in the database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        phoneNumber: validatedData.phoneNumber,
        longitude: validatedData.longitude || null,
        latitude: validatedData.latitude || null,
        city: validatedData.city,
        province: validatedData.province,
        streetAddress: validatedData.address,
        ProfileComplete:true,
      },
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof z.ZodError ? error.errors[0].message : "Something went wrong",
    };
  }
}
