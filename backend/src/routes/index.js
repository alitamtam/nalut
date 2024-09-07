import express from "express";
import articleRoutes from "./articles.router.js";
import userRoutes from "./user.router.js";
import publicationRoutes from "./publication.router.js";

const router = express.Router();

// Middleware to set default response format
router.use((req, _, next) => {
  req.format = "json";
  next();
});

// Define routes
router.use("/users", userRoutes); // Use the routes defined in user.router.js
router.use("/articles", articleRoutes);
router.use("/publications", publicationRoutes);

export default router;
