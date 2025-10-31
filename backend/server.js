import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/auth.js";
import prisma from "./src/prisma.js";

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/auth", authRouter);

async function start() {
  await prisma.$connect();
  app.listen(PORT, () => {
    console.log(`auth server on :${PORT}`);
  });
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});
