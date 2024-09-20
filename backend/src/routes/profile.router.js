// path routes/profile.router.js
import express from "express";
import profileController from "../controllers/profileController.js";
import { authenticate } from "../middleware/auth.middleware.js"; // Make sure to add this middleware if you have it
const router = express.Router();

// Define your routes here
router.get("/", profileController.getAllProfiles);
router.get("/:id", profileController.getProfileById);
router.post("/", profileController.createProfile);
router.put("/:userId", profileController.updateProfile);
router.delete("/:id", authenticate, profileController.deleteProfile);

export default router;
