import { User, Role } from "@prisma/client";

export interface UserRole {
  id: number;
  userId: number;
  roleId: number;
  user?: User;
  role?: Role;
}