import { createServer } from "node:http";
import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

<<<<<<< HEAD
console.log(`Starting server in ${process.env.NODE_ENV} mode on port ${PORT}`);

=======
>>>>>>> prod-env
const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log(`🚀 HTTP Server launched at http://localhost:${PORT} 🎉`);
});
