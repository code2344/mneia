import { describe, expect, it } from "vitest";
import { createCardSchema } from "./card.schemas.js";

describe("createCardSchema", () => {
  it("accepts a valid card", () => {
    const result = createCardSchema.safeParse({
      front: "What is mitosis?",
      back: "Cell division that produces two identical cells.",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an empty front", () => {
    const result = createCardSchema.safeParse({
      front: "",
      back: "Cell division that produces two identical cells.",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an empty back", () => {
    const result = createCardSchema.safeParse({
      front: "What is mitosis?",
      back: "",
    });

    expect(result.success).toBe(false);
  })

  it("rejects an overly long front", () => {
    const result = createCardSchema.safeParse({
      front: "a".repeat(2001),
      back: "Cell division that produces two identical cells.",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an overly long back", () => {
    const result = createCardSchema.safeParse({
      front: "What is mitosis?",
      back: "a".repeat(10001),
    })

    expect(result.success).toBe(false);
  })
})