import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const eventsController = {
  async findAllEvents(req, res) {
    try {
      const events = await prisma.event.findMany();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  },

  async getEventById(req, res) {
    const { id } = req.params;
    try {
      const event = await prisma.event.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(event);
    } catch (error) {
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
      } = req.body;

      const newEvent = await prisma.event.create({
        data: {
          title,
          description,
          location,
          startTime: new Date(startTime), // Convert to Date object
          endTime: new Date(endTime), // Convert to Date object
          ownerId, // Use ownerId, not owner
          image,
          link,
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
    const { title, description, location, startTime, endTime, image, link } =
      req.body;
    console.log("Request Body:", req.body); // Debugging line

    try {
      const updatedEvent = await prisma.event.update({
        where: { id: parseInt(id, 10) },

        data: {
          title,
          description,
          location,
          startTime,
          endTime,
          image,
          link,
        },
      });
      res.status(200).json(updatedEvent);
    } catch (error) {
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
