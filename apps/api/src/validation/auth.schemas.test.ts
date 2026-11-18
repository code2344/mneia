import { describe, expect, it } from "vitest";
import { registerSchema, loginSchema } from "./auth.schemas.js";

describe("registerSchema", () => {
  /* notes: the cases are: name(exists, doesn't exist, null, too long), 
  email(exists, doesn't exist, null, uppercase reject, too long) */
	it("accepts a valid registration", () => {
    const result = registerSchema.safeParse({
      name: "Ruben",
      email: "hello@mneia.net",
      password: "correct-horse-battery-staple", /* any xkcd fans will get the reference */
    });

    expect(result.success).toBe(true);
  });

  it("rejects a missing name", () => {
    const result = registerSchema.safeParse({
      email: "hello@mneia.net",
      password: "correct-horse-battery-staple",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a null name", () => {
    const result = registerSchema.safeParse({
      name: null,
      email: "hello@mneia.net",
      password: "correct-horse-battery-staple",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an overly long name", () => {
    const result = registerSchema.safeParse({
      name: "a".repeat(51),
      email: "hello@mneia.net",
      password: "correct-horse-battery-staple",
    });

    expect(result.success).toBe(false)
  });

  it("rejects a nonexistent email", () => {
    const result = registerSchema.safeParse({
      name: "Ruben",
      password: "correct-horse-battery-staple",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a null email", () => {
    const result = registerSchema.safeParse({
      name: "Ruben",
      email: null,
      password: "correct-horse-battery-staple",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = registerSchema.safeParse({
      name: "Ruben",
      email: "this-is-not-an-email",
      password: "correct-horse-battery-staple",
    });

    expect(result.success).toBe(false);
  });

  it("converts uppercase into lowercase", () => {
    const result = registerSchema.parse({
      name: "Ruben",
      email: "Hello@mneia.net",
      password: "correct-horse-battery-staple",
    });

    expect(result.email).toBe(result.email.toLowerCase());
  });

  it("rejects an oversize email", () => {
    const result = registerSchema.safeParse({
      name: "Ruben",
      email: "a".repeat(256) + "@mneia.net",
      password: "correct-horse-battery-staple",
    });

    expect(result.success).toBe(false);
  })

  it("rejects a missing password", () => {
    const result = registerSchema.safeParse({
      name: "Ruben",
      email: "hello@mneia.net",
    });
    
    expect(result.success).toBe(false);
  });

  it("rejects a null password", () => {
    const result = registerSchema.safeParse({
      name: "Ruben",
      email: "hello@mneia.net",
      password: null
    });

    expect(result.success).toBe(false);
  });

  it("rejects an oversize password", () => {
    const result = registerSchema.safeParse({
      name: "Ruben",
      email: "hello@mneia.net",
      password: "a".repeat(129),
    });

    expect(result.success).toBe(false);
  })
});

describe("loginSchema", () => {
  it("accepts a valid login", () => {
    const result = loginSchema.safeParse({
      email: "ruben@mneia.net",
      password: "correct-horse-battery-staple",
    });
    
		expect(result.success).toBe(true);
  });

  it("rejects a missing email", () => {
    const result = loginSchema.safeParse({
      password: "correct-horse-battery-staple",
    });

    expect(result.success).toBe(false)
  });
  
  it("rejects a null email", () => {
    const result = loginSchema.safeParse({
      email: null,
      password: "correct-horse-battery-staple",
    });

    expect(result.success).toBe(false)
  });
  
  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({
      email: "this-is-not-an-email",
      password: "correct-horse-battery-staple",
    });

    expect(result.success).toBe(false);
  });

  it("converts uppercase into lowercase", () => {
    const result = loginSchema.parse({
      email: "Hello@mneia.net",
      password: "correct-horse-battery-staple",
    });

    expect(result.email).toBe(result.email.toLowerCase());
  });

  it("rejects an oversize email", () => {
    const result = loginSchema.safeParse({
      email: "a".repeat(256) + "@mneia.net",
      password: "correct-horse-battery-staple",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a missing password", () => {
    const result = loginSchema.safeParse({
      email: "hello@mneia.net",
    });

    expect(result.success).toBe(false)
  });
  
  it("rejects a null password", () => {
    const result = loginSchema.safeParse({
      email: "hello@mneia.net",
      password: null,
    });

    expect(result.success).toBe(false)
  });

  it("rejects an oversize password", () => {
    const result = loginSchema.safeParse({
      email: "hello@mneia.net",
      password: "a".repeat(129),
    });

    expect(result.success).toBe(false);
  })
});