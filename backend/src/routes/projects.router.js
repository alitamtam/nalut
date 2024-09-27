import express from "express";
import projectController from "../controllers/projectController.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = express.Router();

// Route to fetch a list of projects
router.get("/", projectController.getProjects);

// Route to fetch a specific project by ID
router.get("/:id", projectController.getProject);

router.post("/", authenticate, projectController.createProject);

router.put("/:id", authenticate, projectController.updateProject);

router.delete("/:id", authenticate, projectController.deleteProject);

export default router;
