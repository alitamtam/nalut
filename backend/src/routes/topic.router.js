import express from "express";

import topicsController from "../controllers/topicController.js";
const router = express.Router();

router.get("/", topicsController.findAllTopics);
router.get("/topic/:id", topicsController.findTopicById);

router.post("/", topicsController.createTopic);

router.put("/topic/:id", topicsController.updateTopic);

router.delete("/topic/:id", topicsController.deleteTopic);

export default router;
