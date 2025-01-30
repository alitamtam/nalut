import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define the structure of the user payload in the JWT token
interface UserPayload {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

// Extend the Express Request type to include the `user` property
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

// Generate Token and Store it Securely in HTTP-Only Cookie
export const generateToken = (user: {
  id: number;
  username: string;
  email: string;
  userRoles: { role: { name: string } }[];
}): string => {
  const roles = user.userRoles.map((userRole) => userRole.role.name);
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email, roles },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
};

// Middleware to Authenticate Tokens
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]; // Check cookies and headers

  if (!token) {
    res.status(401).json({ error: "Access denied: No token provided" });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    req.user = verified;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Utility for Role-Based Authorization
const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized: User not authenticated" });
      return;
    }

    const hasPermission = req.user.roles.some((role) => allowedRoles.includes(role));
    if (!hasPermission) {
      res.status(403).json({ error: "Forbidden: Insufficient permissions" });
      return;
    }

    next(); // Proceed if the user has the required role
  };
};

// Middleware to check if user has permission for a specific section and action
export const authorize = (section: string, action: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Unauthorized: User not authenticated" });
        return;
      }

      const userId = req.user.id;

      // Fetch user roles and permissions from the database
      const userRoles = await prisma.userRole.findMany({
        where: { userId },
        include: { role: { include: { permissions: true } } },
      });

      if (!userRoles.length) {
        res.status(403).json({ error: "Forbidden: No roles assigned to user" });
        return;
      }

      // Check if the user has the required permission
      const hasPermission = userRoles.some((userRole) =>
        userRole.role.permissions.some(
          (permission) =>
            permission.section === section &&
            permission.action === action &&
            permission.granted
        )
      );

      if (!hasPermission) {
        res.status(403).json({ error: "Forbidden: You don't have permission" });
        return;
      }

      next(); // Proceed if the user has the required permission
    } catch (error) {
      console.error("Authorization error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};

// Role-Based Access Control Middleware
export const authorizeSuperadmin = authorizeRole(["superuser"]);
export const authorizeHealthEditor = authorizeRole(["superuser", "health-editor"]);
export const authorizeStoryEditor = authorizeRole(["superuser", "story-editor"]);
export const authorizeEventEditor = authorizeRole(["superuser", "event-editor"]);
export const authorizeGeneralUser = authorizeRole(["superuser", "general-user"]);
export const authorizePeopleEditor = authorizeRole(["superuser", "people-editor"]);
export const authorizeNewsEditor = authorizeRole(["superuser", "news-editor"]);

// Alias for authenticateToken
export const authenticate = authenticateToken;