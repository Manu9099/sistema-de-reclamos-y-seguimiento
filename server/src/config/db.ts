// src/lib/db.ts
import { PrismaClient } from "../generated/prisma/client";

export const prisma = new PrismaClient();

// Agrega logging para debug
console.log('Prisma Client inicializado desde generated');
console.log('Modelos disponibles:', Object.keys(prisma));

export default prisma;