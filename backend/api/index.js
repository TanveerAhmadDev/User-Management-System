import express from "express";
import dbConnection from "../utils/dbConnection.js";
import adminRouter from "../routes/admin.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "../middlewares/errorHandler.js";

dotenv.config();

const app = express();

dbConnection(process.env.MONO_URL);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://192.168.1.217:5173", process.env.FRONTEND_URL],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

app.use("/api/admin", adminRouter);

app.use(errorHandler);

export default app;
