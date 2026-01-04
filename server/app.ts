import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { errorHandler, notFoundHandler } from "./middleware/error-handling";
import { isAuthenticated } from "./middleware/jwt.middleware";
import authRouter from "./routes/auth.routes";
import cohortRouter from "./routes/cohort.routes";
import studentRouter from "./routes/student.routes";
import userRouter from "./routes/user.routes";

const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app: Express = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tool-api")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => console.error("Error connecting to mongo", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "views", "docs.html"));
});

app.use("/auth", authRouter);
app.use("/api/cohorts", cohortRouter);
app.use("/api/students", studentRouter);
app.use("/api/users", isAuthenticated, userRouter);

// ERROR HANDLING MIDDLEWARE - Must be after all routes
app.use(notFoundHandler);
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`\nServer listening on http://localhost:${PORT}\n`);
});
