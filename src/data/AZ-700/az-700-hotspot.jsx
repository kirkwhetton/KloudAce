// AZ-700 — Hotspot (click-on-diagram) questions
// Cards: AZ-700-HS-101 … AZ-700-HS-111

const TrafficManagerDiagram = () => (
  <svg viewBox="0 0 680 370" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>
    <defs>
      <marker id="hs-ab" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L8,3.5 z" fill="#0078d4"/>
      </marker>
      <marker id="hs-ap" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L8,3.5 z" fill="#6366f1"/>
      </marker>
      <marker id="hs-ag" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L8,3.5 z" fill="#94a3b8"/>
      </marker>
    </defs>

    {/* ── Client box ── */}
    <rect x="20" y="155" width="120" height="75" rx="8" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1.5"/>
    <rect x="32" y="165" width="28" height="19" rx="2" fill="none" stroke="#0ea5e9" strokeWidth="1.2"/>
    <line x1="32" y1="170" x2="60" y2="170" stroke="#0ea5e9" strokeWidth="1.2"/>
    <circle cx="36" cy="168" r="1.5" fill="#0ea5e9"/>
    <circle cx="41" cy="168" r="1.5" fill="#0ea5e9"/>
    <circle cx="46" cy="168" r="1.5" fill="#0ea5e9"/>
    <text x="68" y="173" fontSize="11" fill="#0369a1" fontWeight="700">Client</text>
    <text x="68" y="187" fontSize="9.5" fill="#0369a1">Browser</text>
    <text x="68" y="201" fontSize="9.5" fill="#0369a1">London, UK</text>

    {/* ── Traffic Manager box ── */}
    <rect x="255" y="138" width="178" height="100" rx="8" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.8"/>
    <text x="344" y="160" textAnchor="middle" fontSize="12" fill="#4338ca" fontWeight="700">Traffic Manager</text>
    <text x="344" y="174" textAnchor="middle" fontSize="9.5" fill="#6366f1">DNS-based routing</text>
    <rect x="279" y="181" width="130" height="20" rx="4" fill="#e0e7ff"/>
    <text x="344" y="195" textAnchor="middle" fontSize="9.5" fill="#4338ca" fontWeight="600">Performance routing</text>
    <line x1="279" y1="206" x2="409" y2="206" stroke="#c7d2fe" strokeWidth="1"/>
    <text x="313" y="219" textAnchor="middle" fontSize="9" fill="#818cf8">East US: 12 ms</text>
    <text x="378" y="219" textAnchor="middle" fontSize="9" fill="#818cf8">W.Eu: 85 ms</text>
    <text x="344" y="231" textAnchor="middle" fontSize="8.5" fill="#a5b4fc">↑ latency table</text>

    {/* ── East US endpoint box ── */}
    <rect x="505" y="55" width="152" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="581" y="79" textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="700">East US</text>
    <text x="581" y="94" textAnchor="middle" fontSize="9.5" fill="#16a34a">Web App Endpoint</text>
    <text x="581" y="112" textAnchor="middle" fontSize="9" fill="#15803d">● Healthy</text>

    {/* ── West Europe endpoint box ── */}
    <rect x="505" y="258" width="152" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="581" y="282" textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="700">West Europe</text>
    <text x="581" y="297" textAnchor="middle" fontSize="9.5" fill="#16a34a">Web App Endpoint</text>
    <text x="581" y="315" textAnchor="middle" fontSize="9" fill="#15803d">● Healthy</text>

    {/* ── Arrows ── */}
    {/* 1: Client → TM: DNS Query */}
    <line x1="142" y1="179" x2="253" y2="173" stroke="#0078d4" strokeWidth="1.5" markerEnd="url(#hs-ab)"/>
    <text x="197" y="168" textAnchor="middle" fontSize="9" fill="#0078d4">① DNS Query</text>

    {/* 2: TM → Client: DNS Response */}
    <line x1="253" y1="200" x2="142" y2="207" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#hs-ap)"/>
    <text x="197" y="222" textAnchor="middle" fontSize="9" fill="#6366f1">② DNS Response (IP)</text>

    {/* 3: TM → East US: health probe */}
    <line x1="433" y1="163" x2="503" y2="93" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#hs-ag)"/>
    <text x="477" y="121" textAnchor="middle" fontSize="8" fill="#94a3b8">probe</text>

    {/* 4: TM → West Europe: health probe */}
    <line x1="433" y1="218" x2="503" y2="275" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#hs-ag)"/>
    <text x="477" y="260" textAnchor="middle" fontSize="8" fill="#94a3b8">probe</text>

    {/* 5: Client → East US: direct HTTP after DNS resolution */}
    <path d="M 80 155 Q 280 18 505 72" fill="none" stroke="#0ea5e9" strokeWidth="1.2" strokeDasharray="5 3" markerEnd="url(#hs-ab)"/>
    <text x="275" y="28" textAnchor="middle" fontSize="8.5" fill="#0ea5e9">③ Direct HTTP connection (bypasses TM)</text>
  </svg>
);

const AzureFirewallDiagram = () => (
  <svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>
    <defs>
      <marker id="fw-ab" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L8,3.5 z" fill="#3b82f6"/>
      </marker>
      <marker id="fw-ao" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L8,3.5 z" fill="#f59e0b"/>
      </marker>
    </defs>

    {/* ── Route Table (UDR) ── */}
    <rect x="255" y="18" width="165" height="62" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="337" y="38" textAnchor="middle" fontSize="10.5" fill="#1d4ed8" fontWeight="700">Route Table (UDR)</text>
    <text x="337" y="53" textAnchor="middle" fontSize="9" fill="#3b82f6">0.0.0.0/0 → Azure Firewall</text>
    <text x="337" y="67" textAnchor="middle" fontSize="8.5" fill="#93c5fd">Applied to Spoke-A subnet</text>

    {/* ── Azure Firewall outer container ── */}
    <rect x="168" y="98" width="338" height="220" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="6 3"/>
    <text x="337" y="118" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="700">Azure Firewall — Rule Collections</text>

    {/* ── DNAT Rules ── */}
    <rect x="182" y="128" width="95" height="176" rx="6" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.2"/>
    <rect x="182" y="128" width="95" height="28" rx="6" fill="#fee2e2"/>
    <text x="229" y="147" textAnchor="middle" fontSize="9.5" fill="#b91c1c" fontWeight="700">DNAT Rules</text>
    <text x="229" y="170" textAnchor="middle" fontSize="8.5" fill="#dc2626">Inbound only</text>
    <text x="229" y="184" textAnchor="middle" fontSize="8.5" fill="#dc2626">Port forwarding</text>
    <text x="229" y="198" textAnchor="middle" fontSize="8.5" fill="#dc2626">Public → Private IP</text>
    <text x="229" y="214" textAnchor="middle" fontSize="8" fill="#f87171">e.g. expose RDP</text>
    <text x="229" y="228" textAnchor="middle" fontSize="8" fill="#f87171">to backend VMs</text>
    <text x="229" y="287" textAnchor="middle" fontSize="8" fill="#fca5a5" fontStyle="italic">No FQDN support</text>

    {/* ── Network Rules ── */}
    <rect x="285" y="128" width="95" height="176" rx="6" fill="#fff7ed" stroke="#fdba74" strokeWidth="1.2"/>
    <rect x="285" y="128" width="95" height="28" rx="6" fill="#ffedd5"/>
    <text x="332" y="147" textAnchor="middle" fontSize="9.5" fill="#c2410c" fontWeight="700">Network Rules</text>
    <text x="332" y="170" textAnchor="middle" fontSize="8.5" fill="#ea580c">Layer 4 (L4)</text>
    <text x="332" y="184" textAnchor="middle" fontSize="8.5" fill="#ea580c">IP / Port / Protocol</text>
    <text x="332" y="198" textAnchor="middle" fontSize="8.5" fill="#ea580c">Evaluated before</text>
    <text x="332" y="212" textAnchor="middle" fontSize="8.5" fill="#ea580c">App Rules</text>
    <text x="332" y="228" textAnchor="middle" fontSize="8" fill="#fb923c">Allow/deny by IP</text>
    <text x="332" y="287" textAnchor="middle" fontSize="8" fill="#fdba74" fontStyle="italic">No FQDN support</text>

    {/* ── Application Rules ── */}
    <rect x="388" y="128" width="95" height="176" rx="6" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.2"/>
    <rect x="388" y="128" width="95" height="28" rx="6" fill="#dcfce7"/>
    <text x="435" y="147" textAnchor="middle" fontSize="9.5" fill="#15803d" fontWeight="700">App Rules</text>
    <text x="435" y="170" textAnchor="middle" fontSize="8.5" fill="#16a34a">Layer 7 (L7)</text>
    <text x="435" y="184" textAnchor="middle" fontSize="8.5" fill="#16a34a">FQDN filtering</text>
    <text x="435" y="198" textAnchor="middle" fontSize="8.5" fill="#16a34a">URL categories</text>
    <text x="435" y="212" textAnchor="middle" fontSize="8" fill="#22c55e">TLS inspection</text>
    <text x="435" y="226" textAnchor="middle" fontSize="8" fill="#22c55e">*.microsoft.com</text>
    <text x="435" y="287" textAnchor="middle" fontSize="8" fill="#86efac" fontStyle="italic">✓ FQDN support</text>

    {/* ── Source VM (decorative) ── */}
    <rect x="18" y="180" width="118" height="68" rx="8" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1.5"/>
    <text x="77" y="201" textAnchor="middle" fontSize="10" fill="#0369a1" fontWeight="700">Spoke-A VM</text>
    <text x="77" y="216" textAnchor="middle" fontSize="8.5" fill="#0369a1">Outbound HTTP/S</text>
    <text x="77" y="230" textAnchor="middle" fontSize="8.5" fill="#7ea9c4">to *.microsoft.com</text>

    {/* ── Internet (decorative) ── */}
    <rect x="558" y="180" width="108" height="68" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="612" y="201" textAnchor="middle" fontSize="10" fill="#15803d" fontWeight="700">Internet</text>
    <text x="612" y="216" textAnchor="middle" fontSize="8.5" fill="#16a34a">Allowed /</text>
    <text x="612" y="230" textAnchor="middle" fontSize="8.5" fill="#16a34a">Blocked</text>

    {/* ── Arrows ── */}
    <line x1="337" y1="80" x2="337" y2="97" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#fw-ab)"/>
    <line x1="136" y1="214" x2="167" y2="214" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#fw-ab)"/>
    <text x="152" y="207" textAnchor="middle" fontSize="8" fill="#3b82f6">UDR</text>
    <line x1="506" y1="214" x2="557" y2="214" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#fw-ao)"/>
    <text x="531" y="207" textAnchor="middle" fontSize="8" fill="#b45309">filtered</text>
  </svg>
);

