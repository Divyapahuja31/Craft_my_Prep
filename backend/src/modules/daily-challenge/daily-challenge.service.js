import { prisma } from "../../config/prisma.js";
import { generateFromGroq } from "../../utils/groq.js";

export const getTodayChallenge = async (userId) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.challenge.findFirst({
        where: {
            userId,
            date: {
                gte: today,
            },
        },
    });

    if (existing) return existing;

    const prompt = `You are a technical interviewer. Generate a single daily coding challenge or technical interview question. 
    Return strictly valid JSON with fields: 
    - 'question' (string)
    - 'solution' (string, brief explanation)
    
    Do not include markdown formatting. Return raw JSON only.`;

    let challengeData;
    try {
        challengeData = await generateFromGroq(prompt);
    } catch (e) {
        challengeData = {
            question: "Explain the difference between process and thread.",
            solution: "Process is an execution of a program...",
        };
    }

    const newChallenge = await prisma.challenge.create({
        data: {
            userId,
            question: challengeData.question,
            solution: challengeData.solution,
            date: new Date(),
        },
    });

    return newChallenge;
};

export const markSolved = async (challengeId) => {
    const challenge = await prisma.challenge.findUnique({
        where: { id: challengeId }
    });
    return challenge;
};

export const getHistory = async (userId) => {
    return await prisma.challenge.findMany({
        where: { userId },
        orderBy: { date: "desc" },
    });
};
