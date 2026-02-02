import { Router } from "express";
import {
  getComplaints,
  createComplaint,
  updateComplaintStatus,
} from "../controllers/complaints.controller";
import { authMiddleware, requireAdmin } from "../middlewares/auth.middlewares";

const router = Router();

router.get("/", authMiddleware, getComplaints);

router.post("/", authMiddleware, createComplaint);

router.patch(
  "/:id",
  authMiddleware,
  requireAdmin, 
  updateComplaintStatus
);

export default router;

