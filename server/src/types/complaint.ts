export type ComplaintStatus = "PENDING" | "IN_PROGRESS" | "RESOLVED";
export type ComplaintPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Complaint {
  id: number;
  title: string;
  description: string;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  createdAt: string;
}
