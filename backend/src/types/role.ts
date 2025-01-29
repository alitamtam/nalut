import { Permission, UserRole } from "@prisma/client";

export interface Role {
  id: number;
  name: string;
  description?: string;
  hierarchyLevel: number;
  defaultRole: boolean;
  userRoles: UserRole[];
  permissions: Permission[];
}