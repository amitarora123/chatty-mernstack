import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import app from "./app.js";

dotenv.config();
connectDB()
  .then(() => {
    app.listen(5001, () => {
      console.log("server is running on port 5001");
    });
  })
  .catch((error) => {
    console.log("error connecting database ", error);
  });
