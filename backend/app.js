//  path backend/app.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import routes from "./src/routes/index.js";

const app = express();

// CORS configuration
const corsOptions = {};
app.use(cors(corsOptions));
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use("/locales", express.static(path.join(__dirname, "locales")));

// Middleware
app.use(bodyParser.json({ limit: "10mb" })); // Handle JSON requests
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" })); // Handle URL-encoded data

// Use the routes
app.use("/api", routes);

export default app;
