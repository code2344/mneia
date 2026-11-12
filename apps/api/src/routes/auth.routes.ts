/*
this needs to handle:
register, login, logout, getcurrentuser, createsession, and destroysession
*/

import { Router } from "express";
import {
  getCurrentUser,
  login,
  registerUser,
} from "../services/auth.service.js";

const authRouter = Router();

authRouter.post("/register", async (request, response) => {
  try {
    const result = await registerUser(request.body);

    response.cookie("mneia_session", result.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    response.status(201).json({
      user: result.user,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Registration failed";

    response.status(400).json({
      error: message,
    });
  }
});

authRouter.post("/login", async (request, response) => {
  try {
    const result = await login(request.body);

    response.cookie("mneia_session", result.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    response.json({
      user: result.user,
    });
  } catch {
    response.status(401).json({
      error: "Invalid email or password",
    });
  }
});

authRouter.post("/logout", (_request, response) => {
  response.status(204).send();
});

authRouter.get("/me", async (request, response) => {
  const sessionToken = request.cookies.mneia_session;

  if (!sessionToken) {
    response.status(401).json({
      error: "Not authenticated",
    });
    return;
  }

  const user = await getCurrentUser(sessionToken);

  if (!user) {
    response.status(401).json({
      error: "Not authenticated",
    });
    return;
  }

  response.json({ user });
});

export default authRouter;