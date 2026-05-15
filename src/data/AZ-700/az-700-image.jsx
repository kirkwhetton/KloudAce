// AZ-700 — Image MCQ cards (requires JSX for diagram components)
// Cards: AZ-700-126, AZ-700-127

// ── Diagrams ─────────────────────────────────────────────────────────────────

export const FirewallDnatDiagram = (
  <svg viewBox="0 0 680 470" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 680, fontFamily: "sans-serif" }}>
    <defs>
      <marker id="ag" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#666" />
      </marker>
    </defs>

    {/* ── TOP ROW: packet annotation bubbles ── */}

    {/* Inbound packet bubble */}
    <rect x="68" y="15" width="176" height="56" rx="7" fill="#e3f2fd" stroke="#1565c0" strokeWidth="1.2" />
    <text x="151" y="37" textAnchor="middle" fontSize="17" fill="#0d47a1" fontWeight="bold">Packet in</text>
    <text x="151" y="57" textAnchor="middle" fontSize="17" fill="#0d47a1">Dst 20.1.2.3 : 3389</text>

    {/* Outbound packet bubble */}
    <rect x="340" y="15" width="166" height="56" rx="7" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.2" />
    <text x="423" y="37" textAnchor="middle" fontSize="17" fill="#1b5e20" fontWeight="bold">Packet out</text>
    <text x="423" y="57" textAnchor="middle" fontSize="17" fill="#1b5e20">Dst 10.0.2.4 : 3389</text>

    {/* Dashed connectors from bubbles down to flow arrows */}
    <line x1="151" y1="71" x2="151" y2="215" stroke="#1565c0" strokeWidth="2" strokeDasharray="4 3" />
    <line x1="423" y1="71" x2="423" y2="215" stroke="#2e7d32" strokeWidth="2" strokeDasharray="4 3" />

    {/* ── MIDDLE ROW: main boxes + flow arrows ── */}

    {/* Internet cloud */}    <ellipse cx="52" cy="215" rx="52" ry="34" fill="#f0f0f0" stroke="#aaa" strokeWidth="1.5" />
    <text x="52" y="220" textAnchor="middle" fontSize="17" fill="#555">Internet</text>

    {/* Arrow 1: Internet → Firewall */}
    <line x1="105" y1="215" x2="194" y2="215" stroke="#666" strokeWidth="2" markerEnd="url(#ag)" />

    {/* Azure Firewall box */}
    <rect x="196" y="120" width="200" height="270" rx="9" fill="#fff3e0" stroke="#e65100" strokeWidth="2" />
    <text x="306" y="148" textAnchor="middle" fontSize="17" fill="#bf360c" fontWeight="bold">Azure Firewall</text>
    <text x="306" y="168" textAnchor="middle" fontSize="17" fill="#e65100">Public IP: 20.1.2.3</text>

    {/* Rule type pill — deliberately vague */}
    <rect x="226" y="178" width="140" height="36" rx="7" fill="#ef6c00" />
    <text x="306" y="202" textAnchor="middle" fontSize="17" fill="white" fontWeight="bold">? Rule type</text>

    {/* Translation arrow + labels */}
    <line x1="306" y1="214" x2="306" y2="325" stroke="#ef6c00" strokeWidth="3" markerEnd="url(#ag)" />
    <text x="295" y="350" textAnchor="middle" fontSize="17" fill="#555">Dst → 10.0.2.4 : 3389</text>


    {/* Arrow 2: Firewall → Backend subnet */}
    <line x1="396" y1="215" x2="484" y2="215" stroke="#666" strokeWidth="2" markerEnd="url(#ag)" />

    {/* Backend Subnet box */}
    <rect x="486" y="120" width="230" height="270" rx="9" fill="#e8f5e9" stroke="#43a047" strokeWidth="1.5" />
    <text x="600" y="148" textAnchor="middle" fontSize="17" fill="#2e7d32" fontWeight="bold">Backend Subnet</text>
    <text x="600" y="167" textAnchor="middle" fontSize="17" fill="#388e3c">10.0.2.0 / 24</text>

    {/* VM card inside subnet */}
    <rect x="516" y="178" width="166" height="122" rx="8" fill="white" stroke="#43a047" strokeWidth="1.5" />
    <text x="600" y="218" textAnchor="middle" fontSize="28">🖥</text>
    <text x="600" y="245" textAnchor="middle" fontSize="17" fill="#333" fontWeight="bold">Backend VM</text>
    <text x="600" y="264" textAnchor="middle" fontSize="17" fill="#555">10.0.2.4</text>
    <text x="600" y="282" textAnchor="middle" fontSize="17" fill="#888">port 3389</text>

    {/* No public IP badge */}
    <rect x="515" y="310" width="166" height="28" rx="6" fill="#ffebee" stroke="#e53935" strokeWidth="1" />
    <text x="600" y="329" textAnchor="middle" fontSize="17" fill="#c62828">No public IP</text>  </svg>
);

