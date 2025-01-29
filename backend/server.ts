import { createServer } from "node:http";
import { readFileSync } from "fs";
import "dotenv/config";
import app from "./app"; // This will be updated to `app.ts` later

const PORT = process.env.PORT || 3000;

// Load SSL certificate files
const sslOptions = {
  key: readFileSync("./src/ssl/private.key"),
  cert: readFileSync("./src/ssl/certificate.crt"),
};

// Create HTTPS server
const httpsServer = createServer(app);

httpsServer.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`🚀 HTTP Server launched at http://localhost:${PORT} 🚀`);
  } else {
    console.log(`🚀 Server running in production mode on port ${PORT}`);
  }
});
