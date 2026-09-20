import {
  ArrowRight,
  Check,
  Cloud,
  Database,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  Server,
  ShieldCheck,
  TerminalSquare,
  UserCheck,
} from "lucide-react";

import { Link } from "react-router-dom";
import "../App.css";

const trustSteps = [
  {
    icon: Fingerprint,
    title: "Identity",
    text: "Verify who is requesting access.",
  },
  {
    icon: TerminalSquare,
    title: "Device",
    text: "Check device posture and trust state.",
  },
  {
    icon: KeyRound,
    title: "Policy",
    text: "Evaluate context against access rules.",
  },
  {
    icon: Server,
    title: "Resource",
    text: "Grant only the minimum required access.",
  },
];

const features = [
  {
    icon: UserCheck,
    title: "Identity-first access",
    text: "Every request begins with identity validation before anything else is evaluated.",
  },
  {
    icon: ShieldCheck,
    title: "Continuous verification",
    text: "Trust is never permanent. Access is continuously reassessed during every interaction.",
  },
  {
    icon: LockKeyhole,
    title: "Least privilege enforcement",
    text: "Users and devices receive only the permissions required for the requested resource.",
  },
  {
    icon: Database,
    title: "Policy-driven decisions",
    text: "A centralized policy engine decides whether each request should be allowed or denied.",
  },
];

