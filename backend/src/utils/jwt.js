import jwt from "jsonwebtoken";
import ENV from "../config/env.js";
const JWT_SECRET = ENV.JWT_SECRET;
const JWT_EXPIRES_IN = ENV.JWT_EXPIRES_IN || "7d";

if (!JWT_SECRET) {
  console.warn("JWT_SECRET not set in env.");
}

export function signJwt(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwt(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
} 