import prisma from "../../prisma/index.js";

const eventsController = {
  async findAllEvents(req, res) {
    const lang = req.query.lang || "ar"; // Default to 'en' if no language is specified

    try {
      const events = await prisma.event.findMany({
        take: 100, // Limit to 100 events
        include: {
          translations: true, // Fetch all translations for the event
        },
        orderBy: {
          startTime: "desc", // Sort by start time in descending order
        },
      });

      res.status(200).json(events);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: "Failed to fetch events" });
    }
  },

  async getEventById(req, res) {
    const { id } = req.params;
    const lang = req.query.lang || "en"; // Default to 'en' if no language is specified

    try {
      const event = await prisma.event.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          // Corrected: Use include to fetch translations
          translations: {
            where: {
              language: lang, // Filter translations by the language parameter
            },
          },
        },
      });

      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      res.status(200).json(event);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: "Failed to fetch event" });
    }
  },
  async createEvent(req, res) {
    try {
      const {
        title,
        description,
        location,
        startTime,
        endTime,
        ownerId,
        image,
        link,
        translations, // Expecting translations from the request
      } = req.body;

      const newEvent = await prisma.event.create({
        data: {
          title,
          description,
          location,
          startTime: new Date(startTime), // Convert to Date object
          endTime: new Date(endTime), // Convert to Date object
          ownerId,
          image,
          link,
          translations: {
            create: translations, // Create translations for the event
          },
        },
      });

      console.log(req.body);
      res.status(201).json(newEvent); // Success response with new event data
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create event" });
    }
  },

  async updateEvent(req, res, next) {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      startTime,
      endTime,
      image,
      link,
      translations, // Expecting translations from the request
    } = req.body;

    try {
      const updatedEvent = await prisma.event.update({
        where: { id: parseInt(id, 10) },
        data: {
          title,
          description,
          location,
          startTime: new Date(startTime), // Ensure these are Date objects
          endTime: new Date(endTime), // Ensure these are Date objects
          image,
          link,
          translations: {
            upsert: translations.map((translation) => ({
              where: { id: translation.id || 0 }, // Assuming translations have an id for existing ones
              create: {
                title: translation.title,
                description: translation.description,
                location: translation.location,
                language: translation.language,
              },
              update: {
                title: translation.title,
                description: translation.description,
                location: translation.location,
              },
            })),
          },
        },
      });
      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update event" });
      next(error);
    }
  },

  async deleteEvent(req, res) {
    const { id } = req.params;
    try {
      await prisma.event.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete event" });
    }
  },
};

export default eventsController;
