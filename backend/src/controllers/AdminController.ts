import { Request, Response } from "express";
import prisma from "../../config/db";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/auth.middleware";
import { User, RegisterUserInput, LoginUserInput, UpdateUserInput } from "../types/user";


const AdminController = {
  async registerUser(req: Request, res: Response) {
    try {
      const { username, email, password }: RegisterUserInput = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const registeredUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      
      }) as User;

      res.status(201).json({ message: "User created successfully", user: registeredUser });
    } catch (error: any) {
      if (error.code === "P2002") {
        res.status(409).json({ message: "Username or email already exists" });
      } else {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  async logIn(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
  
    try {
      const user = await prisma.user.findUnique({
        where: { username },
        include: {
          userRoles: {
            include: {
              role: true, // Ensure role details are included
            },
          },
        },
      });
  
      if (!user) {
        res.status(400).json({ error: "Invalid username or password" });
        return;
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(400).json({ error: "Invalid username or password" });
        return;
      }
  
      // Extract role names correctly
      const token = generateToken({
        id: user.id,
        username: user.username,
        email: user.email,
        userRoles: user.userRoles, // Ensure role names are extracted in generateToken
      });
  
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          roles: user.userRoles.map((ur) => ur.role.name), // Extract role names explicitly
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error logging in" });
    }
  },



  async logout(req: Request, res: Response) {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  },

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        include: {
          userRoles: true,
          organization: true,
        },
        take: 100,
      });
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching users" });
    }
  },

  async getUserById(req: Request, res: Response): Promise<void>  {
    const userId = parseInt(req.params.id);

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          userRoles: true,
          organization: true,
        },
      });

      if (!user) {
         res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving user" });
    }
  },

  async updateUser(req: Request, res: Response): Promise<void>  {
    const userId = parseInt(req.params.id);
    const { username, email, oldPassword, newPassword }: UpdateUserInput = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      let hashedPassword = user.password;
      if (oldPassword && newPassword) {
        const validOldPassword = await bcrypt.compare(oldPassword, user.password);
        if (!validOldPassword) {
          res.status(400).json({ message: "Old password is incorrect" });
          return;
        }
        hashedPassword = await bcrypt.hash(newPassword, 10);
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          username: username || user.username,
          email: email || user.email,
          password: hashedPassword,
        },
      });

      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating user" });
    }
  },

  async deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);

    try {
      await prisma.user.delete({ where: { id: userId } });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting user" });
    }
  },
};

 export default AdminController;
;