import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

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
}) => {
  const roles = user.userRoles.map((userRole) => userRole.role.name);
  
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email, roles },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
};

// Middleware to Authenticate Tokens
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.token; // Read from HTTP-only cookie

  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return; // ✅ Ensure function exits after sending response
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    req.user = verified;
    next(); // ✅ Always call next() when authentication succeeds
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};


// Utility for Role-Based Authorization
const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const hasPermission = req.user.roles.some(role => allowedRoles.includes(role));
    if (!hasPermission) {
      res.status(403).json({ error: "Forbidden: Insufficient permissions" });
      return;
    }

    next(); // ✅ Always call next() when the user is authorized
  };
};


// Role-Based Access Control Middleware
export const authorizeSuperadmin = authorizeRole(["superuser"]);
export const authorizeHealthEditor = authorizeRole(["superuser", "health-editor"]);
export const authorizeStoryEditor = authorizeRole(["superuser", "story-editor"]);
export const authorizeEventEditor = authorizeRole(["superuser", "event-editor"]);
export const authorizeGeneralUser = authorizeRole(["superuser", "general-user"]);

export const authenticate = authenticateToken;
