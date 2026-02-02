import type { Complaint } from "../types/complaint";

const API_URL = "http://localhost:3000/api/complaints";

export async function getComplaints(): Promise<Complaint[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Error al obtener reclamos");
  }

  return res.json();
}
