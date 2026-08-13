import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { sql } from "@/utils/db";
import {
  evaluateLoginAttempt,
  recordFailedAttempt,
  recordSuccessfulLogin,
} from "@/lib/auth/lockout";
import { sanitizeUser } from "@/lib/auth/sanitizeUser";
const bcrypt = require("bcryptjs");

async function getUser(email) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

async function updateLockoutState(email, { failedAttempts, lockedUntil }) {
  await sql`UPDATE users SET failed_attempts = ${failedAttempts}, locked_until = ${lockedUntil} WHERE email = ${email}`;
}

function toLockoutState(user) {
  return {
    failedAttempts: user.failed_attempts ?? 0,
    lockedUntil: user.locked_until ? new Date(user.locked_until) : null,
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) return null;

        const now = new Date();
        const { allowed } = evaluateLoginAttempt(toLockoutState(user), now);
        if (!allowed) {
          console.log("Account locked out");
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (passwordsMatch) {
          await updateLockoutState(email, recordSuccessfulLogin());
          return sanitizeUser(user);
        }

        await updateLockoutState(
          email,
          recordFailedAttempt(toLockoutState(user), now),
        );
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
