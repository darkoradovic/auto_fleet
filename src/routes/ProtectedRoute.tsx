import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import type { JSX } from "react";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}
