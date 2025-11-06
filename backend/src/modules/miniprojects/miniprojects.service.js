import { prisma } from "../../config/prisma.js";
import { generateFromGroq } from "../../utils/groq.js";

export const generateProjectService = async (userId, preferences = {}) => {
    const { timeline, languages, difficulty } = preferences;

    const level = difficulty || 'Medium';
    const timeToComplete = timeline || '2 days';
    const techStack = languages || 'JavaScript / React';

    const prompt = `You are a senior software mentor and project architect.
Analyze the user’s project request carefully and propose a highly relevant mini project.

User Inputs:
- Difficulty Level: "${level}" (Allowed: Easy, Medium, Hard)
- Time to Complete: "${timeToComplete}"
- Preferred Languages/Tech Stack: "${techStack}"

Your task:
Generate a single mini project that matches the user's inputs, aligns with the skill level, and can realistically be completed within the given time.

Return strictly valid JSON with the following structure:
{
  "title": "Name of the project (short, catchy, role-focused)",
  "description": "Clear explanation of what the project does, why it is relevant, what skills it tests.",
  "difficulty": "Easy | Medium | Hard",
  "timeToComplete": "Estimated time based on user input",
  "techStack": ["List", "of", "technologies"],
  "steps": [
    "Step-by-step tasks required to build the project",
    "Include milestones, checkpoints, and hints"
  ],
  "expectedOutcome": "What the final user should have built and learned"
}

Do NOT include any markdown formatting like \`\`\`json.  
Return raw JSON only.`;

    const projectData = await generateFromGroq(prompt);

    const fullDescription = `${projectData.description}\n\nTech Stack: ${projectData.techStack.join(', ')}\nTime: ${projectData.timeToComplete}\nOutcome: ${projectData.expectedOutcome}`;

    const project = await prisma.miniProject.create({
        data: {
            userId,
            title: projectData.title,
            description: fullDescription,
            steps: projectData.steps,
            difficulty: projectData.difficulty || level
        }
    });

    return project;
};

export const getAllProjectsService = async (userId) => {
    return await prisma.miniProject.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });
};

export const markProjectCompleteService = async (id, userId) => {
    const project = await prisma.miniProject.findUnique({
        where: { id: parseInt(id) }
    });

    if (!project) {
        throw new Error("Project not found");
    }

    if (project.userId !== userId) {
        throw new Error("Unauthorized");
    }

    return await prisma.miniProject.update({
        where: { id: parseInt(id) },
        data: { isCompleted: true }
    });
};