const PrivateAccessDiagram = () => (
  <svg viewBox="0 0 680 325" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>
    <defs>
      <marker id="pr-ab" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L8,3.5 z" fill="#0078d4"/>
      </marker>
      <marker id="pr-ap" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L8,3.5 z" fill="#a855f7"/>
      </marker>
    </defs>

    {/* ── Azure DNS (top-left) ── */}
    <rect x="15" y="20" width="160" height="92" rx="8" fill="#fff7ed" stroke="#fb923c" strokeWidth="1.5"/>
    <text x="95" y="43" textAnchor="middle" fontSize="11" fill="#c2410c" fontWeight="700">Azure DNS</text>
    <text x="95" y="58" textAnchor="middle" fontSize="9" fill="#ea580c">168.63.129.16</text>
    <rect x="25" y="65" width="140" height="18" rx="3" fill="#ffedd5"/>
    <text x="95" y="78" textAnchor="middle" fontSize="8.5" fill="#c2410c" fontWeight="600">⚠ VNet-only access</text>
    <text x="95" y="99" textAnchor="middle" fontSize="8" fill="#fb923c">Not reachable from on-prem</text>

    {/* ── Private DNS Zone (top-right) ── */}
    <rect x="258" y="20" width="195" height="92" rx="8" fill="#fdf4ff" stroke="#a855f7" strokeWidth="1.8"/>
    <text x="355" y="43" textAnchor="middle" fontSize="11" fill="#7e22ce" fontWeight="700">Private DNS Zone</text>
    <text x="355" y="58" textAnchor="middle" fontSize="8.5" fill="#9333ea">privatelink.blob.core.windows.net</text>
    <rect x="276" y="65" width="159" height="18" rx="3" fill="#f3e8ff"/>
    <text x="355" y="78" textAnchor="middle" fontSize="8.5" fill="#7e22ce" fontWeight="600">A: mystorageaccount → 10.1.1.10</text>
    <text x="355" y="99" textAnchor="middle" fontSize="8" fill="#a855f7">Linked to VNet — not a resolver</text>

    {/* ── On-Premises DNS (bottom-left, decorative) ── */}
    <rect x="15" y="200" width="160" height="100" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="95" y="224" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="700">On-Premises DNS</text>
    <text x="95" y="240" textAnchor="middle" fontSize="8.5" fill="#64748b">Conditional forwarder:</text>
    <text x="95" y="255" textAnchor="middle" fontSize="8.5" fill="#475569" fontWeight="600">privatelink.* → ?</text>
    <text x="95" y="272" textAnchor="middle" fontSize="8" fill="#94a3b8">Needs an Azure-reachable</text>
    <text x="95" y="285" textAnchor="middle" fontSize="8" fill="#94a3b8">IP to forward queries to</text>

    {/* ── DNS Private Resolver (bottom-center) ── */}
    <rect x="258" y="200" width="195" height="100" rx="8" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.8"/>
    <text x="355" y="224" textAnchor="middle" fontSize="11" fill="#4338ca" fontWeight="700">DNS Private Resolver</text>
    <text x="355" y="239" textAnchor="middle" fontSize="9" fill="#6366f1">Inbound Endpoint</text>
    <rect x="276" y="247" width="159" height="18" rx="3" fill="#e0e7ff"/>
    <text x="355" y="260" textAnchor="middle" fontSize="9" fill="#4338ca" fontWeight="600">IP: 10.0.0.4</text>
    <text x="355" y="278" textAnchor="middle" fontSize="8" fill="#818cf8">Reachable from on-prem</text>
    <text x="355" y="291" textAnchor="middle" fontSize="8" fill="#818cf8">via ExpressRoute / VPN</text>

    {/* ── Private Endpoint (bottom-right) ── */}
    <rect x="520" y="200" width="145" height="100" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="592" y="226" textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="700">Private Endpoint</text>
    <text x="592" y="242" textAnchor="middle" fontSize="9" fill="#16a34a">NIC: 10.1.1.10</text>
    <text x="592" y="258" textAnchor="middle" fontSize="8.5" fill="#16a34a">Azure Storage</text>
    <text x="592" y="276" textAnchor="middle" fontSize="8" fill="#86efac">Not a DNS component</text>
    <text x="592" y="290" textAnchor="middle" fontSize="8" fill="#86efac">Provides the private IP</text>

    {/* ── Arrows ── */}
    <line x1="175" y1="244" x2="257" y2="244" stroke="#0078d4" strokeWidth="1.5" markerEnd="url(#pr-ab)"/>
    <text x="216" y="237" textAnchor="middle" fontSize="8" fill="#0078d4">① forward query</text>
    <text x="216" y="258" textAnchor="middle" fontSize="8" fill="#94a3b8">via ExpressRoute</text>
    <line x1="355" y1="200" x2="355" y2="113" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#pr-ap)"/>
    <text x="368" y="162" textAnchor="start" fontSize="8" fill="#a855f7">② queries</text>
    <text x="368" y="174" textAnchor="start" fontSize="8" fill="#a855f7">private zone</text>
    <line x1="340" y1="113" x2="340" y2="200" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#pr-ap)"/>
    <text x="328" y="162" textAnchor="end" fontSize="8" fill="#7e22ce">③ returns</text>
    <text x="328" y="174" textAnchor="end" fontSize="8" fill="#7e22ce">10.1.1.10</text>
  </svg>
);

const S2SVPNDiagram = () => (
  <svg viewBox="0 0 680 258" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>
    <defs>
      <marker id="s2s-arr" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L8,3.5 z" fill="#6366f1"/>
      </marker>
      <marker id="s2s-gray" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L8,3.5 z" fill="#94a3b8"/>
      </marker>
    </defs>

    {/* Azure context backdrop */}
    <rect x="8" y="38" width="507" height="200" rx="10" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="6 3"/>
    <text x="18" y="32" fontSize="9" fill="#0369a1" fontWeight="600">Azure</text>

    {/* ── VPN Gateway box ── */}
    <rect x="20" y="52" width="148" height="172" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5"/>
    <rect x="20" y="52" width="148" height="26" rx="8" fill="#dbeafe"/>
    <text x="94" y="69" textAnchor="middle" fontSize="10.5" fill="#1d4ed8" fontWeight="700">VPN Gateway</text>
    <text x="94" y="95" textAnchor="middle" fontSize="9" fill="#1e40af">HubVpnGw</text>
    <text x="94" y="111" textAnchor="middle" fontSize="8.5" fill="#3b82f6">SKU: VpnGw1</text>
    <text x="94" y="126" textAnchor="middle" fontSize="8.5" fill="#3b82f6">Type: RouteBased</text>
    <line x1="30" y1="136" x2="158" y2="136" stroke="#bfdbfe" strokeWidth="1"/>
    <text x="94" y="150" textAnchor="middle" fontSize="8.5" fill="#6096c4">GatewaySubnet</text>
    <text x="94" y="164" textAnchor="middle" fontSize="8" fill="#93c5fd">10.1.0.0/27</text>
    <text x="94" y="200" textAnchor="middle" fontSize="8" fill="#3b82f6">● Active-Standby</text>

    {/* Arrow VPN GW → Connection */}
    <line x1="168" y1="138" x2="196" y2="138" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#s2s-arr)"/>

    {/* ── VPN Connection box ── */}
    <rect x="198" y="90" width="120" height="100" rx="8" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.5"/>
    <rect x="198" y="90" width="120" height="24" rx="8" fill="#e0e7ff"/>
    <text x="258" y="107" textAnchor="middle" fontSize="10" fill="#4338ca" fontWeight="700">VPN Connection</text>
    <text x="258" y="127" textAnchor="middle" fontSize="8.5" fill="#6366f1">HubToOnPrem</text>
    <text x="258" y="142" textAnchor="middle" fontSize="8.5" fill="#6366f1">Type: IPsec / IKE</text>
    <text x="258" y="157" textAnchor="middle" fontSize="8.5" fill="#22c55e">● Connected</text>
    <text x="258" y="172" textAnchor="middle" fontSize="8" fill="#818cf8">Shared Key: ••••••</text>

    {/* Arrow Connection → LNG */}
    <line x1="318" y1="138" x2="346" y2="138" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#s2s-arr)"/>

    {/* ── Local Network Gateway box ── */}
    <rect x="348" y="52" width="160" height="172" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.8"/>
    <rect x="348" y="52" width="160" height="26" rx="8" fill="#fef3c7"/>
    <text x="428" y="69" textAnchor="middle" fontSize="10.5" fill="#92400e" fontWeight="700">Local Network GW</text>
    <text x="428" y="93" textAnchor="middle" fontSize="9" fill="#b45309">OnPremGW</text>
    <text x="428" y="108" textAnchor="middle" fontSize="8.5" fill="#92400e">Public IP: 203.0.113.10</text>
    <line x1="358" y1="117" x2="498" y2="117" stroke="#fde68a" strokeWidth="1"/>
    <text x="428" y="132" textAnchor="middle" fontSize="8.5" fill="#78350f" fontWeight="600">Address Prefixes:</text>
    <text x="428" y="150" textAnchor="middle" fontSize="8.5" fill="#b45309">192.168.0.0/16</text>
    <text x="428" y="205" textAnchor="middle" fontSize="8" fill="#f59e0b">Azure Resource</text>

    {/* Arrow LNG → On-Prem */}
    <line x1="508" y1="138" x2="535" y2="138" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#s2s-gray)"/>

    {/* ── On-Premises Router box (decorative) ── */}
    <rect x="537" y="90" width="132" height="100" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="603" y="110" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="700">On-Prem Router</text>
    <text x="603" y="127" textAnchor="middle" fontSize="8.5" fill="#475569">203.0.113.10</text>
    <line x1="547" y1="135" x2="659" y2="135" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="603" y="151" textAnchor="middle" fontSize="8" fill="#64748b">192.168.0.0/16</text>
    <text x="603" y="166" textAnchor="middle" fontSize="8" fill="#64748b">10.20.0.0/24</text>
  </svg>
);

