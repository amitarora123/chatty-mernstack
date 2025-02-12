import express from "express";
import authRouter from "./routes/auth.routes.js";
import ApiError from "./utils/ApiError.js";
import cookieParser from "cookie-parser";
import messageRouter from "./routes/message.routes.js";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"], // Explicitly allow HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/user", authRouter);
app.use("/api/v1/messages", messageRouter);

app.use((err, req, res, next) => {
  console.error("Error aaya hai:", err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [],
  });
});
export default app;
