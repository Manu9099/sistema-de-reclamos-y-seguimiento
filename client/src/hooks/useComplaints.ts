import { useEffect, useState } from "react";
import type { Complaint } from "../types/complaint";
import { getComplaints } from "../services/complaints.service";

export function useComplaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getComplaints()
      .then(setComplaints)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { complaints, loading, error };
}
