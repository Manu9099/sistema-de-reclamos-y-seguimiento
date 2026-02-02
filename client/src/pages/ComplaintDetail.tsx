import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Complaint } from "../types/complaint";

export default function ComplaintDetail() {
  const { id } = useParams();
  const [complaint, setComplaint] =
    useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/complaints/${id}`)
      .then((res) => setComplaint(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!complaint)
    return <p>No encontrado</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">
        {complaint.title}
      </h1>

      <p className="mt-2">
        {complaint.description}
      </p>

      <p className="mt-4 text-sm">
        Estado: {complaint.status}
      </p>

      <p className="text-sm">
        Prioridad: {complaint.priority}
      </p>
    </div>
  );
}
