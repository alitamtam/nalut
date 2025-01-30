import { User } from "@prisma/client";

export interface Incident {
  id: number;
  type: string;
  description: string;
  date: Date;
  location: string;
  image?: string;
  reportedById: number;
  reportedBy?: User;
  createdAt: Date;
  updatedAt: Date;
}