const HubSpokeTransitDiagram = () => (
  <svg viewBox="0 0 680 342" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>

    <text x="340" y="17" textAnchor="middle" fontSize="9.5" fill="#475569" fontWeight="600">Spoke-A connectivity investigation — four diagnostic panels</text>

    {/* ══════════ Panel 1: Hub VNet → Spoke-A peering (Hub side) ══════════ */}
    <rect x="10" y="26" width="318" height="144" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5"/>
    <rect x="10" y="26" width="318" height="26" rx="8" fill="#dbeafe"/>
    <text x="169" y="43" textAnchor="middle" fontSize="10" fill="#1d4ed8" fontWeight="700">Hub VNet  ›  Peering to Spoke-A</text>
    <text x="22"  y="66" fontSize="8.5" fill="#475569">Peering state</text>
    <text x="185" y="66" fontSize="8.5" fill="#15803d" fontWeight="600">● Connected</text>
    <text x="22"  y="82" fontSize="8.5" fill="#475569">Allow virtual network access</text>
    <text x="185" y="82" fontSize="8.5" fill="#374151">Enabled</text>
    <text x="22"  y="98" fontSize="8.5" fill="#475569">Allow forwarded traffic</text>
    <text x="185" y="98" fontSize="8.5" fill="#374151">Enabled</text>
    <text x="22"  y="114" fontSize="8.5" fill="#475569">Allow gateway transit</text>
    <text x="185" y="114" fontSize="8.5" fill="#374151">Enabled</text>
    <text x="22"  y="130" fontSize="8.5" fill="#475569">Use remote gateways</text>
    <text x="185" y="130" fontSize="8.5" fill="#94a3b8">N/A — Hub has its own gateway</text>
    <text x="22"  y="160" fontSize="7.5" fill="#93c5fd" fontStyle="italic">Hub side — defines what Hub offers to this spoke</text>

    {/* ══════════ Panel 2: Spoke-A → Hub peering (Spoke-A side) ══════════ */}
    <rect x="352" y="26" width="318" height="144" rx="8" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.5"/>
    <rect x="352" y="26" width="318" height="26" rx="8" fill="#e0e7ff"/>
    <text x="511" y="43" textAnchor="middle" fontSize="10" fill="#4338ca" fontWeight="700">Spoke-A VNet  ›  Peering to Hub</text>
    <text x="364" y="66" fontSize="8.5" fill="#475569">Peering state</text>
    <text x="527" y="66" fontSize="8.5" fill="#15803d" fontWeight="600">● Connected</text>
    <text x="364" y="82" fontSize="8.5" fill="#475569">Allow virtual network access</text>
    <text x="527" y="82" fontSize="8.5" fill="#374151">Enabled</text>
    <text x="364" y="98" fontSize="8.5" fill="#475569">Allow forwarded traffic</text>
    <text x="527" y="98" fontSize="8.5" fill="#374151">Enabled</text>
    <text x="364" y="114" fontSize="8.5" fill="#475569">Allow gateway transit</text>
    <text x="527" y="114" fontSize="8.5" fill="#94a3b8">N/A — no gateway in Spoke-A</text>
    <text x="364" y="130" fontSize="8.5" fill="#475569">Use remote gateways</text>
    <text x="527" y="130" fontSize="8.5" fill="#374151">Disabled</text>
    <text x="364" y="160" fontSize="7.5" fill="#a5b4fc" fontStyle="italic">Spoke-A side — defines what Spoke-A requests from Hub</text>

    {/* ══════════ Panel 3: Spoke-A VM NIC — Effective Routes ══════════ */}
    <rect x="10" y="184" width="318" height="150" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5"/>
    <rect x="10" y="184" width="318" height="26" rx="8" fill="#e2e8f0"/>
    <text x="169" y="201" textAnchor="middle" fontSize="10" fill="#334155" fontWeight="700">Spoke-A VM NIC  ›  Effective Routes</text>
    <line x1="20" y1="216" x2="318" y2="216" stroke="#cbd5e1" strokeWidth="0.8"/>
    <text x="22"  y="228" fontSize="7.5" fill="#475569" fontWeight="600">ADDRESS PREFIX</text>
    <text x="158" y="228" fontSize="7.5" fill="#475569" fontWeight="600">NEXT HOP TYPE</text>
    <text x="264" y="228" fontSize="7.5" fill="#475569" fontWeight="600">SOURCE</text>
    <line x1="20" y1="233" x2="318" y2="233" stroke="#cbd5e1" strokeWidth="0.8"/>
    <text x="22"  y="247" fontSize="8.5" fill="#374151">10.0.0.0/16</text>
    <text x="158" y="247" fontSize="8.5" fill="#374151">VNet peering</text>
    <text x="264" y="247" fontSize="8"   fill="#64748b">Peering</text>
    <text x="22"  y="262" fontSize="8.5" fill="#374151">10.3.0.0/16</text>
    <text x="158" y="262" fontSize="8.5" fill="#374151">Virtual network</text>
    <text x="264" y="262" fontSize="8"   fill="#64748b">Default</text>
    <text x="22"  y="277" fontSize="8.5" fill="#374151">0.0.0.0/0</text>
    <text x="158" y="277" fontSize="8.5" fill="#374151">Internet</text>
    <text x="264" y="277" fontSize="8"   fill="#64748b">Default</text>
    <text x="22"  y="320" fontSize="7.5" fill="#94a3b8" fontStyle="italic">3 routes shown — on-premises prefix absent</text>

    {/* ══════════ Panel 4: VPN Connection status ══════════ */}
    <rect x="352" y="184" width="318" height="150" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5"/>
    <rect x="352" y="184" width="318" height="26" rx="8" fill="#dcfce7"/>
    <text x="511" y="201" textAnchor="middle" fontSize="10" fill="#15803d" fontWeight="700">VPN Connection  ›  HubToOnPrem</text>
    <text x="364" y="228" fontSize="8.5" fill="#475569">Connection type</text>
    <text x="510" y="228" fontSize="8.5" fill="#374151">Site-to-Site (IPsec)</text>
    <text x="364" y="245" fontSize="8.5" fill="#475569">Status</text>
    <text x="510" y="245" fontSize="8.5" fill="#15803d" fontWeight="600">● Connected</text>
    <text x="364" y="262" fontSize="8.5" fill="#475569">VPN type</text>
    <text x="510" y="262" fontSize="8.5" fill="#374151">RouteBased</text>
    <text x="364" y="279" fontSize="8.5" fill="#475569">BGP</text>
    <text x="510" y="279" fontSize="8.5" fill="#374151">Not enabled</text>
    <text x="364" y="296" fontSize="8.5" fill="#475569">On-prem address space</text>
    <text x="510" y="296" fontSize="8.5" fill="#374151">192.168.0.0/16</text>
    <text x="364" y="320" fontSize="7.5" fill="#86efac" fontStyle="italic">Tunnel healthy — on-premises side correct</text>
  </svg>
);

