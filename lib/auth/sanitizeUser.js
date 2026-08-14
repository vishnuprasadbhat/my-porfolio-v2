/** Removes fields that must never leave `authorize()` and enter the session/JWT. */
export function sanitizeUser({
  password,
  failedAttempts,
  lockedUntil,
  ...safe
}) {
  return safe;
}