export const LBHaPortsDiagram = (
  <svg viewBox="0 0 960 900" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 960, fontFamily: "sans-serif" }}>
    <defs>
      <marker id="lbag" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#555" />
      </marker>
      <marker id="lbag2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#1565c0" />
      </marker>
    </defs>

    {/* ── LEFT: Spoke subnets ── */}

    {/* Spoke A  y:30–220 */}
    <rect x="10" y="30" width="240" height="190" rx="8" fill="#e8eaf6" stroke="#3949ab" strokeWidth="1.5" />
    <text x="130" y="62" textAnchor="middle" fontSize="29" fill="#283593" fontWeight="bold">Spoke A Subnet</text>
    <text x="130" y="92" textAnchor="middle" fontSize="22" fill="#3949ab">10.1.0.0/24</text>
    <rect x="20" y="108" width="220" height="54" rx="5" fill="#c5cae9" stroke="#3949ab" strokeWidth="1" />
    <text x="130" y="140" textAnchor="middle" fontSize="20" fill="#1a237e">UDR: 0.0.0.0/0 → ILB</text>

    {/* Spoke B  y:310–500 */}
    <rect x="10" y="310" width="240" height="190" rx="8" fill="#e8eaf6" stroke="#3949ab" strokeWidth="1.5" />
    <text x="130" y="342" textAnchor="middle" fontSize="29" fill="#283593" fontWeight="bold">Spoke B Subnet</text>
    <text x="130" y="372" textAnchor="middle" fontSize="22" fill="#3949ab">10.2.0.0/24</text>
    <rect x="20" y="388" width="220" height="54" rx="5" fill="#c5cae9" stroke="#3949ab" strokeWidth="1" />
    <text x="130" y="420" textAnchor="middle" fontSize="20" fill="#1a237e">UDR: 0.0.0.0/0 → ILB</text>

    {/* Arrows: Spokes → ILB */}
    <line x1="250" y1="125" x2="298" y2="210" stroke="#555" strokeWidth="2" markerEnd="url(#lbag)" />
    <line x1="250" y1="405" x2="298" y2="340" stroke="#555" strokeWidth="2" markerEnd="url(#lbag)" />

    {/* ── CENTRE: Standard ILB  x:300 y:20 w:310 h:490 ── */}

    <rect x="300" y="20" width="310" height="490" rx="10" fill="#e3f2fd" stroke="#1565c0" strokeWidth="2.5" />
    <text x="455" y="60" textAnchor="middle" fontSize="29" fill="#0d47a1" fontWeight="bold">Standard ILB</text>
    <text x="455" y="92" textAnchor="middle" fontSize="22" fill="#555">Frontend: 10.0.1.4</text>

    {/* HA Ports rule pill  y:108 */}
    <rect x="316" y="108" width="278" height="100" rx="8" fill="#1565c0" />
    <text x="455" y="148" textAnchor="middle" fontSize="24" fill="white" fontWeight="bold">HA Ports Rule</text>
    <text x="455" y="182" textAnchor="middle" fontSize="20" fill="#bbdefb">Protocol: All  |  Port: 0</text>

    {/* Floating IP badge  y:228 */}
    <rect x="316" y="228" width="278" height="100" rx="8" fill="#0288d1" />
    <text x="455" y="268" textAnchor="middle" fontSize="24" fill="white" fontWeight="bold">Floating IP (DSR)</text>
    <text x="455" y="302" textAnchor="middle" fontSize="20" fill="#b3e5fc">Original dst IP preserved</text>

    {/* Health probe  y:348 */}
    <rect x="316" y="348" width="278" height="72" rx="7" fill="#e1f5fe" stroke="#0288d1" strokeWidth="1" />
    <text x="455" y="390" textAnchor="middle" fontSize="22" fill="#01579b">Health Probe: TCP 22</text>

    {/* Arrows: ILB → NVAs */}
    <line x1="610" y1="230" x2="648" y2="260" stroke="#1565c0" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#lbag2)" />
    <line x1="610" y1="330" x2="648" y2="450" stroke="#1565c0" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#lbag2)" />

    {/* "distributes" label */}
    <text x="630" y="360" textAnchor="middle" fontSize="19" fill="#1565c0" fontStyle="italic">distributes</text>
    <text x="630" y="382" textAnchor="middle" fontSize="19" fill="#1565c0" fontStyle="italic">all flows</text>

    {/* ── RIGHT: NVA Subnet  x:650 y:20 w:300 h:620 ── */}

    <rect x="650" y="20" width="300" height="620" rx="10" fill="#fff3e0" stroke="#ef6c00" strokeWidth="2" />
    <text x="800" y="60" textAnchor="middle" fontSize="29" fill="#bf360c" fontWeight="bold">NVA Subnet</text>
    <text x="800" y="90" textAnchor="middle" fontSize="22" fill="#e65100">10.0.1.0/24</text>

    {/* NVA-1  y:106–346 */}
    <rect x="662" y="106" width="276" height="240" rx="8" fill="white" stroke="#ef6c00" strokeWidth="1.5" />
    <text x="800" y="162" textAnchor="middle" fontSize="48">🔒</text>
    <text x="800" y="198" textAnchor="middle" fontSize="26" fill="#333" fontWeight="bold">NVA-1</text>
    <text x="800" y="228" textAnchor="middle" fontSize="22" fill="#555">10.0.1.10</text>
    <rect x="672" y="244" width="256" height="54" rx="5" fill="#fff8e1" stroke="#ffa000" strokeWidth="1" />
    <text x="800" y="276" textAnchor="middle" fontSize="20" fill="#e65100">IP Forwarding: Enabled</text>

    {/* NVA-2  y:366–606 */}
    <rect x="662" y="366" width="276" height="240" rx="8" fill="white" stroke="#ef6c00" strokeWidth="1.5" />
    <text x="800" y="422" textAnchor="middle" fontSize="48">🔒</text>
    <text x="800" y="458" textAnchor="middle" fontSize="26" fill="#333" fontWeight="bold">NVA-2</text>
    <text x="800" y="488" textAnchor="middle" fontSize="22" fill="#555">10.0.1.11</text>
    <rect x="672" y="504" width="256" height="54" rx="5" fill="#fff8e1" stroke="#ffa000" strokeWidth="1" />
    <text x="800" y="536" textAnchor="middle" fontSize="20" fill="#e65100">IP Forwarding: Enabled</text>

    {/* ── BOTTOM: legend  y:660 ── */}
    <rect x="10" y="660" width="940" height="228" rx="8" fill="#f5f5f5" stroke="#bbb" strokeWidth="1" />
    <text x="28" y="696" fontSize="24" fill="#333" fontWeight="bold">Key points:</text>
    <text x="28" y="730" fontSize="22" fill="#555">① UDR forces spoke traffic to the ILB frontend — without it, spokes bypass the NVA entirely</text>
    <text x="28" y="764" fontSize="22" fill="#555">② HA Ports (Protocol: All / Port: 0) matches every TCP, UDP and ICMP flow without per-port rules</text>
    <text x="28" y="798" fontSize="22" fill="#555">③ Floating IP (DSR) — NVA receives the original destination IP so it can route the packet correctly</text>
    <text x="28" y="836" fontSize="19" fill="#888" fontStyle="italic">All three settings are interdependent — removing any one breaks NVA inspection.</text>
  </svg>
);

