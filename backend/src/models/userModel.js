// models/userModel.js

import prisma from "../../prisma/index.js";
import bcrypt from "bcrypt";

// Create a new user
export const createUser = async (username, password, role = "admin") => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role,
      firstName: "",
      lastName: "",
      email: "",
    },
  });
};

// Find a user by username
export const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const findMany = async () => {
  return await prisma.user.findMany();
};
export default { createUser, findUserByUsername, findUserById };
