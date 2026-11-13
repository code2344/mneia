import { Router } from "express";
import { createWaitlistSignup } from "../services/waitlist.service.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const result = await createWaitlistSignup(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

export default router;