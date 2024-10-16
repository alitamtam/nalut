import prisma from "../../prisma/index.js";

const publicationController = {
  // Fetch and return a list of publications
  async findAllPublications(req, res, next) {
    try {
      const lang = req.query.lang || "en"; // Default to 'en' if no language is specified
      const publications = await prisma.publication.findMany({
        take: 500, // Limit to 100 events

        orderBy: { createdAt: "desc" },
        include: {
          topic: {
            select: {
              name: true,
              iconClass: true,
              translations: { where: { language: lang } },
            },
          },
          owner: {
            select: {
              firstName: true,
              lastName: true,
              profile: {
                select: {
                  bio: true,
                  image: true,
                  id: true,
                  translations: { where: { language: lang } },
                },
              },
            },
          },
          translations: {
            where: {
              language: lang,
            },
          },
        },
      });
      res.status(200).json(publications);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Fetch and return a specific publication/topic by ID
  // Fetch and return a specific publication with translations by ID
  async findPublicationById(req, res, next) {
    const { id } = req.params;
    const lang = req.query.lang || "en"; // Default to 'en' if no language is specified

    try {
      const publication = await prisma.publication.findUnique({
        where: { id: parseInt(id, 10) }, // Use parseInt with radix
        include: {
          topic: true,
          owner: {
            select: {
              firstName: true,
              lastName: true,
              profile: {
                select: {
                  bio: true,
                  image: true,
                  id: true,
                  translations: { where: { language: lang } },
                },
              },
            },
          },
          translations: {
            where: {
              language: lang,
            },
          },
        },
      });

      if (!publication) {
        return res.status(404).json({ message: "Publication not found" });
      }

      res.status(200).json(publication); // Return the publication as JSON
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  // Create a new publication with translations
  async createPublication(req, res, next) {
    try {
      const {
        title,
        topicId,
        topic,
        iconClass,
        content,
        image,
        ownerId,
        translations,
      } = req.body;
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
        return res
          .status(400)
          .json({ error: "Either topicId or topic must be provided." });
      }

      // Create the publication
      const publication = await prisma.publication.create({
        data: {
          title,
          content,
          image,
          createdAt: new Date(),
          owner: { connect: { id: ownerId } },
          topic: topicData,
          // Include translations in the publication creation
          translations: {
            create: translations.map((translation) => ({
              language: translation.language,
              title: translation.title,
              content: translation.content,
              content2: translation.content2 || null,
              content3: translation.content3 || null,
            })),
          },
        },
      });

      res.status(201).json(publication);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  // Update an existing publication by ID with translations
  async updatePublication(req, res, next) {
    try {
      const { id } = req.params;
      const { title, topicName, content, image, translations } = req.body;

      let topicId = null;

      // Check if topicName is provided and update the topic
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

      // Update the publication
      const updatedPublication = await prisma.publication.update({
        where: { id: parseInt(id, 10) },
        data: {
          title,
          content,
          image, // Storing base64 image string
          ...(topicId && { topicId }), // Only update topicId if it's valid
          // Update translations
          translations: {
            upsert: translations.map((translation) => ({
              where: {
                publicationId_language: {
                  publicationId: parseInt(id, 10),
                  language: translation.language,
                },
              },
              update: {
                title: translation.title,
                content: translation.content,
                content2: translation.content2 || null,
                content3: translation.content3 || null,
              },
              create: {
                language: translation.language,
                title: translation.title,
                content: translation.content,
                content2: translation.content2 || null,
                content3: translation.content3 || null,
              },
            })),
          },
        },
        include: {
          translations: true, // Return translations with the updated publication
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
      const deletedPublication = await prisma.publication.delete({
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
