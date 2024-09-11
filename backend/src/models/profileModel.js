import { PrismaClient } from "@prisma/client";

// Create a new profile

export const findMany = async () => {
  try {
    const profiles = await prisma.profile.findMany();
    return profiles;
  } catch (error) {
    throw new Error(`Failed to fetch profiles: ${error.message}`);
  }
};

export const createProfile = async (data) => {
  try {
    const profile = await prisma.profile.create({
      data: {
        userId,
        bio,
        image, // Store the base64 image string
      },
    });
    return profile;
  } catch (error) {
    throw new Error(`Failed to create profile: ${error.message}`);
  }
};

// Get a profile by ID
export const getProfileById = async (id) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        id,
      },
    });
    return profile;
  } catch (error) {
    throw new Error(`Failed to get profile: ${error.message}`);
  }
};

// Update a profile by ID
export const updateProfileById = async (id, data) => {
  try {
    const profile = await prisma.profile.update({
      where: {
        id,
      },
      data,
    });
    return profile;
  } catch (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }
};

// Delete a profile by ID
export const deleteProfileById = async (id) => {
  try {
    const profile = await prisma.profile.delete({
      where: {
        id,
      },
    });
    return profile;
  } catch (error) {
    throw new Error(`Failed to delete profile: ${error.message}`);
  }
};
