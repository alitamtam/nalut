import { Role } from "@prisma/client";

export interface Permission {
  id: number;
  roleId: number;
  section: string;
  action: string;
  granted: boolean;
  role?: Role;
}