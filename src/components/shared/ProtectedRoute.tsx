import { type ReactNode } from "react";
import useRequireAuth from "@/hooks/useRequireAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  useRequireAuth();

  return <>{children}</>;
};

export default ProtectedRoute;
