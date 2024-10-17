import { createServer } from "node:http";
import { readFileSync } from "fs"; // Import fs module to read files
import "dotenv/config";
import app from "./app.js";

// Load SSL certificate files
const sslOptions = {
  key: readFileSync("./src/ssl/private.key"), // Path to your private key file
  cert: readFileSync("./src/ssl/certificate.crt"), // Path to your certificate file
  // Uncomment if you have a CA bundle
  // ca: readFileSync('./src/ssl/ca_bundle.crt'), // Path to your CA bundle file (if applicable)
};

const PORT = process.env.PORT || 3000;

// Create HTTPS server
const httpsServer = createServer(sslOptions, app);

httpsServer.listen(PORT, "0.0.0.0", () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`🚀 HTTP Server launched at http://localhost:${PORT} 🚀`);
  } else {
    console.log(`🚀 Server running in production mode on port ${PORT}`);
  }
});
