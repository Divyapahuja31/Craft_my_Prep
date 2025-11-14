import express from "express";
import cors from "cors";
import passport from "passport";
import "./config/passport.js";

import authRoutes from "./modules/auth/auth.routes.js";
import generateRoutes from "./modules/generate/generate.routes.js";
import { userRouter, planRouter } from "./modules/myplans/myplans.routes.js";
import miniprojectsRouter from "./modules/miniprojects/miniprojects.routes.js";
import dailyChallengeRoutes from "./modules/daily-challenge/daily-challenge.routes.js";
import companyQuestionsRoutes from "./modules/company-questions/company-questions.routes.js";
import notesRouter from "./modules/notes/notes.routes.js";
import profileRoutes from "./modules/profile/profile.routes.js";


export const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());


app.use("/api/auth", authRoutes);
app.use("/api/plans", generateRoutes);
app.use("/api/plans", planRouter);
app.use("/api/users", userRouter);
app.use("/api/daily-challenge", dailyChallengeRoutes);
app.use("/api/miniprojects", miniprojectsRouter);
app.use("/api/company-questions", companyQuestionsRoutes);
app.use("/api/notes", notesRouter);
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
  res.json({ status: "CraftMyPrep Backend Running 🚀", time: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});