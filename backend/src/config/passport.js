import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { prisma } from "./prisma.js";
import { signJwt } from "../utils/jwt.js";
import ENV from "./env.js";

const GITHUB_ID = ENV.GITHUB_CLIENT_ID;
const GITHUB_SECRET = ENV.GITHUB_CLIENT_SECRET;
const BACKEND_URL = ENV.BACKEND_URL;

if (!GITHUB_ID || !GITHUB_SECRET) {
  console.warn("GitHub OAuth client id / secret not set in env.");
}

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
      callbackURL: `${BACKEND_URL}/api/auth/github/callback`,
      scope: ["user:email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // find user by githubId
        let user = await prisma.user.findUnique({
          where: { githubId: profile.id }
        });

        if (!user) {
          // try to find by email (if public email available)
          const email =
            profile.emails && profile.emails.length ? profile.emails[0].value : null;

          user = await prisma.user.create({
            data: {
              githubId: profile.id,
              email,
              name: profile.displayName || profile.username,
              avatar: profile.photos?.[0]?.value || null
            }
          });
        } else {
          // optionally update profile fields
          await prisma.user.update({
            where: { id: user.id },
            data: { name: profile.displayName || user.name, avatar: profile.photos?.[0]?.value || user.avatar }
          });
        }

        // Create JWT (no sessions)
        const token = signJwt({ id: user.id });

        // done returns user to passport; we will redirect later with token
        return done(null, { user, token });
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;