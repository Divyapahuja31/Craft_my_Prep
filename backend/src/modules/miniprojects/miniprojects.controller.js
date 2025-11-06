import * as miniProjectService from "./miniprojects.service.js";

export const generateMiniProjectController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { timeline, languages, difficulty } = req.body;
        const project = await miniProjectService.generateProjectService(userId, { timeline, languages, difficulty });

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error("Error generating mini project:", error);
        res.status(500).json({
            success: false,
            message: "Failed to generate mini project",
            error: error.message
        });
    }
};

export const getMiniProjects = async (req, res) => {
    try {
        const userId = req.user.id;
        const projects = await miniProjectService.getAllProjectsService(userId);

        res.status(200).json({
            success: true,
            data: projects
        });
    } catch (error) {
        console.error("Error fetching mini projects:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch mini projects",
            error: error.message
        });
    }
};

export const markProjectComplete = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const updatedProject = await miniProjectService.markProjectCompleteService(id, userId);

        res.status(200).json({
            success: true,
            data: updatedProject
        });
    } catch (error) {
        console.error("Error marking project complete:", error);

        if (error.message === "Project not found") {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        if (error.message === "Unauthorized") {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update project",
            error: error.message
        });
    }
};