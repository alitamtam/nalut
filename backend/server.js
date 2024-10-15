import { createServer } from "node:http";
import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

httpServer.listen(PORT, "0.0.0.0", () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`🚀 HTTP Server launched at http://localhost:${PORT} 🚀`);
  } else {
    console.log(`🚀 Server running in production mode on port ${PORT}`);
  }
});
