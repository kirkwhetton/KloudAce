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

    {/* Root Management Group */}
    <rect x="240" y="10" width="200" height="40" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
    <text x="340" y="34" textAnchor="middle" fontSize="11" fill="#334155" fontWeight="700">Contoso (root)</text>

    <line x1="300" y1="50" x2="180" y2="83" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#h900-a)"/>
    <line x1="380" y1="50" x2="500" y2="83" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#h900-a)"/>

    {/* Management Group: Online Services (spans Web-Prod + Web-Dev below) */}
    <rect x="20" y="86" width="314" height="40" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
    <text x="177" y="110" textAnchor="middle" fontSize="11" fill="#334155" fontWeight="700">Online Services</text>

    {/* Management Group: Corp IT (spans Finance + HR below) */}
    <rect x="346" y="86" width="314" height="40" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
    <text x="503" y="110" textAnchor="middle" fontSize="11" fill="#334155" fontWeight="700">Corp IT</text>

    <line x1="96"  y1="126" x2="96"  y2="159" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#h900-a)"/>
    <line x1="258" y1="126" x2="258" y2="159" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#h900-a)"/>
    <line x1="422" y1="126" x2="422" y2="159" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#h900-a)"/>
    <line x1="584" y1="126" x2="584" y2="159" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#h900-a)"/>

    {/* Subscription: Web-Prod */}
    <rect x="20" y="162" width="152" height="40" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
    <text x="96" y="186" textAnchor="middle" fontSize="10.5" fill="#334155" fontWeight="700">Sub: Web-Prod</text>

    {/* Subscription: Web-Dev */}
    <rect x="182" y="162" width="152" height="40" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
    <text x="258" y="186" textAnchor="middle" fontSize="10.5" fill="#334155" fontWeight="700">Sub: Web-Dev</text>

    {/* Subscription: Finance */}
    <rect x="346" y="162" width="152" height="40" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
    <text x="422" y="186" textAnchor="middle" fontSize="10.5" fill="#334155" fontWeight="700">Sub: Finance</text>

    {/* Subscription: HR */}
    <rect x="508" y="162" width="152" height="40" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
    <text x="584" y="186" textAnchor="middle" fontSize="10.5" fill="#334155" fontWeight="700">Sub: HR</text>

    <line x1="56"  y1="202" x2="56"  y2="235" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#h900-a)"/>
    <line x1="136" y1="202" x2="136" y2="235" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#h900-a)"/>

    {/* Resource Group: rg-web-prod */}
    <rect x="20" y="238" width="70" height="40" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2"/>
    <text x="55" y="262" textAnchor="middle" fontSize="9" fill="#334155" fontWeight="700">RG: rg-web-prod</text>

    {/* Resource Group: rg-data */}
    <rect x="102" y="238" width="70" height="40" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2"/>
    <text x="137" y="262" textAnchor="middle" fontSize="9" fill="#334155" fontWeight="700">RG: rg-data</text>
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
    <rect x="0" y="0" width="680" height="260" fill="#f8fafc" rx="12"/>

    {/* UK South region */}
    <rect x="40" y="20" width="340" height="220" rx="10" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
    <rect x="40" y="20" width="340" height="28" rx="10" fill="#e2e8f0"/>
    <text x="210" y="39" textAnchor="middle" fontSize="11" fill="#334155" fontWeight="700">Region: UK South</text>
    <text x="210" y="62" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="600">Resource group: rg-app</text>

    <rect x="60"  y="75" width="145" height="50" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.2"/>
    <text x="132" y="105" textAnchor="middle" fontSize="9.5" fill="#334155" fontWeight="600">Storage account</text>

    <rect x="215" y="75" width="145" height="50" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.2"/>
    <text x="287" y="105" textAnchor="middle" fontSize="9.5" fill="#334155" fontWeight="600">Virtual machine</text>

    <rect x="60"  y="135" width="145" height="50" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.2"/>
    <text x="132" y="165" textAnchor="middle" fontSize="9.5" fill="#334155" fontWeight="600">Virtual network</text>

    <rect x="215" y="135" width="145" height="50" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.2"/>
    <text x="287" y="165" textAnchor="middle" fontSize="9.5" fill="#334155" fontWeight="600">SQL database</text>

    <rect x="60" y="195" width="300" height="34" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.2"/>
    <text x="210" y="216" textAnchor="middle" fontSize="9.5" fill="#334155" fontWeight="600">Network security group</text>

    {/* UK West region */}
    <rect x="420" y="20" width="220" height="220" rx="10" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
    <rect x="420" y="20" width="220" height="28" rx="10" fill="#e2e8f0"/>
    <text x="530" y="39" textAnchor="middle" fontSize="11" fill="#334155" fontWeight="700">Region: UK West</text>
    <text x="530" y="140" textAnchor="middle" fontSize="9" fill="#94a3b8" fontStyle="italic">No resources deployed here</text>
  </svg>
);

