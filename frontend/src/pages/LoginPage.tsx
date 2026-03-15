/**
 * TODO: Implement the Login Page.
 *
 * This component should render the login form at route /login.
 *
 * Acceptance Criteria:
 * 1. A text input for `username`.
 * 2. A password input for `password` (characters must be masked).
 * 3. A "Sign In" button that is DISABLED when either field is empty.
 * 4. On submit, call POST http://localhost:3000/auth/login with { username, password }.
 * 5. On success (201): save the returned `accessToken` to localStorage,
 *    then redirect the user to /dashboard.
 * 6. On failure (401): display a red error message to the user.
 *
 * Hints:
 * - Use the `useState` hook to manage form field values and error state.
 * - Use the `useNavigate` hook from react-router-dom for redirection.
 * - Use the native `fetch` API or install `axios` to make the HTTP request.
 */

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      const token = response.data.accessToken;

      localStorage.setItem("accessToken", token);

      navigate("/dashboard");

    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const isDisabled = username === "" || password === "";

  return (


    <div className="login-container flex flex-col items-center justify-center min-h-screen bg-gray-100">
       
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Sign In</h2>

        <input
          className="bg=red"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={isDisabled}>
          Sign In
        </button>

        {error && <h1 className="error">{error}</h1>}
      </form>
    </div>
       
  );
}
