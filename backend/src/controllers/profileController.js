import prisma from "../../prisma/index.js";

const profileController = {
  async getAllProfiles(req, res) {
    try {
      const profiles = await prisma.profile.findMany({
        include: {
          user: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
      });

      const profilesWithFullName = profiles.map((profile) => ({
        ...profile,
        fullName: `${profile.user.first_name} ${profile.user.last_name}`,
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
        include: {
          user: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
      });

      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      // Add full name to the profile response
      const profileWithFullName = {
        ...profile,
        fullName: `${profile.user.first_name} ${profile.user.last_name}`,
      };

      res.status(200).json(profileWithFullName);
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
    const { bio, image } = req.body;
    console.log(
      "Profile update request received with ID:",
      id,
      "Bio:",
      bio,
      "Image:",
      image
    ); // Log for debugging

    try {
      const profile = await prisma.profile.update({
        where: { id: parseInt(id, 10) },
        data: { bio, image },
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
