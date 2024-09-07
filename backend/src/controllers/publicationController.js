import prisma from "../../prisma/index.js";

const publicationController = {
  // Fetch and return a list of publications/topics
  async findAllTopics(req, res, next) {
    try {
      const topics = await prisma.publications.findMany({
        orderBy: { created_at: "desc" },
        take: 6,
      });
      res.status(200).json(topics); // Return the topics as JSON
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Fetch and return a specific publication/topic by ID
  async findTopicById(req, res, next) {
    try {
      const { id } = req.params;
      const topic = await prisma.publications.findUnique({
        where: { id: parseInt(id) },
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
};

export default publicationController;
