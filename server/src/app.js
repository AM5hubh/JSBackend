import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'))
app.use(cookieParser());

//routes import

import userRouter from "./routes/user.routes.js";
const path = process.env.ROUTES_PATH;

//routes declaration
app.use(`${path}`, userRouter); // goes to user.routes.js
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

app.use(errorHandler);
export { app };
