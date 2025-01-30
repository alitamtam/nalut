import { User } from "@prisma/client";

export interface Vehicle {
  id: number;
  type: string;
  licensePlate: string;
  ownerId: number;
  owner?: User;
  createdAt: Date;
  updatedAt: Date;
}