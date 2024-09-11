import prisma from "../../prisma/index.js";

const profileController = {
  async getAllProfiles(req, res) {
    try {
      // Fetch profiles with user data (first_name, last_name)
      const profiles = await prisma.profile.findMany({
        include: {
          user: {
            select: {
              first_name: true, // Ensure this matches your database field
              last_name: true, // Corrected typo
            },
          },
        },
      });

      // Map through the profiles and concatenate first_name and last_name
      const profilesWithFullName = profiles.map((profile) => ({
        ...profile,
        fullName: `${profile.user.first_name} ${profile.user.last_name}`, // Add full name
      }));

      res.status(200).json(profilesWithFullName);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profiles" });
    }
  },

  async getProfileById(req, res) {
    const { id } = req.params;
    try {
      const profile = await prisma.profile.findUnique({
        where: { id: parseInt(id, 10) },
      });
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  },

  async createProfile(req, res) {
    const { userId, bio } = req.body;
    try {
      const profile = await prisma.profile.create({
        data: { userId, bio },
      });
      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to create profile" });
    }
  },

  async updateProfile(req, res) {
    const { id } = req.params;
    const { bio } = req.body;
    try {
      const profile = await prisma.profile.update({
        where: { id: parseInt(id, 10) },
        data: { bio },
      });
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to update profile" });
    }
  },

  async deleteProfile(req, res) {
    const { id } = req.params;
    try {
      await prisma.profile.delete({
        where: { id: parseInt(id, 10) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete profile" });
    }
  },
};

export default profileController;
