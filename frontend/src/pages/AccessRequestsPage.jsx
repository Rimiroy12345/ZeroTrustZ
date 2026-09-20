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

import { NavLink, Link } from "react-router-dom";
import "../styles/dashboard.css";
import "../styles/modules.css";

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

const requests = [
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
  {
    id: "REQ-1038",
    identity: "analyst@zerotrustz.dev",
    resource: "analytics-api",
    device: "ZT-LAPTOP-019",
    location: "Bengaluru, India",
    risk: "Medium",
    decision: "Allow",
    reason: "Step-up verification completed",
    time: "14:18:32",
  },
];

function AccessRequestsPage() {
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
                `dashboard-nav-item ${isActive ? "active" : ""}`
              }
            >
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <Link to="/" className="logout-link">
            Exit console
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
              Live policy stream
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="dashboard-heading">
            <div>
              <span className="dashboard-eyebrow">ZERO TRUST DECISIONS</span>
              <h1>Access requests</h1>
              <p>
                Inspect every authorization decision with identity, device,
                risk, resource, and policy context.
              </p>
            </div>

            <button className="dashboard-action">
              <Filter size={15} />
              Filter requests
            </button>
          </section>

          <section className="module-stat-grid">
            <article>
              <span>Total requests</span>
              <strong>247</strong>
              <small>Last 24 hours</small>
            </article>

            <article>
              <span>Allowed</span>
              <strong>231</strong>
              <small>93.5% approval rate</small>
            </article>

            <article>
              <span>Denied</span>
              <strong>16</strong>
              <small>6.5% blocked</small>
            </article>

            <article>
              <span>High-risk</span>
              <strong>4</strong>
              <small>Requires review</small>
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
                        className={`request-status-icon ${request.decision.toLowerCase()}`}
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
                        <span>Location</span>
                        <strong>{request.location}</strong>
                      </div>

                      <div>
                        <span>Risk</span>
                        <strong
                          className={`risk-text ${request.risk.toLowerCase()}`}
                        >
                          {request.risk}
                        </strong>
                      </div>

                      <div>
                        <span>Decision</span>
                        <strong
                          className={`decision-text ${request.decision.toLowerCase()}`}
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
                  <span>Identity checks</span>
                  <strong>247 / 247</strong>
                </div>
              </div>

              <div className="engine-stat">
                <div className="engine-icon">
                  <KeyRound size={17} />
                </div>

                <div>
                  <span>Policy evaluations</span>
                  <strong>247</strong>
                </div>
              </div>

              <div className="engine-stat">
                <div className="engine-icon">
                  <Activity size={17} />
                </div>

                <div>
                  <span>Average decision time</span>
                  <strong>14 ms</strong>
                </div>
              </div>

              <div className="engine-stat warning">
                <div className="engine-icon">
                  <AlertTriangle size={17} />
                </div>

                <div>
                  <span>Risk escalations</span>
                  <strong>4</strong>
                </div>
              </div>

              <div className="engine-note">
                <ShieldCheck size={16} />
                Every request is evaluated independently. Network location alone
                never grants trust.
              </div>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AccessRequestsPage;