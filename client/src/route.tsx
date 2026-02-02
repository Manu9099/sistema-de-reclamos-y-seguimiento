import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Complaints from "./pages/Complaints";
import ProtectedRoute from "./routes/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/complaints",
    element: (
      <ProtectedRoute>
        <Complaints />
      </ProtectedRoute>
    ),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
