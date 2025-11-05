import * as myPlansService from './myplans.service.js';

export const getUserPlans = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);

        if (isNaN(userId)) {
            return res.status(400).json({ error: "Invalid User ID" });
        }
        
        if (req.user.id !== userId) {
            return res.status(403).json({ error: "Unauthorized access to these plans" });
        }

        const plans = await myPlansService.getUserPlans(userId);
        res.json({ plans });
    } catch (error) {
        console.error("Get User Plans Error:", error);
        res.status(500).json({ error: "Failed to fetch plans" });
    }
};
