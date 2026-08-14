import { describe, expect, it } from "vitest";
import { sanitizeUser } from "./sanitizeUser";

describe("sanitizeUser", () => {
  it("strips the password hash from the user row", () => {
    const row = { id: "1", email: "admin@example.com", password: "hashed" };

    expect(sanitizeUser(row)).toEqual({ id: "1", email: "admin@example.com" });
  });

  it("strips lockout bookkeeping fields not meant for the session", () => {
    const row = {
      id: "1",
      email: "admin@example.com",
      password: "hashed",
      failedAttempts: 2,
      lockedUntil: null,
    };

    expect(sanitizeUser(row)).toEqual({ id: "1", email: "admin@example.com" });
  });
});
