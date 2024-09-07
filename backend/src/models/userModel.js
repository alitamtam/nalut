// models/userModel.js

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Create a new user
export const createUser = async (username, password, role = "admin") => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role,
      first_name: "",
      last_name: "",
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
