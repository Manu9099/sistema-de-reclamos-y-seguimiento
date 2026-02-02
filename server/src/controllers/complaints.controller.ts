import { Request, Response } from "express";

export const getComplaints = async (
  req: Request,
  res: Response
) => {
  return res.json([]);
};

export const createComplaint = async (
  req: Request,
  res: Response
) => {
  const { title, description } = req.body;

  return res.status(201).json({
    id: 1,
    title,
    description,
    status: "PENDING",
    priority: "LOW",
    createdAt: new Date().toISOString(),
  });
};

export const updateComplaintStatus = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { status } = req.body;

  return res.json({
    id: Number(id),
    status,
  });
};

export const getComplaintById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  return res.json({
    id: Number(id),
    title: "Reclamo ejemplo",
    description: "Detalle del reclamo",
    status: "IN_PROGRESS",
    priority: "HIGH",
    createdAt: new Date().toISOString(),
  });
}


