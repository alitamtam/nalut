import { User } from "@prisma/client";

export interface Poll {
  id: number;
  question: string;
  options: any; // Use `any` for JSON fields, or define a specific type if possible
  image?: string;
  createdById: number;
  createdBy?: User;
  createdAt: Date;
  updatedAt: Date;
}