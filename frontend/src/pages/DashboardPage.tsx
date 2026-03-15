/**
 * TODO: Implement the Dashboard Page.
 *
 * This is the protected page the user lands on after a successful login.
 *
 * Acceptance Criteria:
 * 1. Display a welcome message (e.g., "Welcome to the Dashboard").
 * 2. Display the `accessToken` retrieved from localStorage so you can
 *    confirm the login flow worked end-to-end.
 *
 * Stretch goal (optional):
 * - Add a "Logout" button that clears localStorage and redirects back to /login.
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve token gikan localStorage
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // If walay token, redirect sa login page
      navigate("/login");
    } else {
      setAccessToken(token);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div
      style={{
        padding: "40px",
        border: "1px solid #ebe8e8",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "40px auto",
        backgroundColor: "#ebe8e8",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "66px", color: "white" }}>
        Welcome to Dashboard
      </h1>
      <p style={{ fontSize: "35px", color: "blue" }}>You are logged in.</p>

      {accessToken && (
        <p style={{ fontSize: "20px", wordBreak: "break-all", fontStyle : "underline", color: "#856100" } }>
          <strong>Access Token:</strong> {accessToken}
        </p>
      )}

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "18px",
          cursor: "pointer",
          border: "none",
          borderRadius: "4px",
          backgroundColor: "#ff0000",
          color: "#fff",
        }}
      >
        Logout
      </button>
    </div>
  );
}