import {
  Activity,
  Blocks,
  Cpu,
  FileText,
  Fingerprint,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";
import "../styles/dashboard.css";
import "../styles/modules.css";

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

function ModulePage({
  eyebrow,
  title,
  description,
  stats = [],
  columns = [],
  rows = [],
  actionLabel,
  insightTitle,
  insights = [],
}) {
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
                <span>Zero Trust Engine</span>
                <strong>Operational</strong>
              </div>

              <ShieldCheck size={18} />
            </div>

            <div className="status-progress">
              <div />
            </div>

            <small>Continuous verification active</small>
          </div>

          <Link to="/" className="logout-link">
            <LogOut size={16} />
            Exit console
          </Link>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-search">
            <Search size={16} />
            <input placeholder={`Search ${title.toLowerCase()}...`} />
          </div>

          <div className="topbar-right">
            <div className="connection-status">
              <span />
              Secure connection
            </div>

            <div className="admin-avatar">AR</div>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="dashboard-heading">
            <div>
              <span className="dashboard-eyebrow">{eyebrow}</span>

              <h1>{title}</h1>

              <p>{description}</p>
            </div>

            {actionLabel && (
              <button className="dashboard-action">
                <Plus size={15} />
                {actionLabel}
              </button>
            )}
          </section>

          <section className="module-stat-grid">
            {stats.map((stat) => (
              <article key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.note}</small>
              </article>
            ))}
          </section>

          <section className="generic-module-layout">
            <article className="generic-data-panel">
              <div className="module-panel-header">
                <div>
                  <span>ZEROTRUSTZ DATA</span>
                  <h3>{title} overview</h3>
                </div>

                <div className="stream-status">
                  <span />
                  Live
                </div>
              </div>

              <div className="generic-table-wrapper">
                <div
                  className="generic-table-head"
                  style={{
                    gridTemplateColumns: `repeat(${columns.length}, minmax(120px, 1fr))`,
                  }}
                >
                  {columns.map((column) => (
                    <span key={column.key}>{column.label}</span>
                  ))}
                </div>

                {rows.map((row, index) => (
                  <div
                    className="generic-table-row"
                    style={{
                      gridTemplateColumns: `repeat(${columns.length}, minmax(120px, 1fr))`,
                    }}
                    key={index}
                  >
                    {columns.map((column) => {
                      const value = row[column.key];

                      const lowered =
                        typeof value === "string"
                          ? value.toLowerCase()
                          : "";

                      const semanticClass = [
                        "allow",
                        "allowed",
                        "active",
                        "trusted",
                        "compliant",
                        "protected",
                        "low",
                        "enabled",
                      ].includes(lowered)
                        ? "positive"
                        : [
                            "deny",
                            "denied",
                            "critical",
                            "high",
                            "blocked",
                            "untrusted",
                            "disabled",
                          ].includes(lowered)
                        ? "negative"
                        : ["medium", "warning", "review"].includes(lowered)
                        ? "warning"
                        : "";

                      return (
                        <span
                          key={column.key}
                          className={
                            column.status
                              ? `table-status ${semanticClass}`
                              : ""
                          }
                        >
                          {value}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            </article>

            <aside className="generic-insight-panel">
              <div className="module-panel-header">
                <div>
                  <span>SECURITY CONTEXT</span>
                  <h3>{insightTitle}</h3>
                </div>
              </div>

              <div className="generic-insights">
                {insights.map((insight, index) => (
                  <div className="generic-insight-item" key={index}>
                    <span>{insight.label}</span>
                    <strong>{insight.value}</strong>
                    <small>{insight.note}</small>
                  </div>
                ))}
              </div>

              <div className="engine-note">
                <ShieldCheck size={16} />

                ZeroTrustZ continuously evaluates context instead of granting
                permanent trust.
              </div>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ModulePage;