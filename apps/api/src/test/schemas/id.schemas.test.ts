import { describe, expect, it } from "vitest";
import { idSchema } from "../../validation/id.schemas.js";

describe("idSchema", () => {
  it("accepts a valid UUID", () => {
    const result = idSchema.safeParse("f71e6387-f025-4c67-a254-431c3082267d");

    expect(result.success).toBe(true);
  });
  
  it("rejects an invalid UUID", () => {
    const result = idSchema.safeParse("an_invalid_uuid");

    expect(result.success).toBe(false);
  })
})