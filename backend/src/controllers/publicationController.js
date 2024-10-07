import prisma from "../../prisma/index.js";

const publicationController = {
  // Fetch and return a list of publications
  async findAllPublications(req, res, next) {
    try {
      const publications = await prisma.publication.findMany({
        orderBy: { created_at: "desc" },
        include: {
          topic: true,
          owner: {
            // Owner is of type user
            select: {
              first_name: true,
              last_name: true,
              profile: {
                // Include the profile related to the user
                select: {
                  bio: true,
                  image: true,
                  id: true, // Include the profile ID for linking to the profile page
                },
              },
            },
          },
        },
      });
      res.status(200).json(publications); // Return the publications as JSON
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Fetch and return a specific publication/topic by ID
  async findPublicationById(req, res, next) {
    const { id } = req.params;

    try {
      const topic = await prisma.publications.findUnique({
        where: { id: parseInt(id, 10) }, // Use parseInt with radix
        include: {
          topic: true,
          owner: {
            // Owner is of type user
            select: {
              first_name: true,
              last_name: true,
              profile: {
                // Include the profile related to the user
                select: {
                  bio: true,
                  image: true,
                  id: true, // Include the profile ID for linking to the profile page
                },
              },
            },
          },
        }, // Include the topic and owner details
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
  async createPublication(req, res, next) {
    try {
      const { title, topicId, topic, iconClass, content, image, ownerId } =
        req.body;
      const topicIdInt = topicId ? parseInt(topicId, 10) : null;

      let topicData;

      if (topicIdInt) {
        // Connect to existing topic by ID
        topicData = { connect: { id: topicIdInt } };
      } else if (topic) {
        // Create a new topic if no topicId is provided
        topicData = {
          connectOrCreate: {
            where: { name: topic },
            create: {
              name: topic,
              iconClass: iconClass || "", // Use default empty string if iconClass is not provided
            },
          },
        };
      } else {
        // Handle cases where neither topicId nor topic is provided
        return res
          .status(400)
          .json({ error: "Either topicId or topic must be provided." });
      }

      // Create the publication with the base64 image and connect to ownerId
      const publication = await prisma.publications.create({
        data: {
          title,
          content,
          image, // Store base64-encoded image string
          created_at: new Date(),
          owner: { connect: { id: ownerId } }, // Connect to the owner by ID
          topic: topicData, // Connect or create the topic based on the data
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

      let topicId = null;

      // Check if topicName is provided
      if (topicName) {
        // Find the topic by name
        const topic = await prisma.topic.findUnique({
          where: { name: topicName },
        });

        // If the topic is not found, return a 404 error
        if (!topic) {
          return res.status(404).json({ message: "Topic not found" });
        }

        topicId = topic.id;
      }

      // Update the publication with base64 image and topicId (if available)
      const updatedPublication = await prisma.publications.update({
        where: { id: parseInt(id, 10) },
        data: {
          title,
          content,
          image, // Storing base64 image string
          ...(topicId && { topicId }), // Only update topicId if it's valid
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