export const VNetPeeringExhibit = (
  <svg width="440" height="201" viewBox="0 0 440 201" xmlns="http://www.w3.org/2000/svg">
    {/* Table border */}
    <rect x="0" y="0" width="440" height="201" rx="10" fill="#f8fafc" stroke="#d1d5db" strokeWidth="2"/>
    {/* Header row */}
    <rect x="0" y="0" width="440" height="36" fill="#e0e7ef"/>
    <text x="60" y="24" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#1e293b">VNet Name</text>
    <text x="185" y="24" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#1e293b">Address Space</text>
    <text x="345" y="24" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#1e293b">Region</text>
    {/* Row 1 */}
    <rect x="0" y="36" width="440" height="33" fill="#fff"/>
    <text x="60" y="58" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fill="#334155">VNet-A</text>
    <text x="185" y="58" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fill="#334155">12.20.0.0/16</text>
    <text x="345" y="58" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fill="#334155">East US</text>
    {/* Row 2 */}
    <rect x="0" y="69" width="440" height="33" fill="#f1f5f9"/>
    <text x="60" y="91" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fill="#334155">VNet-B</text>
    <text x="185" y="91" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fill="#334155">12.20.32.0/19</text>
    <text x="345" y="91" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fill="#334155">East US</text>
    {/* Row 3 */}
    <rect x="0" y="102" width="440" height="33" fill="#fff"/>
    <text x="60" y="124" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fill="#334155">VNet-C</text>
    <text x="185" y="124" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fill="#334155">12.20.48.0/20</text>
    <text x="345" y="124" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fill="#334155">East US</text>
    {/* Row 4 */}
    <rect x="0" y="135" width="440" height="33" fill="#f1f5f9"/>
    <text x="60" y="157" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fill="#334155">VNet-D</text>
    <text x="185" y="157" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fill="#334155">10.30.0.0/16</text>
    <text x="345" y="157" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fill="#334155">Central US</text>
    {/* Row 5 */}
    <rect x="0" y="168" width="440" height="33" fill="#fff"/>
    <text x="60" y="190" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fill="#334155">VNet-E</text>
    <text x="185" y="190" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fill="#334155">172.16.100.0/24</text>
    <text x="345" y="190" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="12" fill="#334155">UK South</text>
    {/* Column lines */}
    <line x1="120" y1="0" x2="120" y2="201" stroke="#d1d5db" strokeWidth="1"/>
    <line x1="250" y1="0" x2="250" y2="201" stroke="#d1d5db" strokeWidth="1"/>
    {/* Row lines */}
    <line x1="0" y1="36" x2="440" y2="36" stroke="#d1d5db" strokeWidth="1"/>
    <line x1="0" y1="69" x2="440" y2="69" stroke="#d1d5db" strokeWidth="1"/>
    <line x1="0" y1="102" x2="440" y2="102" stroke="#d1d5db" strokeWidth="1"/>
    <line x1="0" y1="135" x2="440" y2="135" stroke="#d1d5db" strokeWidth="1"/>
    <line x1="0" y1="168" x2="440" y2="168" stroke="#d1d5db" strokeWidth="1"/>
  </svg>
);

