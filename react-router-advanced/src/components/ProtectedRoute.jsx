import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = true; // simulate login

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}