// AZ-900 — Hotspot (click-on-diagram) questions
// Cards: AZ-900-HS-001 … AZ-900-HS-003

const ResourceHierarchyDiagram = () => (
  <svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>
    <defs>
      <marker id="h900-a" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L8,3.5 z" fill="#94a3b8"/>
      </marker>
    </defs>

    <rect x="0" y="0" width="680" height="320" fill="#f8fafc" rx="12"/>
    <text x="340" y="13" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">Azure resource hierarchy</text>

    {/* Management Group */}
    <rect x="230" y="20" width="220" height="55" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
    <rect x="230" y="20" width="220" height="22" rx="8" fill="#e2e8f0"/>
    <text x="340" y="35" textAnchor="middle" fontSize="11" fill="#334155" fontWeight="700">Management Group</text>
    <text x="340" y="52" textAnchor="middle" fontSize="8.5" fill="#475569">Organises multiple subscriptions</text>
    <text x="340" y="66" textAnchor="middle" fontSize="7.5" fill="#94a3b8">Top level of the hierarchy</text>

    <line x1="295" y1="75" x2="215" y2="112" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#h900-a)"/>
    <line x1="385" y1="75" x2="462" y2="112" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#h900-a)"/>

    {/* Subscription A */}
    <rect x="60" y="115" width="215" height="55" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
    <rect x="60" y="115" width="215" height="22" rx="8" fill="#e2e8f0"/>
    <text x="167" y="130" textAnchor="middle" fontSize="11" fill="#334155" fontWeight="700">Subscription</text>
    <text x="167" y="147" textAnchor="middle" fontSize="8.5" fill="#475569">Billing boundary</text>
    <text x="167" y="161" textAnchor="middle" fontSize="7.5" fill="#94a3b8">Sets usage limits and policies</text>

    <line x1="120" y1="170" x2="90" y2="208" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#h900-a)"/>
    <line x1="200" y1="170" x2="225" y2="208" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#h900-a)"/>

    {/* Subscription B */}
    <rect x="405" y="115" width="215" height="55" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
    <rect x="405" y="115" width="215" height="22" rx="8" fill="#e2e8f0"/>
    <text x="512" y="130" textAnchor="middle" fontSize="11" fill="#334155" fontWeight="700">Subscription</text>
    <text x="512" y="147" textAnchor="middle" fontSize="8.5" fill="#475569">Billing boundary</text>
    <text x="512" y="161" textAnchor="middle" fontSize="7.5" fill="#94a3b8">Sets usage limits and policies</text>

    {/* Resource Group 1 */}
    <rect x="20" y="211" width="150" height="55" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2"/>
    <text x="95" y="230" textAnchor="middle" fontSize="10" fill="#334155" fontWeight="700">Resource Group</text>
    <text x="95" y="246" textAnchor="middle" fontSize="8" fill="#475569">Logical container</text>
    <text x="95" y="259" textAnchor="middle" fontSize="7.5" fill="#94a3b8">for related resources</text>

    <line x1="55"  y1="266" x2="35"  y2="296" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#h900-a)"/>
    <line x1="135" y1="266" x2="155" y2="296" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#h900-a)"/>

    {/* Resources inside RG1 */}
    <rect x="10"  y="298" width="80" height="20" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1"/>
    <text x="50" y="312" textAnchor="middle" fontSize="7.5" fill="#1e40af">VM</text>
    <rect x="120" y="298" width="80" height="20" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1"/>
    <text x="160" y="312" textAnchor="middle" fontSize="7.5" fill="#1e40af">Storage account</text>

    {/* Resource Group 2 */}
    <rect x="185" y="211" width="150" height="55" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2"/>
    <text x="260" y="230" textAnchor="middle" fontSize="10" fill="#334155" fontWeight="700">Resource Group</text>
    <text x="260" y="246" textAnchor="middle" fontSize="8" fill="#475569">Logical container</text>
    <text x="260" y="259" textAnchor="middle" fontSize="7.5" fill="#94a3b8">for related resources</text>

    {/* Resource Group 3 (under Subscription B) */}
    <rect x="430" y="211" width="220" height="55" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2"/>
    <text x="540" y="230" textAnchor="middle" fontSize="10" fill="#334155" fontWeight="700">Resource Group</text>
    <text x="540" y="246" textAnchor="middle" fontSize="8" fill="#475569">Logical container</text>
    <text x="540" y="259" textAnchor="middle" fontSize="7.5" fill="#94a3b8">for related resources</text>

    <text x="340" y="312" textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontStyle="italic">Click the scope described in the question</text>
  </svg>
);

