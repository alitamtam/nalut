import prisma from "../../prisma/index.js";

const topicsController = {
  // Fetch and return a list of all topics
  async findAllTopics(req, res, next) {
    try {
      const topics = await prisma.topic.findMany({
        orderBy: { id: "asc" }, // Order topics by ID or another field
        include: {
          publications: true, // Include related publications if needed
        },
      });
      res.status(200).json(topics); // Return the topics as JSON
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Fetch and return a specific topic by ID
  async findTopicById(req, res, next) {
    try {
      const { id } = req.params;
      const topic = await prisma.topic.findUnique({
        where: { id: parseInt(id) },
        include: {
          publications: true, // Include related publications if needed
        },
      });
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }
      res.status(200).json(topic); // Return the topic as JSON
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Create a new topic
  async createTopic(req, res, next) {
    try {
      const { name, iconClass } = req.body;
      const newTopic = await prisma.topic.create({
        data: {
          name,
          iconClass,
        },
      });
      res.status(201).json(newTopic); // Return the created topic
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Update an existing topic by ID
  async updateTopic(req, res, next) {
    try {
      const { id } = req.params;
      const { name, iconClass } = req.body;
      const updatedTopic = await prisma.topic.update({
        where: { id: parseInt(id) },
        data: {
          name,
          iconClass,
        },
      });
      res.status(200).json(updatedTopic); // Return the updated topic
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Delete a topic by ID
  async deleteTopic(req, res, next) {
    try {
      const { id } = req.params;
      const deletedTopic = await prisma.topic.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json(deletedTopic); // Return the deleted topic
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

export default topicsController;
