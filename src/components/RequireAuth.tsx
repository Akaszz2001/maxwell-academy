// src/components/RequireAuth.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface RequireAuthProps {
  children: JSX.Element;
  role?: "student" | "faculty" | "admin"; // optional required role
}

export default function RequireAuth({ children, role }: RequireAuthProps) {
  const { user, isAuthenticated, checkAuth } = useAuthStore();

  console.log("REQUIRE AUTH",user);
  
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    } else if (role && user?.role !== role) {
      navigate("/unauthorized"); // redirect if role mismatch
    }
  }, [isAuthenticated, user, role, navigate]);

  return children;
}
