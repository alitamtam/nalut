import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./src/routes/index.js";

const app = express();

// CORS configuration
app.use(cors());

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "dist" folder (Vite build output)
app.use(express.static(path.join(__dirname, "dist")));

// Serve static files from the "locales" folder (for i18n, translations)
app.use("/locales", express.static(path.join(__dirname, "locales")));

// Middleware for JSON and URL-encoded requests
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Use the API routes
app.use("/api", routes);

// Catch-all route for serving the React app (after Vite build)

export default app;
