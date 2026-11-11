import cors from "cors";
import express from "express";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "recall-api",
  });
});

app.use("/api/auth", authRouter);

export default app;