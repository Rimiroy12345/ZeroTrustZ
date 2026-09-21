import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AccessRequestsPage from "./pages/AccessRequestsPage";
import ModulePage from "./pages/ModulePage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />

      <Route path="/access" element={<AccessRequestsPage />} />

      <Route
        path="/identities"
        element={
          <ModulePage
            eyebrow="IDENTITY SECURITY"
            title="Identities"
            description="Manage identity trust, authentication state, roles, and contextual access privileges."
            actionLabel="Add identity"
            stats={[
              {
                label: "Total identities",
                value: "128",
                note: "Across the environment",
              },
              {
                label: "Verified",
                value: "121",
                note: "94.5% verified",
              },
              {
                label: "Flagged",
                value: "4",
                note: "Require review",
              },
              {
                label: "Privileged",
                value: "12",
                note: "Administrative access",
              },
            ]}
            columns={[
              { key: "identity", label: "Identity" },
              { key: "role", label: "Role" },
              { key: "mfa", label: "MFA", status: true },
              { key: "risk", label: "Risk", status: true },
              { key: "status", label: "Status", status: true },
            ]}
            rows={[
              {
                identity: "admin@zerotrustz.dev",
                role: "Administrator",
                mfa: "Enabled",
                risk: "Low",
                status: "Active",
              },
              {
                identity: "security@zerotrustz.dev",
                role: "Security Analyst",
                mfa: "Enabled",
                risk: "Low",
                status: "Active",
              },
              {
                identity: "dev@zerotrustz.dev",
                role: "Developer",
                mfa: "Enabled",
                risk: "Medium",
                status: "Review",
              },
              {
                identity: "finance@zerotrustz.dev",
                role: "Finance",
                mfa: "Enabled",
                risk: "Low",
                status: "Active",
              },
              {
                identity: "legacy-user",
                role: "Legacy",
                mfa: "Disabled",
                risk: "High",
                status: "Blocked",
              },
            ]}
            insightTitle="Identity posture"
            insights={[
              {
                label: "MFA adoption",
                value: "96.1%",
                note: "123 of 128 identities",
              },
              {
                label: "Privileged users",
                value: "12",
                note: "Require stricter policy evaluation",
              },
              {
                label: "Risk escalations",
                value: "4",
                note: "Detected in the last 24 hours",
              },
            ]}
          />
        }
      />

      <Route
        path="/devices"
        element={
          <ModulePage
            eyebrow="DEVICE TRUST"
            title="Devices"
            description="Continuously evaluate endpoint posture before permitting access to protected cloud resources."
            actionLabel="Register device"
            stats={[
              {
                label: "Registered",
                value: "86",
                note: "Known endpoints",
              },
              {
                label: "Compliant",
                value: "79",
                note: "91.8% compliant",
              },
              {
                label: "Untrusted",
                value: "3",
                note: "Currently blocked",
              },
              {
                label: "Pending review",
                value: "4",
                note: "Posture verification",
              },
            ]}
            columns={[
              { key: "device", label: "Device" },
              { key: "owner", label: "Owner" },
              { key: "os", label: "Platform" },
              { key: "posture", label: "Posture", status: true },
              { key: "trust", label: "Trust", status: true },
            ]}
            rows={[
              {
                device: "ZT-LAPTOP-042",
                owner: "Admin User",
                os: "Windows 11",
                posture: "Compliant",
                trust: "Trusted",
              },
              {
                device: "ZT-LAPTOP-008",
                owner: "Security Team",
                os: "Ubuntu 24.04",
                posture: "Compliant",
                trust: "Trusted",
              },
              {
                device: "ZT-WORKSTATION-17",
                owner: "Developer",
                os: "Windows 11",
                posture: "Review",
                trust: "Medium",
              },
              {
                device: "ZT-MAC-012",
                owner: "Analyst",
                os: "macOS",
                posture: "Compliant",
                trust: "Trusted",
              },
              {
                device: "UNKNOWN-DEVICE",
                owner: "Unknown",
                os: "Unknown",
                posture: "Critical",
                trust: "Untrusted",
              },
            ]}
            insightTitle="Device posture"
            insights={[
              {
                label: "Compliance rate",
                value: "91.8%",
                note: "79 endpoints compliant",
              },
              {
                label: "Untrusted devices",
                value: "3",
                note: "Access automatically restricted",
              },
              {
                label: "Last posture scan",
                value: "14 sec",
                note: "Continuous device evaluation",
              },
            ]}
          />
        }
      />

      <Route
        path="/resources"
        element={
          <ModulePage
            eyebrow="RESOURCE SECURITY"
            title="Resources"
            description="Track cloud applications, APIs, databases, and services protected by ZeroTrustZ."
            actionLabel="Protect resource"
            stats={[
              {
                label: "Protected",
                value: "42",
                note: "Cloud resources",
              },
              {
                label: "Critical",
                value: "8",
                note: "High sensitivity",
              },
              {
                label: "APIs",
                value: "17",
                note: "Protected endpoints",
              },
              {
                label: "Databases",
                value: "9",
                note: "Policy controlled",
              },
            ]}
            columns={[
              { key: "resource", label: "Resource" },
              { key: "type", label: "Type" },
              { key: "sensitivity", label: "Sensitivity", status: true },
              { key: "policy", label: "Policy" },
              { key: "status", label: "Status", status: true },
            ]}
            rows={[
              {
                resource: "production-api",
                type: "API",
                sensitivity: "High",
                policy: "Engineering Prod",
                status: "Protected",
              },
              {
                resource: "finance-db",
                type: "Database",
                sensitivity: "Critical",
                policy: "Finance Strict",
                status: "Protected",
              },
              {
                resource: "audit-storage",
                type: "Storage",
                sensitivity: "Medium",
                policy: "Security Audit",
                status: "Protected",
              },
              {
                resource: "analytics-api",
                type: "API",
                sensitivity: "Medium",
                policy: "Analytics Access",
                status: "Protected",
              },
              {
                resource: "admin-console",
                type: "Application",
                sensitivity: "Critical",
                policy: "Admin MFA",
                status: "Protected",
              },
            ]}
            insightTitle="Resource posture"
            insights={[
              {
                label: "Coverage",
                value: "100%",
                note: "All registered resources protected",
              },
              {
                label: "Critical assets",
                value: "8",
                note: "Enhanced policy enforcement",
              },
              {
                label: "Access attempts",
                value: "247",
                note: "Evaluated today",
              },
            ]}
          />
        }
      />

      <Route
        path="/policies"
        element={
          <ModulePage
            eyebrow="POLICY ENGINE"
            title="Policies"
            description="Define contextual authorization rules that decide whether every request should be allowed or denied."
            actionLabel="Create policy"
            stats={[
              {
                label: "Active policies",
                value: "18",
                note: "Currently enforced",
              },
              {
                label: "Evaluations",
                value: "247",
                note: "Today",
              },
              {
                label: "Denied",
                value: "16",
                note: "By active policy",
              },
              {
                label: "Avg decision",
                value: "14ms",
                note: "Evaluation latency",
              },
            ]}
            columns={[
              { key: "policy", label: "Policy" },
              { key: "scope", label: "Scope" },
              { key: "rule", label: "Rule" },
              { key: "priority", label: "Priority" },
              { key: "status", label: "Status", status: true },
            ]}
            rows={[
              {
                policy: "Engineering Production",
                scope: "production-api",
                rule: "MFA + trusted device",
                priority: "1",
                status: "Active",
              },
              {
                policy: "Finance Strict",
                scope: "finance-db",
                rule: "Finance role + MFA",
                priority: "1",
                status: "Active",
              },
              {
                policy: "Admin Console",
                scope: "admin-console",
                rule: "Admin + compliant device",
                priority: "Critical",
                status: "Active",
              },
              {
                policy: "Analytics Access",
                scope: "analytics-api",
                rule: "Analyst role",
                priority: "3",
                status: "Active",
              },
              {
                policy: "Legacy Block",
                scope: "All",
                rule: "Block legacy identities",
                priority: "Critical",
                status: "Active",
              },
            ]}
            insightTitle="Policy engine"
            insights={[
              {
                label: "Engine status",
                value: "Healthy",
                note: "All policies synchronized",
              },
              {
                label: "Match rate",
                value: "98.4%",
                note: "Requests matched automatically",
              },
              {
                label: "Average latency",
                value: "14 ms",
                note: "Per authorization decision",
              },
            ]}
          />
        }
      />

      <Route
        path="/risk"
        element={
          <ModulePage
            eyebrow="RISK INTELLIGENCE"
            title="Risk Monitor"
            description="Identify anomalous identities, suspicious devices, and contextual signals before access is granted."
            stats={[
              {
                label: "Current risk",
                value: "18",
                note: "Low overall",
              },
              {
                label: "High-risk events",
                value: "4",
                note: "Last 24 hours",
              },
              {
                label: "Medium risk",
                value: "11",
                note: "Under monitoring",
              },
              {
                label: "Blocked threats",
                value: "7",
                note: "Automatically denied",
              },
            ]}
            columns={[
              { key: "event", label: "Signal" },
              { key: "identity", label: "Identity" },
              { key: "source", label: "Source" },
              { key: "risk", label: "Risk", status: true },
              { key: "action", label: "Action", status: true },
            ]}
            rows={[
              {
                event: "Unknown device",
                identity: "unknown-user",
                source: "UNTRUSTED",
                risk: "Critical",
                action: "Denied",
              },
              {
                event: "Location anomaly",
                identity: "dev@zerotrustz.dev",
                source: "New location",
                risk: "High",
                action: "Denied",
              },
              {
                event: "Privilege escalation",
                identity: "legacy-user",
                source: "admin-console",
                risk: "High",
                action: "Blocked",
              },
              {
                event: "New device",
                identity: "analyst@zerotrustz.dev",
                source: "ZT-LAPTOP-019",
                risk: "Medium",
                action: "Review",
              },
            ]}
            insightTitle="Risk engine"
            insights={[
              {
                label: "Environment score",
                value: "18 / 100",
                note: "Low-risk posture",
              },
              {
                label: "Anomalies detected",
                value: "7",
                note: "Across identity and devices",
              },
              {
                label: "Automatic blocks",
                value: "7",
                note: "No manual intervention required",
              },
            ]}
          />
        }
      />

      <Route
        path="/logs"
        element={
          <ModulePage
            eyebrow="SECURITY AUDIT"
            title="Audit Logs"
            description="Review security events generated by authentication, authorization, device verification, and policy enforcement."
            stats={[
              {
                label: "Events today",
                value: "1,248",
                note: "All security events",
              },
              {
                label: "Auth events",
                value: "412",
                note: "Authentication activity",
              },
              {
                label: "Policy events",
                value: "247",
                note: "Authorization decisions",
              },
              {
                label: "Critical events",
                value: "4",
                note: "Require attention",
              },
            ]}
            columns={[
              { key: "time", label: "Time" },
              { key: "event", label: "Event" },
              { key: "actor", label: "Actor" },
              { key: "resource", label: "Resource" },
              { key: "result", label: "Result", status: true },
            ]}
            rows={[
              {
                time: "14:32:08",
                event: "Access decision",
                actor: "admin@zerotrustz.dev",
                resource: "production-api",
                result: "Allowed",
              },
              {
                time: "14:29:41",
                event: "Policy denial",
                actor: "dev@zerotrustz.dev",
                resource: "finance-db",
                result: "Denied",
              },
              {
                time: "14:25:12",
                event: "Identity verified",
                actor: "security@zerotrustz.dev",
                resource: "audit-storage",
                result: "Allowed",
              },
              {
                time: "14:21:56",
                event: "Device rejected",
                actor: "unknown-user",
                resource: "admin-console",
                result: "Blocked",
              },
              {
                time: "14:18:32",
                event: "Step-up MFA",
                actor: "analyst@zerotrustz.dev",
                resource: "analytics-api",
                result: "Allowed",
              },
            ]}
            insightTitle="Audit integrity"
            insights={[
              {
                label: "Logging status",
                value: "Active",
                note: "Security events recorded continuously",
              },
              {
                label: "Events retained",
                value: "18,492",
                note: "Stored audit records",
              },
              {
                label: "Critical events",
                value: "4",
                note: "Flagged for review",
              },
            ]}
          />
        }
      />
      </Route>
    </Routes>
  );
}

export default App;