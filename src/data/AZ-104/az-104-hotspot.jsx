// AZ-104 — Hotspot (click-on-diagram) questions — Identity & Governance
// Cards: AZ-104-HS-001 … AZ-104-HS-005

const RBACHierarchyDiagram = () => (
  <svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>
    <defs>
      <marker id="h104-a" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L8,3.5 z" fill="#94a3b8"/>
      </marker>
    </defs>

    <rect x="0" y="0" width="680" height="320" fill="#f8fafc" rx="12"/>
    <text x="340" y="13" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">Contoso organisation — Azure scope hierarchy</text>

    {/* Management Group */}
    <rect x="230" y="20" width="220" height="58" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
    <rect x="230" y="20" width="220" height="22" rx="8" fill="#e2e8f0"/>
    <text x="340" y="35" textAnchor="middle" fontSize="11" fill="#334155" fontWeight="700">MG-Contoso</text>
    <text x="340" y="52" textAnchor="middle" fontSize="8.5" fill="#475569">Management Group</text>
    <text x="340" y="68" textAnchor="middle" fontSize="7.5" fill="#94a3b8">Contains all Contoso subscriptions</text>

    <line x1="295" y1="78" x2="215" y2="115" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#h104-a)"/>
    <line x1="385" y1="78" x2="462" y2="115" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#h104-a)"/>

    {/* sub-prod */}
    <rect x="60" y="118" width="215" height="58" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
    <rect x="60" y="118" width="215" height="22" rx="8" fill="#e2e8f0"/>
    <text x="167" y="133" textAnchor="middle" fontSize="11" fill="#334155" fontWeight="700">sub-contoso-prod</text>
    <text x="167" y="150" textAnchor="middle" fontSize="8.5" fill="#475569">Subscription — Production</text>
    <text x="167" y="165" textAnchor="middle" fontSize="7.5" fill="#94a3b8">Current: rg-app, rg-data, rg-ops</text>

    <line x1="120" y1="176" x2="90" y2="215" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#h104-a)"/>
    <line x1="200" y1="176" x2="220" y2="215" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#h104-a)"/>

    {/* sub-dev */}
    <rect x="405" y="118" width="215" height="58" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
    <rect x="405" y="118" width="215" height="22" rx="8" fill="#e2e8f0"/>
    <text x="512" y="133" textAnchor="middle" fontSize="11" fill="#334155" fontWeight="700">sub-contoso-dev</text>
    <text x="512" y="150" textAnchor="middle" fontSize="8.5" fill="#475569">Subscription — Development</text>
    <text x="512" y="165" textAnchor="middle" fontSize="7.5" fill="#94a3b8">Current: rg-dev, rg-test</text>

    {/* rg-app (inside sub-prod) */}
    <rect x="20" y="218" width="150" height="55" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2"/>
    <text x="95" y="236" textAnchor="middle" fontSize="10" fill="#334155" fontWeight="700">rg-app</text>
    <text x="95" y="252" textAnchor="middle" fontSize="8" fill="#475569">App workloads</text>
    <text x="95" y="265" textAnchor="middle" fontSize="7.5" fill="#94a3b8">inside sub-prod</text>

    {/* rg-data (inside sub-prod) */}
    <rect x="185" y="218" width="150" height="55" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2"/>
    <text x="260" y="236" textAnchor="middle" fontSize="10" fill="#334155" fontWeight="700">rg-data</text>
    <text x="260" y="252" textAnchor="middle" fontSize="8" fill="#475569">Data workloads</text>
    <text x="260" y="265" textAnchor="middle" fontSize="7.5" fill="#94a3b8">inside sub-prod</text>

    {/* Future subscription hint */}
    <rect x="430" y="218" width="220" height="55" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="5 3"/>
    <text x="540" y="241" textAnchor="middle" fontSize="9.5" fill="#94a3b8" fontStyle="italic">sub-contoso-finance</text>
    <text x="540" y="258" textAnchor="middle" fontSize="8" fill="#cbd5e1">Planned new subscription</text>
    <text x="540" y="271" textAnchor="middle" fontSize="7.5" fill="#cbd5e1">(not yet created)</text>

    <text x="340" y="308" textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontStyle="italic">Click the scope where the role assignment should be created</text>
  </svg>
);

