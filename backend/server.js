import { createServer } from "node:http";
import "dotenv/config";
import express from "express";
import app from "./app.js";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 3000;

console.log(`Starting server in ${process.env.NODE_ENV} mode on port ${PORT}`);

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log(`🚀 HTTP Server launched at http://localhost:${PORT} 🎉`);
});
