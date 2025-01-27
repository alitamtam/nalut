import prisma from "../../prisma/index.js";

const peopleController = {
  async findAllPeople(req, res) {
    try {
      const people = await prisma.people.findMany({
        take: 100, // Limit to 100 people
        orderBy: {
          createdAt: "desc", // Sort by createdAt in descending order
        },
        include: {
          user: {
            select: {
              username: true,
            },
          }, // Include the related user, if exists
        },
      });

      res.status(200).json(people);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch people" });
    }
  },

  async getPersonById(req, res) {
    const { id } = req.params;
    try {
      const person = await prisma.people.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          user: {
            select: {
              username: true,
            },
          }, // Include the related user, if exists
        },
      });

      if (!person) {
        return res.status(404).json({ error: "Person not found" });
      }

      res.status(200).json(person);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch person" });
    }
  },

  async createPerson(req, res) {
    try {
      const { name, description, image, userId } = req.body;

      const newPerson = await prisma.people.create({
        data: {
          name,
          description,
          image,
          userId, // Optional: Associate with a User if provided
        },
      });

      res.status(201).json(newPerson); // Success response with new person data
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create person" });
    }
  },

  async updatePerson(req, res) {
    const { id } = req.params;
    const { name, description, image, userId } = req.body;

    try {
      const updatedPerson = await prisma.people.update({
        where: { id: parseInt(id, 10) },
        data: {
          name,
          description,
          image,
          userId,
        },
      });

      res.status(200).json(updatedPerson);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update person" });
    }
  },

  async deletePerson(req, res) {
    const { id } = req.params;

    try {
      await prisma.people.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete person" });
    }
  },
};

export default peopleController;
