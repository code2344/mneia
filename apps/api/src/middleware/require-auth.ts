import { NextFunction, Request, Response } from "express";
import { getCurrentUser } from "../services/auth.service.js";

export async function requireAuth(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
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

    response.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
}