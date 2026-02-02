export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white border rounded p-4 shadow hover:shadow-md transition">
      <p className="    border rounded p-4
    transition
    hover:shadow-md
    hover:-translate-y-0.5">{title}</p>
      <p className="    border rounded p-4
    transition
    hover:shadow-md
    hover:-translate-y-0.5">{value}</p>
    </div>
  );
}
