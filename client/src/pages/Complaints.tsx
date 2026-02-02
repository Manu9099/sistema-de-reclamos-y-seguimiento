import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import type { Complaint } from "../types/complaint";
import { useAuth } from "../hooks/useAuth";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Skeleton from "../compoments/Skeleton";

export default function Complaints() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [items, setItems] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /* ========================
     FETCH RECLAMOS
  ========================= */
  const fetchComplaints = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<Complaint[]>("/complaints");
      setItems(res.data);
    } catch {
      setError("No se pudieron cargar los reclamos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  /* ========================
     CREAR RECLAMO
  ========================= */
  const createComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/complaints", {
        title,
        description,
      });

      setTitle("");
      setDescription("");
      fetchComplaints();
    } catch {
      setError("Error al crear reclamo");
    }
  };

  /* ========================
     ACTUALIZAR ESTADO (ADMIN)
  ========================= */
  const updateStatus = async (
    id: number,
    status: Complaint["status"]
  ) => {
    try {
      await api.patch(`/complaints/${id}`, { status });
      fetchComplaints();
    } catch {
      setError("Error al actualizar estado");
    }
  };

  /* ========================
     GRAFICO: RECLAMOS POR MES
  ========================= */
  const complaintsByMonth = useMemo(() => {
    const map: Record<string, number> = {};

    items.forEach((c) => {
      const date = new Date(c.createdAt);
      const key = date.toLocaleString("es-PE", {
        month: "short",
        year: "numeric",
      });

      map[key] = (map[key] || 0) + 1;
    });

    return Object.entries(map).map(([month, total]) => ({
      month,
      total,
    }));
  }, [items]);

if (loading) {
  return (
    <div className="p-6 space-y-4">
      <Skeleton lines={5} />
      <Skeleton lines={4} />
    </div>
  );
}
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">📄 Reclamos</h1>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* ========================
          FORMULARIO
      ========================= */}
      <form
        onSubmit={createComplaint}
        className="space-y-2 border p-4 rounded"
      >
        <h2 className="font-semibold">Nuevo reclamo</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button
          type="submit"
          className=" bg-blue-600 text-white px-4 py-2 rounded
    transition
    hover:bg-blue-700
    active:scale-95"
        >
          Crear reclamo
        </button>
      </form>

      {/* ========================
          LISTADO
      ========================= */}
      {items.length === 0 && (
        <p className="text-gray-500 text-sm">
          No hay reclamos registrados.
        </p>
      )}

      <ul className="space-y-3">
        {items.map((c) => (
          <li key={c.id} className="border rounded p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{c.title}</h3>
              <span className="text-xs px-2 py-1 rounded bg-gray-200">
                {c.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-1">
              {c.description}
            </p>

            {/* SOLO ADMIN */}
            {isAdmin && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() =>
                    updateStatus(c.id, "IN_PROGRESS")
                  }
                  className="text-xs px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  En proceso
                </button>

                <button
                  onClick={() =>
                    updateStatus(c.id, "RESOLVED")
                  }
                  className="text-xs px-2 py-1 bg-green-600 text-white rounded"
                >
                  Resuelto
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* ========================
          GRAFICO MENSUAL
      ========================= */}
      <div className="border rounded p-4 bg-white">
        <h2 className="font-semibold mb-3">
          📊 Reclamos por mes
        </h2>

        {complaintsByMonth.length === 0 ? (
          <p className="text-sm text-gray-500">
            No hay datos para mostrar
          </p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complaintsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="total" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
