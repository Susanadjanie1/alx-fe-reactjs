import React from "react";
import { Navigate } from "react-router-dom";

// Simulate authentication
function useAuth() {
  const isAuthenticated = true; // Change to false to test redirect
  return { isAuthenticated };
}

function ProtectedRoute({ children }) {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
