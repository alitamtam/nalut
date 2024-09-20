import express from "express";
import publicationController from "../controllers/publicationController.js";
import { authenticate } from "../middleware/auth.middleware.js";
import adminController from "../controllers/adminController.js";
const router = express.Router();

// Route to fetch a list of publications/topics
router.get("/", publicationController.findAllPublications);

// Route to fetch a specific publication/topic by ID
router.get("/:id", publicationController.findPublicationById);

router.post("/", authenticate, publicationController.createPublication);

router.get("/:id", publicationController.findPublicationById); // Get a specific publication/topic by ID

router.put("/:id", authenticate, publicationController.updatePublication); // Route to update a publication/topic by ID

router.delete("/:id", authenticate, publicationController.deletePublication); // Route to delete a publication/topic by ID
// Route to create a new publication/topic

router.get("/users", adminController.getAllUsers); // Get all users
export default router;
