

import { generateFromGemini } from '../../utils/geminis.js';
import { prisma } from '../../config/prisma.js';

export const generatePreview = async (body) => {
  const { jobDescription, skill, goal, duration, dailyTime } = body;

  if (!jobDescription && !skill) throw new Error("Job Description or Skill is required");

  // Build prompt
  const prompt = `
    You are an expert career coach and technical interviewer.
    Analyze the following Job Description carefully to identify the key skills and requirements:
    "${jobDescription || skill}"

    Based on this analysis, create a targeted preparation plan.
    Goal: ${goal || 'Crack the interview'}
    Duration: ${duration || 3} days (Default to 3 if not specified)
    Daily Commitment: ${dailyTime || 60} minutes

    Return strictly valid JSON with the following structure:
    {
      "skills": ["List of key technical and soft skills extracted from the JD"],
      "miniProjects": [
        { "title": "Project Name", "description": "A small, relevant project to demonstrate these skills" }
      ],
      "practiceQuestions": [
        "Technical Question 1 related to the JD?",
        "Behavioral Question 1 related to the JD?"
      ],
      "resources": [
        { "title": "Resource Title", "link": "URL or description" }
      ],
      "timeline": [
        { "day": 1, "topic": "Focus Area", "activities": ["Specific study task", "Practice task"] }
      ]
    }
    Do not include markdown formatting like \`\`\`json. Just the raw JSON string.
  `;

  // Call Gemini
  const rawText = await generateFromGemini(prompt);


  let preview;
  try {

    const cleanText = rawText.replace(/```json|```/g, '').trim();
    preview = JSON.parse(cleanText);
  } catch (e) {
    console.warn("Failed to parse Gemini output as JSON, returning fallback.");
    preview = {
      skills: [skill || "Generic Skill"],
      miniProjects: [{ title: "Basic Project", description: "Start with a simple project" }],
      practiceQuestions: ["What is " + (skill || "this topic") + "?"],
      resources: [],
      timeline: [
        { day: 1, topic: "Introduction", activities: ["Read documentation"] }
      ]
    };
  }

  return preview;
};

export const savePlan = async (userId, planData) => {
  const { jobDescription, skills, miniProjects, practiceQuestions, resources, timeline } = planData;

  if (!jobDescription) throw new Error("Job Description is required to save the plan");

  const newPlan = await prisma.plan.create({
    data: {
      userId,
      jd: jobDescription,
      skills: skills || [],
      projects: miniProjects || [],
      questions: practiceQuestions || [],
      resources: resources || [],
      roadmap: timeline || []
    }
  });

  return newPlan;
};
