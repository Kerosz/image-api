// packages
import express from "express";
import cors from "cors";
// internals
import router from "./routes/index";
// types
import type { Response, Request, NextFunction } from "express";

const PORT = 3000;

// Creates express server
const app = express();

// Express configuration
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
app.use("/api/v1", router);

// Error handling
app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  const error = new Error(`Path: ${req.path} was not found!`);

  next(error);
});

app.listen(PORT, () => {
  console.log("App started on http://localhost:%d", PORT);
});
