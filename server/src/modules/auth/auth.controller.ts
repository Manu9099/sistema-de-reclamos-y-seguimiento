import { Request, Response } from "express";
import * as service from "./auth.service";

export const login = async (req: Request, res: Response) => {
  console.log("BODY LOGIN:", req.body);

  const { email, password } = req.body;
  const token = await service.login(email, password);

  res.json({ token });
};

export const register = async (req: Request, res: Response) => {
  console.log("BODY LOGIN:", req.body);
  const { email, password } = req.body;
  const result = await service.register(email, password);
  res.json(result);
};