const HubFaultTransitDiagram = () => (
  <svg viewBox="0 0 680 342" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>

    <text x="340" y="17" textAnchor="middle" fontSize="9.5" fill="#475569" fontWeight="600">Spoke-A connectivity investigation — four diagnostic panels</text>

    {/* ══════════ Panel 1: Hub VNet → Spoke-A peering (Hub side) ══════════ */}
    <rect x="10" y="26" width="318" height="144" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5"/>
    <rect x="10" y="26" width="318" height="26" rx="8" fill="#dbeafe"/>
    <text x="169" y="43" textAnchor="middle" fontSize="10" fill="#1d4ed8" fontWeight="700">Hub VNet  ›  Peering to Spoke-A</text>
    <text x="22"  y="66" fontSize="8.5" fill="#475569">Peering state</text>
    <text x="185" y="66" fontSize="8.5" fill="#15803d" fontWeight="600">● Connected</text>
    <text x="22"  y="82" fontSize="8.5" fill="#475569">Allow virtual network access</text>
    <text x="185" y="82" fontSize="8.5" fill="#374151">Enabled</text>
    <text x="22"  y="98" fontSize="8.5" fill="#475569">Allow forwarded traffic</text>
    <text x="185" y="98" fontSize="8.5" fill="#374151">Enabled</text>
    <text x="22"  y="114" fontSize="8.5" fill="#475569">Allow gateway transit</text>
    <text x="185" y="114" fontSize="8.5" fill="#374151">Disabled</text>
    <text x="22"  y="130" fontSize="8.5" fill="#475569">Use remote gateways</text>
    <text x="185" y="130" fontSize="8.5" fill="#94a3b8">N/A — Hub has its own gateway</text>
    <text x="22"  y="160" fontSize="7.5" fill="#93c5fd" fontStyle="italic">Hub side — defines what Hub offers to this spoke</text>

    {/* ══════════ Panel 2: Spoke-A → Hub peering (Spoke-A side) ══════════ */}
    <rect x="352" y="26" width="318" height="144" rx="8" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.5"/>
    <rect x="352" y="26" width="318" height="26" rx="8" fill="#e0e7ff"/>
    <text x="511" y="43" textAnchor="middle" fontSize="10" fill="#4338ca" fontWeight="700">Spoke-A VNet  ›  Peering to Hub</text>
    <text x="364" y="66" fontSize="8.5" fill="#475569">Peering state</text>
    <text x="527" y="66" fontSize="8.5" fill="#15803d" fontWeight="600">● Connected</text>
    <text x="364" y="82" fontSize="8.5" fill="#475569">Allow virtual network access</text>
    <text x="527" y="82" fontSize="8.5" fill="#374151">Enabled</text>
    <text x="364" y="98" fontSize="8.5" fill="#475569">Allow forwarded traffic</text>
    <text x="527" y="98" fontSize="8.5" fill="#374151">Enabled</text>
    <text x="364" y="114" fontSize="8.5" fill="#475569">Allow gateway transit</text>
    <text x="527" y="114" fontSize="8.5" fill="#94a3b8">N/A — no gateway in Spoke-A</text>
    <text x="364" y="130" fontSize="8.5" fill="#475569">Use remote gateways</text>
    <text x="527" y="130" fontSize="8.5" fill="#374151">Enabled</text>
    <text x="364" y="160" fontSize="7.5" fill="#a5b4fc" fontStyle="italic">Spoke-A side — defines what Spoke-A requests from Hub</text>

    {/* ══════════ Panel 3: Spoke-A VM NIC — Effective Routes ══════════ */}
    <rect x="10" y="184" width="318" height="150" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5"/>
    <rect x="10" y="184" width="318" height="26" rx="8" fill="#e2e8f0"/>
    <text x="169" y="201" textAnchor="middle" fontSize="10" fill="#334155" fontWeight="700">Spoke-A VM NIC  ›  Effective Routes</text>
    <line x1="20" y1="216" x2="318" y2="216" stroke="#cbd5e1" strokeWidth="0.8"/>
    <text x="22"  y="228" fontSize="7.5" fill="#475569" fontWeight="600">ADDRESS PREFIX</text>
    <text x="158" y="228" fontSize="7.5" fill="#475569" fontWeight="600">NEXT HOP TYPE</text>
    <text x="264" y="228" fontSize="7.5" fill="#475569" fontWeight="600">SOURCE</text>
    <line x1="20" y1="233" x2="318" y2="233" stroke="#cbd5e1" strokeWidth="0.8"/>
    <text x="22"  y="247" fontSize="8.5" fill="#374151">10.0.0.0/16</text>
    <text x="158" y="247" fontSize="8.5" fill="#374151">VNet peering</text>
    <text x="264" y="247" fontSize="8"   fill="#64748b">Peering</text>
    <text x="22"  y="262" fontSize="8.5" fill="#374151">10.3.0.0/16</text>
    <text x="158" y="262" fontSize="8.5" fill="#374151">Virtual network</text>
    <text x="264" y="262" fontSize="8"   fill="#64748b">Default</text>
    <text x="22"  y="277" fontSize="8.5" fill="#374151">0.0.0.0/0</text>
    <text x="158" y="277" fontSize="8.5" fill="#374151">Internet</text>
    <text x="264" y="277" fontSize="8"   fill="#64748b">Default</text>
    <text x="22"  y="320" fontSize="7.5" fill="#94a3b8" fontStyle="italic">3 routes shown — on-premises prefix absent</text>

    {/* ══════════ Panel 4: VPN Connection status ══════════ */}
    <rect x="352" y="184" width="318" height="150" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5"/>
    <rect x="352" y="184" width="318" height="26" rx="8" fill="#dcfce7"/>
    <text x="511" y="201" textAnchor="middle" fontSize="10" fill="#15803d" fontWeight="700">VPN Connection  ›  HubToOnPrem</text>
    <text x="364" y="228" fontSize="8.5" fill="#475569">Connection type</text>
    <text x="510" y="228" fontSize="8.5" fill="#374151">Site-to-Site (IPsec)</text>
    <text x="364" y="245" fontSize="8.5" fill="#475569">Status</text>
    <text x="510" y="245" fontSize="8.5" fill="#15803d" fontWeight="600">● Connected</text>
    <text x="364" y="262" fontSize="8.5" fill="#475569">VPN type</text>
    <text x="510" y="262" fontSize="8.5" fill="#374151">RouteBased</text>
    <text x="364" y="279" fontSize="8.5" fill="#475569">BGP</text>
    <text x="510" y="279" fontSize="8.5" fill="#374151">Not enabled</text>
    <text x="364" y="296" fontSize="8.5" fill="#475569">On-prem address space</text>
    <text x="510" y="296" fontSize="8.5" fill="#374151">192.168.0.0/16</text>
    <text x="364" y="320" fontSize="7.5" fill="#86efac" fontStyle="italic">Tunnel healthy — on-premises side correct</text>
  </svg>
);

// ─── HS-107: NVA IP Forwarding ────────────────────────────────────────────────
const NvaIpForwardingDiagram = () => (
  <svg viewBox="0 0 680 380" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>
    <defs>
      <marker id="nv1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3z" fill="#555"/></marker>
      <marker id="nv2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3z" fill="#1565c0"/></marker>
    </defs>
    <rect x="10" y="30" width="145" height="130" rx="8" fill="#e8eaf6" stroke="#3949ab" strokeWidth="2"/>
    <text x="82" y="57" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#283593">Spoke-A</text>
    <text x="82" y="74" textAnchor="middle" fontSize="11" fill="#3949ab">10.1.0.0/24</text>
    <rect x="26" y="86" width="113" height="56" rx="5" fill="white" stroke="#3949ab" strokeWidth="1.5"/>
    <text x="82" y="112" textAnchor="middle" fontSize="22" fill="#555">🖥</text>
    <text x="82" y="132" textAnchor="middle" fontSize="11" fill="#555">VM-A</text>
    <rect x="10" y="220" width="145" height="130" rx="8" fill="#e8eaf6" stroke="#3949ab" strokeWidth="2"/>
    <text x="82" y="247" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#283593">Spoke-B</text>
    <text x="82" y="264" textAnchor="middle" fontSize="11" fill="#3949ab">10.2.0.0/24</text>
    <rect x="26" y="276" width="113" height="56" rx="5" fill="white" stroke="#3949ab" strokeWidth="1.5"/>
    <text x="82" y="302" textAnchor="middle" fontSize="22" fill="#555">🖥</text>
    <text x="82" y="322" textAnchor="middle" fontSize="11" fill="#555">VM-B</text>
    <line x1="155" y1="100" x2="212" y2="155" stroke="#555" strokeWidth="2" markerEnd="url(#nv1)"/>
    <line x1="155" y1="280" x2="212" y2="225" stroke="#555" strokeWidth="2" markerEnd="url(#nv1)"/>
    <rect x="215" y="80" width="145" height="220" rx="8" fill="#e3f2fd" stroke="#1565c0" strokeWidth="2.5"/>
    <text x="287" y="108" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0d47a1">Standard ILB</text>
    <text x="287" y="124" textAnchor="middle" fontSize="11" fill="#555">Frontend: 10.0.1.4</text>
    <rect x="230" y="134" width="115" height="50" rx="5" fill="#1565c0"/>
    <text x="287" y="156" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">HA Ports Rule</text>
    <text x="287" y="172" textAnchor="middle" fontSize="10" fill="#bbdefb">Protocol: All / Port: 0</text>
    <rect x="230" y="196" width="115" height="40" rx="4" fill="#0288d1"/>
    <text x="287" y="214" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">Floating IP: ON</text>
    <text x="287" y="228" textAnchor="middle" fontSize="10" fill="#b3e5fc">DSR enabled</text>
    <line x1="360" y1="150" x2="400" y2="138" stroke="#1565c0" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#nv2)"/>
    <line x1="360" y1="230" x2="400" y2="262" stroke="#1565c0" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#nv2)"/>
    <rect x="402" y="20" width="270" height="340" rx="8" fill="#fff3e0" stroke="#ef6c00" strokeWidth="2"/>
    <text x="537" y="47" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#bf360c">NVA Subnet  10.0.1.0/24</text>
    {/* NVA-1 — IP Forwarding disabled */}
    <rect x="416" y="62" width="242" height="128" rx="7" fill="white" stroke="#ef6c00" strokeWidth="1.5"/>
    <text x="537" y="88" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">NVA-1  (10.0.1.10)</text>
    <rect x="428" y="100" width="218" height="36" rx="4" fill="#f8f9fa" stroke="#bdbdbd" strokeWidth="1"/>
    <text x="498" y="116" textAnchor="middle" fontSize="11" fill="#555">NIC eth0</text>
    <text x="498" y="129" textAnchor="middle" fontSize="10" fill="#9e9e9e">IP Forwarding:</text>
    <rect x="558" y="104" width="80" height="28" rx="4" fill="#ffebee" stroke="#e53935" strokeWidth="1.5"/>
    <text x="598" y="122" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#c62828">Disabled</text>
    <text x="537" y="158" textAnchor="middle" fontSize="10" fill="#777">Firewall / Inspection VM</text>
    <text x="537" y="173" textAnchor="middle" fontSize="10" fill="#9e9e9e">Standard_D2s_v3</text>
    {/* NVA-2 — IP Forwarding enabled */}
    <rect x="416" y="210" width="242" height="128" rx="7" fill="white" stroke="#ef6c00" strokeWidth="1.5"/>
    <text x="537" y="236" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">NVA-2  (10.0.1.11)</text>
    <rect x="428" y="248" width="218" height="36" rx="4" fill="#f8f9fa" stroke="#bdbdbd" strokeWidth="1"/>
    <text x="498" y="264" textAnchor="middle" fontSize="11" fill="#555">NIC eth0</text>
    <text x="498" y="277" textAnchor="middle" fontSize="10" fill="#9e9e9e">IP Forwarding:</text>
    <rect x="558" y="252" width="80" height="28" rx="4" fill="#e8f5e9" stroke="#43a047" strokeWidth="1.5"/>
    <text x="598" y="270" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2e7d32">Enabled</text>
    <text x="537" y="306" textAnchor="middle" fontSize="10" fill="#777">Firewall / Inspection VM</text>
    <text x="537" y="321" textAnchor="middle" fontSize="10" fill="#9e9e9e">Standard_D2s_v3</text>
  </svg>
);

