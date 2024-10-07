import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./src/routes/index.js"; // Assuming your routes are in ./src/routes/

const app = express();

// CORS configuration
app.use(cors());

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === "production" ? "https://edulibya.ly" : "*", // Adjust origin for production
  optionsSuccessStatus: 200, // Some browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Middleware for JSON and URL-encoded requests
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Serve static files from the "dist" folder (Vite build output)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));

  // Catch-all route to serve React app (index.html) for all unknown routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
}

// Serve static files from the "locales" folder (for i18n, translations)
app.use("/locales", express.static(path.join(__dirname, "locales")));

// Use the API routes
app.use("/api", routes);

// Error handling for production
if (process.env.NODE_ENV === "production") {
  app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack for debugging
    res.status(500).send("Something went wrong! Please try again later.");
  });
}

export default app;
