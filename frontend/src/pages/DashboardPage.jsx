import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Blocks,
  CheckCircle2,
  Cpu,
  FileText,
  Fingerprint,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Network,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

import { NavLink, Link, useNavigate } from "react-router-dom";
import { getStoredToken, logoutUser, clearStoredSession } from "../api";
import "../styles/dashboard.css";

const navItems = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Access Requests", path: "/access", icon: KeyRound },
  { name: "Identities", path: "/identities", icon: Users },
  { name: "Devices", path: "/devices", icon: Cpu },
  { name: "Resources", path: "/resources", icon: Blocks },
  { name: "Policies", path: "/policies", icon: Fingerprint },
  { name: "Risk Monitor", path: "/risk", icon: Activity },
  { name: "Audit Logs", path: "/logs", icon: FileText },
];

const accessEvents = [
  {
    user: "admin@zerotrustz.dev",
    resource: "production-api",
    device: "ZT-LAPTOP-042",
    decision: "Allow",
    risk: "Low",
    time: "14:32",
  },
  {
    user: "dev@zerotrustz.dev",
    resource: "finance-db",
    device: "ZT-WORKSTATION-17",
    decision: "Deny",
    risk: "Critical",
    time: "14:29",
  },
  {
    user: "security@zerotrustz.dev",
    resource: "audit-storage",
    device: "ZT-LAPTOP-008",
    decision: "Allow",
    risk: "Low",
    time: "14:25",
  },
  {
    user: "unknown-user",
    resource: "admin-console",
    device: "UNTRUSTED",
    decision: "Deny",
    risk: "High",
    time: "14:21",
  },
];

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = getStoredToken();

    try {
      if (token) {
        await logoutUser(token);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearStoredSession();
      navigate("/login", { replace: true });
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
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `dashboard-nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={17} />
              <span>{name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="system-status-card">
            <div className="system-status-top">
              <div>
                <span>System status</span>
                <strong>Protected</strong>
              </div>

              <CheckCircle2 size={18} />
            </div>

            <div className="status-progress">
              <div />
            </div>

            <small>All verification services online</small>
          </div>

          <button
            type="button"
            className="logout-link"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Exit console
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-search">
            <Search size={16} />
            <input placeholder="Search identities, devices, resources..." />
          </div>

          <div className="topbar-right">
            <div className="connection-status">
              <span />
              Secure connection
            </div>

            <button className="topbar-icon">
              <Settings size={17} />
            </button>

            <div className="admin-avatar">AR</div>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="dashboard-heading">
            <div>
              <span className="dashboard-eyebrow">
                ZERO TRUST OPERATIONS
              </span>

              <h1>Security overview</h1>

              <p>
                Monitor identity, device posture, policy decisions, and
                protected resources across your environment.
              </p>
            </div>

            <button className="dashboard-action">
              Create policy
              <ArrowUpRight size={16} />
            </button>
          </section>

          <section className="overview-grid">
            <article className="primary-status-card">
              <div className="primary-status-top">
                <div>
                  <span>SECURITY POSTURE</span>
                  <h2>92</h2>
                </div>

                <div className="posture-badge">
                  <ShieldCheck size={16} />
                  Excellent
                </div>
              </div>

              <p>
                ZeroTrustZ is actively verifying access requests and enforcing
                policy across all protected resources.
              </p>

              <div className="posture-bar">
                <div />
              </div>

              <div className="posture-meta">
                <span>Identity</span>
                <strong>96%</strong>

                <span>Devices</span>
                <strong>89%</strong>

                <span>Policy</span>
                <strong>93%</strong>
              </div>
            </article>

            <article className="risk-card">
              <div className="card-label">CURRENT RISK</div>

              <div className="risk-score-row">
                <strong>Low</strong>
                <span>18</span>
              </div>

              <p>Average environment risk score</p>

              <div className="risk-distribution">
                <div className="risk-low">
                  <span>Low</span>
                  <strong>113</strong>
                </div>

                <div className="risk-medium">
                  <span>Medium</span>
                  <strong>11</strong>
                </div>

                <div className="risk-high">
                  <span>High</span>
                  <strong>4</strong>
                </div>
              </div>
            </article>
          </section>

          <section className="dashboard-metrics">
            <article>
              <div className="metric-header">
                <span>Requests evaluated</span>
                <Activity size={17} />
              </div>
              <strong>247</strong>
              <small>+12.4% today</small>
            </article>

            <article>
              <div className="metric-header">
                <span>Denied requests</span>
                <AlertTriangle size={17} />
              </div>
              <strong>16</strong>
              <small>6.5% of total traffic</small>
            </article>

            <article>
              <div className="metric-header">
                <span>Active identities</span>
                <Users size={17} />
              </div>
              <strong>128</strong>
              <small>4 flagged for review</small>
            </article>

            <article>
              <div className="metric-header">
                <span>Protected resources</span>
                <Network size={17} />
              </div>
              <strong>42</strong>
              <small>All actively monitored</small>
            </article>
          </section>

          <section className="dashboard-bottom-grid">
            <article className="activity-panel">
              <div className="panel-title-row">
                <div>
                  <span>ACCESS ACTIVITY</span>
                  <h3>Recent decisions</h3>
                </div>

                <Link to="/access">
                  View all
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <div className="access-table">
                <div className="access-table-head">
                  <span>Identity</span>
                  <span>Resource</span>
                  <span>Device</span>
                  <span>Risk</span>
                  <span>Decision</span>
                  <span>Time</span>
                </div>

                {accessEvents.map((event) => (
                  <div className="access-table-row" key={`${event.user}-${event.time}`}>
                    <span className="identity-cell">{event.user}</span>
                    <span>{event.resource}</span>
                    <span>{event.device}</span>

                    <span
                      className={`risk-pill ${event.risk.toLowerCase()}`}
                    >
                      {event.risk}
                    </span>

                    <span
                      className={`decision-pill ${event.decision.toLowerCase()}`}
                    >
                      {event.decision}
                    </span>

                    <span className="time-cell">{event.time}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="verification-panel">
              <div className="panel-title-row">
                <div>
                  <span>VERIFICATION ENGINE</span>
                  <h3>Live status</h3>
                </div>
              </div>

              <div className="verification-list">
                <div className="verification-item">
                  <div className="verification-icon">
                    <Fingerprint size={18} />
                  </div>

                  <div>
                    <strong>Identity provider</strong>
                    <span>Operational</span>
                  </div>

                  <div className="verification-dot" />
                </div>

                <div className="verification-item">
                  <div className="verification-icon">
                    <Cpu size={18} />
                  </div>

                  <div>
                    <strong>Device trust</strong>
                    <span>Continuous checks</span>
                  </div>

                  <div className="verification-dot" />
                </div>

                <div className="verification-item">
                  <div className="verification-icon">
                    <KeyRound size={18} />
                  </div>

                  <div>
                    <strong>Policy engine</strong>
                    <span>Evaluating requests</span>
                  </div>

                  <div className="verification-dot" />
                </div>

                <div className="verification-item">
                  <div className="verification-icon">
                    <Network size={18} />
                  </div>

                  <div>
                    <strong>Resource gateway</strong>
                    <span>42 resources secured</span>
                  </div>

                  <div className="verification-dot" />
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;