// ─── HS-108: Forced Tunnelling Route Table ────────────────────────────────────
const ForcedTunnelDiagram = () => (
  <svg viewBox="0 0 680 290" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>
    <defs>
      <marker id="ft1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3z" fill="#555"/></marker>
    </defs>
    <ellipse cx="340" cy="28" rx="76" ry="24" fill="#f0f0f0" stroke="#aaa" strokeWidth="1.5"/>
    <text x="340" y="24" textAnchor="middle" fontSize="13" fill="#555">Internet</text>
    <text x="340" y="40" textAnchor="middle" fontSize="10" fill="#888">(public)</text>
    <rect x="10" y="80" width="172" height="185" rx="8" fill="#e8eaf6" stroke="#3949ab" strokeWidth="2"/>
    <text x="96" y="106" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#283593">Spoke Subnet</text>
    <text x="96" y="123" textAnchor="middle" fontSize="11" fill="#3949ab">10.1.0.0/24</text>
    <rect x="22" y="135" width="148" height="52" rx="5" fill="white" stroke="#3949ab" strokeWidth="1.5"/>
    <text x="96" y="158" textAnchor="middle" fontSize="20" fill="#555">🖥</text>
    <text x="96" y="178" textAnchor="middle" fontSize="11" fill="#555">VM</text>
    <rect x="22" y="200" width="148" height="52" rx="5" fill="#fff3e0" stroke="#ef6c00" strokeWidth="2"/>
    <text x="96" y="222" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e65100">Route Table</text>
    <text x="96" y="240" textAnchor="middle" fontSize="10" fill="#555">Associated with subnet</text>
    <line x1="182" y1="155" x2="250" y2="118" stroke="#555" strokeWidth="2" markerEnd="url(#ft1)"/>
    <rect x="253" y="110" width="155" height="120" rx="8" fill="#e3f2fd" stroke="#1565c0" strokeWidth="2.5"/>
    <text x="330" y="138" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0d47a1">VPN Gateway</text>
    <text x="330" y="155" textAnchor="middle" fontSize="11" fill="#555">gw-hub</text>
    <rect x="267" y="165" width="122" height="50" rx="5" fill="#1565c0"/>
    <text x="328" y="185" textAnchor="middle" fontSize="11" fill="white">S2S Tunnel</text>
    <text x="328" y="200" textAnchor="middle" fontSize="10" fill="#bbdefb">Status: Connected</text>
    <line x1="408" y1="170" x2="470" y2="170" stroke="#555" strokeWidth="2" markerEnd="url(#ft1)"/>
    <rect x="472" y="110" width="195" height="120" rx="8" fill="#e8f5e9" stroke="#388e3c" strokeWidth="2"/>
    <text x="569" y="138" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1b5e20">On-Premises</text>
    <text x="569" y="155" textAnchor="middle" fontSize="11" fill="#388e3c">Corporate Firewall</text>
    <rect x="486" y="165" width="166" height="50" rx="5" fill="#388e3c"/>
    <text x="569" y="186" textAnchor="middle" fontSize="11" fill="white">Outbound inspection</text>
    <text x="569" y="201" textAnchor="middle" fontSize="10" fill="#c8e6c9">required for all traffic</text>
    <line x1="280" y1="50" x2="316" y2="52" stroke="#aaa" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#ft1)"/>
    <text x="230" y="62" textAnchor="middle" fontSize="10" fill="#777">internet-bound traffic</text>
  </svg>
);

// ─── HS-109: NSG Inbound Evaluation Order ─────────────────────────────────────
const NsgEvalOrderDiagram = () => (
  <svg viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>
    <defs>
      <marker id="ng1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3z" fill="#1565c0"/></marker>
      <marker id="ng2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3z" fill="#555"/></marker>
    </defs>
    <ellipse cx="55" cy="140" rx="48" ry="34" fill="#f0f4f8" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="55" y="136" textAnchor="middle" fontSize="13" fill="#475569" fontWeight="600">Internet</text>
    <text x="55" y="152" textAnchor="middle" fontSize="11" fill="#64748b">Port 80</text>
    <line x1="103" y1="140" x2="145" y2="140" stroke="#1565c0" strokeWidth="2.5" markerEnd="url(#ng1)"/>
    <text x="124" y="132" textAnchor="middle" fontSize="10" fill="#1565c0">inbound</text>
    <rect x="148" y="46" width="188" height="188" rx="8" fill="#f8f9fa" stroke="#475569" strokeWidth="2"/>
    <text x="242" y="74" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">Subnet NSG</text>
    <text x="242" y="92" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#555">Inbound rules:</text>
    <rect x="160" y="102" width="164" height="68" rx="5" fill="#ffccbc" stroke="#e64a19" strokeWidth="1.5"/>
    <text x="242" y="124" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#bf360c">Priority 100</text>
    <text x="242" y="142" textAnchor="middle" fontSize="12" fill="#333">Action: DENY</text>
    <text x="242" y="158" textAnchor="middle" fontSize="11" fill="#555">Port 80 / Source: Any</text>
    <text x="242" y="196" textAnchor="middle" fontSize="10" fill="#94a3b8">Default rules omitted…</text>
    <line x1="336" y1="140" x2="376" y2="140" stroke="#555" strokeWidth="2" markerEnd="url(#ng2)"/>
    <rect x="378" y="46" width="188" height="188" rx="8" fill="#f8f9fa" stroke="#475569" strokeWidth="2"/>
    <text x="472" y="74" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">NIC NSG</text>
    <text x="472" y="92" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#555">Inbound rules:</text>
    <rect x="390" y="102" width="164" height="68" rx="5" fill="#e8f5e9" stroke="#66bb6a" strokeWidth="1.5"/>
    <text x="472" y="124" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2e7d32">Priority 100</text>
    <text x="472" y="142" textAnchor="middle" fontSize="12" fill="#333">Action: ALLOW</text>
    <text x="472" y="158" textAnchor="middle" fontSize="11" fill="#555">Port 80 / Source: Internet</text>
    <text x="472" y="196" textAnchor="middle" fontSize="10" fill="#94a3b8">Default rules omitted…</text>
    <line x1="566" y1="140" x2="604" y2="140" stroke="#555" strokeWidth="2" markerEnd="url(#ng2)"/>
    <rect x="606" y="108" width="68" height="64" rx="7" fill="#f8f9fa" stroke="#475569" strokeWidth="1.5"/>
    <text x="640" y="137" textAnchor="middle" fontSize="22" fill="#475569">🖥</text>
    <text x="640" y="160" textAnchor="middle" fontSize="11" fill="#475569">VM</text>
  </svg>
);

// ─── HS-110: Virtual WAN Routing Intent ───────────────────────────────────────
const VwanRoutingIntentDiagram = () => (
  <svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>
    <defs>
      <marker id="vw1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3z" fill="#555"/></marker>
    </defs>
    <rect x="50" y="20" width="580" height="278" rx="12" fill="#e3f2fd" stroke="#1565c0" strokeWidth="2.5"/>
    <text x="340" y="46" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0d47a1">Virtual WAN Hub (Secured Virtual Hub)</text>
    <rect x="220" y="62" width="170" height="90" rx="8" fill="white" stroke="#ef6c00" strokeWidth="2"/>
    <text x="305" y="86" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#bf360c">Azure Firewall</text>
    <text x="305" y="103" textAnchor="middle" fontSize="11" fill="#e65100">fw-hub-prod</text>
    <text x="305" y="120" textAnchor="middle" fontSize="11" fill="#555">Firewall Policy: attached</text>
    <text x="305" y="138" textAnchor="middle" fontSize="10" fill="#999">Standard SKU</text>
    <rect x="140" y="182" width="185" height="88" rx="7" fill="white" stroke="#1565c0" strokeWidth="1.5"/>
    <text x="232" y="208" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0d47a1">Routing Intent</text>
    <text x="232" y="226" textAnchor="middle" fontSize="11" fill="#555">Private traffic policy</text>
    <text x="232" y="243" textAnchor="middle" fontSize="11" fill="#555">Internet traffic policy</text>
    <text x="232" y="260" textAnchor="middle" fontSize="10" fill="#94a3b8">Hub-level configuration</text>
    <rect x="360" y="182" width="185" height="88" rx="7" fill="white" stroke="#1565c0" strokeWidth="1.5"/>
    <text x="452" y="208" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0d47a1">Hub Route Tables</text>
    <text x="452" y="226" textAnchor="middle" fontSize="11" fill="#555">Default route table</text>
    <text x="452" y="243" textAnchor="middle" fontSize="11" fill="#555">None route table</text>
    <text x="452" y="260" textAnchor="middle" fontSize="10" fill="#94a3b8">Controls spoke routing</text>
    <rect x="10" y="118" width="130" height="72" rx="7" fill="#e8eaf6" stroke="#3949ab" strokeWidth="1.5"/>
    <text x="75" y="143" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#283593">Spoke-App</text>
    <text x="75" y="159" textAnchor="middle" fontSize="10" fill="#3949ab">10.1.0.0/16</text>
    <text x="75" y="175" textAnchor="middle" fontSize="10" fill="#555">VNet connection</text>
    <rect x="540" y="118" width="130" height="72" rx="7" fill="#e8eaf6" stroke="#3949ab" strokeWidth="1.5"/>
    <text x="605" y="143" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#283593">Spoke-DB</text>
    <text x="605" y="159" textAnchor="middle" fontSize="10" fill="#3949ab">10.2.0.0/16</text>
    <text x="605" y="175" textAnchor="middle" fontSize="10" fill="#555">VNet connection</text>
    <line x1="140" y1="154" x2="218" y2="120" stroke="#555" strokeWidth="1.5" markerEnd="url(#vw1)"/>
    <line x1="540" y1="154" x2="392" y2="120" stroke="#555" strokeWidth="1.5" markerEnd="url(#vw1)"/>
  </svg>
);

