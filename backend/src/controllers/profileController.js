import prisma from "../../prisma/index.js";

const profileController = {
  async getAllProfiles(req, res) {
    try {
      const profiles = await prisma.profile.findMany({
        include: {
          translations: true, // Fetch all translations for the event

          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      const profilesWithFullName = profiles.map((profile) => ({
        ...profile,
        fullName: `${profile.user.firstName} ${profile.user.lastName}`,
      }));

      res.status(200).json(profilesWithFullName);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profiles" });
    }
  },

  async getProfileById(req, res) {
    const { id } = req.params;
    const lang = req.query.lang || "en"; // Default to 'en' if no language is specified

    try {
      const profile = await prisma.profile.findUnique({
        where: { id: parseInt(id, 10) },
        include: {
          translations: true, // Fetch all translations for the event

          user: {
            select: {
              firstName: true,
              lastName: true,
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
        fullName: `${profile.user.firstName} ${profile.user.lastName}`,
      };

      res.status(200).json(profileWithFullName);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  },

  async createProfile(req, res) {
    const {
      userId,
      bio,
      title,
      translations, // Expecting translations from the request
    } = req.body;
    try {
      const profile = await prisma.profile.create({
        data: {
          userId,
          bio,
          title,
          translations: {
            create: translations, // Create translations for the event
          },
        },
      });
      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to create profile" });
    }
  },

  // Controller logic for updating or creating a profile
  async updateProfile(req, res) {
    const { id } = req.params;
    const { bio, image, title, translations } = req.body;

    try {
      // Check if profile exists
      let profile = await prisma.profile.findUnique({
        where: { userId: parseInt(id, 10) },
      });

      if (!profile) {
        // Create new profile
        profile = await prisma.profile.create({
          data: {
            userId: parseInt(id, 10),
            bio,
            image,
            title,
            translations: {
              create: translations.map((translation) => ({
                language: translation.language,
                title: translation.title,
                bio: translation.bio,
              })),
            },
          },
        });
      } else {
        // Update existing profile
        profile = await prisma.profile.update({
          where: { userId: parseInt(id, 10) },
          data: {
            bio,
            image,
            translations: {
              upsert: translations.map((translation) => ({
                where: { id: translation.id || 0 }, // Update or create based on existence of ID
                update: {
                  title: translation.title,
                  bio: translation.bio,
                },
                create: {
                  language: translation.language,
                  title: translation.title,
                  bio: translation.bio,
                },
              })),
            },
          },
        });
      }

      res.status(200).json(profile);
    } catch (error) {
      console.error("Error updating profile:", error);
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
