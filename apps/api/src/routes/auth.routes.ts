import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", (_request, response) => {
  response.status(201).json({
    message: "Registration route reached",
  });
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