const NSGRulesDiagram = () => (
  <svg viewBox="0 0 680 258" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>

    <text x="340" y="12" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">NSG: nsg-web-tier — inbound security rules</text>

    {/* Table outer border */}
    <rect x="5" y="18" width="670" height="236" rx="6" fill="none" stroke="#cbd5e1" strokeWidth="1.2"/>

    {/* Header background */}
    <rect x="5" y="18" width="670" height="28" rx="6" fill="#e2e8f0"/>
    <rect x="5" y="34" width="670" height="12" fill="#e2e8f0"/>

    {/* Column headers */}
    <text x="40"  y="36" textAnchor="middle" fontSize="8.5" fill="#334155" fontWeight="700">Priority</text>
    <text x="157" y="36" textAnchor="middle" fontSize="8.5" fill="#334155" fontWeight="700">Name</text>
    <text x="272" y="36" textAnchor="middle" fontSize="8.5" fill="#334155" fontWeight="700">Port</text>
    <text x="330" y="36" textAnchor="middle" fontSize="8.5" fill="#334155" fontWeight="700">Protocol</text>
    <text x="452" y="36" textAnchor="middle" fontSize="8.5" fill="#334155" fontWeight="700">Source</text>
    <text x="610" y="36" textAnchor="middle" fontSize="8.5" fill="#334155" fontWeight="700">Action</text>

    {/* Column dividers */}
    <line x1="70"  y1="46" x2="70"  y2="254" stroke="#e2e8f0" strokeWidth="1"/>
    <line x1="245" y1="46" x2="245" y2="254" stroke="#e2e8f0" strokeWidth="1"/>
    <line x1="300" y1="46" x2="300" y2="254" stroke="#e2e8f0" strokeWidth="1"/>
    <line x1="360" y1="46" x2="360" y2="254" stroke="#e2e8f0" strokeWidth="1"/>
    <line x1="545" y1="46" x2="545" y2="254" stroke="#e2e8f0" strokeWidth="1"/>

    {/* Row 1 — 100 Allow-HTTPS */}
    <rect x="5" y="46" width="670" height="34" fill="#f8fafc"/>
    <line x1="5" y1="80" x2="675" y2="80" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="40"  y="67" textAnchor="middle" fontSize="9" fill="#334155">100</text>
    <text x="76"  y="67" textAnchor="start"  fontSize="9" fill="#334155">Allow-HTTPS</text>
    <text x="272" y="67" textAnchor="middle" fontSize="9" fill="#334155">443</text>
    <text x="330" y="67" textAnchor="middle" fontSize="9" fill="#334155">TCP</text>
    <text x="365" y="67" textAnchor="start"  fontSize="9" fill="#334155">Internet</text>
    <text x="610" y="67" textAnchor="middle" fontSize="9" fill="#15803d" fontWeight="600">Allow</text>

    {/* Row 2 — 200 Deny-HTTP-Public */}
    <rect x="5" y="80" width="670" height="34" fill="#f8fafc"/>
    <line x1="5" y1="114" x2="675" y2="114" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="40"  y="101" textAnchor="middle" fontSize="9" fill="#334155">200</text>
    <text x="76"  y="101" textAnchor="start"  fontSize="9" fill="#334155">Deny-HTTP-Public</text>
    <text x="272" y="101" textAnchor="middle" fontSize="9" fill="#334155">80</text>
    <text x="330" y="101" textAnchor="middle" fontSize="9" fill="#334155">TCP</text>
    <text x="365" y="101" textAnchor="start"  fontSize="9" fill="#334155">Internet</text>
    <text x="610" y="101" textAnchor="middle" fontSize="9" fill="#b91c1c" fontWeight="600">Deny</text>

    {/* Row 3 — 300 Allow-HTTP-VNet */}
    <rect x="5" y="114" width="670" height="34" fill="#f8fafc"/>
    <line x1="5" y1="148" x2="675" y2="148" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="40"  y="135" textAnchor="middle" fontSize="9" fill="#334155">300</text>
    <text x="76"  y="135" textAnchor="start"  fontSize="9" fill="#334155">Allow-HTTP-VNet</text>
    <text x="272" y="135" textAnchor="middle" fontSize="9" fill="#334155">80</text>
    <text x="330" y="135" textAnchor="middle" fontSize="9" fill="#334155">TCP</text>
    <text x="365" y="135" textAnchor="start"  fontSize="9" fill="#334155">VirtualNetwork</text>
    <text x="610" y="135" textAnchor="middle" fontSize="9" fill="#15803d" fontWeight="600">Allow</text>

    {/* Row 4 — 400 Allow-SSH-Mgmt */}
    <rect x="5" y="148" width="670" height="34" fill="#f8fafc"/>
    <line x1="5" y1="182" x2="675" y2="182" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="40"  y="169" textAnchor="middle" fontSize="9" fill="#334155">400</text>
    <text x="76"  y="169" textAnchor="start"  fontSize="9" fill="#334155">Allow-SSH-Mgmt</text>
    <text x="272" y="169" textAnchor="middle" fontSize="9" fill="#334155">22</text>
    <text x="330" y="169" textAnchor="middle" fontSize="9" fill="#334155">TCP</text>
    <text x="365" y="169" textAnchor="start"  fontSize="9" fill="#334155">10.1.0.0/24</text>
    <text x="610" y="169" textAnchor="middle" fontSize="9" fill="#15803d" fontWeight="600">Allow</text>

    {/* Row 5 — 65000 AllowVnetInBound (default, muted) */}
    <rect x="5" y="182" width="670" height="34" fill="#f1f5f9"/>
    <line x1="5" y1="216" x2="675" y2="216" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="40"  y="203" textAnchor="middle" fontSize="9" fill="#94a3b8">65000</text>
    <text x="76"  y="203" textAnchor="start"  fontSize="9" fill="#94a3b8">AllowVnetInBound</text>
    <text x="272" y="203" textAnchor="middle" fontSize="9" fill="#94a3b8">Any</text>
    <text x="330" y="203" textAnchor="middle" fontSize="9" fill="#94a3b8">Any</text>
    <text x="365" y="203" textAnchor="start"  fontSize="9" fill="#94a3b8">VirtualNetwork</text>
    <text x="610" y="203" textAnchor="middle" fontSize="9" fill="#64748b">Allow</text>

    {/* Row 6 — 65500 DenyAllInBound (default, muted) */}
    <rect x="5" y="216" width="670" height="34" fill="#f1f5f9"/>
    <text x="40"  y="237" textAnchor="middle" fontSize="9" fill="#94a3b8">65500</text>
    <text x="76"  y="237" textAnchor="start"  fontSize="9" fill="#94a3b8">DenyAllInBound</text>
    <text x="272" y="237" textAnchor="middle" fontSize="9" fill="#94a3b8">Any</text>
    <text x="330" y="237" textAnchor="middle" fontSize="9" fill="#94a3b8">Any</text>
    <text x="365" y="237" textAnchor="start"  fontSize="9" fill="#94a3b8">Any</text>
    <text x="610" y="237" textAnchor="middle" fontSize="9" fill="#64748b">Deny</text>
  </svg>
);

