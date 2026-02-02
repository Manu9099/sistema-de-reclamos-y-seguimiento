import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db";
import { env } from "../../config/env";

/**
 * LOGIN
 */
export const login = async (email: string, password: string) => {
  // 1. Buscar usuario
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  // 2. Comparar contraseña
  const isValidPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!isValidPassword) {
    throw new Error("Credenciales inválidas");
  }

  // 3. Generar JWT
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  // 4. Respuesta controlada
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
};

/**
 * REGISTER (solo para seed o admin)
 */
export const register = async (
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
};
