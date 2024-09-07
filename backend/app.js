import express from "express";
import dotenv from "dotenv";
import Router from "./routes/index.js"; // Import your routes

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use(Router); // Use the router for your API routes

export default app;
