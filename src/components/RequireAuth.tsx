import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface RequireAuthProps {
  children: JSX.Element;
  roles?: ("student" | "faculty" | "admin")[]; // allow multiple roles
}

export default function RequireAuth({ children, roles }: RequireAuthProps) {
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    } else if (roles && !roles.includes(user?.role)) {
      navigate("/unauthorized"); // redirect if role mismatch
    }
  }, [isAuthenticated, user, roles, navigate]);

  return children;
}
