import axios from 'axios';
import ENV from '../config/env.js';

export const generateFromGemini = async (prompt) => {
    const apiKey = ENV.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await axios.post(url, {
            contents: [{
                parts: [{ text: prompt }]
            }]
        });

        
        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        return text || "";
    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        throw new Error("Failed to generate content from Gemini");
    }
};
