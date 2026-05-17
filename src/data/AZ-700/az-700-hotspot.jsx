// AZ-700 — Hotspot (click-on-diagram) questions
// Cards: AZ-700-HS-101

const TrafficManagerDiagram = (
  <svg viewBox="0 0 680 370" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 680, fontFamily: "sans-serif" }}>
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
];

export default az700hotspot;
