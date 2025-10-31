import { Router } from "express";
import axios from "axios";
import prisma from "../prisma.js";
import { signToken, verifyToken, cookieOptions, COOKIE_NAME } from "../utils/jwt.js";

const router = Router();

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL || `${process.env.SERVER_BASE_URL || "http://localhost:4000"}/auth/github/callback`;

router.get("/github", (req, res) => {
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", GITHUB_CLIENT_ID);
  url.searchParams.set("redirect_uri", GITHUB_CALLBACK_URL);
  url.searchParams.set("scope", "read:user user:email");
  // forward desired return URL so callback can redirect correctly
  if (typeof req.query.state === "string" && req.query.state.length > 0) {
    url.searchParams.set("state", req.query.state);
  }
  res.redirect(url.toString());
});

router.get("/github/callback", async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).send("Missing code");

    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: GITHUB_CALLBACK_URL,
      },
      { headers: { Accept: "application/json" } }
    );

    const accessToken = tokenRes.data.access_token;
    if (!accessToken) return res.status(400).send("Failed to get access token");

    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    let email = userRes.data.email;
    if (!email) {
      const emailsRes = await axios.get("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const primary = emailsRes.data?.find((e) => e.primary && e.verified) || emailsRes.data?.[0];
      email = primary?.email || null;
    }

    const githubId = String(userRes.data.id);
    const name = userRes.data.name || userRes.data.login;
    const avatarUrl = userRes.data.avatar_url || null;

    const user = await prisma.user.upsert({
      where: { githubId },
      update: { email, name, avatarUrl },
      create: { githubId, email, name, avatarUrl },
    });

    const token = signToken({ sub: user.id, email: user.email });
    res.cookie(COOKIE_NAME, token, cookieOptions());

    const redirectTo = req.query.state && typeof req.query.state === "string" ? req.query.state : CLIENT_ORIGIN;
    res.redirect(redirectTo);
  } catch (e) {
    console.error(e.response?.data || e.message);
    res.status(500).send("GitHub OAuth failed");
  }
});

router.get("/me", async (req, res) => {
  try {
    const raw = req.cookies?.[COOKIE_NAME];
    if (!raw) return res.status(401).json({ message: "Not authenticated" });
    const payload = verifyToken(raw);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return res.status(401).json({ message: "Not authenticated" });
    res.json({ id: user.id, email: user.email, name: user.name, avatarUrl: user.avatarUrl });
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions(), maxAge: 0 });
  res.json({ ok: true });
});

export default router;
