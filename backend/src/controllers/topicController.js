import prisma from "../../prisma/index.js";

const topicsController = {
  // Fetch and return a list of all topics
  async findAllTopics(req, res, next) {
    try {
      const topics = await prisma.topic.findMany({
        take: 100, // Limit to 100 topics
        orderBy: { id: "asc" }, // Order topics by ID or another field
        include: {
          publications: true, // Include related publications if needed
          translations: true, // Include related translations if needed
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
      const lang = req.query.lang || "en"; // Default to 'en' if no language is specified

      const topic = await prisma.topic.findUnique({
        where: { id: parseInt(id) },
        include: {
          publications: true, // Include related publications if needed
          translations: {
            where: { language: lang },
          },
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
    const { name, iconClass, translations } = req.body;

    try {
      // Log the incoming request body for debugging

      // Validate input data
      if (!name) {
        return res.status(400).json({ message: "Name is required." });
      }

      if (!Array.isArray(translations) || translations.length === 0) {
        return res.status(400).json({ message: "Translations are required." });
      }

      // Check if a topic with the same name already exists
      const existingTopic = await prisma.topic.findUnique({
        where: { name },
      });

      if (existingTopic) {
        return res
          .status(400)
          .json({ message: "Topic with this name already exists." });
      }

      const newTopic = await prisma.topic.create({
        data: {
          name,
          iconClass,
          translations: {
            create: translations.map((translation) => ({
              language: translation.language,
              name: translation.name,
            })),
          },
        },
      });

      res.status(201).json(newTopic);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  // Update an existing topic by ID
  async updateTopic(req, res, next) {
    try {
      const { name, iconClass, translations } = req.body;
      const { id } = req.params;

      // Validate translations
      if (!Array.isArray(translations) || translations.length === 0) {
        return res.status(400).json({ message: "Translations are required." });
      }

      const updatedTopic = await prisma.topic.update({
        where: { id: parseInt(id) },
        data: {
          name,
          iconClass,
          translations: {
            upsert: translations.map((translation) => ({
              where: {
                // This should match your unique constraint in the model
                topicId_language: {
                  topicId: parseInt(id),
                  language: translation.language,
                },
              },
              update: { name: translation.name },
              create: {
                name: translation.name,
                language: translation.language,
              },
            })),
          },
        },
      });
      res.status(200).json(updatedTopic);
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