function LandingPage() {
  return (
    <div className="site-shell">
      <header className="navbar">
        <div className="brand">
          <div className="brand-mark">
            <ShieldCheck size={21} />
          </div>

          <span>ZeroTrustZ</span>
        </div>

        <nav className="nav-links">
          <a href="#product">Product</a>
          <a href="#architecture">Architecture</a>
          <a href="#security">Security</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="text-button">
            Sign in
          </Link>

          <Link to="/login" className="solid-button">
            Open Console
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              CLOUD SECURITY · ZERO TRUST ARCHITECTURE
            </div>

            <h1>
              Access should be
              <span> earned every time.</span>
            </h1>

            <p className="hero-description">
              ZeroTrustZ authenticates, authorizes, and continuously validates
              every access request across identities, devices, applications,
              and cloud resources.
            </p>

            <div className="hero-actions">
              <Link to="/login" className="solid-button large">
                Explore the platform
                <ArrowRight size={17} />
              </Link>

              <a href="#architecture" className="outline-button large">
                View architecture
              </a>
            </div>

            <div className="hero-proof">
              <div>
                <Check size={15} />
                Identity-aware access
              </div>

              <div>
                <Check size={15} />
                Continuous validation
              </div>

              <div>
                <Check size={15} />
                Least privilege
              </div>
            </div>
          </div>

          <div className="decision-panel">
            <div className="panel-header">
              <span>LIVE POLICY DECISION</span>

              <div className="live-state">
                <span />
                Evaluating
              </div>
            </div>

            <div className="request-block">
              <div className="request-row">
                <span>User</span>
                <strong>admin@zerotrustz.dev</strong>
              </div>

              <div className="request-row">
                <span>Device</span>
                <strong>ZT-LAPTOP-042</strong>
              </div>

              <div className="request-row">
                <span>Resource</span>
                <strong>production-api</strong>
              </div>

              <div className="request-row">
                <span>Location</span>
                <strong>Pune, India</strong>
              </div>
            </div>

            <div className="evaluation-flow">
              <div className="flow-item passed">
                <span className="flow-icon">
                  <Fingerprint size={17} />
                </span>

                <div>
                  <strong>Identity verified</strong>
                  <small>MFA session valid</small>
                </div>

                <Check size={17} />
              </div>

              <div className="flow-line" />

              <div className="flow-item passed">
                <span className="flow-icon">
                  <TerminalSquare size={17} />
                </span>

                <div>
                  <strong>Device trusted</strong>
                  <small>Compliant security posture</small>
                </div>

                <Check size={17} />
              </div>

              <div className="flow-line" />

              <div className="flow-item passed">
                <span className="flow-icon">
                  <KeyRound size={17} />
                </span>

                <div>
                  <strong>Policy matched</strong>
                  <small>Engineering production access</small>
                </div>

                <Check size={17} />
              </div>
            </div>

            <div className="decision-result">
              <div>
                <span>Decision</span>
                <strong>ACCESS GRANTED</strong>
              </div>

              <span className="decision-time">14 ms</span>
            </div>
          </div>
        </section>

        <section className="metrics-strip">
          <div className="metric">
            <span>Requests evaluated</span>
            <strong>247</strong>
          </div>

          <div className="metric">
            <span>Denied by policy</span>
            <strong>16</strong>
          </div>

          <div className="metric">
            <span>Protected identities</span>
            <strong>128</strong>
          </div>

          <div className="metric">
            <span>Cloud resources</span>
            <strong>42</strong>
          </div>
        </section>

        <section className="section intro-section" id="product">
          <div className="section-label">THE PRODUCT</div>

          <div className="section-heading-grid">
            <h2>Security without implicit trust.</h2>

            <p>
              Traditional perimeter security assumes users inside a network are
              trusted. ZeroTrustZ removes that assumption and evaluates every
              request using identity, device posture, policy, and context.
            </p>
          </div>
        </section>

        <section className="feature-grid" id="security">
          {features.map(({ icon: Icon, title, text }, index) => (
            <article className="feature-card" key={title}>
              <div className="feature-top">
                <span className="feature-number">0{index + 1}</span>
                <Icon size={20} />
              </div>

              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className="architecture-section" id="architecture">
          <div className="architecture-copy">
            <div className="section-label">ZERO TRUST FLOW</div>

            <h2>Every request passes through a verification chain.</h2>

            <p>
              Access is never granted because a request originated from a
              trusted network. Each stage provides context to the policy engine
              before a final decision is made.
            </p>

            <a href="#architecture" className="outline-button">
              Open architecture details
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="architecture-flow">
            {trustSteps.map(({ icon: Icon, title, text }, index) => (
              <div className="architecture-step" key={title}>
                <div className="step-index">0{index + 1}</div>

                <div className="step-icon">
                  <Icon size={20} />
                </div>

                <div className="step-copy">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>

                {index !== trustSteps.length - 1 && (
                  <div className="step-arrow">
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="platform-section">
          <div className="platform-visual">
            <div className="cloud-box">
              <Cloud size={22} />
              <span>Cloud Environment</span>
            </div>

            <div className="platform-stack">
              <div className="platform-row">
                <span>Identity Provider</span>
                <strong>Verified</strong>
              </div>

              <div className="platform-row">
                <span>Device Posture</span>
                <strong>Compliant</strong>
              </div>

              <div className="platform-row">
                <span>Policy Engine</span>
                <strong>Allow</strong>
              </div>

              <div className="platform-row">
                <span>Resource Gateway</span>
                <strong>Protected</strong>
              </div>
            </div>
          </div>

          <div className="platform-copy">
            <div className="section-label">BUILT FOR CLOUD SECURITY</div>

            <h2>One control plane for identity, policy, and access.</h2>

            <p>
              ZeroTrustZ brings authentication, authorization, risk evaluation,
              and access control into a single security workflow.
            </p>

            <ul>
              <li>
                <Check size={16} />
                Context-aware policy decisions
              </li>

              <li>
                <Check size={16} />
                Real-time access logging
              </li>

              <li>
                <Check size={16} />
                Device trust verification
              </li>

              <li>
                <Check size={16} />
                Cloud resource protection
              </li>
            </ul>
          </div>
        </section>

        <section className="cta-section" id="about">
          <div>
            <span className="section-label">ZEROTRUSTZ</span>
            <h2>Trust nothing. Verify everything.</h2>
          </div>

          <Link to="/login" className="solid-button large">
            Launch Security Console
            <ArrowRight size={17} />
          </Link>
        </section>
      </main>

      <footer className="footer">
        <div className="brand">
          <div className="brand-mark">
            <ShieldCheck size={19} />
          </div>

          <span>ZeroTrustZ</span>
        </div>

        <p>Cloud Security with Zero Trust Architecture.</p>
      </footer>
    </div>
  );
}

export default LandingPage;