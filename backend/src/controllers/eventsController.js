import prisma from "../../prisma/index.js";

const eventsController = {
  async findAllEvents(req, res) {
    try {
      const events = await prisma.event.findMany({
        include: {
          title: true,
          description: true,
          date: true,
          time: true,
          location: true,
          user: true,
        },
        user: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      });

      res.status(200).json(profilesWithFullName);
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
    const { title, description, date, time, location } = req.body;
    try {
      const newEvent = await prisma.event.create({
        data: {
          title,
          description,
          date,
          time,
          location,
          owner,
        },
      });
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ error: "Failed to create event" });
    }
  },

  async updateEvent(req, res) {
    const { id } = req.params;
    const { title, description, date, time, location, userId } = req.body;
    try {
      const updatedEvent = await prisma.event.update({
        where: {
          id: Number(id),
        },
        data: {
          title,
          description,
          date,
          time,
          location,
          userId,
        },
      });
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(500).json({ error: "Failed to update event" });
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
