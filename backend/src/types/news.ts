import { User } from "@prisma/client";

export interface News {
  id: number;
  title: string;
  content: string;
  image?: string;
  authorId: number;
  author?: User;
  createdAt: Date;
  updatedAt: Date;
}