const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000;

/**
 * Decides whether a sign-in attempt should be allowed given the Admin's
 * current Lockout state.
 */
export function evaluateLoginAttempt({ failedAttempts, lockedUntil }, now) {
  if (lockedUntil && lockedUntil.getTime() > now.getTime()) {
    return { allowed: false, reason: "locked" };
  }

  return { allowed: true };
}

/** Increments the Admin's failed-attempt count, locking out once the threshold is reached. */
export function recordFailedAttempt({ failedAttempts }, now) {
  const nextAttempts = failedAttempts + 1;

  if (nextAttempts >= MAX_FAILED_ATTEMPTS) {
    return {
      failedAttempts: nextAttempts,
      lockedUntil: new Date(now.getTime() + LOCKOUT_DURATION_MS),
    };
  }

  return { failedAttempts: nextAttempts, lockedUntil: null };
}

/** Clears the Admin's Lockout state after a successful sign-in. */
export function recordSuccessfulLogin() {
  return { failedAttempts: 0, lockedUntil: null };
}
