import { Request, Response } from "express";
import { RoleService } from "../services/role.service";

export const RoleController = {
  async create(req: Request, res: Response) {
    try {
      const { name, description, hierarchyLevel, defaultRole } = req.body;
      const role = await RoleService.createRole(name, description, hierarchyLevel, defaultRole);
      res.status(201).json(role);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const roles = await RoleService.getAllRoles();
      res.json(roles);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },

  async getOne   (req: Request, res: Response) {
    try {
      const role = await RoleService.getRoleById(Number(req.params.id));
      if (!role) 
         res.status(404).json({ error: "Role not found" });
      res.json(role);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const updatedRole = await RoleService.updateRole(Number(req.params.id), req.body);
      res.json(updatedRole);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await RoleService.deleteRole(Number(req.params.id));
      res.json({ message: "Role deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
  },
};
