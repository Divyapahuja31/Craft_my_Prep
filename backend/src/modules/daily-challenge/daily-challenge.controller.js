import * as challengeService from "./daily-challenge.service.js";

export const getToday = async (req, res) => {
    try {
        const challenge = await challengeService.getTodayChallenge(req.user.id);
        res.json(challenge);
    } catch (error) {
        console.error("Get Today Challenge Error:", error);
        res.status(500).json({ error: "Failed to get daily challenge" });
    }
};

export const markSolved = async (req, res) => {
    try {
        const challengeId = parseInt(req.params.id, 10);
        if (isNaN(challengeId)) return res.status(400).json({ error: "Invalid ID" });

        const result = await challengeService.markSolved(challengeId);
        res.json({ message: "Challenge marked as solved", challenge: result });
    } catch (error) {
        console.error("Mark Solved Error:", error);
        res.status(500).json({ error: "Failed to mark challenge solved" });
    }
};

export const getHistory = async (req, res) => {
    try {
        const history = await challengeService.getHistory(req.user.id);
        res.json({ history });
    } catch (error) {
        console.error("Get History Error:", error);
        res.status(500).json({ error: "Failed to get history" });
    }
};
