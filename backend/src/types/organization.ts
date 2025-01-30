import { Event, User } from "@prisma/client";

export interface Organization {
  id: number;
  name: string;
  type: string;
  version?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  events?: Event[];
  users?: User[];
}