// ─── HS-111: NAT Gateway vs LB Outbound Precedence ────────────────────────────
const NatGatewayPrecedenceDiagram = () => (
  <svg viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", fontFamily: "sans-serif" }}>
    <defs>
      <marker id="ng2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3z" fill="#555"/></marker>
    </defs>
    <rect x="10" y="70" width="155" height="148" rx="8" fill="#e8eaf6" stroke="#3949ab" strokeWidth="2"/>
    <text x="87" y="96" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#283593">Subnet-App</text>
    <text x="87" y="112" textAnchor="middle" fontSize="11" fill="#3949ab">10.1.1.0/24</text>
    <rect x="22" y="122" width="130" height="50" rx="5" fill="white" stroke="#3949ab" strokeWidth="1.5"/>
    <text x="87" y="144" textAnchor="middle" fontSize="20" fill="#555">🖥</text>
    <text x="87" y="165" textAnchor="middle" fontSize="11" fill="#555">50 VMs</text>
    <text x="87" y="193" textAnchor="middle" fontSize="10" fill="#94a3b8">Both resources below</text>
    <text x="87" y="208" textAnchor="middle" fontSize="10" fill="#94a3b8">are on this subnet</text>
    <rect x="190" y="40" width="178" height="100" rx="8" fill="#f8f9fa" stroke="#475569" strokeWidth="2"/>
    <text x="279" y="67" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">NAT Gateway</text>
    <text x="279" y="84" textAnchor="middle" fontSize="11" fill="#555">ngw-prod</text>
    <rect x="202" y="94" width="154" height="36" rx="4" fill="#475569"/>
    <text x="279" y="108" textAnchor="middle" fontSize="11" fill="white">pip-ngw (20.50.1.1)</text>
    <text x="279" y="123" textAnchor="middle" fontSize="10" fill="#cbd5e1">64,512 SNAT ports/IP</text>
    <rect x="190" y="160" width="178" height="100" rx="8" fill="#f8f9fa" stroke="#475569" strokeWidth="2"/>
    <text x="279" y="187" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">Load Balancer</text>
    <text x="279" y="204" textAnchor="middle" fontSize="11" fill="#555">lb-prod (Standard)</text>
    <rect x="202" y="214" width="154" height="36" rx="4" fill="#475569"/>
    <text x="279" y="228" textAnchor="middle" fontSize="11" fill="white">Outbound rules configured</text>
    <text x="279" y="243" textAnchor="middle" fontSize="10" fill="#cbd5e1">Frontend: 20.50.2.1</text>
    <line x1="165" y1="120" x2="188" y2="90" stroke="#555" strokeWidth="1.5" markerEnd="url(#ng2)"/>
    <line x1="165" y1="155" x2="188" y2="200" stroke="#555" strokeWidth="1.5" markerEnd="url(#ng2)"/>
    <ellipse cx="570" cy="140" rx="66" ry="42" fill="#f0f4f8" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="570" y="136" textAnchor="middle" fontSize="13" fill="#475569" fontWeight="600">Internet</text>
    <text x="570" y="153" textAnchor="middle" fontSize="10" fill="#64748b">outbound SNAT</text>
    <line x1="370" y1="88" x2="496" y2="128" stroke="#555" strokeWidth="2" markerEnd="url(#ng2)"/>
    <line x1="370" y1="210" x2="496" y2="158" stroke="#555" strokeWidth="2" markerEnd="url(#ng2)"/>
  </svg>
);

