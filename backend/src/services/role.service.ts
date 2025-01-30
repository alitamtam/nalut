import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const RoleService = {
  async createRole(name: string, description: string, hierarchyLevel: number, defaultRole: boolean) {
    return await prisma.role.create({
      data: { name, description, hierarchyLevel, defaultRole },
    });
  },

  async getAllRoles() {
    return await prisma.role.findMany();
  },

  async getRoleById(id: number) {
    return await prisma.role.findUnique({
      where: { id },
    });
  },

  async updateRole(id: number, data: { name?: string; description?: string; hierarchyLevel?: number; defaultRole?: boolean }) {
    return await prisma.role.update({
      where: { id },
      data,
    });
  },

  async deleteRole(id: number) {
    return await prisma.role.delete({
      where: { id },
    });
  },

  async assignRole(userId: number, roleId: number) {
    return prisma.userRole.create({ data: { userId, roleId } });
},

async revokeRole(userId: number, roleId: number) {
    return prisma.userRole.deleteMany({ where: { userId, roleId } });
},

async getUserRoles(userId: number) {
    return prisma.userRole.findMany({ where: { userId }, include: { role: true } });
},

async getRolePermissions(roleId: number) {
    return prisma.permission.findMany({ where: { roleId } });
},
};
