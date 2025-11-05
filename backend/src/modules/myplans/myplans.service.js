import { prisma } from "../../config/prisma.js";

export const getUserPlans = async (userId) => {
    const plans = await prisma.plan.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });
    return plans;
};
