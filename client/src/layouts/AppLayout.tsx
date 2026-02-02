import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../util/auth";
import toast from "react-hot-toast";

export default function AppLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
     toast.success("Sesión cerrada");
  navigate("/login");
   
  };

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 flex gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/complaints">Reclamos</Link>
        <button onClick={handleLogout} className="ml-auto">
          Salir
        </button>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
