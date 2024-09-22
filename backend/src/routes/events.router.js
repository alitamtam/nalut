import express from "express";
import eventsController from "../controllers/eventsController.js";

const router = express.Router();

// Route to fetch and render all events
router.get("/events", eventsController.findAllEvents);

// Route to find and render an event by ID
router.get("/events/:id", eventsController.getEventById);

// Route to create a new event
router.post("/events", eventsController.createEvent);

// Route to update an event by ID
router.put("/events/:id", eventsController.updateEvent);

// Route to delete an event by ID
router.delete("/events/:id", eventsController.deleteEvent);

export default router;
