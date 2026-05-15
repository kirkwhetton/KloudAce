// AZ-700 — True / False
// Cards: AZ-700-103, 105, 108, 110, 112, 114, 116, 119

const az700tf = [
  {
    id: "AZ-700-103",
    exam: "AZ-700",
    difficulty: "easy",
    type: "truefalse",
    category: "Hybrid Connectivity",
    question: "Azure Virtual WAN provides a managed hub that consolidates VPN, ExpressRoute, and inter-VNet routing into a single operational interface.",
    answer: true,
    explanation:
      "Virtual WAN creates a managed hub-and-spoke topology at scale. Instead of manually configuring peering meshes and gateways, Virtual WAN automates connectivity between branches, VNets, VPN sites, and ExpressRoute circuits through a centralised hub — simplifying large enterprise networking.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-wan/virtual-wan-about",
  },
  {
    id: "AZ-700-105",
    exam: "AZ-700",
    difficulty: "easy",
    type: "truefalse",
    category: "Application Delivery Services",
    question: "Azure Traffic Manager proxies user traffic through Microsoft's edge network, allowing it to inspect and cache HTTP responses.",
    answer: false,
    explanation:
      "Traffic Manager is DNS-only — it resolves a DNS query to the best endpoint IP and then steps out of the picture. The actual traffic flows directly between the client and the chosen endpoint; Traffic Manager never sees or touches it. For proxy-based global routing with caching and WAF, Azure Front Door is the correct service.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/traffic-manager/traffic-manager-overview",
  },
  {
    id: "AZ-700-108",
    exam: "AZ-700",
    difficulty: "easy",
    type: "truefalse",
    category: "Virtual Networking",
    question: "Azure Firewall supports FQDN (fully qualified domain name) filtering, allowing you to control outbound traffic based on domain names rather than just IP addresses.",
    answer: true,
    explanation:
      "FQDN filtering is a key differentiator between Azure Firewall and NSGs. Azure Firewall can allow or deny traffic to specific domain names (e.g. *.microsoft.com) — even when the underlying IPs change — using application rules. NSGs only support IP address and port-based rules.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/firewall/overview",
  },
  {
    id: "AZ-700-110",
    exam: "AZ-700",
    difficulty: "easy",
    type: "truefalse",
    category: "Private Access",
    question: "Azure Private Endpoint assigns a private IP address from your VNet to a PaaS service, so traffic to that service never leaves the Microsoft network.",
    answer: true,
    explanation:
      "Private Endpoint brings PaaS services (such as Azure Storage, SQL Database, and Key Vault) into your VNet via a private IP. Traffic travels over the Microsoft backbone rather than the public internet, eliminating the need for service endpoints or public IP exposure. This is essential for meeting strict network isolation requirements.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview",
  },
  {
    id: "AZ-700-112",
    exam: "AZ-700",
    difficulty: "easy",
    type: "truefalse",
    category: "Hybrid Connectivity",
    question: "Azure VPN Gateway encrypts traffic using IPSec/IKE and sends it over the public internet to connect an Azure VNet to an on-premises network.",
    answer: true,
    explanation:
      "VPN Gateway establishes an encrypted IPSec/IKE tunnel over the public internet — this is what distinguishes it from ExpressRoute, which uses a private dedicated circuit that never traverses the public internet. VPN Gateway supports Site-to-Site, Point-to-Site, and VNet-to-VNet connection types.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways",
  },
  {
    id: "AZ-700-114",
    exam: "AZ-700",
    difficulty: "easy",
    type: "truefalse",
    category: "Hybrid Connectivity",
    question: "Azure ExpressRoute provides a higher maximum bandwidth than Azure VPN Gateway and does not traverse the public internet.",
    answer: true,
    explanation:
      "ExpressRoute supports up to 100 Gbps via dedicated private circuits through a connectivity partner — never touching the public internet. VPN Gateway tops out at ~10 Gbps and sends encrypted traffic over the public internet. ExpressRoute also offers higher reliability SLAs but has longer lead times and higher costs.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction",
  },
  {
    id: "AZ-700-116",
    exam: "AZ-700",
    difficulty: "easy",
    type: "truefalse",
    category: "Virtual Networking",
    question: "Azure DNS supports both public DNS zones for internet-facing domains and private DNS zones for internal VNet name resolution.",
    answer: true,
    explanation:
      "Azure DNS can host public zones (resolving your domain name for the internet) and private zones (resolving internal hostnames within linked VNets). Private DNS zones are automatically used by resources in a linked VNet and are never exposed to the internet — commonly used with Private Endpoints.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/dns/dns-overview",
  },
  {
    id: "AZ-700-119",
    exam: "AZ-700",
    difficulty: "easy",
    type: "truefalse",
    category: "Security & Monitoring",
    question: "NSG Flow Logs store traffic data — including source/destination IP, port, protocol, and allow/deny result — in an Azure Storage Account.",
    answer: true,
    explanation:
      "NSG Flow Logs capture 5-tuple information (source IP, destination IP, source port, destination port, protocol) plus whether the traffic was allowed or denied. The logs are written to a Storage Account in JSON format and can be sent to Log Analytics for analysis via Traffic Analytics — giving visibility into network traffic patterns and security threats.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/network-watcher/nsg-flow-logs-overview",
  },
];

export default az700tf;
