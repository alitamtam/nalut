import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./src/routes/index.js";

const app = express();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "locales" folder (for i18n, translations)

// Define allowed origins for CORS
// CORS configuration in Express
// CORS configuration in Express
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://*.edulibya.ly",
    "https://www.edulibya.ly",
    "https://edulibya.ly",
    "http://edulibya.ly",
    "http://localhost:5173",
    "http://localhost:4173",
    "http://localhost:3000",
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  // Allow the DELETE method along with other methods
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Origin, Authorization"
  );

  // Handle preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Respond OK to preflight requests
  }

  next();
});

// Middleware for JSON and URL-encoded requests
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Serve static files from the "dist" folder (Vite build output)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
}
app.use("/locales", express.static(path.join(__dirname, "locales")));

// Use the API routes
app.use("/api", routes);

// Error handling for production
if (process.env.NODE_ENV === "production") {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong! Please try again later.");
  });
}

export default app;
