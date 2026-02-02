import { z } from "zod";

export const createComplaintSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().min(10),
  }),
});

export const updateStatusSchema = z.object({
  body: z.object({
    status: z.enum(["PENDING", "IN_PROGRESS", "RESOLVED"]),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});
