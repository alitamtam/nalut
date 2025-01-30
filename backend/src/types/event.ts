import { Organization } from "@prisma/client";

export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  image?: string;
  organizerId: number;
  organizer?: Organization;
  createdAt: Date;
  updatedAt: Date;
}