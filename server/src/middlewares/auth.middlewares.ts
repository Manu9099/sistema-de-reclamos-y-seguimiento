import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extiende la interfaz Request para incluir user
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}



export interface AuthUser {
  id: string;
  role: "ADMIN" | "USER";
}


export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({ message: "Solo ADMIN" });
  }
  next();
};



export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    // Asegura que decoded es del tipo AuthUser
    if (typeof decoded === "object" && decoded !== null && "role" in decoded && "id" in decoded) {
      req.user = decoded as AuthUser;
      next();
    } else {
      return res.status(401).json({ message: "Token inválido" });
    }
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
};



