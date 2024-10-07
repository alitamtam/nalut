// path: backend/server.js
import { createServer } from "node:http";
import "dotenv/config";
import express from "express";
import app from "./app.js";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 3000;

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In production, serve the built frontend from the "dist" directory
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  // Catch-all route for serving the React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`🚀 HTTP Server launched at http://localhost:${PORT} 🎉`);
  } else {
    console.log(`🚀 Server running in production mode on port ${PORT}`);
  }
});
