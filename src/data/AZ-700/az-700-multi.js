// AZ-700 — Multi-select questions
// Cards: AZ-700-M-101, AZ-700-M-102, AZ-700-M-103, AZ-700-M-104

const az700multi = [
  {
    id: "AZ-700-M-101",
    exam: "AZ-700",
    type: "multi",
    difficulty: "medium",
    category: "Virtual Networking",
    question: "Which of the following IP addresses are RFC 1918 private addresses? (Select three)",
    choices: [
      "10.4.20.1",
      "172.20.15.8",
      "192.168.10.50",
      "172.32.10.5",
      "8.8.4.4",
      "104.18.22.45",
      "20.60.128.10",
    ],
    correctAnswers: [
      "10.4.20.1",
      "172.20.15.8",
      "192.168.10.50",
    ],
    answer:
      "The three RFC 1918 private ranges are 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. The other four addresses are publicly routable.",
    explanation:
      "RFC 1918 defines three private address blocks: 10.0.0.0–10.255.255.255 (/8), 172.16.0.0–172.31.255.255 (/12), and 192.168.0.0–192.168.255.255 (/16). A common trap is 172.32.10.5 — it starts with 172 but falls outside the /12 range, which only extends to 172.31.255.255, making it a public address. In Azure VNet design, all three RFC 1918 blocks are valid address spaces; traffic to these ranges is never routed over the internet.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-faq#what-address-ranges-can-i-use-in-my-vnets",
  },
  {
    id: "AZ-700-M-102",
    exam: "AZ-700",
    type: "multi",
    difficulty: "medium",
    category: "Private Access",
    question: "You are configuring Private Endpoint access to an Azure Storage account from a VNet. Which of the following are required for VMs in the VNet to successfully resolve and connect to the storage account over the private endpoint? (Select three)",
    choices: [
      "Create a Private Endpoint NIC in a subnet of the VNet",
      "Create an Azure Private DNS zone for privatelink.blob.core.windows.net and link it to the VNet",
      "Ensure the Private Endpoint connection is in an Approved state",
      "Enable a Service Endpoint for Microsoft.Storage on the subnet",
      "Disable the storage account's public network access before the Private Endpoint can be created",
      "Configure a UDR on the subnet pointing storage traffic to the Private Endpoint's private IP",
      "Deploy an Azure DNS Private Resolver in the VNet",
    ],
    correctAnswers: [
      "Create a Private Endpoint NIC in a subnet of the VNet",
      "Create an Azure Private DNS zone for privatelink.blob.core.windows.net and link it to the VNet",
      "Ensure the Private Endpoint connection is in an Approved state",
    ],
    answer:
      "Three things are required: the Private Endpoint NIC (which assigns a private IP), an approved connection, and a linked Private DNS zone so the storage FQDN resolves to the private IP instead of the public one.",
    explanation:
      "A Private Endpoint works by creating a NIC with a private IP in your VNet and mapping it to the PaaS service via Private Link. The connection must be Approved (either auto-approved via RBAC, or manually approved by the resource owner). Without the Private DNS zone linked to the VNet, the storage FQDN (e.g. mystorageaccount.blob.core.windows.net) resolves to the public IP — VMs would bypass the private endpoint entirely. Service Endpoints are a separate, older mechanism and are not required alongside Private Endpoints. Disabling public access is optional hardening, not a prerequisite. A UDR is unnecessary because DNS resolution to the private IP is what directs traffic — no route override is needed. DNS Private Resolver is only required for on-premises clients that need to resolve private endpoint FQDNs.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview",
  },
  {
    id: "AZ-700-M-103",
    exam: "AZ-700",
    type: "multi",
    difficulty: "medium",
    category: "Private Access",
    question: "Which of the following statements are true of Azure Service Endpoints but NOT of Azure Private Endpoints? (Select three)",
    choices: [
      "The PaaS service retains its public IP — traffic is routed over the Azure backbone but terminates at the public endpoint",
      "No DNS changes are required — the service FQDN continues to resolve to its public IP",
      "Access is granted at the service type level, not a specific resource instance, creating a data exfiltration risk",
      "Assigns a private IP from the VNet address space to a specific PaaS resource instance",
      "Can be accessed from on-premises clients over ExpressRoute without additional DNS configuration",
      "Requires an approval workflow before the connection becomes active",
      "Creates a network interface resource visible in the subnet",
    ],
    correctAnswers: [
      "The PaaS service retains its public IP — traffic is routed over the Azure backbone but terminates at the public endpoint",
      "No DNS changes are required — the service FQDN continues to resolve to its public IP",
      "Access is granted at the service type level, not a specific resource instance, creating a data exfiltration risk",
    ],
    answer:
      "Service Endpoints keep the public IP, require no DNS changes, and grant access to all instances of a service type — unlike Private Endpoints which assign a private IP to one specific resource.",
    explanation:
      "Service Endpoints improve routing (backbone only, no public internet hop) but the destination is still the service's public IP and DNS is unchanged — a key distinction from Private Endpoints. Because a Service Endpoint grants subnet-level access to an entire service type (e.g. all Azure Storage), a compromised VM could exfiltrate data to any storage account, not just the intended one — this is the well-known data exfiltration risk. Private Endpoints address this by scoping access to a single resource instance. The remaining options describe Private Endpoint behaviour: private IPs, NIC resources, approval workflows, and support for on-premises access via ExpressRoute with DNS forwarding.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-service-endpoints-overview",
  },
  {
    id: "AZ-700-M-104",
    exam: "AZ-700",
    type: "multi",
    difficulty: "hard",
    category: "Hybrid Connectivity",
    question:
      "Which two statements about ExpressRoute encryption options are correct?",
    choices: [
      "MACsec is available on any ExpressRoute circuit provisioned through a connectivity provider",
      "MACsec encrypts the Layer 2 link between the customer's edge router and the Microsoft Enterprise Edge (MSEE)",
      "An IPsec VPN tunnel over ExpressRoute private peering provides end-to-end Layer 3 encryption through the Azure backbone",
      "The ExpressRoute Premium add-on enables AES-256 encryption for all private peering traffic by default",
    ],
    correctAnswers: [
      "MACsec encrypts the Layer 2 link between the customer's edge router and the Microsoft Enterprise Edge (MSEE)",
      "An IPsec VPN tunnel over ExpressRoute private peering provides end-to-end Layer 3 encryption through the Azure backbone",
    ],
    answer:
      "MACsec encrypts the physical link between the customer router and the MSEE (ExpressRoute Direct only). IPsec over private peering encrypts end-to-end at Layer 3, regardless of whether the underlying circuit uses MACsec.",
    explanation:
      "MACsec (IEEE 802.1AE) is only configurable on ExpressRoute Direct connections where the customer owns the physical port — connectivity provider circuits do not expose the Layer 2 link, so MACsec is not available on them (eliminates option A). IPsec over private peering runs an encrypted VPN tunnel inside the ExpressRoute circuit, giving Layer 3 encryption that traverses Microsoft's backbone (option C, correct). The Premium add-on unlocks global routing and more BGP routes; it adds no encryption capability (eliminates option D). Both MACsec and IPsec can be used together for layered security: MACsec protects the physical segment, IPsec protects the entire end-to-end path.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/expressroute/expressroute-about-encryption",
  },
];

export default az700multi;
