import { useComplaints } from "../hooks/useComplaints";
import StatCard from "../compoments/StatCard";
import Spinner from "../compoments/Spinner";


export default function Dashboard() {
  const { complaints, loading } = useComplaints();

  if (loading) return <Spinner />;

  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "PENDING").length;
  const progress = complaints.filter(c => c.status === "IN_PROGRESS").length;
  const resolved = complaints.filter(c => c.status === "RESOLVED").length;

  return (
    
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total" value={total} />
        <StatCard title="Pendientes" value={pending} />
        <StatCard title="En Progreso" value={progress} />
        <StatCard title="Resueltos" value={resolved} />
      </div>
    </div>
  );
}
