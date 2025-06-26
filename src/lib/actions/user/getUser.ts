"use server";

import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getUserFromDB = async () => {
    try {
        const { isAuthenticated, getUser } = getKindeServerSession();

        if (!(await isAuthenticated())) {
            return { success: false, error: "Plz Login." };
        }

        const user = await getUser();

        if (!user?.id) {
            return { success: false, error: "User ID is missing." };
        }

        const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
        });

        if (!dbUser) {
            return { success: false, error: "User not found in the database." };
        }

        return {
            success: true,
            data: {
                ...dbUser,
                createdAt: dbUser.createdAt.toISOString(),
            },
        };
    } catch (error) {
        console.error("Database error:", error);
        return { success: false, error: "Internal server error. Please try again later." };
    }
};