const SharedResponsibilityDiagram = () => (
  <svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>
    <rect x="0" y="0" width="680" height="300" fill="#f8fafc" rx="12"/>
    <text x="340" y="14" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">Shared responsibility model</text>

    {/* Column headers */}
    <text x="200" y="34" textAnchor="middle" fontSize="10" fill="#334155" fontWeight="700">On-premises</text>
    <text x="345" y="34" textAnchor="middle" fontSize="10" fill="#334155" fontWeight="700">IaaS</text>
    <text x="490" y="34" textAnchor="middle" fontSize="10" fill="#334155" fontWeight="700">PaaS</text>
    <text x="625" y="34" textAnchor="middle" fontSize="10" fill="#334155" fontWeight="700">SaaS</text>

    {/* Column dividers */}
    <line x1="120" y1="40" x2="120" y2="280" stroke="#e2e8f0" strokeWidth="1"/>
    <line x1="270" y1="40" x2="270" y2="280" stroke="#e2e8f0" strokeWidth="1"/>
    <line x1="415" y1="40" x2="415" y2="280" stroke="#e2e8f0" strokeWidth="1"/>
    <line x1="560" y1="40" x2="560" y2="280" stroke="#e2e8f0" strokeWidth="1"/>

    {/* Row labels */}
    <text x="60" y="62"  textAnchor="middle" fontSize="8" fill="#64748b">Data</text>
    <text x="60" y="86"  textAnchor="middle" fontSize="8" fill="#64748b">Accounts &amp; access</text>
    <text x="60" y="110" textAnchor="middle" fontSize="8" fill="#64748b">Applications</text>
    <text x="60" y="134" textAnchor="middle" fontSize="8" fill="#64748b">Runtime</text>
    <text x="60" y="158" textAnchor="middle" fontSize="8" fill="#64748b">Operating system</text>
    <text x="60" y="182" textAnchor="middle" fontSize="8" fill="#64748b">Network controls</text>
    <text x="60" y="206" textAnchor="middle" fontSize="8" fill="#64748b">Servers</text>
    <text x="60" y="230" textAnchor="middle" fontSize="8" fill="#64748b">Storage</text>
    <text x="60" y="254" textAnchor="middle" fontSize="8" fill="#64748b">Networking hardware</text>
    <text x="60" y="278" textAnchor="middle" fontSize="8" fill="#64748b">Datacentre &amp; physical security</text>

    {/* On-premises column — all customer */}
    <rect x="120" y="48" width="150" height="232" fill="#fee2e2" opacity="0.5"/>
    <text x="195" y="166" textAnchor="middle" fontSize="9" fill="#991b1b" fontWeight="600" transform="rotate(-90 195 166)">Customer — everything</text>

    {/* IaaS column — customer for top rows, provider for bottom */}
    <rect x="270" y="48"  width="145" height="120" fill="#fee2e2" opacity="0.5"/>
    <rect x="270" y="168" width="145" height="112" fill="#dcfce7" opacity="0.6"/>
    <text x="345" y="86"  textAnchor="middle" fontSize="8" fill="#991b1b" fontWeight="600">Customer responsibility</text>
    <text x="345" y="226" textAnchor="middle" fontSize="8" fill="#166534" fontWeight="600">Microsoft responsibility</text>

    {/* PaaS column — customer for top 3 rows, provider for the rest */}
    <rect x="415" y="48"  width="145" height="72" fill="#fee2e2" opacity="0.5"/>
    <rect x="415" y="120" width="145" height="160" fill="#dcfce7" opacity="0.6"/>
    <text x="490" y="62"  textAnchor="middle" fontSize="8" fill="#991b1b" fontWeight="600">Customer responsibility</text>
    <text x="490" y="202" textAnchor="middle" fontSize="8" fill="#166534" fontWeight="600">Microsoft responsibility</text>

    {/* SaaS column — customer only for data/accounts, provider for the rest */}
    <rect x="560" y="48"  width="110" height="48" fill="#fee2e2" opacity="0.5"/>
    <rect x="560" y="96"  width="110" height="184" fill="#dcfce7" opacity="0.6"/>
    <text x="625" y="60"  textAnchor="middle" fontSize="8" fill="#991b1b" fontWeight="600">Customer</text>
    <text x="625" y="190" textAnchor="middle" fontSize="8" fill="#166534" fontWeight="600">Microsoft responsibility</text>

    <text x="340" y="296" textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontStyle="italic">Click the column matching the deployment model in the question</text>
  </svg>
);

