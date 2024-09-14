import prisma from "../../prisma/index.js";

const publicationController = {
  // Fetch and return a list of publications
  async findAllPublications(req, res, next) {
    try {
      const topics = await prisma.publications.findMany({
        orderBy: { created_at: "desc" },
        include: {
          topic: true,
        },
      });
      res.status(200).json(topics); // Return the topics as JSON
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Fetch and return a specific publication/topic by ID
  async findPublicationById(req, res, next) {
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

  // Create a new publication
  // Create a new publication
  async createPublication(req, res, next) {
    try {
      const { title, topicId, topic, content, image, ownerId } = req.body;

      let topicToUse;

      // Handle the topic logic: Either use an existing topic or create a new one
      if (topicId) {
        // If topicId is provided, use the existing topic
        topicToUse = { connect: { id: parseInt(topicId) } };
      } else if (topic) {
        // If a new topic is provided, create the topic first
        const newTopic = await prisma.topics.create({
          data: {
            name: topic,
          },
        });
        topicToUse = { connect: { id: newTopic.id } };
      }

      // Create the publication with the base64 image and connect to ownerId
      const publication = await prisma.publications.create({
        data: {
          title,
          content,
          image, // Store base64-encoded image string
          created_at: new Date(),
          owner: { connect: { id: ownerId } }, // Connect to the owner by ID
          topic: topicToUse, // Either use the existing or newly created topic
        },
      });

      res.status(201).json(publication); // Return the created publication
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Update an existing publication by ID
  async updatePublication(req, res, next) {
    try {
      const { id } = req.params;
      const { title, topicName, content, image } = req.body;

      // Find the topic by name
      const topic = await prisma.topic.findUnique({
        where: { name: topicName },
      });

      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }

      // Update the publication with base64 image
      const updatedPublication = await prisma.publications.update({
        where: { id: parseInt(id) },
        data: {
          title,
          content,
          image, // Storing base64 image string
          topicId: topic.id,
        },
      });

      res.status(200).json(updatedPublication); // Return the updated publication
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Delete a publication by ID
  async deletePublication(req, res, next) {
    try {
      const { id } = req.params;
      const deletedPublication = await prisma.publications.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json(deletedPublication); // Return the deleted publication
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

export default publicationController;
