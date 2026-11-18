import { describe, expect, it } from "vitest";
import { createDeckSchema } from "./deck.schemas.js";

describe("createDeckSchema", () => {
  it("accepts a valid deck", () => {
    const result = createDeckSchema.safeParse({
      title: "A valid deck title",
      description: "Here's a nice description of this deck",
    });
		expect(result.success).toBe(true);
  });

  it("accepts a valid deck without a description", () => {
    const result = createDeckSchema.safeParse({
      title: "A valid deck title",
    });

    expect(result.success).toBe(true);
  });

  it("accepts a valid deck with a null description", () => {
    const result = createDeckSchema.safeParse({
      title: "A valid deck title",
      description: null,
    });

    expect(result.success).toBe(true);
  });

  it("rejects a deck without a title", () => {
    const result = createDeckSchema.safeParse({
      description: "a nice description",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a deck with a null title", () => {
    const result = createDeckSchema.safeParse({
      title: null,
      description: "a nice description here",
    });

    expect(result.success).toBe(false);
  });
});