const az700hotspot = [
  {
    id: "AZ-700-HS-101",
    exam: "AZ-700",
    type: "hotspot",
    difficulty: "medium",
    category: "Application Delivery Services",
    question: "Below is a diagram of an Azure Traffic Manager deployment, click the component that evaluates the latency table and decides which endpoint IP address to return to the client.",
    imageAlt: "Traffic Manager performance routing diagram showing a client in London, Traffic Manager with a latency table, East US and West Europe web app endpoints, and numbered traffic flow arrows",
    viewBox: "0 0 680 370",
    diagram: TrafficManagerDiagram,
    zones: [
      { id: "client",           label: "Client (Browser)",      x: 20,  y: 155, width: 120, height: 75  },
      { id: "traffic-manager",  label: "Traffic Manager",       x: 255, y: 138, width: 178, height: 100 },
      { id: "east-us",          label: "East US Endpoint",      x: 505, y: 55,  width: 152, height: 70  },
      { id: "west-europe",      label: "West Europe Endpoint",  x: 505, y: 258, width: 152, height: 70  },
    ],
    correctZone: "traffic-manager",
    answer: "Traffic Manager holds a latency table mapping client regions to endpoint round-trip times. On receiving a DNS query, it picks the lowest-latency healthy endpoint and returns that IP in the DNS response.",
    explanation: "Traffic Manager is purely DNS-based — it never sits in the data path. When the client's DNS resolver queries Traffic Manager (step ①), TM checks its latency table and health probe results, then returns the best endpoint's IP (step ②). The client connects directly to East US (step ③), completely bypassing Traffic Manager. Neither the client nor the endpoints make the routing decision — that is Traffic Manager's sole role.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/traffic-manager/traffic-manager-routing-methods#performance-traffic-routing-method",
  },
  {
    id: "AZ-700-HS-102",
    exam: "AZ-700",
    type: "hotspot",
    difficulty: "hard",
    category: "Security & Monitoring",
    question: "A security team requires that outbound internet traffic from spoke VMs is restricted to only *.microsoft.com and *.azure.com — all other destinations must be blocked. Click the Azure Firewall rule collection type that must be configured to enforce this FQDN-based restriction.",
    imageAlt: "Azure Firewall rule collection diagram showing a Route Table (UDR), and three rule collection types inside Azure Firewall: DNAT Rules, Network Rules, and Application Rules, each with their capabilities listed.",
    viewBox: "0 0 680 340",
    diagram: AzureFirewallDiagram,
    zones: [
      { id: "route-table",       label: "Route Table (UDR)",  x: 255, y: 18,  width: 165, height: 62  },
      { id: "dnat-rules",        label: "DNAT Rules",         x: 182, y: 128, width: 95,  height: 176 },
      { id: "network-rules",     label: "Network Rules",      x: 285, y: 128, width: 95,  height: 176 },
      { id: "application-rules", label: "Application Rules",  x: 388, y: 128, width: 95,  height: 176 },
    ],
    correctZone: "application-rules",
    answer: "Application Rules are the only Azure Firewall rule collection type that supports FQDN-based filtering. They operate at Layer 7 and can allow or deny traffic based on fully qualified domain names, URL categories, and web categories.",
    explanation: "Network Rules operate at Layer 4 (IP/port/protocol) and have no concept of FQDNs — you cannot write '*.microsoft.com' in a Network Rule. DNAT Rules are for inbound port-forwarding only and are irrelevant for outbound filtering. The Route Table controls where traffic is sent (next-hop), not what is permitted. Only Application Rules understand HTTP/S at Layer 7 and can match FQDNs. Note: for non-HTTP protocols, Azure Firewall Premium can use FQDN filtering via Network Rules with DNS inspection enabled — but for HTTP/S FQDN restriction, Application Rules are the standard mechanism.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/firewall/rule-processing",
  },
  {
    id: "AZ-700-HS-103",
    exam: "AZ-700",
    type: "hotspot",
    difficulty: "hard",
    category: "Private Access",
    question: "On-premises DNS servers cannot resolve 'mystorageaccount.blob.core.windows.net' to the private IP 10.1.1.10. ExpressRoute connectivity is confirmed working. The Private DNS Zone is correctly configured and linked to the hub VNet. Click the component that on-premises DNS servers should be configured to forward privatelink.* queries to.",
    imageAlt: "Hybrid DNS resolution diagram showing Azure DNS (168.63.129.16, VNet-only), a Private DNS Zone, on-premises DNS with a conditional forwarder question mark, a DNS Private Resolver inbound endpoint reachable via ExpressRoute, and a Private Endpoint NIC.",
    viewBox: "0 0 680 325",
    diagram: PrivateAccessDiagram,
    zones: [
      { id: "azure-dns",        label: "Azure DNS (168.63.129.16)", x: 15,  y: 20,  width: 160, height: 92  },
      { id: "private-dns-zone", label: "Private DNS Zone",          x: 258, y: 20,  width: 195, height: 92  },
      { id: "dns-resolver",     label: "DNS Private Resolver",      x: 258, y: 200, width: 195, height: 100 },
      { id: "private-endpoint", label: "Private Endpoint",          x: 520, y: 200, width: 145, height: 100 },
    ],
    correctZone: "dns-resolver",
    answer: "On-premises DNS servers must forward privatelink.* queries to the DNS Private Resolver's Inbound Endpoint IP (e.g. 10.0.0.4), which is reachable over ExpressRoute. The resolver then queries Azure's internal DNS (including the linked Private DNS Zone) and returns the private IP.",
    explanation: "Azure DNS (168.63.129.16) is only accessible from within Azure VNets — on-premises servers cannot reach it over ExpressRoute, so forwarding there fails silently. The Private DNS Zone is not a DNS server; it is a zone hosted in Azure DNS and cannot receive forwarded queries directly. The Private Endpoint provides the private IP but plays no role in DNS resolution. The DNS Private Resolver Inbound Endpoint bridges the gap: it has a regular private IP in your VNet (reachable from on-premises via ExpressRoute), receives forwarded queries, and resolves them using Azure DNS including any linked Private DNS zones.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/dns/private-resolver-overview",
  },
  // ─── Hybrid Connectivity ──────────────────────────────────────────────────
  {
    id: "AZ-700-HS-104",
    exam: "AZ-700",
    type: "hotspot",
    difficulty: "medium",
    category: "Hybrid Connectivity",
    question:
      "A Site-to-Site VPN between Azure and on-premises is working for the existing address space. An engineer just added a new subnet 10.20.0.0/24 on-premises, but Azure VMs cannot reach it. The IPsec tunnel remains connected. Click the component that must be updated to advertise the new subnet to Azure.",
    imageAlt: "Site-to-Site VPN component diagram showing a VPN Gateway in Azure, a VPN Connection resource, a Local Network Gateway holding the on-premises address space, and an on-premises router that has already added the new 10.20.0.0/24 subnet.",
    viewBox: "0 0 680 258",
    diagram: S2SVPNDiagram,
    zones: [
      { id: "vpn-gateway",           label: "VPN Gateway",           x: 20,  y: 52, width: 148, height: 172 },
      { id: "vpn-connection",        label: "VPN Connection",        x: 198, y: 90, width: 120, height: 100 },
      { id: "local-network-gateway", label: "Local Network Gateway", x: 348, y: 52, width: 160, height: 172 },
      { id: "on-prem-router",        label: "On-Premises Router",    x: 537, y: 90, width: 132, height: 100 },
    ],
    correctZone: "local-network-gateway",
    answer:
      "The Local Network Gateway is the Azure resource that stores the on-premises public IP and address prefixes. Adding 10.20.0.0/24 to its address space tells Azure to route traffic for that subnet down the IPsec tunnel.",
    explanation:
      "The VPN Gateway is the Azure-side endpoint and handles the IKE/IPsec negotiation — it does not store on-premises prefixes. The VPN Connection links the two gateways and holds the shared key and connection type, but not address space. The on-premises router already knows about the new subnet (it owns it). Only the Local Network Gateway defines what the Azure side believes is reachable on-premises. Without updating it, Azure has no route for 10.20.0.0/24 and drops or misroutes traffic destined for that subnet.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-modify-local-network-gateway-portal",
  },
  {
    id: "AZ-700-HS-105",
    exam: "AZ-700",
    type: "hotspot",
    difficulty: "hard",
    category: "Hybrid Connectivity",
    question:
      "Spoke-A VMs can reach the internet and other Azure VNets normally but cannot reach any resource in the on-premises network (192.168.0.0/16). Hub VMs have no connectivity issues. The four diagnostic panels below show the relevant configuration. Click the panel that identifies the root cause.",
    imageAlt:
      "Four diagnostic configuration panels: Hub VNet peering to Spoke-A (Hub side), Spoke-A VNet peering to Hub (Spoke-A side), Spoke-A VM NIC effective routes table, and VPN Connection HubToOnPrem status.",
    viewBox: "0 0 680 342",
    diagram: HubSpokeTransitDiagram,
    zones: [
      { id: "hub-to-spoke",     label: "Hub VNet peering to Spoke-A",  x: 10,  y: 26, width: 318, height: 144 },
      { id: "spoke-to-hub",     label: "Spoke-A VNet peering to Hub",  x: 352, y: 26, width: 318, height: 144 },
      { id: "effective-routes", label: "Spoke-A VM Effective Routes",  x: 10,  y: 184, width: 318, height: 150 },
      { id: "vpn-connection",   label: "VPN Connection Status",        x: 352, y: 184, width: 318, height: 150 },
    ],
    correctZone: "spoke-to-hub",
    answer:
      "The Spoke-A → Hub peering has 'Use remote gateways: Disabled'. Enabling it tells Azure to propagate routes learned by the Hub's VPN Gateway into Spoke-A, making 192.168.0.0/16 reachable.",
    explanation:
      "Gateway transit requires both sides to cooperate. The Hub side (Panel 1) is correct — 'Allow gateway transit' is enabled, meaning the Hub is willing to share its gateway. But Spoke-A's side (Panel 2) has 'Use remote gateways: Disabled', so it never requests gateway-learned routes. The result is visible in Panel 3: Spoke-A's effective routes contain no on-premises prefix — but that is the symptom, not the cause. Panel 4 confirms the VPN tunnel is healthy and the on-premises address space is correctly configured. The root cause is Panel 2: the missing 'Use remote gateways' setting on Spoke-A's peering link.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview#gateways-and-on-premises-connectivity",
  },
  {
    id: "AZ-700-HS-106",
    exam: "AZ-700",
    type: "hotspot",
    difficulty: "hard",
    category: "Hybrid Connectivity",
    question:
      "A junior engineer recently modified the Hub VNet peering configuration during a maintenance window. Since then, Spoke-A VMs have lost access to the on-premises corporate network (192.168.0.0/16), though all other connectivity remains working. Review the four panels and click the one containing the misconfigured setting.",
    imageAlt:
      "Four diagnostic configuration panels: Hub VNet peering to Spoke-A (Hub side), Spoke-A VNet peering to Hub (Spoke-A side), Spoke-A VM NIC effective routes table, and VPN Connection HubToOnPrem status.",
    viewBox: "0 0 680 342",
    diagram: HubFaultTransitDiagram,
    zones: [
      { id: "hub-to-spoke",     label: "Hub VNet peering to Spoke-A",  x: 10,  y: 26, width: 318, height: 144 },
      { id: "spoke-to-hub",     label: "Spoke-A VNet peering to Hub",  x: 352, y: 26, width: 318, height: 144 },
      { id: "effective-routes", label: "Spoke-A VM Effective Routes",  x: 10,  y: 184, width: 318, height: 150 },
      { id: "vpn-connection",   label: "VPN Connection Status",        x: 352, y: 184, width: 318, height: 150 },
    ],
    correctZone: "hub-to-spoke",
    answer:
      "The Hub → Spoke-A peering has 'Allow gateway transit: Disabled'. The Hub must offer its gateway to the spoke before 'Use remote gateways' on the spoke side has any effect.",
    explanation:
      "Gateway transit is a two-sided negotiation. Even though Spoke-A correctly has 'Use remote gateways: Enabled' (Panel 2), it receives nothing because the Hub side (Panel 1) has 'Allow gateway transit: Disabled' — the Hub is not advertising its gateway to this spoke. The result is the same symptom seen in Panel 3: no on-premises route in Spoke-A's effective routes. Panel 4 confirms the VPN tunnel is healthy and correctly defines 192.168.0.0/16 on the on-premises side. The fix is to enable 'Allow gateway transit' on the Hub-to-Spoke-A peering link.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview#gateways-and-on-premises-connectivity",
  },
  // ─── Core Networking Infrastructure ─────────────────────────────────────────
  {
    id: "AZ-700-HS-107",
    exam: "AZ-700",
    type: "hotspot",
    difficulty: "hard",
    category: "Core Networking Infrastructure",
    question: "An NVA high-availability cluster sits behind a Standard Internal Load Balancer with HA Ports and Floating IP enabled. One NVA is forwarding inspected traffic correctly; the other is silently dropping packets. Review the NIC settings shown on each NVA and click the one that is misconfigured.",
    imageAlt: "NVA HA diagram with a Standard ILB (HA Ports, Floating IP ON) distributing traffic to NVA-1 and NVA-2. NVA-1 NIC eth0 shows IP Forwarding: Disabled in a red badge. NVA-2 NIC eth0 shows IP Forwarding: Enabled in a green badge.",
    viewBox: "0 0 680 380",
    diagram: NvaIpForwardingDiagram,
    zones: [
      { id: "ilb",     label: "Standard ILB",   x: 215, y: 80,  width: 145, height: 220 },
      { id: "nva-1",   label: "NVA-1",          x: 416, y: 62,  width: 242, height: 128 },
      { id: "nva-2",   label: "NVA-2",          x: 416, y: 210, width: 242, height: 128 },
      { id: "spoke-a", label: "Spoke-A Subnet", x: 10,  y: 30,  width: 145, height: 130 },
    ],
    correctZone: "nva-1",
    answer: "NVA-1 has IP Forwarding disabled on its NIC. Azure drops any packet whose destination IP does not match the NIC's own IP — the NVA receives the packet from the ILB but silently discards it instead of relaying it onward.",
    explanation: "IP forwarding is an Azure platform setting on the VM's NIC that lifts the default restriction of dropping packets not addressed to the NIC's own IP. Without it, the NVA receives inspected traffic (because Floating IP/DSR preserves the original destination IP) but cannot forward it — Azure discards it at the NIC level. NVA-2 has IP forwarding enabled and works correctly. NVA-1 does not, so every flow the ILB distributes to NVA-1 is dropped. IP forwarding must be enabled on the NIC of every NVA VM in the backend pool, and OS-level forwarding (IP forwarding in the guest OS) must also be configured inside the VM.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-network-interface#enable-or-disable-ip-forwarding",
  },
  {
    id: "AZ-700-HS-108",
    exam: "AZ-700",
    type: "hotspot",
    difficulty: "hard",
    category: "Core Networking Infrastructure",
    question: "The security team requires all internet-bound traffic from VMs in the Spoke Subnet to pass through the on-premises firewall for inspection. Currently traffic exits directly to the internet (red dashed path). A Site-to-Site VPN tunnel is connected and the on-premises firewall is ready. Click the component that must be updated to redirect 0.0.0.0/0 traffic through the VPN Gateway.",
    imageAlt: "Forced tunnelling diagram showing a Spoke Subnet with VMs and a Route Table labelled '0.0.0.0/0 → ? (UDR missing)', a VPN Gateway showing the S2S tunnel as connected, an on-premises firewall, the Internet cloud at the top, and a red dashed arrow showing current traffic going directly to the internet. A green dashed arrow shows the required path through the VPN Gateway to on-premises.",
    viewBox: "0 0 680 310",
    diagram: ForcedTunnelDiagram,
    zones: [
      { id: "route-table",   label: "Route Table",      x: 22,  y: 208, width: 150, height: 58  },
      { id: "vpn-gateway",   label: "VPN Gateway",      x: 260, y: 120, width: 155, height: 120 },
      { id: "spoke-subnet",  label: "Spoke Subnet",     x: 10,  y: 88,  width: 175, height: 110 },
      { id: "onprem-fw",     label: "On-Premises FW",   x: 492, y: 120, width: 175, height: 120 },
    ],
    correctZone: "route-table",
    answer: "The Route Table associated with the Spoke Subnet must have a UDR added: destination 0.0.0.0/0, next hop type Virtual Network Gateway. This overrides the system route and forces all internet-bound traffic down the VPN tunnel to the on-premises firewall.",
    explanation: "The VPN Gateway and on-premises firewall are already correctly configured — the tunnel is connected and the firewall is ready. The missing piece is a user-defined route in the Route Table associated with the Spoke Subnet. Without a 0.0.0.0/0 UDR pointing to Virtual Network Gateway, Azure uses the system route (0.0.0.0/0 → Internet) and traffic exits directly. Adding the UDR overrides the system route and sends all internet-bound traffic into the VPN tunnel. The Route Table should also have BGP propagation disabled to prevent on-premises BGP routes from creating conflicts.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-configure-udr-overview",
  },
  // ─── Security & Monitoring ───────────────────────────────────────────────────
  {
    id: "AZ-700-HS-109",
    exam: "AZ-700",
    type: "hotspot",
    difficulty: "medium",
    category: "Security & Monitoring",
    question: "Inbound HTTP traffic on port 80 is arriving from the internet destined for the VM. A Subnet NSG with a Priority 100 DENY rule for port 80 and a NIC NSG with a Priority 100 ALLOW rule for port 80 are both applied. The traffic is being denied. Click the NSG that Azure evaluates first for inbound traffic, causing the denial before the other NSG is consulted.",
    imageAlt: "NSG inbound evaluation diagram showing Internet source with port 80 arrow, a Subnet NSG box showing Priority 100 DENY port 80 with an evaluation order label 'Evaluated FIRST', a NIC NSG box showing Priority 100 ALLOW port 80 labelled 'never reached', a dashed line between them showing the blocked path, and a greyed-out VM on the right.",
    viewBox: "0 0 680 300",
    diagram: NsgEvalOrderDiagram,
    zones: [
      { id: "subnet-nsg", label: "Subnet NSG", x: 150, y: 50,  width: 175, height: 200 },
      { id: "nic-nsg",    label: "NIC NSG",    x: 380, y: 50,  width: 175, height: 200 },
      { id: "vm",         label: "VM",         x: 600, y: 118, width: 72,  height: 64  },
      { id: "internet",   label: "Internet",   x: 7,   y: 116, width: 96,  height: 68  },
    ],
    correctZone: "subnet-nsg",
    answer: "For inbound traffic, Azure always evaluates the Subnet NSG before the NIC NSG. The Priority 100 DENY rule in the Subnet NSG matches port 80 and drops the packet — the NIC NSG is never reached.",
    explanation: "NSG evaluation order for inbound traffic is fixed: Subnet NSG first, then NIC NSG. Evaluation stops at the first matching rule in each NSG. A DENY in the Subnet NSG terminates processing immediately — the NIC NSG's ALLOW rule is irrelevant because it is never consulted. There is no 'most permissive wins' logic between NSGs. For the ALLOW to take effect, the Subnet NSG must also permit port 80 (or the DENY rule must be removed). For outbound traffic the order reverses: NIC NSG is evaluated first.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/network-security-group-how-it-works",
  },
  // ─── Hybrid Connectivity ─────────────────────────────────────────────────────
  {
    id: "AZ-700-HS-110",
    exam: "AZ-700",
    type: "hotspot",
    difficulty: "hard",
    category: "Hybrid Connectivity",
    question: "Azure Firewall is deployed inside the Virtual WAN hub and a Firewall Policy is associated. Inter-spoke traffic still routes directly between Spoke-App and Spoke-DB without passing through the firewall (red dashed path). Click the component inside the hub that must be configured to redirect private traffic through the firewall.",
    imageAlt: "Virtual WAN hub diagram showing Azure Firewall inside the hub labelled as 'Deployed' and 'Policy associated', a Routing Intent badge labelled 'NOT CONFIGURED', a Hub Route Tables badge showing routes not programmed, Spoke-App and Spoke-DB connected to the hub, and a red dashed arrow showing inter-spoke traffic bypassing the firewall.",
    viewBox: "0 0 680 360",
    diagram: VwanRoutingIntentDiagram,
    zones: [
      { id: "azure-firewall",    label: "Azure Firewall",    x: 220, y: 72,  width: 170, height: 100 },
      { id: "routing-intent",    label: "Routing Intent",    x: 140, y: 200, width: 195, height: 80  },
      { id: "hub-route-tables",  label: "Hub Route Tables",  x: 370, y: 200, width: 195, height: 80  },
      { id: "spoke-app",         label: "Spoke-App",         x: 10,  y: 130, width: 130, height: 80  },
    ],
    correctZone: "routing-intent",
    answer: "Routing Intent must be configured on the hub. Deploying Azure Firewall alone does not change how the hub routes traffic — Routing Intent is the explicit configuration that instructs the Virtual WAN control plane to program routes through the firewall across all connected spokes and branches.",
    explanation: "A common misconception is that deploying Azure Firewall in the hub automatically redirects traffic. It does not. Routing Intent is a separate configuration step that sets traffic policies: Private traffic policy (routes inter-VNet, VNet-to-branch, and branch-to-branch traffic through the firewall) and/or Internet traffic policy (routes all outbound internet traffic through the firewall). Once Routing Intent is configured, the Virtual WAN control plane automatically programs the required routes in all connected spoke VNets — no manual UDRs are needed.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-wan/how-to-routing-policies",
  },
  // ─── Application Delivery Services ───────────────────────────────────────────
  {
    id: "AZ-700-HS-111",
    exam: "AZ-700",
    type: "hotspot",
    difficulty: "medium",
    category: "Application Delivery Services",
    question: "A subnet has both a NAT Gateway and a Standard Load Balancer with outbound rules configured. All 50 VMs in the subnet need scalable outbound internet connectivity. Click the component that Azure uses as the active SNAT mechanism — the other is automatically inactive for this subnet.",
    imageAlt: "Outbound SNAT precedence diagram showing Subnet-App with 50 VMs on the left, a NAT Gateway (ngw-prod) with a green arrow to the Internet labelled 'active', and a Standard Load Balancer with outbound rules connected by a grey dashed arrow labelled 'inactive'. Both are attached to the same subnet.",
    viewBox: "0 0 680 300",
    diagram: NatGatewayPrecedenceDiagram,
    zones: [
      { id: "nat-gateway",    label: "NAT Gateway",     x: 190, y: 50,  width: 180, height: 110 },
      { id: "load-balancer",  label: "Load Balancer",   x: 190, y: 178, width: 180, height: 100 },
      { id: "subnet",         label: "Subnet-App",      x: 10,  y: 80,  width: 155, height: 148 },
      { id: "internet",       label: "Internet",        x: 518, y: 110, width: 124, height: 80  },
    ],
    correctZone: "nat-gateway",
    answer: "NAT Gateway takes full and automatic precedence over Load Balancer outbound rules for any subnet it is associated with. The LB outbound rules are immediately inactive — there is no sharing, round-robin, or overflow between them.",
    explanation: "When a NAT Gateway is associated with a subnet, it becomes the sole SNAT mechanism for all outbound internet traffic from that subnet. Load Balancer outbound rules are completely inactive — they do not act as overflow or fallback. This is intentional: NAT Gateway provides far more SNAT capacity (64,512 ports per public IP vs ~1,024 per VM with LB outbound rules) and is Azure's recommended solution for production outbound connectivity. The LB outbound rules remain configured but have no effect until the NAT Gateway association is removed.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/nat-gateway/nat-overview#nat-gateway-and-load-balancer",
  },
];

export default az700hotspot;
