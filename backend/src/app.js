import express from "express";
import cors from "cors";
import passport from "passport";
import "./config/passport.js";

import authRoutes from "./modules/auth/auth.routes.js";
import generateRoutes from "./modules/generate/generate.routes.js";
import myPlansRoutes from "./modules/myplans/myplans.routes.js";


export const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());


app.use("/api/auth", authRoutes);
app.use("/api/plans", generateRoutes);
app.use("/api/users", myPlansRoutes);

app.get("/", (req, res) => {
  res.json({ status: "CraftMyPrep Backend Running 🚀", time: new Date().toISOString() });
});
