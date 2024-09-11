import express from "express";
import routes from "./src/routes/index.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust to match your frontend URL
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes defined in routes/index.js
app.use("/api", routes);

export default app; // Export the app object
