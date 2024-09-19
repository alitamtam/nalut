import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch all publications
export const getAllPublications = async () => {
  return await prisma.publications.findMany({
    orderBy: {
      created_at: "desc",
      include: {
        owner: true, // Include the owner relation
        profile: {
          // Use the correct relation name
          select: {
            name: true,
            bio: true,
            image: true,
          },
        },
      },
    },
  });
};

// Fetch a single publication by its ID
export const getPublicationById = async (id) => {
  return await prisma.publications.findUnique({
    where: { id: parseInt(id) },
    include: {
      owner: true, // Include the owner relation
      Profile: true,
    },
  });
};

// Create a new publication
export const createPublication = async ({ title, topic, content }) => {
  return await prisma.publications.create({
    data: {
      title,
      topic,
      content,
      created_at: new Date(), // Default to now
    },
  });
};

// Update a publication by its ID
export const updatePublication = async (id, data) => {
  return await prisma.publications.update({
    where: { id: parseInt(id) },
    data: {
      ...data,
      updated_at: new Date(), // Update the 'updated_at' field if you have it
    },
  });
};

// Delete a publication by its ID
export const deletePublication = async (id) => {
  return await prisma.publications.delete({
    where: { id: parseInt(id) },
  });
};
