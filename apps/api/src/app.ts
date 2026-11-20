import cors from "cors";
import express from "express";
import authRouter from "./routes/auth.routes.js";
import waitlistRouter from "./routes/waitlist.routes.js";
import decksRouter from "./routes/decks.routes.js";
import reviewsRouter from "./routes/reviews.routes.js"
import cookieParser from "cookie-parser";
import { pinoHttp } from "pino-http";
import { logger } from "./lib/logger.js";

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

app.use(
  pinoHttp({
    logger,
    customLogLevel: (_request, response, error) => {
      if (error || response.statusCode >= 500) return "error";
      if (response.statusCode >= 400) return "warn";
      return "info";
    },
    customSuccessMessage: (request, response, responseTime) =>
      `${request.method} ${request.url} ${response.statusCode} ${responseTime}ms`,
    customErrorMessage: (request, response, error) =>
      `${request.method} ${request.url} ${response.statusCode} ${error.message}`,
    customSuccessObject: (request, response, responseTime) => ({
      method: request.method,
      path: request.url,
      statusCode: response.statusCode,
      responseTime,
    }),
    customErrorObject: (request, response, error) => ({
      method: request.method,
      path: request.url,
      statusCode: response.statusCode,
      error: error.message,
    }),
  }),
);
  
app.get("/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "mneia-api",
  });
});

app.use("/auth", authRouter);

app.use("/waitlist", waitlistRouter)

app.use("/decks", decksRouter)

app.use("/reviews", reviewsRouter)
export default app;