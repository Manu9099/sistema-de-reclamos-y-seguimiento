import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button
      onClick={logout}
      className="text-sm bg-red-600 text-white px-3 py-1 rounded"
    >
      Logout
    </button>
  );
}
