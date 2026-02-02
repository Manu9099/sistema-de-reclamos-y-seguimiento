import { Role } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
       user?: JwtPayload | string;
      user?: {
        id: number;
        role: Role;
       
      };
    }
  }
}

export {};
