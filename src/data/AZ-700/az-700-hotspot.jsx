// AZ-700 — Hotspot (click-on-diagram) questions
// Cards: AZ-700-HS-101 … AZ-700-HS-105

const TrafficManagerDiagram = (
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

const AzureFirewallDiagram = (
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

const PrivateAccessDiagram = (
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

const S2SVPNDiagram = (
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

const HubSpokeTransitDiagram = (
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

const HubFaultTransitDiagram = (
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
];

export default az700hotspot;
