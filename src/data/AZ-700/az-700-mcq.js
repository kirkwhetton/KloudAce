// AZ-700 — Multiple Choice Questions
// Cards: AZ-700-101, 102, 104, 106, 107, 109, 111, 113, 115, 117, 118, 120, 121, 122, 123

const az700mcq = [
  {
    id: "AZ-700-101",
    exam: "AZ-700",
    type: "mcq",
    difficulty: "medium",
    category: "Application Delivery Services",
    question: "Your company runs a three-tier application in Azure. The database tier must only accept connections from the application tier VMs — never from the internet. You need to distribute SQL traffic across three database VMs with health monitoring. Which Azure load balancing solution is correct?",
    answer:
      "An internal (private) Azure Load Balancer placed in the database subnet. It distributes Layer 4 TCP traffic across the database VMs using a private frontend IP, so it is never reachable from the internet.",
    choices: [
      "An internal Azure Load Balancer with a private frontend IP in the database subnet",
      "A public Azure Load Balancer with an NSG rule blocking inbound internet traffic",
      "Azure Application Gateway in the database subnet with WAF enabled",
      "Azure Traffic Manager with a performance routing profile pointing at the database VMs",
    ],
    correctAnswer: 0,
    explanation:
      "Internal Load Balancer (ILB) uses a private frontend IP that is only reachable within the VNet — perfect for database tiers. A public load balancer exposes a public IP regardless of NSG rules. Application Gateway is Layer 7 (HTTP/S) and unsuitable for SQL. Traffic Manager is DNS-based and cannot distribute connections to backend VMs directly.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-overview",
  },
  {
    id: "AZ-700-102",
    exam: "AZ-700",
    type: "mcq",
    difficulty: "easy",
    category: "Application Delivery Services",
    question: "What is Azure Application Gateway?",
    answer:
      "A Layer 7 (HTTP/HTTPS) load balancer with SSL termination, URL-based routing, and Web Application Firewall (WAF). Ideal for web application traffic management.",
    choices: [
      "A Layer 7 load balancer with SSL termination, URL-based routing, and optional WAF",
      "A Layer 4 TCP/UDP load balancer that distributes traffic across backend VMs",
      "A global DNS-based load balancer that routes users to the closest healthy endpoint",
      "A private network gateway used to connect on-premises networks to Azure VNets",
    ],
    correctAnswer: 0,
    explanation:
      "Application Gateway operates at Layer 7 and understands HTTP — it can route based on URL paths, host headers, and terminate SSL. Option B is Azure Load Balancer (L4). Option C is Azure Traffic Manager. Option D is a VPN/ExpressRoute gateway.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/application-gateway/overview",
  },
  {
    id: "AZ-700-104",
    exam: "AZ-700",
    type: "mcq",
    difficulty: "easy",
    category: "Application Delivery Services",
    question: "What is Azure Front Door?",
    answer:
      "A global Layer 7 load balancer and CDN that accelerates web application delivery using Microsoft's global edge network. Supports URL-based routing, SSL offload, WAF, and caching. Unlike Application Gateway (regional), Front Door operates globally.",
    choices: [
      "A global Layer 7 load balancer and CDN using Microsoft's edge network, with WAF and caching",
      "A regional Layer 4 load balancer for distributing TCP traffic within a single Azure region",
      "A private endpoint service for exposing Azure PaaS services inside a VNet",
      "A DNS service that routes users to the nearest Azure datacenter based on latency",
    ],
    correctAnswer: 0,
    explanation:
      "Front Door is global (not regional) and works at Layer 7, integrating CDN, WAF, and intelligent routing. Option B describes Azure Load Balancer. Option C describes Azure Private Link. Option D partially describes Traffic Manager but that is DNS-only with no Layer 7 capabilities.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/frontdoor/front-door-overview",
  },
  {
    id: "AZ-700-106",
    exam: "AZ-700",
    type: "mcq",
    difficulty: "medium",
    category: "Application Delivery Services",
    question: "A global e-commerce company wants to route users to the nearest healthy regional backend, apply a WAF policy, and cache static assets at the edge — all in a single service. A junior engineer suggests using Azure Traffic Manager. Is this correct, and what should be used instead?",
    answer:
      "No. Traffic Manager is DNS-only and cannot proxy traffic, apply WAF, or cache content. Azure Front Door is the correct choice — it operates as a global Layer 7 reverse proxy with built-in CDN, WAF, and intelligent routing across regions.",
    choices: [
      "No — Traffic Manager is DNS-only; Azure Front Door provides global Layer 7 routing, WAF, and CDN caching",
      "Yes — Traffic Manager supports WAF policies when combined with an Application Gateway backend",
      "No — neither service supports WAF; a separate Azure Firewall Premium instance is required",
      "Yes — Traffic Manager can proxy HTTP traffic and cache responses when performance routing is enabled",
    ],
    correctAnswer: 0,
    explanation:
      "Traffic Manager only influences DNS resolution — the client connects directly to the chosen endpoint and Traffic Manager never touches the HTTP request. Front Door sits in the data path as a reverse proxy, terminates TLS at the edge, can apply WAF rules, and serves cached content from its CDN PoPs. Options B and D are factually wrong about Traffic Manager's capabilities.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/frontdoor/front-door-overview",
  },
  {
    id: "AZ-700-107",
    exam: "AZ-700",
    type: "mcq",
    difficulty: "easy",
    category: "Virtual Networking",
    question: "What is a Network Security Group (NSG)?",
    answer:
      "A set of inbound and outbound security rules that filter network traffic to and from Azure resources. Rules are evaluated by priority (lower number = higher priority). NSGs can be associated with subnets or individual NICs.",
    choices: [
      "A set of inbound/outbound rules that filter traffic by priority, applied to subnets or NICs",
      "A managed firewall service with FQDN filtering, threat intelligence, and centralised policy",
      "A private DNS zone that resolves internal Azure hostnames within a VNet",
      "A service that monitors network traffic and generates flow logs for analysis",
    ],
    correctAnswer: 0,
    explanation:
      "NSGs are basic stateful packet filters using 5-tuple rules (source/dest IP, port, protocol). Option B describes Azure Firewall. Option C describes Azure Private DNS. Option D describes Network Watcher flow logs.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview",
  },
  {
    id: "AZ-700-109",
    exam: "AZ-700",
    type: "mcq",
    difficulty: "medium",
    category: "Virtual Networking",
    question: "Your organisation has three VNets: Hub (10.0.0.0/16), Spoke-A (10.1.0.0/16), and Spoke-B (10.2.0.0/16). Hub is peered with Spoke-A and Hub is peered with Spoke-B. A VM in Spoke-A cannot reach a VM in Spoke-B. An engineer says adding another peering between Spoke-A and Spoke-B is the only fix. Is there an alternative, and what VNet peering property enables it?",
    answer:
      "Yes. On the Hub–Spoke-A and Hub–Spoke-B peerings, enabling 'Allow gateway transit' on the Hub side and 'Use remote gateways' on the Spoke side allows spokes to reach each other via the hub without a direct Spoke-A↔Spoke-B peering. Alternatively, a direct peering between Spoke-A and Spoke-B would also work.",
    choices: [
      "Enable 'Allow gateway transit' on the hub peerings and 'Use remote gateways' on the spoke peerings so traffic routes through the hub",
      "VNet peering is transitive by default — the missing connectivity must be caused by an NSG rule, not a peering issue",
      "Add a UDR in Spoke-A pointing 10.2.0.0/16 to the Azure default internet gateway",
      "Deploy Azure DNS Private Resolver in the hub to forward name resolution between spokes",
    ],
    correctAnswer: 0,
    explanation:
      "VNet peering is non-transitive by default — Spoke-A and Spoke-B cannot reach each other just because both are peered to Hub. The fix is either a direct Spoke-A↔Spoke-B peering, OR placing an NVA/Azure Firewall in the hub with UDRs in each spoke, OR enabling gateway transit so a gateway in the hub forwards traffic. DNS resolution (option D) does not fix routing. Option B is factually wrong — peering is non-transitive.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview",
  },
  {
    id: "AZ-700-111",
    exam: "AZ-700",
    type: "mcq",
    difficulty: "hard",
    category: "Virtual Networking",
    question: "You have a hub VNet containing Azure Firewall and two spoke VNets peered to it. All outbound internet traffic from spokes must be inspected by Azure Firewall. You create a UDR in each spoke with a route for 0.0.0.0/0 pointing to the Azure Firewall private IP. Traffic from Spoke-A still bypasses the firewall and reaches the internet directly. What is the most likely cause?",
    answer:
      "The UDR is applied to the wrong subnet, or BGP route propagation is overriding it. Specifically, if 'Disable BGP route propagation' is not enabled on the route table, a more specific BGP-learned route from the VPN/ExpressRoute gateway can override the 0.0.0.0/0 UDR. Additionally, the UDR must be applied to every subnet in the spoke — not just the VNet level.",
    choices: [
      "BGP route propagation is not disabled on the route table, allowing gateway-learned routes to override the 0.0.0.0/0 UDR",
      "Azure Firewall does not support being used as a next hop in a UDR — an NVA must be used instead",
      "The 0.0.0.0/0 prefix is reserved by Azure and cannot be overridden with a UDR",
      "The peering must have 'Use remote gateways' enabled before UDRs in spoke subnets take effect",
    ],
    correctAnswer: 0,
    explanation:
      "When a VPN or ExpressRoute gateway is present and BGP route propagation is enabled, gateway-learned routes can take precedence over a less-specific UDR. You must enable 'Disable BGP route propagation' on the route table to prevent this. Azure Firewall absolutely can be a UDR next hop (option B is wrong). Option C is wrong — 0.0.0.0/0 can be overridden. Option D conflates gateway transit with UDR behaviour.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview",
  },
  {
    id: "AZ-700-113",
    exam: "AZ-700",
    type: "mcq",
    difficulty: "easy",
    category: "Hybrid Connectivity",
    question: "What is Azure ExpressRoute?",
    answer:
      "A dedicated private connection from on-premises to Azure that does NOT go over the public internet. Provided through a connectivity partner. Offers higher reliability, faster speeds, lower latency, and higher security than VPN Gateway.",
    choices: [
      "A dedicated private connection to Azure via a connectivity partner, bypassing the public internet",
      "An encrypted IPSec tunnel over the public internet connecting on-premises to an Azure VNet",
      "A DNS-based routing service that directs traffic to the nearest Azure region",
      "A managed SD-WAN service that connects Azure VNets to branch offices over MPLS",
    ],
    correctAnswer: 0,
    explanation:
      "ExpressRoute is the key differentiator from VPN Gateway — it never traverses the public internet. Option B describes VPN Gateway. Option C describes Traffic Manager. Option D is closer to Virtual WAN but still incorrect.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction",
  },
  {
    id: "AZ-700-115",
    exam: "AZ-700",
    type: "mcq",
    difficulty: "hard",
    category: "Hybrid Connectivity",
    question: "A large enterprise has 40 branch offices, each connected via Site-to-Site VPN, and 25 Azure VNets that need full mesh connectivity. They currently manage individual VNet peerings and VPN connections manually. Latency between branches routed through on-premises is unacceptable. An architect proposes Azure Virtual WAN Standard tier. Which two capabilities of Virtual WAN Standard directly address these problems — and what does Standard offer that Basic does not?",
    answer:
      "Virtual WAN Standard supports any-to-any connectivity (branch-to-branch, branch-to-VNet, VNet-to-VNet) through the managed hub without manual peering. It also supports ExpressRoute, User VPN (P2S), and inter-hub routing across multiple regions. Basic tier only supports Site-to-Site VPN and does not allow VNet-to-VNet or branch-to-branch transitive routing.",
    choices: [
      "Standard enables any-to-any transitive routing (including VNet-to-VNet and branch-to-branch) and supports ExpressRoute/P2S — Basic only supports S2S VPN without transitive routing",
      "Standard and Basic are functionally identical; the only difference is the SLA percentage offered",
      "Standard adds Azure Firewall Manager integration but does not change the transitive routing behaviour versus Basic",
      "Basic supports full mesh VNet connectivity; Standard adds SD-WAN partner integration as its sole differentiator",
    ],
    correctAnswer: 0,
    explanation:
      "Virtual WAN Basic only supports S2S VPN hub connections and does NOT provide transitive routing between spokes or branches. Standard unlocks: VNet-to-VNet routing through the hub, branch-to-branch routing, ExpressRoute connections, P2S (User VPN), and Azure Firewall Manager for secured hubs. This directly eliminates the manual peering mesh and the hairpin latency through on-premises. Options B, C, and D all misstate the Basic vs Standard distinction.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-wan/virtual-wan-about",
  },
  {
    id: "AZ-700-117",
    exam: "AZ-700",
    type: "mcq",
    difficulty: "easy",
    category: "Private Access",
    question: "What is Azure Private DNS and when would you use it?",
    answer:
      "A private DNS zone linked to one or more VNets that resolves internal hostnames without exposing them to the internet. Used when you need custom DNS names for VMs, Private Endpoints, or internal services — e.g. resolving 'myapp.internal' to a private IP.",
    choices: [
      "A private DNS zone linked to VNets for resolving internal hostnames without internet exposure",
      "A public DNS zone hosted in Azure for resolving internet-facing domain names",
      "A DNS proxy service that forwards all on-premises DNS queries to Azure Resolver",
      "A firewall rule that blocks DNS queries to external resolvers from within a VNet",
    ],
    correctAnswer: 0,
    explanation:
      "Azure Private DNS zones resolve names within VNets privately. They are commonly auto-linked when creating Private Endpoints. Option B describes public Azure DNS. Options C and D describe DNS forwarder/firewall concepts, not Private DNS itself.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/dns/private-dns-overview",
  },
  {
    id: "AZ-700-118",
    exam: "AZ-700",
    type: "mcq",
    difficulty: "easy",
    category: "Security & Monitoring",
    question: "What is Azure Network Watcher?",
    answer:
      "A regional service providing tools to monitor, diagnose, and gain insights into Azure network health. Key tools include: IP Flow Verify (NSG rule testing), Connection Troubleshoot, Packet Capture, NSG Flow Logs, and Topology view.",
    choices: [
      "A regional monitoring service with IP Flow Verify, packet capture, NSG flow logs, and topology view",
      "A global firewall service that inspects and filters all inbound traffic to Azure VNets",
      "A DNS diagnostic tool that traces query resolution paths across Azure regions",
      "A cost management tool that tracks data transfer charges between Azure VNets",
    ],
    correctAnswer: 0,
    explanation:
      "Network Watcher is specifically a network diagnostics and monitoring tool — not a firewall (Option B), DNS tool (Option C), or billing tool (Option D). IP Flow Verify is a common exam topic: it tells you whether a specific NSG rule allows or blocks a flow.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/network-watcher/network-watcher-overview",
  },
  {
    id: "AZ-700-120",
    exam: "AZ-700",
    difficulty: "medium",
    type: "mcq",
    category: "Private Access",
    question: "What is the difference between Azure Service Endpoints and Azure Private Endpoints?",
    answer:
      "Service Endpoints extend your VNet identity to PaaS services over the Azure backbone but the service's public IP is still used — the endpoint is not private. Private Endpoints assign a private IP from your VNet to the service, making it fully private and accessible without any public IP exposure.",
    choices: [
      "Service Endpoints route traffic over the backbone but keep the public IP; Private Endpoints assign a private IP from the VNet — fully private, no public IP",
      "Service Endpoints and Private Endpoints are identical — both assign a private IP from the VNet to the PaaS service",
      "Private Endpoints route traffic over the public internet with TLS; Service Endpoints use a private dedicated circuit",
      "Service Endpoints require a VPN Gateway; Private Endpoints work without any gateway",
    ],
    correctAnswer: 0,
    explanation:
      "Service Endpoints improve routing (traffic stays on the Microsoft backbone) and allow you to restrict PaaS firewall rules to your VNet, but the service still has a public endpoint. Private Endpoints go further — they create a network interface with a private IP inside your VNet, so the service is accessible only via that private IP. DNS must be updated (via Private DNS zones) to resolve the FQDN to the private IP. Private Endpoints are required for strict zero-trust or compliance scenarios.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview",
  },
  {
    id: "AZ-700-121",
    exam: "AZ-700",
    type: "mcq",
    difficulty: "extreme",
    category: "Hybrid Connectivity",
    question: "A global financial firm uses ExpressRoute Global Reach to connect its London and New York on-premises datacenters through Azure. They have a hub VNet in West Europe peered to 12 spoke VNets. The on-premises BGP peer advertises a default route (0.0.0.0/0) into the circuit. After a recent change, spoke VMs can no longer reach the internet, and the London datacenter can no longer reach the New York datacenter through Azure. A UDR with a 0.0.0.0/0 next-hop of 'Internet' exists on all spoke subnets. Identify the TWO root causes and the correct remediation for each.",
    answer:
      "Root cause 1 — The on-premises default route (0.0.0.0/0) advertised over ExpressRoute is being propagated to the hub and, because 'Use Remote Gateway' is enabled on spoke peerings, also into the spoke route tables, overriding the UDR. Fix: Either filter the default route advertisement at the ExpressRoute gateway level using a route filter, or disable BGP route propagation on spoke subnets so the spoke UDR takes precedence. Root cause 2 — Global Reach routes traffic between circuits through the Microsoft backbone, but if both circuits share the same BGP community or the same default route is re-advertised from London into New York's circuit, routing loops or asymmetric paths cause the site-to-site path to fail. Fix: Apply distinct BGP communities to each circuit and use route filtering or MED/AS-PATH prepending to ensure each site only receives the other's specific prefixes.",
    choices: [
      "BGP route propagation on spoke subnets is not disabled, so the on-premises default route overrides spoke UDRs; and the same default route is re-advertised across Global Reach circuits causing a routing loop between sites — fix each with BGP propagation disable and per-circuit route filtering",
      "The UDR next-hop type 'Internet' is invalid on subnets attached to an ExpressRoute-connected hub; replace it with 'VirtualNetworkGateway' — and increase the ExpressRoute circuit bandwidth to fix site-to-site latency",
      "Global Reach requires Standard tier ExpressRoute circuits; downgrading to Local tier is causing both issues — upgrade both circuits to Standard and the routing will self-correct",
      "NSG rules on the hub gateway subnet are blocking BGP (TCP 179) between the on-premises routers and the ExpressRoute gateway, causing both default route propagation and Global Reach failures",
    ],
    correctAnswer: 0,
    explanation:
      "This is a multi-layer BGP/routing problem. Spoke UDRs are meant to force internet traffic out via Azure Firewall or the internet directly, but BGP route propagation from the ExpressRoute gateway silently injects the on-premises default route with a higher effective priority than the UDR — unless propagation is explicitly disabled on the route table. For Global Reach: both circuits peer directly on the Microsoft backbone. If London advertises 0.0.0.0/0 and New York also receives it, return traffic from New York to London may prefer the learned default over the specific prefix, creating a black-hole or loop. Per-circuit route filtering using BGP communities ensures each site only imports specific regional prefixes. Options B, C, and D all misidentify the root causes.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/expressroute/expressroute-global-reach",
  },
  {
    id: "AZ-700-122",
    exam: "AZ-700",
    type: "mcq",
    difficulty: "extreme",
    category: "Virtual Networking",
    question: "You are designing a zero-trust network architecture for a regulated healthcare company. Requirements: (1) All spoke-to-spoke and spoke-to-on-premises traffic must be inspected by Azure Firewall Premium in a dedicated hub VNet. (2) Private Endpoints for Azure SQL and Azure Storage must resolve via custom DNS — not Azure's default DNS. (3) A third-party NVA in a separate 'DMZ' spoke must inspect all inbound internet traffic before it reaches the application spokes. (4) On-premises DNS servers must resolve private endpoint FQDNs. You have a single hub VNet with Azure Firewall Premium. Describe the routing, DNS, and peering configuration required, and identify which requirement cannot be met with basic hub-spoke peering alone.",
    answer:
      "Routing: Enable 'Use Remote Gateway' on all spoke peerings and advertise a 0.0.0.0/0 UDR on each spoke subnet with next-hop = Azure Firewall private IP, forcing all egress through the firewall. For DMZ NVA inspection, chain a UDR on the hub pointing inbound traffic at the NVA before it reaches the firewall — or use Azure Route Server to propagate NVA routes dynamically. DNS: Deploy Azure Private DNS Resolver in the hub. Configure spoke VNets to use the Resolver's inbound endpoint IP as their DNS server. Create a Private DNS Zone for each PaaS service and link it to the hub VNet with auto-registration disabled. Add a conditional forwarder on on-premises DNS servers pointing each privatelink zone at the Resolver's inbound endpoint IP over the ExpressRoute/VPN circuit. The requirement that CANNOT be met with basic hub-spoke peering alone is spoke-to-spoke transitive routing.",
    choices: [
      "UDRs on spoke subnets with next-hop = Azure Firewall handle spoke-to-spoke transit; Azure Private DNS Resolver with hub-linked private zones and on-premises conditional forwarders satisfy DNS; spoke-to-spoke transitive routing cannot be achieved with peering alone without Firewall as transit or Virtual WAN",
      "VNet peering natively supports transitive routing when 'Allow Gateway Transit' is enabled on both sides; no UDRs are needed for spoke-to-spoke traffic, and Azure Private DNS zones automatically resolve on-premises queries without a DNS Resolver",
      "Azure Firewall Premium can act as a DNS proxy for all spokes without deploying Private DNS Resolver; enabling DNS proxy on the firewall is sufficient for on-premises resolution of private endpoint FQDNs across the ExpressRoute circuit",
      "The DMZ NVA and Azure Firewall can both be placed in the hub subnet; traffic will automatically flow through both in sequence based on NSG priority rules without any UDR configuration",
    ],
    correctAnswer: 0,
    explanation:
      "This question requires synthesising four distinct AZ-700 domains: (1) UDR-forced routing through Azure Firewall for spoke-to-spoke transit (peering is non-transitive by design); (2) Azure Private DNS Resolver replaces the legacy 'DNS forwarder VM' pattern; (3) The NVA chaining requires careful UDR sequencing or Azure Route Server; (4) hub-spoke peering alone is non-transitive — without Firewall-as-router (via UDRs) or Virtual WAN, Spoke A and Spoke B are isolated. Option B is wrong — 'Allow Gateway Transit' only controls gateway route propagation, not spoke-to-spoke traffic. Option C is partially true but insufficient. Option D is wrong — NSGs do not sequence NVA and Firewall traffic; UDRs do.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/architecture/reference-architectures/hybrid-networking/hub-spoke",
  },
  {
    id: "AZ-700-123",
    exam: "AZ-700",
    type: "mcq",
    difficulty: "medium",
    category: "Application Delivery Services",
    question: "A company hosts its public web application in East US (primary) and West Europe (secondary). Requirements: all user traffic must go to East US when it is healthy; West Europe should only receive traffic if East US fails its health checks. A network engineer suggests using Traffic Manager with the Performance routing method because West Europe has lower latency for European users. Is this correct, and which routing method should be used?",
    answer:
      "Priority routing is correct: East US is assigned Priority 1 and West Europe Priority 2, so all traffic goes to East US unless it fails health probes.",
    choices: [
      "Priority routing",
      "Performance routing",
      "Weighted routing",
      "Geographic routing",
    ],
    correctAnswer: 0,
    explanation:
      "Priority routing is the correct pattern for active/passive failover: Traffic Manager sends all traffic to the Priority 1 endpoint and only falls back to Priority 2 (or lower) when the higher-priority endpoint fails health probes. Performance routing, routes traffic using a latency table to determine which endpoint is best. Weighted routing with 0% weight still registers the endpoint and can receive traffic during failover — a 0% weighted endpoint is not the same as disabled. Geographic routing is for data residency requirements, not health-based failover.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/traffic-manager/traffic-manager-routing-methods",
  },
];

export default az700mcq;
