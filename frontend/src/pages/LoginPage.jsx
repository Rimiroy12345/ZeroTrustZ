import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, storeSession } from "../api";
import "../styles/login.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const result = await loginUser(email, password);

      if (!result?.token) {
        throw new Error("Authentication succeeded without a session token.");
      }

      storeSession(result.token, result.userId || email, rememberDevice);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Authentication failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          Back to ZeroTrustZ
        </Link>

        <div className="login-brand">
          <div className="login-brand-mark">
            <ShieldCheck size={21} />
          </div>
          <span>ZeroTrustZ</span>
        </div>

        <div className="login-copy">
          <span className="login-kicker">SECURE ACCESS</span>
          <h1>Verify your identity before access begins.</h1>
          <p>
            ZeroTrustZ validates your credentials and session before granting
            access to the security console.
          </p>
        </div>

        <div className="login-side-panel">
          <div className="login-side-row">
            <span>Identity verification</span>
            <strong>Required</strong>
          </div>
          <div className="login-side-row">
            <span>Session validation</span>
            <strong>Required</strong>
          </div>
          <div className="login-side-row">
            <span>Policy evaluation</span>
            <strong>Continuous</strong>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-card-icon">
            <LockKeyhole size={22} />
          </div>

          <span className="login-card-label">ADMIN CONSOLE</span>
          <h2>Sign in to continue</h2>
          <p>
            Use the authorized ZeroTrustZ admin credentials configured on the
            backend.
          </p>

          <form onSubmit={handleSubmit}>
            <label>
              Email address
              <input
                type="email"
                placeholder="admin@zerotrustz.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </label>

            <div className="login-options">
              <label className="remember-box">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                />
                <span>Remember this device</span>
              </label>
            </div>

            {error && (
              <div
                style={{
                  marginBottom: "12px",
                  color: "#b42318",
                  fontSize: "12px",
                }}
              >
                {error}
              </div>
            )}

            <button
              className="login-submit"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Verifying..." : "Continue securely"}
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="login-security-note">
            <ShieldCheck size={15} />
            Credentials are validated by the deployed C++ backend
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
