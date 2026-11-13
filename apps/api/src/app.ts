import cors from "cors";
import express from "express";
import authRouter from "./routes/auth.routes.js";
import waitlistRouter from "./routes/waitlist.routes.js";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = process.env.WEB_ORIGINS
  ?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean) ?? [];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
  
app.get("/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "mneia-api",
  });
});

app.use("/auth", authRouter);

app.use("/waitlist", waitlistRouter)

export default app;