const EffectiveRoutesDiagram = () => (
  <svg viewBox="0 0 680 248" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>

    <text x="340" y="11" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">Effective routes — NIC: nic-vm-prod01</text>

    {/* Table outer border */}
    <rect x="5" y="18" width="670" height="208" rx="6" fill="none" stroke="#cbd5e1" strokeWidth="1.2"/>

    {/* Header background */}
    <rect x="5" y="18" width="670" height="28" rx="6" fill="#e2e8f0"/>
    <rect x="5" y="34" width="670" height="12" fill="#e2e8f0"/>

    {/* Column headers */}
    <text x="75"  y="36" textAnchor="middle" fontSize="8.5" fill="#334155" fontWeight="700">Address Prefix</text>
    <text x="245" y="36" textAnchor="middle" fontSize="8.5" fill="#334155" fontWeight="700">Next Hop Type</text>
    <text x="390" y="36" textAnchor="middle" fontSize="8.5" fill="#334155" fontWeight="700">Next Hop IP</text>
    <text x="555" y="36" textAnchor="middle" fontSize="8.5" fill="#334155" fontWeight="700">Source</text>

    {/* Column dividers */}
    <line x1="145" y1="46" x2="145" y2="226" stroke="#e2e8f0" strokeWidth="1"/>
    <line x1="345" y1="46" x2="345" y2="226" stroke="#e2e8f0" strokeWidth="1"/>
    <line x1="435" y1="46" x2="435" y2="226" stroke="#e2e8f0" strokeWidth="1"/>

    {/* Row 1 — 0.0.0.0/0 */}
    <rect x="5" y="46" width="670" height="36" fill="#f8fafc"/>
    <line x1="5" y1="82" x2="675" y2="82" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="75"  y="68" textAnchor="middle" fontSize="9"   fill="#334155" fontWeight="600">0.0.0.0/0</text>
    <text x="245" y="68" textAnchor="middle" fontSize="9"   fill="#334155">Internet</text>
    <text x="390" y="68" textAnchor="middle" fontSize="9"   fill="#94a3b8">—</text>
    <text x="555" y="68" textAnchor="middle" fontSize="8.5" fill="#64748b">System (default)</text>

    {/* Row 2 — 10.0.0.0/8 */}
    <rect x="5" y="82" width="670" height="36" fill="#f8fafc"/>
    <line x1="5" y1="118" x2="675" y2="118" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="75"  y="104" textAnchor="middle" fontSize="9"   fill="#334155" fontWeight="600">10.0.0.0/8</text>
    <text x="245" y="104" textAnchor="middle" fontSize="9"   fill="#334155">VirtualNetworkGateway</text>
    <text x="390" y="104" textAnchor="middle" fontSize="9"   fill="#94a3b8">—</text>
    <text x="555" y="104" textAnchor="middle" fontSize="8.5" fill="#64748b">BGP (propagated)</text>

    {/* Row 3 — 10.1.0.0/16 */}
    <rect x="5" y="118" width="670" height="36" fill="#f8fafc"/>
    <line x1="5" y1="154" x2="675" y2="154" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="75"  y="140" textAnchor="middle" fontSize="9"   fill="#334155" fontWeight="600">10.1.0.0/16</text>
    <text x="245" y="140" textAnchor="middle" fontSize="9"   fill="#334155">VirtualNetwork</text>
    <text x="390" y="140" textAnchor="middle" fontSize="9"   fill="#94a3b8">—</text>
    <text x="555" y="140" textAnchor="middle" fontSize="8.5" fill="#64748b">System (default)</text>

    {/* Row 4 — 10.1.2.0/24 UDR */}
    <rect x="5" y="154" width="670" height="36" fill="#f8fafc"/>
    <line x1="5" y1="190" x2="675" y2="190" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="75"  y="176" textAnchor="middle" fontSize="9"   fill="#334155" fontWeight="600">10.1.2.0/24</text>
    <text x="245" y="176" textAnchor="middle" fontSize="9"   fill="#334155">VirtualAppliance</text>
    <text x="390" y="176" textAnchor="middle" fontSize="9"   fill="#334155">10.0.0.4</text>
    <text x="555" y="176" textAnchor="middle" fontSize="8.5" fill="#64748b">User (UDR)</text>

    {/* Row 5 — 192.168.1.0/24 */}
    <rect x="5" y="190" width="670" height="36" fill="#f8fafc"/>
    <text x="75"  y="212" textAnchor="middle" fontSize="9"   fill="#334155" fontWeight="600">192.168.1.0/24</text>
    <text x="245" y="212" textAnchor="middle" fontSize="9"   fill="#334155">VirtualNetworkGateway</text>
    <text x="390" y="212" textAnchor="middle" fontSize="9"   fill="#94a3b8">—</text>
    <text x="555" y="212" textAnchor="middle" fontSize="8.5" fill="#64748b">BGP (propagated)</text>
  </svg>
);

const SSPRMethodsDiagram = () => (
  <svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>
    <text x="340" y="14" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">SSPR Authentication Methods</text>

    {/* Mobile app notification */}
    <rect x="15" y="22" width="310" height="64" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="27" y="41" fontSize="10" fill="#15803d" fontWeight="700">Mobile app notification</text>
    <text x="27" y="57" fontSize="8.5" fill="#16a34a">Microsoft Authenticator push notification</text>
    <text x="27" y="74" fontSize="8" fill="#86efac">User taps Approve in the app</text>

    {/* Mobile app code */}
    <rect x="15" y="98" width="310" height="64" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="27" y="117" fontSize="10" fill="#15803d" fontWeight="700">Mobile app code</text>
    <text x="27" y="133" fontSize="8.5" fill="#16a34a">Microsoft Authenticator TOTP code</text>
    <text x="27" y="150" fontSize="8" fill="#86efac">User enters 6-digit rotating code from app</text>

    {/* Email */}
    <rect x="15" y="174" width="310" height="64" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="27" y="193" fontSize="10" fill="#15803d" fontWeight="700">Email</text>
    <text x="27" y="209" fontSize="8.5" fill="#16a34a">External email address (not M365 address)</text>
    <text x="27" y="226" fontSize="8" fill="#86efac">Azure sends a verification code to the address</text>

    {/* Mobile phone */}
    <rect x="355" y="22" width="310" height="64" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="367" y="41" fontSize="10" fill="#15803d" fontWeight="700">Mobile phone</text>
    <text x="367" y="57" fontSize="8.5" fill="#16a34a">SMS text message or automated voice call</text>
    <text x="367" y="74" fontSize="8" fill="#86efac">Not recommended due to SMS fraud risk</text>

    {/* Office phone */}
    <rect x="355" y="98" width="310" height="64" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="367" y="117" fontSize="10" fill="#15803d" fontWeight="700">Office phone</text>
    <text x="367" y="133" fontSize="8.5" fill="#16a34a">Automated voice call to a non-mobile number</text>
    <text x="367" y="150" fontSize="8" fill="#86efac">User presses # to confirm identity</text>

    {/* Security questions */}
    <rect x="355" y="174" width="310" height="64" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="367" y="194" fontSize="10" fill="#15803d" fontWeight="700">Security questions</text>
    <text x="367" y="212" fontSize="8.5" fill="#16a34a">User selects questions and provides answers</text>
    <text x="367" y="228" fontSize="8" fill="#86efac">Answered during password reset flow</text>
  </svg>
);

