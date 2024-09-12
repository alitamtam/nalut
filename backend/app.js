import express from "express";
import bodyParser from "body-parser";
import routes from "./src/routes/index.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json({ limit: "10mb" })); // Handle JSON requests
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" })); // Handle URL-encoded data

// Use the routes
app.use("/api", routes);

export default app;
