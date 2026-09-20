import { ArrowLeft, ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/login.css";

function LoginPage() {
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
            ZeroTrustZ evaluates identity, authentication context, and device
            trust before granting access to protected resources.
          </p>
        </div>

        <div className="login-side-panel">
          <div className="login-side-row">
            <span>Identity verification</span>
            <strong>Required</strong>
          </div>
          <div className="login-side-row">
            <span>Device posture</span>
            <strong>Checked</strong>
          </div>
          <div className="login-side-row">
            <span>Session validation</span>
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
            Use your authorized ZeroTrustZ credentials to access the security
            console.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/dashboard";
            }}
          >
            <label>
              Email address
              <input type="email" placeholder="admin@zerotrustz.dev" required />
            </label>

            <label>
              Password
              <input type="password" placeholder="Enter your password" required />
            </label>

            <div className="login-options">
              <label className="remember-box">
                <input type="checkbox" />
                <span>Remember this device</span>
              </label>

              <button type="button" className="forgot-button">
                Forgot password?
              </button>
            </div>

            <button className="login-submit" type="submit">
              Continue securely
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="login-security-note">
            <ShieldCheck size={15} />
            Protected by continuous Zero Trust verification
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;