import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface ProtectedRouteProps {
  role: string;
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  role,
  component: Component,
}) => {
  const { token, role: userRole } = useSelector(
    (state: RootState) => state.auth
  );
  if (!token || userRole !== role) {
    return <Navigate to="/" />;
  }
  return <Component />;
};

export { ProtectedRoute };
