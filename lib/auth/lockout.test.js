import { describe, expect, it } from "vitest";
import {
  evaluateLoginAttempt,
  recordFailedAttempt,
  recordSuccessfulLogin,
} from "./lockout";

describe("evaluateLoginAttempt", () => {
  it("allows a login when the Admin has no prior failed attempts", () => {
    const result = evaluateLoginAttempt(
      { failedAttempts: 0, lockedUntil: null },
      new Date(),
    );

    expect(result.allowed).toBe(true);
  });

  it("denies a login while lockedUntil is still in the future", () => {
    const now = new Date("2026-01-01T00:00:00Z");
    const lockedUntil = new Date("2026-01-01T00:05:00Z");

    const result = evaluateLoginAttempt(
      { failedAttempts: 5, lockedUntil },
      now,
    );

    expect(result).toEqual({ allowed: false, reason: "locked" });
  });

  it("allows a login once lockedUntil has passed", () => {
    const now = new Date("2026-01-01T00:10:00Z");
    const lockedUntil = new Date("2026-01-01T00:05:00Z");

    const result = evaluateLoginAttempt(
      { failedAttempts: 5, lockedUntil },
      now,
    );

    expect(result.allowed).toBe(true);
  });
});

describe("recordFailedAttempt", () => {
  it("increments failedAttempts without locking below the threshold", () => {
    const next = recordFailedAttempt(
      { failedAttempts: 3, lockedUntil: null },
      new Date("2026-01-01T00:00:00Z"),
    );

    expect(next).toEqual({ failedAttempts: 4, lockedUntil: null });
  });

  it("locks the Admin out for 15 minutes once the 5th attempt fails", () => {
    const now = new Date("2026-01-01T00:00:00Z");

    const next = recordFailedAttempt(
      { failedAttempts: 4, lockedUntil: null },
      now,
    );

    expect(next).toEqual({
      failedAttempts: 5,
      lockedUntil: new Date("2026-01-01T00:15:00Z"),
    });
  });
});

describe("recordSuccessfulLogin", () => {
  it("resets failedAttempts and lockedUntil", () => {
    expect(recordSuccessfulLogin()).toEqual({
      failedAttempts: 0,
      lockedUntil: null,
    });
  });
});
