import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";


export const requireRole =
  (role: "ADMIN" | "USER") =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || (req.user as any).role !== role) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  };


export const validate =
  (schema:  ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error: any) {
      return res.status(400).json(error.errors);
    }
  };