const RegionPairDiagram = () => (
  <svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>
    <defs>
      <marker id="h900-b" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L8,3.5 z" fill="#60a5fa"/>
      </marker>
    </defs>

    <rect x="0" y="0" width="680" height="260" fill="#f8fafc" rx="12"/>
    <text x="340" y="14" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">Geo-redundant storage (GRS) — paired regions</text>

    {/* Primary region */}
    <rect x="60" y="40" width="260" height="180" rx="10" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
    <rect x="60" y="40" width="260" height="28" rx="10" fill="#e2e8f0"/>
    <text x="190" y="59" textAnchor="middle" fontSize="11" fill="#334155" fontWeight="700">Primary region — UK South</text>

    <rect x="90" y="85" width="200" height="50" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.2"/>
    <text x="190" y="105" textAnchor="middle" fontSize="9.5" fill="#1e40af" fontWeight="600">Storage account</text>
    <text x="190" y="121" textAnchor="middle" fontSize="8" fill="#3b5b8c">Primary, synchronous copies</text>

    <rect x="90" y="150" width="200" height="50" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.2"/>
    <text x="190" y="170" textAnchor="middle" fontSize="9.5" fill="#1e40af" fontWeight="600">Application / VMs</text>
    <text x="190" y="186" textAnchor="middle" fontSize="8" fill="#3b5b8c">Active read/write</text>

    {/* Secondary region */}
    <rect x="360" y="40" width="260" height="180" rx="10" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
    <rect x="360" y="40" width="260" height="28" rx="10" fill="#e2e8f0"/>
    <text x="490" y="59" textAnchor="middle" fontSize="11" fill="#334155" fontWeight="700">Secondary region — UK West</text>

    <rect x="390" y="85" width="200" height="50" rx="6" fill="#dcfce7" stroke="#86efac" strokeWidth="1.2"/>
    <text x="490" y="105" textAnchor="middle" fontSize="9.5" fill="#166534" fontWeight="600">Replicated storage copy</text>
    <text x="490" y="121" textAnchor="middle" fontSize="8" fill="#3f6b4f">Asynchronous, read-only*</text>

    <rect x="390" y="150" width="200" height="50" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="5 3"/>
    <text x="490" y="170" textAnchor="middle" fontSize="9.5" fill="#94a3b8" fontStyle="italic">Failover target</text>
    <text x="490" y="186" textAnchor="middle" fontSize="8" fill="#cbd5e1">Used only if primary region fails</text>

    <line x1="320" y1="110" x2="360" y2="110" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#h900-b)"/>
    <text x="340" y="102" textAnchor="middle" fontSize="7.5" fill="#3b82f6">replicates</text>

    <text x="340" y="244" textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontStyle="italic">*Read-only access to the secondary copy requires RA-GRS. Click the element described in the question.</text>
  </svg>
);