const GroupMembershipDiagram = () => (
  <svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>

    {/* Left header — Security Group */}
    <rect x="15" y="12" width="305" height="30" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="167" y="32" textAnchor="middle" fontSize="11" fill="#1d4ed8" fontWeight="700">Security Group</text>

    {/* Right header — M365 Group */}
    <rect x="360" y="12" width="305" height="30" rx="6" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5"/>
    <text x="512" y="32" textAnchor="middle" fontSize="11" fill="#9d174d" fontWeight="700">Microsoft 365 Group</text>

    {/* Security: Assigned */}
    <rect x="15" y="55" width="305" height="70" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.2"/>
    <text x="167" y="95" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="700">Assigned</text>

    {/* Security: Dynamic User */}
    <rect x="15" y="138" width="305" height="70" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.2"/>
    <text x="167" y="178" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="700">Dynamic User</text>

    {/* Security: Dynamic Device */}
    <rect x="15" y="221" width="305" height="82" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.2"/>
    <text x="167" y="267" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="700">Dynamic Device</text>

    {/* M365: Assigned */}
    <rect x="360" y="55" width="305" height="70" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.2"/>
    <text x="512" y="95" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="700">Assigned</text>

    {/* M365: Dynamic User */}
    <rect x="360" y="138" width="305" height="70" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.2"/>
    <text x="512" y="178" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="700">Dynamic User</text>

    {/* M365: Dynamic Device */}
    <rect x="360" y="221" width="305" height="82" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.2"/>
    <text x="512" y="267" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="700">Dynamic Device</text>
  </svg>
);

const AppGatewayRoutingDiagram = () => (
  <svg viewBox="0 0 680 266" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>
    <defs>
      <marker id="agw-arr" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L8,3.5 z" fill="#94a3b8"/>
      </marker>
      <marker id="agw-cli" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L8,3.5 z" fill="#6366f1"/>
      </marker>
    </defs>

    {/* Client */}
    <rect x="8" y="108" width="118" height="62" rx="8" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1.5"/>
    <text x="67" y="129" textAnchor="middle" fontSize="10" fill="#0369a1" fontWeight="700">Client</text>
    <text x="67" y="145" textAnchor="middle" fontSize="8" fill="#0284c7" fontFamily="monospace">GET /api/users/42</text>
    <text x="67" y="159" textAnchor="middle" fontSize="7.5" fill="#7dd3fc">HTTP · port 80</text>

    {/* Arrow client → AppGW */}
    <line x1="126" y1="139" x2="142" y2="139" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#agw-cli)"/>

    {/* Application Gateway outer box */}
    <rect x="144" y="12" width="272" height="242" rx="8" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.8"/>
    <rect x="144" y="12" width="272" height="26" rx="8" fill="#e0e7ff"/>
    <text x="280" y="29" textAnchor="middle" fontSize="11" fill="#4338ca" fontWeight="700">Application Gateway</text>
    <text x="157" y="54" fontSize="8.5" fill="#6366f1" fontWeight="700">Path-based routing rules</text>
    <line x1="157" y1="59" x2="408" y2="59" stroke="#c7d2fe" strokeWidth="0.8"/>

    {/* Rule 1: /images/* */}
    <rect x="157" y="64" width="248" height="48" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="167" y="82" fontSize="9" fill="#334155" fontWeight="600" fontFamily="monospace">/images/*</text>
    <text x="236" y="82" fontSize="9" fill="#94a3b8">→</text>
    <text x="249" y="82" fontSize="9" fill="#64748b">pool-images</text>
    <text x="167" y="103" fontSize="7.5" fill="#94a3b8">Priority 1 — image assets</text>

    {/* Rule 2: /api/* */}
    <rect x="157" y="120" width="248" height="48" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="167" y="138" fontSize="9" fill="#334155" fontWeight="600" fontFamily="monospace">/api/*</text>
    <text x="205" y="138" fontSize="9" fill="#94a3b8">→</text>
    <text x="218" y="138" fontSize="9" fill="#64748b">pool-api</text>
    <text x="167" y="159" fontSize="7.5" fill="#94a3b8">Priority 2 — REST API endpoints</text>

    {/* Rule 3: /* default */}
    <rect x="157" y="176" width="248" height="48" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="167" y="194" fontSize="9" fill="#334155" fontWeight="600" fontFamily="monospace">/* (default)</text>
    <text x="248" y="194" fontSize="9" fill="#94a3b8">→</text>
    <text x="261" y="194" fontSize="9" fill="#64748b">pool-web</text>
    <text x="167" y="215" fontSize="7.5" fill="#94a3b8">Default rule — matches all remaining paths</text>

    <text x="280" y="243" textAnchor="middle" fontSize="7.5" fill="#818cf8" fontStyle="italic">Layer 7 — inspects URL path before forwarding</text>

    {/* Arrows: rule centres → pool boxes */}
    <line x1="416" y1="88"  x2="428" y2="51"  stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#agw-arr)"/>
    <line x1="416" y1="144" x2="428" y2="134" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#agw-arr)"/>
    <line x1="416" y1="200" x2="428" y2="217" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#agw-arr)"/>

    {/* pool-images */}
    <rect x="430" y="18" width="242" height="66" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.3"/>
    <rect x="430" y="18" width="242" height="22" rx="8" fill="#e2e8f0"/>
    <text x="551" y="33" textAnchor="middle" fontSize="10" fill="#1e293b" fontWeight="700">pool-images</text>
    <text x="551" y="54" textAnchor="middle" fontSize="8.5" fill="#475569">Image processing servers</text>
    <text x="551" y="70" textAnchor="middle" fontSize="7.5" fill="#94a3b8">handles /images/* requests</text>

    {/* pool-api */}
    <rect x="430" y="101" width="242" height="66" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.3"/>
    <rect x="430" y="101" width="242" height="22" rx="8" fill="#e2e8f0"/>
    <text x="551" y="116" textAnchor="middle" fontSize="10" fill="#1e293b" fontWeight="700">pool-api</text>
    <text x="551" y="137" textAnchor="middle" fontSize="8.5" fill="#475569">API application servers</text>
    <text x="551" y="153" textAnchor="middle" fontSize="7.5" fill="#94a3b8">handles /api/* requests</text>

    {/* pool-web */}
    <rect x="430" y="184" width="242" height="66" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.3"/>
    <rect x="430" y="184" width="242" height="22" rx="8" fill="#e2e8f0"/>
    <text x="551" y="199" textAnchor="middle" fontSize="10" fill="#1e293b" fontWeight="700">pool-web</text>
    <text x="551" y="220" textAnchor="middle" fontSize="8.5" fill="#475569">Web frontend servers</text>
    <text x="551" y="236" textAnchor="middle" fontSize="7.5" fill="#94a3b8">handles all other requests</text>
  </svg>
);

