import { Role, Organization, UserRole } from "@prisma/client";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  roleId?: number;
  organizationId?: number;
  userRoles: UserRole[];
  role?: Role;
  organization?: Organization;
}

export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
  roleId?: number;
  organizationId?: number;
}

export interface LoginUserInput {
  username: string;
  password: string;
}

export interface UpdateUserInput {
  username?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
 
}