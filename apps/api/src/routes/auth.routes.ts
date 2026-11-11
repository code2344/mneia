/*
this needs to handle:
register, login, logout, getcurrentuser, createsession, and destroysession
*/

import { Router } from "express";
import { registerSchema, loginSchema } from "../validation/auth.schemas.js";

const authRouter = Router();

authRouter.post("/register", (_request, response) => {
  const result = registerSchema.safeParse(request.body);
  
  if (!result.success) {
    return response.status(400).json({
      error: "Invalid registration details",
      fields: result.error.flatten().fieldErrors,
    });
  }
  
  const user = await registerUser(result.data);
});

authRouter.post("/login", (_request, response) => {
  response.json({
    message: "Login route reached",
  });
});

authRouter.post("/logout", (_request, response) => {
  response.status(204).send();
});

authRouter.get("/me", (_request, response) => {
  response.json({
    user: null,
  });
});

export default authRouter;