const NetworkWatcherToolsDiagram = () => (
  <svg viewBox="0 0 680 254" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>

    <text x="340" y="11" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">Azure Network Watcher — diagnostic tools</text>

    {/* Table outer border */}
    <rect x="5" y="18" width="670" height="232" rx="6" fill="none" stroke="#cbd5e1" strokeWidth="1.2"/>

    {/* Header */}
    <rect x="5" y="18" width="670" height="28" rx="6" fill="#e2e8f0"/>
    <rect x="5" y="34" width="670" height="12" fill="#e2e8f0"/>
    <text x="90"  y="36" textAnchor="middle" fontSize="8.5" fill="#334155" fontWeight="700">Tool</text>
    <text x="420" y="36" textAnchor="middle" fontSize="8.5" fill="#334155" fontWeight="700">What it does</text>

    {/* Column divider */}
    <line x1="175" y1="46" x2="175" y2="250" stroke="#e2e8f0" strokeWidth="1"/>

    {/* Row 1 — Topology */}
    <rect x="5" y="46" width="670" height="33" fill="#f8fafc"/>
    <line x1="5" y1="79" x2="675" y2="79" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="11" y="67" textAnchor="start" fontSize="9" fill="#334155" fontWeight="600">Topology</text>
    <text x="181" y="67" textAnchor="start" fontSize="8.5" fill="#334155">Visualises all VNet resources (VMs, NICs, NSGs, gateways) and their relationships — read-only snapshot</text>

    {/* Row 2 — IP flow verify */}
    <rect x="5" y="79" width="670" height="33" fill="#f8fafc"/>
    <line x1="5" y1="112" x2="675" y2="112" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="11" y="100" textAnchor="start" fontSize="9" fill="#334155" fontWeight="600">IP flow verify</text>
    <text x="181" y="100" textAnchor="start" fontSize="8.5" fill="#334155">5-tuple check: evaluates NSG rules to report whether a specific IP/port/protocol flow is allowed or denied — no packets sent</text>

    {/* Row 3 — Next hop */}
    <rect x="5" y="112" width="670" height="33" fill="#f8fafc"/>
    <line x1="5" y1="145" x2="675" y2="145" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="11" y="133" textAnchor="start" fontSize="9" fill="#334155" fontWeight="600">Next hop</text>
    <text x="181" y="133" textAnchor="start" fontSize="8.5" fill="#334155">Returns the next hop type, IP address, and effective route table entry for a packet from a VM to a destination IP</text>

    {/* Row 4 — Connection troubleshoot */}
    <rect x="5" y="145" width="670" height="33" fill="#f8fafc"/>
    <line x1="5" y1="178" x2="675" y2="178" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="11" y="166" textAnchor="start" fontSize="9" fill="#334155" fontWeight="600">Connection troubleshoot</text>
    <text x="181" y="166" textAnchor="start" fontSize="8.5" fill="#334155">Sends TCP probes between source and destination; reports latency, hop count, and fault type (NSG, route, firewall, DNS)</text>

    {/* Row 5 — Connection Monitor */}
    <rect x="5" y="178" width="670" height="33" fill="#f8fafc"/>
    <line x1="5" y1="211" x2="675" y2="211" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="11" y="199" textAnchor="start" fontSize="9" fill="#334155" fontWeight="600">Connection Monitor</text>
    <text x="181" y="199" textAnchor="start" fontSize="8.5" fill="#334155">Continuously probes endpoints at configured intervals; detects connectivity degradation and NSG rule change impacts over time</text>

    {/* Row 6 — Packet capture */}
    <rect x="5" y="211" width="670" height="33" fill="#f8fafc"/>
    <text x="11" y="232" textAnchor="start" fontSize="9" fill="#334155" fontWeight="600">Packet capture</text>
    <text x="181" y="232" textAnchor="start" fontSize="8.5" fill="#334155">Remotely triggers raw packet recording at a VM NIC via an extension; saves filtered traffic to local disk or Storage blob</text>
  </svg>
);

const AppGatewayVersionedRoutingDiagram = () => (
  <svg viewBox="0 0 680 266" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>
    <defs>
      <marker id="agv-arr" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L8,3.5 z" fill="#94a3b8"/>
      </marker>
      <marker id="agv-cli" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L8,3.5 z" fill="#6366f1"/>
      </marker>
    </defs>

    {/* Client */}
    <rect x="8" y="108" width="118" height="62" rx="8" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1.5"/>
    <text x="67" y="129" textAnchor="middle" fontSize="10" fill="#0369a1" fontWeight="700">Client</text>
    <text x="67" y="145" textAnchor="middle" fontSize="8" fill="#0284c7" fontFamily="monospace">GET /api/v2/stats/daily</text>
    <text x="67" y="159" textAnchor="middle" fontSize="7.5" fill="#7dd3fc">HTTP · port 80</text>

    {/* Arrow client → AppGW */}
    <line x1="126" y1="139" x2="142" y2="139" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#agv-cli)"/>

    {/* Application Gateway outer box */}
    <rect x="144" y="12" width="272" height="242" rx="8" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.8"/>
    <rect x="144" y="12" width="272" height="26" rx="8" fill="#e0e7ff"/>
    <text x="280" y="29" textAnchor="middle" fontSize="11" fill="#4338ca" fontWeight="700">Application Gateway</text>
    <text x="157" y="54" fontSize="8.5" fill="#6366f1" fontWeight="700">Path-based routing rules</text>
    <line x1="157" y1="59" x2="408" y2="59" stroke="#c7d2fe" strokeWidth="0.8"/>

    {/* Rule 1: /api/v2/* */}
    <rect x="157" y="64" width="248" height="48" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="167" y="82" fontSize="9" fill="#334155" fontWeight="600" fontFamily="monospace">/api/v2/*</text>
    <text x="240" y="82" fontSize="9" fill="#94a3b8">→</text>
    <text x="253" y="82" fontSize="9" fill="#64748b">pool-api-v2</text>
    <text x="167" y="103" fontSize="7.5" fill="#94a3b8">Priority 1 — versioned API endpoints</text>

    {/* Rule 2: /api/* */}
    <rect x="157" y="120" width="248" height="48" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="167" y="138" fontSize="9" fill="#334155" fontWeight="600" fontFamily="monospace">/api/*</text>
    <text x="205" y="138" fontSize="9" fill="#94a3b8">→</text>
    <text x="218" y="138" fontSize="9" fill="#64748b">pool-api</text>
    <text x="167" y="159" fontSize="7.5" fill="#94a3b8">Priority 2 — all API endpoints</text>

    {/* Rule 3: /* default */}
    <rect x="157" y="176" width="248" height="48" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="167" y="194" fontSize="9" fill="#334155" fontWeight="600" fontFamily="monospace">/* (default)</text>
    <text x="248" y="194" fontSize="9" fill="#94a3b8">→</text>
    <text x="261" y="194" fontSize="9" fill="#64748b">pool-web</text>
    <text x="167" y="215" fontSize="7.5" fill="#94a3b8">Default rule — matches all remaining paths</text>

    <text x="280" y="243" textAnchor="middle" fontSize="7.5" fill="#818cf8" fontStyle="italic">Rules evaluated in priority order — first match wins</text>

    {/* Arrows: rule centres → pool boxes */}
    <line x1="416" y1="88"  x2="428" y2="51"  stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#agv-arr)"/>
    <line x1="416" y1="144" x2="428" y2="134" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#agv-arr)"/>
    <line x1="416" y1="200" x2="428" y2="217" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#agv-arr)"/>

    {/* pool-api-v2 */}
    <rect x="430" y="18" width="242" height="66" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.3"/>
    <rect x="430" y="18" width="242" height="22" rx="8" fill="#e2e8f0"/>
    <text x="551" y="33" textAnchor="middle" fontSize="10" fill="#1e293b" fontWeight="700">pool-api-v2</text>
    <text x="551" y="54" textAnchor="middle" fontSize="8.5" fill="#475569">Version 2 API servers</text>
    <text x="551" y="70" textAnchor="middle" fontSize="7.5" fill="#94a3b8">handles /api/v2/* requests</text>

    {/* pool-api */}
    <rect x="430" y="101" width="242" height="66" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.3"/>
    <rect x="430" y="101" width="242" height="22" rx="8" fill="#e2e8f0"/>
    <text x="551" y="116" textAnchor="middle" fontSize="10" fill="#1e293b" fontWeight="700">pool-api</text>
    <text x="551" y="137" textAnchor="middle" fontSize="8.5" fill="#475569">Legacy API servers</text>
    <text x="551" y="153" textAnchor="middle" fontSize="7.5" fill="#94a3b8">handles /api/* requests</text>

    {/* pool-web */}
    <rect x="430" y="184" width="242" height="66" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.3"/>
    <rect x="430" y="184" width="242" height="22" rx="8" fill="#e2e8f0"/>
    <text x="551" y="199" textAnchor="middle" fontSize="10" fill="#1e293b" fontWeight="700">pool-web</text>
    <text x="551" y="220" textAnchor="middle" fontSize="8.5" fill="#475569">Web frontend servers</text>
    <text x="551" y="236" textAnchor="middle" fontSize="7.5" fill="#94a3b8">handles all other requests</text>
  </svg>
);

