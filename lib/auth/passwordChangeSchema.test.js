import { describe, expect, it } from "vitest";
import { passwordChangeSchema } from "./passwordChangeSchema";

describe("passwordChangeSchema", () => {
  it("accepts a matching new password of at least 12 characters", () => {
    const result = passwordChangeSchema.safeParse({
      currentPassword: "old-password",
      newPassword: "a-very-long-secret",
      confirmPassword: "a-very-long-secret",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a new password shorter than 12 characters", () => {
    const result = passwordChangeSchema.safeParse({
      currentPassword: "old-password",
      newPassword: "short1",
      confirmPassword: "short1",
    });

    expect(result.success).toBe(false);
  });

  it("rejects when the confirmation doesn't match the new password", () => {
    const result = passwordChangeSchema.safeParse({
      currentPassword: "old-password",
      newPassword: "a-very-long-secret",
      confirmPassword: "a-different-secret",
    });

    expect(result.success).toBe(false);
  });
});
