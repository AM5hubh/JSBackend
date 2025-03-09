import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";
const app = express();

const allowedOrigins = [
  process.env.CORS_ORIGIN1,
  process.env.CORS_ORIGIN2,
  process.env.CORS_ORIGIN3,
  process.env.CORS_ORIGIN4,
  process.env.CORS_ORIGIN5,
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'))
app.use(cookieParser());

//routes import

import userRouter from "./routes/user.routes.js";
import transactionRouter from "./routes/transaction.routes.js";
const userpath = process.env.ROUTES_PATH_USER;
const transactionpath = process.env.ROUTES_PATH_TRANSACTION;

//routes declaration
app.use(`${userpath}`, userRouter); // goes to user.routes.js
app.use(`${transactionpath}`, transactionRouter); // goes to user.routes.js
app.get("/healthz", (req, res) => {
  console.log("pinged");
  res.status(200).send("OK");
});

app.use(errorHandler);
export { app };