const az104hotspot = [
  {
    id: "AZ-104-HS-001",
    exam: "AZ-104",
    type: "hotspot",
    difficulty: "extreme",
    category: "Identity & Governance",
    question:
      "A cost-reporting managed identity must have Reader access to ALL current Contoso subscriptions AND any new subscriptions added to the organisation in the future — with a single role assignment. Click the correct scope.",
    imageAlt:
      "Contoso Azure scope hierarchy showing MG-Contoso management group at the top, sub-contoso-prod and sub-contoso-dev subscriptions below it, resource groups rg-app and rg-data inside sub-prod, and a dashed 'sub-contoso-finance — planned new subscription' box.",
    viewBox: "0 0 680 320",
    diagram: RBACHierarchyDiagram,
    zones: [
      { id: "management-group", label: "MG-Contoso (Management Group)", x: 230, y: 20,  width: 220, height: 58 },
      { id: "sub-prod",         label: "sub-contoso-prod",              x: 60,  y: 118, width: 215, height: 58 },
      { id: "sub-dev",          label: "sub-contoso-dev",               x: 405, y: 118, width: 215, height: 58 },
      { id: "rg-app",           label: "rg-app",                        x: 20,  y: 218, width: 150, height: 55 },
    ],
    correctZone: "management-group",
    answer:
      "Management Group scope is correct here. It is the only scope that covers all current subscriptions AND automatically extends to any new subscription added to MG-Contoso in the future — with a single assignment.",
    explanation:
      "Subscription scope covers only that subscription — new subscriptions would require a separate assignment each time. Resource group scope is far too narrow. Management Group scope inherits downward to every subscription, resource group, and resource below it, including ones that don't exist yet. This is the legitimate use case for MG-level assignments: organisation-wide policies or monitoring that must always include future subscriptions without manual intervention.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview#scope",
  },
  {
    id: "AZ-104-HS-002",
    exam: "AZ-104",
    type: "hotspot",
    difficulty: "hard",
    category: "Virtual Networks",
    question:
      "An HTTP request (port 80, TCP) arrives from a public internet IP address at a VM attached to nsg-web-tier. NSG inbound rules are evaluated in ascending priority order and processing stops at the first match. Click the rule that determines the final outcome for this traffic.",
    imageAlt:
      "NSG inbound rules table for nsg-web-tier with six rows: Priority 100 Allow-HTTPS port 443 from Internet Allow; Priority 200 Deny-HTTP-Public port 80 from Internet Deny; Priority 300 Allow-HTTP-VNet port 80 from VirtualNetwork Allow; Priority 400 Allow-SSH-Mgmt port 22 from 10.1.0.0/24 Allow; Priority 65000 AllowVnetInBound default Allow; Priority 65500 DenyAllInBound default Deny.",
    viewBox: "0 0 680 258",
    diagram: NSGRulesDiagram,
    zones: [
      { id: "rule-100",   label: "Priority 100 — Allow-HTTPS",       x: 5, y: 46,  width: 670, height: 34 },
      { id: "rule-200",   label: "Priority 200 — Deny-HTTP-Public",   x: 5, y: 80,  width: 670, height: 34 },
      { id: "rule-300",   label: "Priority 300 — Allow-HTTP-VNet",    x: 5, y: 114, width: 670, height: 34 },
      { id: "rule-400",   label: "Priority 400 — Allow-SSH-Mgmt",     x: 5, y: 148, width: 670, height: 34 },
      { id: "rule-65000", label: "Priority 65000 — AllowVnetInBound", x: 5, y: 182, width: 670, height: 34 },
      { id: "rule-65500", label: "Priority 65500 — DenyAllInBound",   x: 5, y: 216, width: 670, height: 34 },
    ],
    correctZone: "rule-200",
    answer:
      "Priority 200 (Deny-HTTP-Public) is the first rule that matches: port 80, TCP, source Internet. Processing stops here — the traffic is denied.",
    explanation:
      "Rule 100 matches port 443 only — this request is on port 80, so it is skipped. Rule 200 matches all three criteria: port 80, TCP, and the source tag Internet covers all public IP addresses. This is the first match so the Deny action is applied and no further rules are evaluated. Rule 300 also matches port 80 but its source is VirtualNetwork — an internal tag that does not cover public internet addresses — and it would never be reached anyway. The default rules at 65000 and 65500 are never evaluated once rule 200 has matched.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview",
  },
  {
    id: "AZ-104-HS-003",
    exam: "AZ-104",
    type: "hotspot",
    difficulty: "hard",
    category: "Virtual Networks",
    question:
      "A VM sends a packet to destination IP 10.1.2.15. Click the route that will forward this packet.",
    imageAlt:
      "Effective routes table for nic-vm-prod01 with five entries: 0.0.0.0/0 via Internet (system default); 10.0.0.0/8 via VirtualNetworkGateway (BGP propagated); 10.1.0.0/16 via VirtualNetwork (system default); 10.1.2.0/24 via VirtualAppliance 10.0.0.4 (User UDR); 192.168.1.0/24 via VirtualNetworkGateway (BGP propagated).",
    viewBox: "0 0 680 248",
    diagram: EffectiveRoutesDiagram,
    zones: [
      { id: "route-default",   label: "0.0.0.0/0 — Internet",                   x: 5, y: 46,  width: 670, height: 36 },
      { id: "route-10-8",      label: "10.0.0.0/8 — VirtualNetworkGateway",     x: 5, y: 82,  width: 670, height: 36 },
      { id: "route-10-1-16",   label: "10.1.0.0/16 — VirtualNetwork",           x: 5, y: 118, width: 670, height: 36 },
      { id: "route-10-1-2-24", label: "10.1.2.0/24 — VirtualAppliance (UDR)",  x: 5, y: 154, width: 670, height: 36 },
      { id: "route-192-168",   label: "192.168.1.0/24 — VirtualNetworkGateway", x: 5, y: 190, width: 670, height: 36 },
    ],
    correctZone: "route-10-1-2-24",
    answer:
      "10.1.2.0/24 is the most specific (longest) prefix that matches destination 10.1.2.15. It wins over 10.1.0.0/16 and 10.0.0.0/8, both of which also match the destination but are less specific.",
    explanation:
      "Destination 10.1.2.15 matches four of the five routes: 0.0.0.0/0 (/0 matches everything), 10.0.0.0/8, 10.1.0.0/16, and 10.1.2.0/24. The /24 has the most bits fixed and is the most specific match — it is always selected regardless of its position in the table. This UDR sends the packet to a Network Virtual Appliance at 10.0.0.4, a common pattern for routing subnet traffic through a firewall. The fifth route (192.168.1.0/24) does not match 10.1.2.15 at all. Note: this differs from NSG rule evaluation, which uses explicit priority numbers and stops at the first match — effective route selection is purely about prefix specificity.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview",
  },
  {
    id: "AZ-104-HS-004",
    exam: "AZ-104",
    type: "hotspot",
    difficulty: "medium",
    category: "Identity & Governance",
    question:
      "An Entra ID administrator account needs SSPR configured. One of these authentication methods is NOT available for accounts with administrator roles regardless of the SSPR policy settings. Click it.",
    imageAlt:
      "Six SSPR authentication method boxes arranged in two columns: Mobile app notification, Mobile app code, and Email on the left; Mobile phone, Office phone, and Security questions on the right. Security questions is highlighted in red.",
    viewBox: "0 0 680 260",
    diagram: SSPRMethodsDiagram,
    zones: [
      { id: "mobile-app-notification", label: "Mobile app notification", x: 15,  y: 22,  width: 310, height: 64 },
      { id: "mobile-app-code",         label: "Mobile app code",         x: 15,  y: 98,  width: 310, height: 64 },
      { id: "email",                   label: "Email",                   x: 15,  y: 174, width: 310, height: 64 },
      { id: "mobile-phone",            label: "Mobile phone",            x: 355, y: 22,  width: 310, height: 64 },
      { id: "office-phone",            label: "Office phone",            x: 355, y: 98,  width: 310, height: 64 },
      { id: "security-questions",      label: "Security questions",      x: 355, y: 174, width: 310, height: 64 },
    ],
    correctZone: "security-questions",
    answer:
      "Security questions are excluded from all accounts with an administrator role. A strong two-method authentication policy is always enforced for admin accounts, and security questions are never part of that policy regardless of what the tenant SSPR configuration says.",
    explanation:
      "Microsoft excludes security questions for admin accounts because the answers can often be guessed, researched online, or obtained through social engineering. All five other methods remain available to admin accounts. Admin SSPR always requires two methods — no exceptions — and must not include security questions.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/allow-users-reset-their-password/2-self-service-password-reset",
  },
  {
    id: "AZ-104-HS-005",
    exam: "AZ-104",
    type: "hotspot",
    difficulty: "medium",
    category: "Identity & Governance",
    question:
      "A device management team needs a group where corporate Windows devices are automatically added or removed based on device attribute rules. Click the membership type that supports this.",
    imageAlt:
      "Group type comparison diagram with Security Group on the left (showing Assigned, Dynamic User, and Dynamic Device membership types) and Microsoft 365 Group on the right (showing Assigned and Dynamic User, with Dynamic Device shown as not supported).",
    viewBox: "0 0 680 320",
    diagram: GroupMembershipDiagram,
    zones: [
      { id: "security-assigned",       label: "Security Group — Assigned",       x: 15,  y: 55,  width: 305, height: 70 },
      { id: "security-dynamic-user",   label: "Security Group — Dynamic User",   x: 15,  y: 138, width: 305, height: 70 },
      { id: "security-dynamic-device", label: "Security Group — Dynamic Device", x: 15,  y: 221, width: 305, height: 82 },
      { id: "m365-assigned",           label: "M365 Group — Assigned",           x: 360, y: 55,  width: 305, height: 70 },
      { id: "m365-dynamic-user",       label: "M365 Group — Dynamic User",       x: 360, y: 138, width: 305, height: 70 },
      { id: "m365-dynamic-device",     label: "M365 Group — Dynamic Device (Not supported)", x: 360, y: 221, width: 305, height: 82 },
    ],
    correctZone: "security-dynamic-device",
    answer:
      "Dynamic Device membership is only supported in Security groups — not Microsoft 365 groups. It automatically adds or removes devices based on device attribute rules and requires an Entra ID P1 license or Intune for Education.",
    explanation:
      "Microsoft 365 groups are collaboration-focused (shared mailbox, Teams, SharePoint) and only support user-based membership — Assigned or Dynamic User. Dynamic Device is a Security group-only capability. This is a common exam distinction: both group types support Dynamic User, but only Security groups support Dynamic Device.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/create-configure-manage-identities/5-groups",
  },
  {
    id: "AZ-104-HS-006",
    exam: "AZ-104",
    type: "hotspot",
    difficulty: "medium",
    category: "Virtual Networks",
    devAdded: "2026-05-18T00:00:00Z",
    question:
      "A client sends a request: GET /api/users/42. The Application Gateway evaluates its path-based routing rules in priority order and forwards the request to the first matching backend pool. Click the pool that receives this request.",
    imageAlt:
      "Application Gateway diagram showing a client sending GET /api/users/42, an Application Gateway with three path routing rules (/images/* to pool-images at priority 1, /api/* to pool-api at priority 2, /* default to pool-web), and three backend pool boxes on the right.",
    viewBox: "0 0 680 266",
    diagram: AppGatewayRoutingDiagram,
    zones: [
      { id: "pool-images", label: "pool-images", x: 430, y: 18,  width: 242, height: 66 },
      { id: "pool-api",    label: "pool-api",    x: 430, y: 101, width: 242, height: 66 },
      { id: "pool-web",    label: "pool-web",    x: 430, y: 184, width: 242, height: 66 },
    ],
    correctZone: "pool-api",
    answer:
      "pool-api. The request path /api/users/42 matches the /api/* rule at priority 2. The /images/* rule at priority 1 does not match, and the default /* rule is only reached if no higher-priority rule matches first.",
    explanation:
      "Application Gateway evaluates path rules in priority order and stops at the first match. /images/* (priority 1) does not match /api/users/42 so it is skipped. /api/* (priority 2) matches because the path begins with /api/ — traffic is forwarded to pool-api. The default /* rule would match anything, but because /api/* matched first, pool-web never sees this request. This is path-based routing — a Layer 7 feature that Azure Load Balancer cannot perform.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/intro-to-azure-application-gateway/3-how-azure-application-gateway-works",
  },
  {
    id: "AZ-104-HS-007",
    exam: "AZ-104",
    type: "hotspot",
    difficulty: "hard",
    category: "Virtual Networks",
    devAdded: "2026-05-18T00:00:00Z",
    question:
      "An engineer cannot SSH (TCP/22) to vm-prod01 from their on-premises workstation. Before sending any real traffic, they want to check whether an NSG rule would block this specific connection. Click the Network Watcher tool that answers this without generating actual network packets.",
    imageAlt:
      "Network Watcher tools table with six rows: Topology (visualises VNet resources), IP flow verify (5-tuple NSG check with no packets sent), Next hop (routing table lookup), Connection troubleshoot (sends TCP probes, returns fault type), Connection Monitor (continuous interval probing), Packet capture (records raw traffic at VM NIC).",
    viewBox: "0 0 680 254",
    diagram: NetworkWatcherToolsDiagram,
    zones: [
      { id: "topology",               label: "Topology",               x: 5, y: 46,  width: 670, height: 33 },
      { id: "ip-flow-verify",         label: "IP flow verify",         x: 5, y: 79,  width: 670, height: 33 },
      { id: "next-hop",               label: "Next hop",               x: 5, y: 112, width: 670, height: 33 },
      { id: "connection-troubleshoot",label: "Connection troubleshoot",x: 5, y: 145, width: 670, height: 33 },
      { id: "connection-monitor",     label: "Connection Monitor",     x: 5, y: 178, width: 670, height: 33 },
      { id: "packet-capture",         label: "Packet capture",         x: 5, y: 211, width: 670, height: 33 },
    ],
    correctZone: "ip-flow-verify",
    answer:
      "IP flow verify. It evaluates the effective NSG rules for a specific 5-tuple (source IP, source port, destination IP, destination port, protocol) and immediately returns allowed or denied — without sending any actual packets.",
    explanation:
      "Connection troubleshoot is the common trap here — it does check connectivity, but it achieves this by actually sending TCP probes to the target, which is traffic. IP flow verify is a pure rule evaluation: it reads the current NSG state and simulates whether the traffic would be permitted. Topology only shows resource relationships. Next hop answers routing questions, not NSG questions. Connection Monitor and Packet capture both involve real traffic. When the requirement is 'check before sending traffic', IP flow verify is the correct tool.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/intro-to-azure-network-watcher/3-how-azure-network-watcher-works",
  },
  {
    id: "AZ-104-HS-008",
    exam: "AZ-104",
    type: "hotspot",
    difficulty: "hard",
    category: "Virtual Networks",
    devAdded: "2026-05-18T00:00:00Z",
    question:
      "A client sends a request: GET /api/v2/stats/daily. The Application Gateway evaluates its path-based routing rules in priority order and stops at the first match. Both /api/v2/* and /api/* are present. Click the backend pool that receives this request.",
    imageAlt:
      "Application Gateway diagram with three path routing rules: /api/v2/* routes to pool-api-v2 at priority 1, /api/* routes to pool-api at priority 2, and /* default routes to pool-web. Client is sending GET /api/v2/stats/daily.",
    viewBox: "0 0 680 266",
    diagram: AppGatewayVersionedRoutingDiagram,
    zones: [
      { id: "pool-api-v2", label: "pool-api-v2", x: 430, y: 18,  width: 242, height: 66 },
      { id: "pool-api",    label: "pool-api",    x: 430, y: 101, width: 242, height: 66 },
      { id: "pool-web",    label: "pool-web",    x: 430, y: 184, width: 242, height: 66 },
    ],
    correctZone: "pool-api-v2",
    answer:
      "pool-api-v2. Both /api/v2/* (priority 1) and /api/* (priority 2) match the path /api/v2/stats/daily, but Application Gateway stops at the first match — priority 1 wins.",
    explanation:
      "This is the key difference from IP routing's longest-prefix-match: Application Gateway path rules are evaluated in priority order and processing stops at the first match, regardless of which pattern is more specific. /api/v2/stats/daily satisfies both /api/v2/* and /api/*, but /api/v2/* has priority 1 so it is matched first and the request goes to pool-api. If the rules were ordered with /api/* at priority 1 and /api/v2/* at priority 2, every versioned request would be incorrectly caught by the broader rule — a common misconfiguration. Always place more-specific rules at lower priority numbers.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/intro-to-azure-application-gateway/3-how-azure-application-gateway-works",
  },
];

export default az104hotspot;
