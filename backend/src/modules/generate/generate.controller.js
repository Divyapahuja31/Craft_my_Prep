import * as generateService from './generate.service.js';

export const preview = async (req, res) => {
    try {
        const result = await generateService.generatePreview(req.body);
        res.json({ preview: result });
    } catch (error) {
        console.error("Generate Controller Error:", error);
        res.status(400).json({ error: error.message });
    }
};

export const save = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await generateService.savePlan(userId, req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error("Save Plan Error:", error);
        res.status(400).json({ error: error.message });
    }
}; 