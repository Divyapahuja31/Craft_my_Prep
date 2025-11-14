import express from "express";
import * as controller from "./profile.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.put("/", requireAuth, controller.updateProfile);
router.delete("/", requireAuth, controller.deleteProfile);

export default router;
