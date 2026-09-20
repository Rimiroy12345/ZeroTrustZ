import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Filter,
  KeyRound,
  Search,
  ShieldAlert,
  ShieldCheck,
  User,
} from "lucide-react";

import { NavLink, Link, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import "../styles/modules.css";

const API_BASE_URL = "https://zerotrustz.onrender.com";

const navItems = [
  { name: "Overview", path: "/dashboard" },
  { name: "Access Requests", path: "/access" },
  { name: "Identities", path: "/identities" },
  { name: "Devices", path: "/devices" },
  { name: "Resources", path: "/resources" },
  { name: "Policies", path: "/policies" },
  { name: "Risk Monitor", path: "/risk" },
  { name: "Audit Logs", path: "/logs" },
];

const initialRequests = [
  {
    id: "REQ-1042",
    identity: "admin@zerotrustz.dev",
    resource: "production-api",
    device: "ZT-LAPTOP-042",
    location: "Pune, India",
    risk: "Low",
    decision: "Allow",
    reason: "Identity verified · Trusted device · Policy matched",
    time: "14:32:08",
  },
  {
    id: "REQ-1041",
    identity: "dev@zerotrustz.dev",
    resource: "finance-db",
    device: "ZT-WORKSTATION-17",
    location: "Mumbai, India",
    risk: "Critical",
    decision: "Deny",
    reason: "Resource sensitivity · Elevated risk score",
    time: "14:29:41",
  },
  {
    id: "REQ-1040",
    identity: "security@zerotrustz.dev",
    resource: "audit-storage",
    device: "ZT-LAPTOP-008",
    location: "Pune, India",
    risk: "Low",
    decision: "Allow",
    reason: "Identity verified · Device compliant",
    time: "14:25:12",
  },
  {
    id: "REQ-1039",
    identity: "unknown-user",
    resource: "admin-console",
    device: "UNTRUSTED",
    location: "Unknown",
    risk: "High",
    decision: "Deny",
    reason: "Unknown identity · Device trust failed",
    time: "14:21:56",
  },
];

function getStoredToken() {
  return (
    localStorage.getItem("zerotrustz_token") ||
    sessionStorage.getItem("zerotrustz_token")
  );
}

function trustToRisk(userTrustScore, deviceTrustScore) {
  const lowest = Math.min(Number(userTrustScore), Number(deviceTrustScore));

  if (lowest >= 80) return "Low";
  if (lowest >= 60) return "Medium";
  if (lowest >= 40) return "High";
  return "Critical";
}

function AccessRequestsPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(initialRequests);
  const [submitting, setSubmitting] = useState(false);
  const [evaluationError, setEvaluationError] = useState("");
  const [form, setForm] = useState({
    username: "admin@zerotrustz.dev",
    role: "admin",
    userTrustScore: 85,
    resource: "cloud-dashboard",
    action: "read",
    ipAddress: "127.0.0.1",
    deviceId: "ZT-LAPTOP-042",
    deviceTrustScore: 90,
  });

  const total = requests.length;
  const allowed = requests.filter((request) => request.decision === "Allow").length;
  const denied = requests.filter((request) => request.decision === "Deny").length;
  const highRisk = requests.filter(
    (request) => request.risk === "High" || request.risk === "Critical"
  ).length;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]:
        name === "userTrustScore" || name === "deviceTrustScore"
          ? Number(value)
          : value,
    }));
  };

  const evaluateRequest = async (event) => {
    event.preventDefault();

    const token = getStoredToken();

    if (!token) {
      navigate("/login");
      return;
    }

    setSubmitting(true);
    setEvaluationError("");

    try {
      const response = await fetch(API_BASE_URL + "/api/access/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(form),
      });

      if (response.status === 401) {
        localStorage.removeItem("zerotrustz_token");
        localStorage.removeItem("zerotrustz_userId");
        sessionStorage.removeItem("zerotrustz_token");
        sessionStorage.removeItem("zerotrustz_userId");
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (!data.decision) {
        throw new Error(data.error || "The policy engine returned an invalid response.");
      }

      const now = new Date();
      const newRequest = {
        id: "LIVE-" + Date.now().toString().slice(-6),
        identity: form.username,
        resource: form.resource,
        device: form.deviceId,
        location: form.ipAddress,
        risk: trustToRisk(form.userTrustScore, form.deviceTrustScore),
        decision: data.decision === "ALLOW" ? "Allow" : "Deny",
        reason: data.reason || "Zero Trust policy evaluation completed.",
        time: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };

      setRequests((current) => [newRequest, ...current]);
    } catch (error) {
      console.error("Access evaluation failed:", error);
      setEvaluationError(
        error.message || "Could not contact the Zero Trust policy engine."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <div className="dashboard-brand-mark">
            <ShieldCheck size={20} />
          </div>
          <span>ZeroTrustZ</span>
        </div>

        <div className="workspace-label">SECURITY CONSOLE</div>

        <nav className="dashboard-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                "dashboard-nav-item " + (isActive ? "active" : "")
              }
            >
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <Link to="/dashboard" className="logout-link">
            Back to overview
          </Link>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-search">
            <Search size={16} />
            <input placeholder="Search access requests..." />
          </div>

          <div className="topbar-right">
            <div className="connection-status">
              <span />
              Live C++ policy engine
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="dashboard-heading">
            <div>
              <span className="dashboard-eyebrow">ZERO TRUST DECISIONS</span>
              <h1>Access requests</h1>
              <p>
                Submit live authorization requests to the deployed C++ policy
                engine and inspect each Zero Trust decision.
              </p>
            </div>

            <button className="dashboard-action" type="button">
              <Filter size={15} />
              Live evaluation
            </button>
          </section>

          <section className="live-evaluation-panel">
            <div className="module-panel-header">
              <div>
                <span>LIVE POLICY TEST</span>
                <h3>Evaluate an access request</h3>
              </div>

              <div className="stream-status">
                <span />
                Backend connected
              </div>
            </div>

            <form className="evaluation-form" onSubmit={evaluateRequest}>
              <label>
                Identity
                <input
                  name="username"
                  value={form.username}
                  onChange={updateField}
                  required
                />
              </label>

              <label>
                Role
                <select name="role" value={form.role} onChange={updateField}>
                  <option value="admin">Admin</option>
                  <option value="security">Security</option>
                  <option value="developer">Developer</option>
                  <option value="analyst">Analyst</option>
                </select>
              </label>

              <label>
                User trust
                <input
                  name="userTrustScore"
                  type="number"
                  min="0"
                  max="100"
                  value={form.userTrustScore}
                  onChange={updateField}
                  required
                />
              </label>

              <label>
                Resource
                <input
                  name="resource"
                  value={form.resource}
                  onChange={updateField}
                  required
                />
              </label>

              <label>
                Action
                <select name="action" value={form.action} onChange={updateField}>
                  <option value="read">Read</option>
                  <option value="write">Write</option>
                  <option value="delete">Delete</option>
                  <option value="admin">Admin</option>
                </select>
              </label>

              <label>
                IP address
                <input
                  name="ipAddress"
                  value={form.ipAddress}
                  onChange={updateField}
                  required
                />
              </label>

              <label>
                Device ID
                <input
                  name="deviceId"
                  value={form.deviceId}
                  onChange={updateField}
                  required
                />
              </label>

              <label>
                Device trust
                <input
                  name="deviceTrustScore"
                  type="number"
                  min="0"
                  max="100"
                  value={form.deviceTrustScore}
                  onChange={updateField}
                  required
                />
              </label>

              <button
                type="submit"
                className="evaluation-submit"
                disabled={submitting}
              >
                <KeyRound size={16} />
                {submitting ? "Evaluating..." : "Evaluate with C++ engine"}
              </button>
            </form>

            {evaluationError && (
              <div className="evaluation-error">
                <AlertTriangle size={15} />
                {evaluationError}
              </div>
            )}
          </section>

          <section className="module-stat-grid">
            <article>
              <span>Visible requests</span>
              <strong>{total}</strong>
              <small>Demo + live evaluations</small>
            </article>

            <article>
              <span>Allowed</span>
              <strong>{allowed}</strong>
              <small>Passed policy checks</small>
            </article>

            <article>
              <span>Denied</span>
              <strong>{denied}</strong>
              <small>Blocked by policy</small>
            </article>

            <article>
              <span>High-risk</span>
              <strong>{highRisk}</strong>
              <small>High or critical context</small>
            </article>
          </section>

          <section className="requests-layout">
            <article className="requests-panel">
              <div className="module-panel-header">
                <div>
                  <span>LIVE REQUEST STREAM</span>
                  <h3>Recent authorization decisions</h3>
                </div>

                <div className="stream-status">
                  <span />
                  Updating
                </div>
              </div>

              <div className="request-list">
                {requests.map((request) => (
                  <div className="request-card" key={request.id}>
                    <div className="request-leading">
                      <div
                        className={
                          "request-status-icon " + request.decision.toLowerCase()
                        }
                      >
                        {request.decision === "Allow" ? (
                          <CheckCircle2 size={18} />
                        ) : (
                          <ShieldAlert size={18} />
                        )}
                      </div>

                      <div>
                        <div className="request-title-line">
                          <strong>{request.identity}</strong>
                          <span>{request.id}</span>
                        </div>

                        <p>
                          requested access to <b>{request.resource}</b>
                        </p>
                      </div>
                    </div>

                    <div className="request-context">
                      <div>
                        <span>Device</span>
                        <strong>{request.device}</strong>
                      </div>

                      <div>
                        <span>Source</span>
                        <strong>{request.location}</strong>
                      </div>

                      <div>
                        <span>Risk</span>
                        <strong
                          className={
                            "risk-text " + request.risk.toLowerCase()
                          }
                        >
                          {request.risk}
                        </strong>
                      </div>

                      <div>
                        <span>Decision</span>
                        <strong
                          className={
                            "decision-text " + request.decision.toLowerCase()
                          }
                        >
                          {request.decision}
                        </strong>
                      </div>
                    </div>

                    <div className="request-bottom">
                      <span>{request.reason}</span>
                      <div>
                        <time>{request.time}</time>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <aside className="request-insights-panel">
              <div className="module-panel-header">
                <div>
                  <span>DECISION ENGINE</span>
                  <h3>Evaluation summary</h3>
                </div>
              </div>

              <div className="engine-stat">
                <div className="engine-icon">
                  <User size={17} />
                </div>

                <div>
                  <span>Session validation</span>
                  <strong>Required</strong>
                </div>
              </div>

              <div className="engine-stat">
                <div className="engine-icon">
                  <KeyRound size={17} />
                </div>

                <div>
                  <span>Policy engine</span>
                  <strong>C++ / Crow</strong>
                </div>
              </div>

              <div className="engine-stat">
                <div className="engine-icon">
                  <Activity size={17} />
                </div>

                <div>
                  <span>User trust threshold</span>
                  <strong>60 / 100</strong>
                </div>
              </div>

              <div className="engine-stat warning">
                <div className="engine-icon">
                  <AlertTriangle size={17} />
                </div>

                <div>
                  <span>Device trust threshold</span>
                  <strong>60 / 100</strong>
                </div>
              </div>

              <div className="engine-note">
                <ShieldCheck size={16} />
                Every submitted request is revalidated by the deployed backend.
                A valid session alone never guarantees access.
              </div>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AccessRequestsPage;