// ── Cards ─────────────────────────────────────────────────────────────────────

const az700image = [
{
    id: "AZ-700-IMCQ-101",
    exam: "AZ-700",
    type: "image-mcq",
    difficulty: "medium",
    category: "Security & Monitoring",
    diagram: FirewallDnatDiagram,
    imageAlt:
    "Diagram showing inbound internet traffic arriving at Azure Firewall on public IP 20.1.2.3:3389, passing through an unknown rule type, and being forwarded to backend VM 10.0.2.4:3389 in a private subnet with no public IP",
    question:
    "A backend VM in your Azure VNet has no public IP. Administrators must connect to it via RDP (port 3389) using Azure Firewall's public IP. The firewall translates the destination address before forwarding the packet, as shown. Which Azure Firewall rule type enables this — and what does it do?",
    choices: [
    "DNAT rule — maps an inbound public IP:port on the firewall to a backend VM's private IP:port before the packet enters the VNet",
    "Network rule — allows TCP traffic from the internet directly to the VM's private IP on port 3389 without address translation",
    "Application rule — inspects and permits HTTP/S traffic to the VM based on its FQDN and URL path",
    "NAT gateway — translates inbound public traffic to the VM's private IP using an outbound NAT pool",
    ],
    correctAnswer: 0,
    answer:
    "DNAT (Destination Network Address Translation) rule — rewrites the destination IP:port from the firewall's public IP to the VM's private IP before forwarding the packet into the VNet.",
    explanation:
    "Azure Firewall DNAT rules intercept inbound traffic arriving at the firewall's public IP on a specific port and rewrite the destination to a private IP:port before the packet reaches the VNet. This is the only Azure Firewall rule type that performs inbound address translation, making it the correct way to expose a VM without assigning it a public IP. Network rules (option B) control allow/deny by IP and port but perform no translation — the backend would still be unreachable via the firewall's public IP. Application rules (option C) only handle HTTP/S (Layer 7). NAT Gateway (option D) handles outbound SNAT, not inbound DNAT.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/firewall/tutorial-firewall-dnat",
},
{
    id: "AZ-700-IMCQ-102",
    exam: "AZ-700",
    type: "image-mcq",
    difficulty: "extreme",
    category: "Application Delivery Services",
    diagram: LBHaPortsDiagram,
    imageAlt:
      "Diagram showing a Standard Internal Load Balancer with an HA Ports rule (protocol: All, port: 0) distributing all TCP/UDP traffic across two NVA VMs in an NVA subnet. UDRs in the Spoke subnets point 0.0.0.0/0 to the ILB frontend IP. A Floating IP / Direct Server Return label is shown toggled ON.",
    question:
      "The diagram shows a Standard Internal Load Balancer sitting in front of two NVA (Network Virtual Appliance) VMs. Three configuration details are highlighted: the load balancing rule uses Protocol: All and Port: 0, Floating IP is enabled, and UDRs in both spokes point 0.0.0.0/0 at the ILB's frontend IP. Which statement correctly explains why ALL THREE of these settings are required — and what breaks if any one is missing?",
    choices: [
      "HA Ports (All/0) catches every protocol and port so no NVA flow is missed; Floating IP passes the original destination IP to the NVA so it can route correctly; without the UDR the spoke traffic never reaches the ILB frontend — all three are interdependent",
      "HA Ports are only needed when the NVA runs BGP; Floating IP is optional and only improves performance; the UDR can be replaced by enabling 'Allow Gateway Transit' on the VNet peering",
      "Floating IP is required to assign a public IP to each NVA; HA Ports allow the NVA to receive traffic on all ports simultaneously; the UDR prevents Azure's system routes from bypassing the NVA",
      "A Standard Internal Load Balancer with HA Ports automatically injects routes into spoke route tables, so the UDR is redundant; Floating IP is needed only for active-active VPN gateways",
    ],
    correctAnswer: 0,
    answer:
      "All three settings are interdependent: HA Ports (Protocol: All, Port: 0) ensures the ILB load-balances every flow regardless of protocol or port number. Floating IP (Direct Server Return) preserves the original destination IP so the NVA sees the real packet destination and can make routing decisions. The UDR in each spoke subnet is what steers traffic to the ILB frontend in the first place — without it, Azure's system routes send traffic directly and the NVA is bypassed entirely.",
    explanation:
      "This is the standard pattern for NVA high availability in Azure. Breaking it down: (1) HA Ports — a Standard ILB rule with Protocol: All and Port: 0 matches every TCP, UDP, and ICMP flow. Without it you would need a separate rule per port/protocol, and any unmatched flow bypasses the NVA. (2) Floating IP / DSR — normally the ILB rewrites the destination IP to the backend VM's NIC IP. With Floating IP ON, the packet arrives at the NVA with the original destination IP intact, so the NVA's routing table can forward it correctly. Without this the NVA drops the packet (destination mismatch). (3) UDR — VNet routing is not automatic. The spoke subnets must have a User Defined Route for 0.0.0.0/0 (or the specific prefix) with next hop = the ILB frontend private IP. Without the UDR, Azure's default system route sends east-west or internet-bound traffic directly, completely bypassing the NVA cluster. Option B misidentifies when HA Ports are needed. Option C wrongly defines Floating IP as a public IP assignment. Option D is false — ILBs do not inject routes.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-ha-ports-overview",
},
{
    id: "AZ-700-IMCQ-103",
    exam: "AZ-700",
    difficulty: "medium",
    type: "image-mcq",
    category: "Virtual Networking",
    diagram: VNetPeeringExhibit,
    imageAlt: "Diagram showing virtual network address spaces and regions.",
    question_header: `You are designing connectivity between multiple Azure VNets. Review the following table:`,
    choices: [
        "VNet-A, VNet-B and VNet-C",
        "VNet-A and VNet-B",
        "VNet-B and VNet-C",
        "VNet-A and VNet-C",
        "VNet-D and VNet-E"
    ],
    question_footer: 'Which of the following VNets can be successfully peered? (Select one)',
    correctAnswer: 4,
    explanation:
        "To successfully peer VNets, their address spaces must not overlap. VNets A, B and C belong to the supernet 12.20.0.0/16, so they cannot be peered together with VNet-D (10.30.0.0/16) and VNet-E (172.16.100.0/24).",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview"
},
];

export default az700image;