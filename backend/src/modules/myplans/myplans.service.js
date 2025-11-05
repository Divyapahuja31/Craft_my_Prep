import { prisma } from "../../config/prisma.js";

export const getUserPlans = async (userId) => {
    const plans = await prisma.plan.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });
    return plans;
};

export const getPlanById = async (planId) => {
    const plan = await prisma.plan.findUnique({
        where: { id: planId }
    });
    return plan;
};