const az900hotspot = [
  {
    id: "AZ-900-HS-001",
    exam: "AZ-900",
    type: "hotspot",
    difficulty: "hard",
    category: "Describe Azure Management & Governance",
    question:
      "Contoso's online services team (running Sub: Web-Prod and Sub: Web-Dev) must have a cost-centre tagging policy enforced on everything they own — including any subscriptions added to their part of the org later. The Corp IT team (Sub: Finance and Sub: HR) must NOT be affected by this policy. Click the single scope where the policy should be assigned.",
    imageAlt:
      "Azure resource hierarchy diagram. At the top is a root management group 'Contoso (root)'. Below it are two management groups: 'Online Services' and 'Corp IT'. Under Online Services are two subscriptions, Web-Prod and Web-Dev. Under Corp IT are two subscriptions, Finance and HR. Under Web-Prod are two resource groups, rg-web-prod and rg-data.",
    viewBox: "0 0 680 320",
    diagram: ResourceHierarchyDiagram,
    zones: [
      { id: "root-mg",        label: "Contoso (root) management group",  x: 240, y: 10,  width: 200, height: 40 },
      { id: "online-mg",      label: "Online Services management group", x: 20,  y: 86,  width: 314, height: 40 },
      { id: "corpit-mg",      label: "Corp IT management group",         x: 346, y: 86,  width: 314, height: 40 },
      { id: "sub-web-prod",   label: "Sub: Web-Prod",                    x: 20,  y: 162, width: 152, height: 40 },
      { id: "sub-web-dev",    label: "Sub: Web-Dev",                     x: 182, y: 162, width: 152, height: 40 },
      { id: "sub-finance",    label: "Sub: Finance",                     x: 346, y: 162, width: 152, height: 40 },
      { id: "sub-hr",         label: "Sub: HR",                          x: 508, y: 162, width: 152, height: 40 },
      { id: "rg-web-prod",    label: "RG: rg-web-prod",                  x: 20,  y: 238, width: 70,  height: 40 },
      { id: "rg-data",        label: "RG: rg-data",                      x: 102, y: 238, width: 70,  height: 40 },
    ],
    correctZone: "online-mg",
    answer:
      "The 'Online Services' management group is correct. Assigning the policy here applies it to every subscription nested underneath — Web-Prod and Web-Dev today, and any future subscription moved into 'Online Services' — without ever touching Finance or HR under the separate 'Corp IT' management group.",
    explanation:
      "The root 'Contoso' management group is too broad — a policy there would also apply to Corp IT's Finance and HR subscriptions, which the question explicitly rules out. Assigning it separately to Web-Prod or Web-Dev alone would miss the other one, and wouldn't automatically cover a future subscription added under Online Services — you'd have to remember to assign it again each time. Picking Corp IT, Finance, or HR applies the policy to the wrong team entirely. A resource-group-level assignment (rg-web-prod or rg-data) is narrower still and wouldn't even cover Web-Dev. Management group nesting exists precisely so you can scope governance to one branch of the org without affecting sibling branches.",
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
      "Resource group rg-app sits in the UK South region and contains five resources. One of them is reconfigured to use geo-redundant storage (GRS), so its data is automatically given a copy in the UK West region. Click the resource that this change applies to.",
    imageAlt:
      "Diagram showing resource group rg-app in the UK South region containing five resources arranged in a grid: storage account, virtual machine, virtual network, SQL database, and network security group. The UK West region is shown alongside, empty, labelled 'No resources deployed here'.",
    viewBox: "0 0 680 260",
    diagram: RegionPairDiagram,
    zones: [
      { id: "storage-account",     label: "Storage account",      x: 60,  y: 75,  width: 145, height: 50 },
      { id: "virtual-machine",     label: "Virtual machine",       x: 215, y: 75,  width: 145, height: 50 },
      { id: "virtual-network",     label: "Virtual network",       x: 60,  y: 135, width: 145, height: 50 },
      { id: "sql-database",        label: "SQL database",          x: 215, y: 135, width: 145, height: 50 },
      { id: "network-security-group", label: "Network security group", x: 60, y: 195, width: 300, height: 34 },
    ],
    correctZone: "storage-account",
    answer:
      "The storage account is correct. GRS is a storage redundancy option that applies to Azure Storage accounts — it automatically maintains an asynchronous copy of the account's data in a paired region (UK West). It has no effect on the other resources in the resource group.",
    explanation:
      "Virtual machines, virtual networks, SQL databases, and network security groups are not affected by a storage account's redundancy setting — GRS is configured per storage account, not at the resource-group or region level. A VM's disks, a SQL database, and network configuration each have their own separate options for redundancy or backup, none of which are switched on just by enabling GRS on an unrelated storage account.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy",
  },
];

export default az900hotspot;
