// filepath: src/data/diagrams.jsx
// SVG diagram components used in image-mcq cards

export const VNetNsgDiagram = (
  <svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 520, fontFamily: "sans-serif" }}>
    {/* VNet border */}
    <rect x="10" y="10" width="500" height="280" rx="12" fill="#e8f4fd" stroke="#1e90ff" strokeWidth="2" strokeDasharray="8 4" />
    <text x="20" y="32" fontSize="13" fill="#1e90ff" fontWeight="bold">VNet: 10.0.0.0/16</text>

    {/* Internet cloud */}
    <ellipse cx="60" cy="155" rx="44" ry="28" fill="#f0f0f0" stroke="#aaa" strokeWidth="1.5" />
    <text x="60" y="152" textAnchor="middle" fontSize="11" fill="#555">Inter-</text>
    <text x="60" y="165" textAnchor="middle" fontSize="11" fill="#555">net</text>
    {/* Arrow from internet to Subnet-A */}
    <line x1="104" y1="148" x2="148" y2="148" stroke="#888" strokeWidth="1.5" markerEnd="url(#arrow)" />

    {/* Subnet-A */}
    <rect x="148" y="50" width="150" height="200" rx="8" fill="#dff0d8" stroke="#5cb85c" strokeWidth="1.5" />
    <text x="223" y="70" textAnchor="middle" fontSize="12" fill="#3a7a3a" fontWeight="bold">Subnet-A</text>
    <text x="223" y="84" textAnchor="middle" fontSize="10" fill="#3a7a3a">10.0.1.0/24</text>

    {/* NSG-A badge */}
    <rect x="160" y="92" width="122" height="28" rx="5" fill="#d9534f" />
    <text x="221" y="111" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">NSG-A  🔒 port 22</text>

    {/* VM-A */}
    <rect x="173" y="135" width="100" height="80" rx="6" fill="white" stroke="#5cb85c" strokeWidth="1.5" />
    <text x="223" y="165" textAnchor="middle" fontSize="22">🖥</text>
    <text x="223" y="188" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">VM-A</text>
    <text x="223" y="203" textAnchor="middle" fontSize="10" fill="#d9534f">SSH blocked</text>

    {/* Arrow from internet to Subnet-B */}
    <line x1="104" y1="165" x2="338" y2="165" stroke="#888" strokeWidth="1.5" markerEnd="url(#arrow)" strokeDasharray="5 3" />

    {/* Subnet-B */}
    <rect x="338" y="50" width="155" height="200" rx="8" fill="#fcf8e3" stroke="#f0ad4e" strokeWidth="1.5" />
    <text x="415" y="70" textAnchor="middle" fontSize="12" fill="#8a6d3b" fontWeight="bold">Subnet-B</text>
    <text x="415" y="84" textAnchor="middle" fontSize="10" fill="#8a6d3b">10.0.2.0/24</text>

    {/* Question mark — missing NSG */}
    <rect x="350" y="92" width="128" height="28" rx="5" fill="#f0ad4e" strokeDasharray="4 2" stroke="#c87d00" strokeWidth="1.5" />
    <text x="414" y="111" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">? Missing resource</text>

    {/* VM-B */}
    <rect x="365" y="135" width="100" height="80" rx="6" fill="white" stroke="#f0ad4e" strokeWidth="1.5" />
    <text x="415" y="165" textAnchor="middle" fontSize="22">🖥</text>
    <text x="415" y="188" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">VM-B</text>
    <text x="415" y="203" textAnchor="middle" fontSize="10" fill="#d9534f">port 443 failing</text>

    {/* Arrow defs */}
    <defs>
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#888" />
      </marker>
    </defs>
  </svg>
);

export const StorageRedundancyDiagram = (
  <svg viewBox="0 0 540 300" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 540, fontFamily: "sans-serif" }}>
    {/* Primary Region */}
    <rect x="10" y="10" width="310" height="280" rx="10" fill="#e8f4fd" stroke="#1e90ff" strokeWidth="2" />
    <text x="165" y="32" textAnchor="middle" fontSize="13" fill="#1e70c0" fontWeight="bold">Primary Region</text>

    {/* Zone 1 */}
    <rect x="22" y="42" width="85" height="210" rx="7" fill="#c8e6c9" stroke="#43a047" strokeWidth="1.5" />
    <text x="64" y="60" textAnchor="middle" fontSize="11" fill="#2e7d32" fontWeight="bold">Zone 1</text>
    <text x="64" y="110" textAnchor="middle" fontSize="26">🗄</text>
    <text x="64" y="138" textAnchor="middle" fontSize="10" fill="#2e7d32">Copy 1</text>

    {/* Zone 2 */}
    <rect x="120" y="42" width="85" height="210" rx="7" fill="#c8e6c9" stroke="#43a047" strokeWidth="1.5" />
    <text x="162" y="60" textAnchor="middle" fontSize="11" fill="#2e7d32" fontWeight="bold">Zone 2</text>
    <text x="162" y="110" textAnchor="middle" fontSize="26">🗄</text>
    <text x="162" y="138" textAnchor="middle" fontSize="10" fill="#2e7d32">Copy 2</text>

    {/* Zone 3 */}
    <rect x="218" y="42" width="85" height="210" rx="7" fill="#c8e6c9" stroke="#43a047" strokeWidth="1.5" />
    <text x="260" y="60" textAnchor="middle" fontSize="11" fill="#2e7d32" fontWeight="bold">Zone 3</text>
    <text x="260" y="110" textAnchor="middle" fontSize="26">🗄</text>
    <text x="260" y="138" textAnchor="middle" fontSize="10" fill="#2e7d32">Copy 3</text>

    {/* Async replication arrow */}
    <line x1="322" y1="150" x2="368" y2="150" stroke="#777" strokeWidth="2" markerEnd="url(#arrow2)" strokeDasharray="6 3" />
    <text x="344" y="143" textAnchor="middle" fontSize="9" fill="#777">async</text>

    {/* Secondary Region */}
    <rect x="370" y="10" width="160" height="280" rx="10" fill="#fce4ec" stroke="#e91e63" strokeWidth="2" />
    <text x="450" y="32" textAnchor="middle" fontSize="13" fill="#c2185b" fontWeight="bold">Secondary Region</text>
    <text x="450" y="48" textAnchor="middle" fontSize="10" fill="#c2185b">(paired)</text>

    {/* Secondary copies */}
    <rect x="385" y="62" width="130" height="90" rx="7" fill="#f8bbd0" stroke="#e91e63" strokeWidth="1.5" />
    <text x="450" y="82" textAnchor="middle" fontSize="11" fill="#880e4f" fontWeight="bold">LRS Copies</text>
    <text x="415" y="120" textAnchor="middle" fontSize="22">🗄</text>
    <text x="415" y="143" textAnchor="middle" fontSize="10" fill="#880e4f">Copy 4</text>
    <text x="470" y="120" textAnchor="middle" fontSize="22">🗄</text>
    <text x="470" y="143" textAnchor="middle" fontSize="10" fill="#880e4f">Copy 5</text>    <defs>
      <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#777" />
      </marker>
    </defs>
  </svg>
);
