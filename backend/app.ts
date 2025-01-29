import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./src/routes/index"; // This will be updated to `index.ts` later

const app = express();

// CORS configuration
app.use(cors());

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "locales" folder
app.use("/locales", express.static(path.join(__dirname, "locales")));

// Define allowed origins for CORS
const allowedOrigins = [
  "https://www.nalut.ly",
  "https://nalut.ly",
  "http://nalut.ly",
  "http://localhost:5173",
];

// CORS configuration in Express
// Configure CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
    credentials: true,
  })
);

// Middleware for JSON and URL-encoded requests
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api", routes);

// Serve static files from the "dist" folder (Vite build output)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/client/dist")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(
      path.resolve(__dirname, "../frontend/client/dist", "index.html")
    );
  });
}

// Error handling for production
if (process.env.NODE_ENV === "production") {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong! Please try again later.");
  });
}

export default app;