const az900hotspot = [
  {
    id: "AZ-900-HS-001",
    exam: "AZ-900",
    type: "hotspot",
    difficulty: "medium",
    category: "Describe Azure Management & Governance",
    question:
      "A company wants to apply a single Azure Policy that enforces a tagging standard across every subscription they currently have, AND any new subscriptions they create in the future, using one assignment. Click the scope where this policy should be assigned.",
    imageAlt:
      "Azure resource hierarchy diagram showing a Management Group at the top, two Subscriptions below it, and Resource Groups containing resources (VM, Storage account) below the subscriptions.",
    viewBox: "0 0 680 320",
    diagram: ResourceHierarchyDiagram,
    zones: [
      { id: "management-group", label: "Management Group", x: 230, y: 20,  width: 220, height: 55 },
      { id: "subscription-a",   label: "Subscription (A)",  x: 60,  y: 115, width: 215, height: 55 },
      { id: "resource-group-1", label: "Resource Group (1)", x: 20, y: 211, width: 150, height: 55 },
      { id: "vm-resource",      label: "VM resource",        x: 10, y: 298, width: 80,  height: 20 },
    ],
    correctZone: "management-group",
    answer:
      "Management Group is correct. It sits above subscriptions in the hierarchy, so a policy assigned at this scope is inherited by every subscription underneath it — including subscriptions added to the management group later — without needing a new assignment each time.",
    explanation:
      "A Subscription-scoped assignment only applies to that one subscription; a new subscription would need its own assignment. Resource Group and resource scopes are even narrower. Management groups exist specifically to let organisations apply governance (policies, RBAC, budgets) consistently across many subscriptions, including ones created in the future, from a single assignment at the top of the hierarchy.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/governance/management-groups/overview",
  },
  {
    id: "AZ-900-HS-002",
    exam: "AZ-900",
    type: "hotspot",
    difficulty: "medium",
    category: "Describe Cloud Concepts",
    question:
      "A company subscribes to Microsoft 365 (a SaaS product) for email and office productivity. Under the shared responsibility model, click the column that represents what THIS company is still responsible for.",
    imageAlt:
      "Shared responsibility model diagram with four columns — On-premises, IaaS, PaaS, and SaaS — and rows for data, accounts and access, applications, runtime, operating system, network controls, servers, storage, networking hardware, and datacentre/physical security. Each column is shaded to show which rows are the customer's responsibility (red) versus Microsoft's responsibility (green).",
    viewBox: "0 0 680 300",
    diagram: SharedResponsibilityDiagram,
    zones: [
      { id: "onprem",  label: "On-premises column", x: 120, y: 40, width: 150, height: 240 },
      { id: "iaas",    label: "IaaS column",        x: 270, y: 40, width: 145, height: 240 },
      { id: "paas",    label: "PaaS column",        x: 415, y: 40, width: 145, height: 240 },
      { id: "saas",    label: "SaaS column",        x: 560, y: 40, width: 110, height: 240 },
    ],
    correctZone: "saas",
    answer:
      "SaaS is correct. Microsoft 365 is a Software as a Service product — Microsoft manages almost the entire stack (datacentres, networking, servers, OS, runtime, and the application itself). The customer remains responsible only for their data and for managing accounts and access (e.g. user identities, MFA, permissions).",
    explanation:
      "Regardless of deployment model — on-premises, IaaS, PaaS, or SaaS — the customer is ALWAYS responsible for their data and for identity/access management. What shifts is everything else: IaaS leaves the customer managing the OS, runtime, and applications; PaaS removes OS/runtime management; SaaS removes nearly everything except data and access. For a SaaS product like Microsoft 365, the customer's remaining responsibilities are the smallest of all four models.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility",
  },
  {
    id: "AZ-900-HS-003",
    exam: "AZ-900",
    type: "hotspot",
    difficulty: "medium",
    category: "Describe Cloud Concepts",
    question:
      "A storage account in UK South is configured for geo-redundant storage (GRS). Click the element that represents where data is asynchronously copied to for disaster recovery.",
    imageAlt:
      "Diagram showing two regions side by side: 'Primary region — UK South' containing a storage account and application/VMs, and 'Secondary region — UK West' containing a replicated storage copy and a failover target, with an arrow labelled 'replicates' pointing from the primary storage account to the secondary region.",
    viewBox: "0 0 680 260",
    diagram: RegionPairDiagram,
    zones: [
      { id: "primary-storage",   label: "Primary storage account (UK South)", x: 90,  y: 85,  width: 200, height: 50 },
      { id: "primary-app",       label: "Application / VMs (UK South)",       x: 90,  y: 150, width: 200, height: 50 },
      { id: "secondary-copy",    label: "Replicated storage copy (UK West)",  x: 390, y: 85,  width: 200, height: 50 },
      { id: "failover-target",   label: "Failover target (UK West)",          x: 390, y: 150, width: 200, height: 50 },
    ],
    correctZone: "secondary-copy",
    answer:
      "The replicated storage copy in the secondary, paired region (UK West) is correct. GRS first writes data synchronously to the primary region (like LRS), then asynchronously copies it to a secondary region hundreds of miles away — protecting against a complete regional outage.",
    explanation:
      "The primary storage account and application/VMs remain in UK South and are not the replication target. The 'failover target' box represents the overall secondary region becoming active during a failover, but the actual replicated DATA lands in the secondary storage copy. With standard GRS, this secondary copy isn't directly readable by applications — read access to it requires RA-GRS (read-access geo-redundant storage).",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy",
  },
];

export default az900hotspot;
