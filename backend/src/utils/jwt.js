import jwt from "jsonwebtoken";

export const COOKIE_NAME = process.env.COOKIE_NAME || "cmp_token";
const JWT_SECRET = process.env.JWT_SECRET || "change_me";

export function signToken(payload, options = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d", ...options });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

export function cookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}
