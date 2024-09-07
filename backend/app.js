import express from "express";
import routes from "./src/routes/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes defined in routes/index.js
app.use("/api", routes);

export default app; // Export the app object
