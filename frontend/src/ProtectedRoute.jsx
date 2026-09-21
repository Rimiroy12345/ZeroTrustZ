import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  getStoredToken,
  validateSession,
  clearStoredSession,
} from "./api";

function ProtectedRoute() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;

    const verifySession = async () => {
      const token = getStoredToken();

      if (!token) {
        if (active) setStatus("unauthorized");
        return;
      }

      try {
        const result = await validateSession(token);

        if (!active) return;

        if (result?.valid) {
          setStatus("authorized");
        } else {
          clearStoredSession();
          setStatus("unauthorized");
        }
      } catch (error) {
        console.error("Session validation failed:", error);
        clearStoredSession();
        if (active) setStatus("unauthorized");
      }
    };

    verifySession();

    return () => {
      active = false;
    };
  }, []);

  if (status === "checking") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#07111f",
          color: "white",
          fontFamily: "Inter, sans-serif",
        }}
      >
        Verifying Zero Trust session...
      </div>
    );
  }

  if (status === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
