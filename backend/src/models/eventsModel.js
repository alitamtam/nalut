import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getAllEvents = async () => {
  return await prisma.event.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
};

export const getEventById = async (id) => {
  return await prisma.event.findUnique({
    where: { id: parseInt(id) },
  });
};

export const createEvent = async ({
  title,
  description,
  location,
  startTime,
  endTime,
  image,
  owner,
}) => {
  return await prisma.event.create({
    data: {
      title,
      description,
      location,
      startTime,
      endTime,
      owner,
      image,

      created_at: new Date(),
    },
  });
};

export const updateEvent = async (id, data) => {
  return await prisma.event.update({
    where: { id: parseInt(id) },
    data: {
      ...data,
      updated_at: new Date(),
    },
  });
};

export const deleteEvent = async (id) => {
  return await prisma.event.delete({
    where: { id: parseInt(id) },
  });
};

export const getEventByDate = async (date) => {
  return await prisma.event.findMany({
    where: { date: date },
  });
};
