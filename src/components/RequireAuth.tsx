// src/components/RequireAuth.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ only run once on mount
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // ✅ run when auth state changes
    if (isAuthenticated === false) {
      navigate("/login");
    } else if (user?.role === "admin") {
      navigate("/admin");
    } 
  }, [isAuthenticated, user, navigate]);

  return children;
}
