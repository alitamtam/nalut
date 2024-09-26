// path backend/src/routes/index.js
import express from "express";
import articleRoutes from "./articles.router.js";
import userRoutes from "./user.router.js";
import publicationRoutes from "./publication.router.js";
import profileRouter from "./profile.router.js";
import topicRoutes from "./topic.router.js";
import eventsRouter from "./events.router.js";
import searchRouter from "./search.router.js";
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
router.use("/topics", topicRoutes);
router.use("/profiles", profileRouter);
router.use("/events", eventsRouter);
router.use("/search", searchRouter);
export default router;
