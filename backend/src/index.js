import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import { server } from "./lib/socket.js";
import app from "./app.js";
import path from "path";
import express from "express";
const __dirname = path.resolve();
dotenv.config();
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }
});
