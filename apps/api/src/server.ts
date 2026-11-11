import "dotenv/config";
import cors from "cors";
import express, { response } from "express";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "recall-api"
  });
});

app.listen(port, () => {
  console.log(`Recall API listening on port ${port}`);
});