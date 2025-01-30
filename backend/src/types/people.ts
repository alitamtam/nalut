import { User } from "@prisma/client";

export interface People {
  id: number;
  name: string;
  description?: string;
  image?: string;
  userId?: number;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
}