// AZ-104 — MCQ cards
// Cards: AZ-104-001, 002, 012, 014, 016, 018, 020
const az104mcq = [
  {
    id: "AZ-104-001",
    type: "mcq",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Compute",
    question: "What is Azure App Service?",
    answer:
      "A fully managed platform for building, deploying, and scaling web apps. Supports .NET, Node.js, Python, Java, and more without managing infrastructure.",
    choices: [
      "A fully managed platform for building, deploying, and scaling web apps without managing the underlying OS",
      "A fully managed platform for deploying web apps that requires configuring the underlying VM OS",
      "A container orchestration service that manages web app deployments using Kubernetes",
      "A serverless compute platform that hosts web apps and scales automatically per request",
    ],
    correctAnswer: 0,
    explanation:
      "App Service is PaaS — you never touch the OS. Option B is wrong because PaaS means you do NOT configure the OS (that's IaaS/VMs). Option C describes AKS. Option D describes Azure Functions, which is event-driven serverless, not a persistent web app host.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/app-service/overview",
  },
  {
    id: "AZ-104-002",
    type: "mcq",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Compute",
    question: "What is the difference between Azure VMs and Azure App Service?",
    answer:
      "Azure VMs (IaaS) give you full OS control and are ideal for custom environments. App Service (PaaS) abstracts the OS and is optimised for web apps with less management overhead.",
    choices: [
      "Azure VMs give full OS-level control (IaaS); App Service abstracts the OS and is optimised for web workloads (PaaS)",
      "Azure VMs and App Service both use PaaS; the difference is that VMs support Linux while App Service supports Windows only",
      "Azure VMs are for containerised workloads; App Service is for serverless event-driven functions",
      "Azure VMs auto-scale without configuration; App Service requires manual scaling rules to be defined",
    ],
    correctAnswer: 0,
    explanation:
      "The IaaS vs PaaS distinction is the core difference. Option B is wrong — both support Linux and Windows, and both are not purely PaaS (VMs are IaaS). Option C confuses VMs with AKS and App Service with Functions. Option D is backwards — App Service has built-in auto-scale; VMs require scale sets to be configured.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-machines/overview",
  },
  {
    id: "AZ-104-012",
    type: "mcq",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Storage",
    question: "What are the Azure Storage redundancy options and what do they protect against?",
    answer:
      "LRS (Locally Redundant Storage) — 3 copies in one datacenter. ZRS (Zone-Redundant) — 3 copies across availability zones. GRS (Geo-Redundant) — LRS + async copy to secondary region. GZRS — ZRS + async copy to secondary region. Each offers increasing durability and higher cost.",
    choices: [
      "LRS (single datacenter), ZRS (across zones), GRS (LRS + secondary region), GZRS (ZRS + secondary region)",
      "LRS (across regions), ZRS (single datacenter), GRS (across availability zones), GZRS (global)",
      "LRS (3 regions), ZRS (2 datacenters), GRS (single zone), GZRS (on-premises backup)",
      "LRS and ZRS are identical; GRS and GZRS are only available for premium storage accounts",
    ],
    correctAnswer: 0,
    explanation:
      "Redundancy builds up in layers: LRS is the cheapest (one datacenter), ZRS adds zone resiliency, GRS adds cross-region, GZRS combines both. Option B reverses the definitions. Option C is entirely wrong. Option D is false — they are distinct tiers.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy",
  },
  {
    id: "AZ-104-014",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question: "What is the difference between an NSG and Azure Firewall?",
    answer:
      "NSGs are free, stateful L3/L4 packet filters (IP/port rules) applied to subnets or NICs. Azure Firewall is a managed, centrally-governed L4/L7 service with FQDN filtering, threat intelligence, and TLS inspection — more powerful but costs more. Both can coexist.",
    choices: [
      "NSGs are L3/L4 subnet/NIC filters (free); Azure Firewall is a managed L7 service with FQDN filtering and threat intelligence",
      "Azure Firewall is free and applied at the NIC level; NSGs are premium and applied at the VNet level",
      "NSGs support FQDN filtering and TLS inspection; Azure Firewall only supports IP/port rules",
      "They are interchangeable — Azure Firewall is just a premium version of NSG with a different name",
    ],
    correctAnswer: 0,
    explanation:
      "NSGs are basic and free — good for simple IP/port filtering. Azure Firewall adds application-layer intelligence, centralised policy, and logging. Options B and C reverse the capabilities. Option D is incorrect — they operate at different layers with different feature sets.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/firewall/overview",
  },
  {
    id: "AZ-104-016",
    type: "mcq",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Identity",
    question: "What is Azure Role-Based Access Control (RBAC) and how is it structured?",
    answer:
      "RBAC controls who can do what on which Azure resources. It uses three elements: Security Principal (user, group, service principal, or managed identity), Role Definition (set of permissions, e.g. Contributor), and Scope (management group, subscription, resource group, or resource). Assignments are inherited downward.",
    choices: [
      "Security Principal (who) + Role Definition (permissions) + Scope (where) — assignments inherit downward",
      "Username + Password + Resource Group — assignments are only applied at the subscription level",
      "Role Definition (who) + Security Principal (permissions) + Subscription (where)",
      "RBAC is only applicable to virtual machines — other resources use Azure Policy for access control",
    ],
    correctAnswer: 0,
    explanation:
      "RBAC is the core access model for Azure. The three elements (principal, role, scope) are a common exam question. Option B describes basic auth, not RBAC. Option C swaps principal and role. Option D is wrong — RBAC applies to all Azure resources.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview",
  },
  {
    id: "AZ-104-018",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Monitoring",
    question: "What is the difference between Azure Monitor Metrics and Azure Monitor Logs?",
    answer:
      "Metrics are lightweight numerical time-series data (CPU%, memory) stored for 93 days, ideal for real-time alerting and dashboards. Logs are structured/unstructured data stored in a Log Analytics workspace, queried with KQL — richer but higher latency. Both feed Azure Alerts.",
    choices: [
      "Metrics are numerical time-series (fast, 93-day retention); Logs are richer structured data in Log Analytics queried with KQL",
      "Metrics are stored in Log Analytics and queried with KQL; Logs are numerical values shown in dashboards",
      "Metrics and Logs are identical — the difference is only in which Azure portal blade you view them",
      "Metrics are only available for VMs; Logs are only available for PaaS services like App Service",
    ],
    correctAnswer: 0,
    explanation:
      "This is a common exam distinction. Metrics = fast, numeric, time-series (think graphs). Logs = rich, queryable, structured (think KQL queries). Option B reverses them. Options C and D are both false.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/azure-monitor/overview",
  },
  {
    id: "AZ-104-020",
    type: "mcq",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Compute",
    question: "What is an Azure Virtual Machine Scale Set (VMSS)?",
    answer:
      "A service that lets you deploy and manage a set of identical, auto-scaling VMs. VMSS automatically increases or decreases the number of VM instances based on demand or a schedule. Integrates with Azure Load Balancer and Application Gateway for traffic distribution.",
    choices: [
      "A set of identical VMs that auto-scales based on demand, integrated with load balancers for traffic distribution",
      "A managed Kubernetes service that schedules containers across a pool of virtual machines",
      "A reserved capacity service that pre-provisions VMs in a specific region for guaranteed availability",
      "A service that creates VM snapshots on a schedule for disaster recovery purposes",
    ],
    correctAnswer: 0,
    explanation:
      "VMSS is the go-to for horizontally scaling identical VM workloads. Option B describes AKS. Option C describes Reserved Instances (a pricing model, not a scaling service). Option D describes Azure Backup or snapshot policies.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/overview",
  },
  {
    id: "AZ-104-029",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Identity",
    question:
      "A colleague asks why Microsoft Entra ID cannot simply join the on-premises AD DS domain. Which statement correctly identifies a fundamental architectural difference between the two?",
    answer:
      "Entra ID uses HTTP/HTTPS with SAML, WS-Federation, and OpenID Connect — not Kerberos or LDAP — and has a flat structure with no OUs or GPOs.",
    choices: [
      "Entra ID uses SAML, WS-Federation, and OpenID Connect for authentication and has a flat structure with no OUs or GPOs",
      "Entra ID is a cloud replica of AD DS that supports the same LDAP queries and Kerberos authentication",
      "Entra ID uses Kerberos for authentication but replaces OUs with Azure Management Groups",
      "Entra ID is equivalent to deploying an AD domain controller on an Azure VM joined to your on-premises domain",
    ],
    correctAnswer: 0,
    explanation:
      "AD DS uses Kerberos for authentication and LDAP for queries, with a hierarchical X.500 structure (OUs, GPOs, DNS-based resource location). Entra ID communicates over HTTP (port 80) and HTTPS (port 443), using SAML, WS-Federation, and OpenID Connect for authentication and OAuth for authorization. Users and groups are flat — no OUs, no GPOs. Deploying an AD DC on an Azure VM is a separate pattern that does not involve Entra ID.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/understand-azure-active-directory/3-compare-azure-active-directory-domain-services",
  },
  {
    id: "AZ-104-030",
    type: "mcq",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Identity",
    question:
      "A developer needs full ability to create and manage all Azure resources in a subscription but must NOT be able to assign roles to other users. Which built-in RBAC role should be assigned?",
    answer:
      "Contributor grants full create/manage permissions across all resource types but cannot create role assignments. Owner has both — which would violate the requirement.",
    choices: [
      "Contributor",
      "Owner",
      "Reader",
      "User Access Administrator",
    ],
    correctAnswer: 0,
    explanation:
      "Contributor can create and manage all Azure resource types but is explicitly blocked from creating or deleting role assignments. Owner adds that right — too permissive here. Reader is view-only. User Access Administrator can manage access but cannot create resources. Contributor is the least-privileged role that satisfies the requirement.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles",
  },
  {
    id: "AZ-104-031",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Identity",
    question:
      "Your security team wants policies that automatically flag users as high-risk after suspicious sign-in activity and require MFA step-up on next login. What is the minimum Entra ID license required?",
    answer:
      "Entra ID P2 is required. Microsoft Entra ID Protection — which enables risk-based user and sign-in policies — is a P2-exclusive feature.",
    choices: [
      "Microsoft Entra ID Free",
      "Microsoft Entra ID P1",
      "Microsoft Entra ID P2",
      "Microsoft 365 Business Basic",
    ],
    correctAnswer: 2,
    explanation:
      "Microsoft Entra ID Protection (user risk policies, sign-in risk policies, risk-based Conditional Access) is exclusive to P2. P1 includes Conditional Access based on device, group, or location — but not the ML-powered risk detection engine. The Free tier has no Conditional Access at all.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/understand-azure-active-directory/5-compare-azure-premium-p1-p2-plans",
  },
  {
    id: "AZ-104-032",
    type: "mcq",
    difficulty: "hard",
    exam: "AZ-104",
    category: "Identity",
    question:
      "Your organization uses hybrid identity — on-premises AD DS synced to Entra ID via Microsoft Entra Connect. A user resets their password using SSPR. What must be configured to also update the password in on-premises AD?",
    answer:
      "Password writeback must be enabled in Microsoft Entra Connect. It requires Entra ID P1 (or P2, or Microsoft 365 Apps for business) and syncs the cloud password change back to on-premises AD.",
    choices: [
      "Enable password writeback in Microsoft Entra Connect — requires Entra ID P1 or higher",
      "No additional configuration needed — SSPR automatically syncs to on-premises AD",
      "Deploy AD FS to bridge the cloud password change back to on-premises",
      "Enable password hash sync — it includes writeback by default",
    ],
    correctAnswer: 0,
    explanation:
      "In a hybrid setup, SSPR changes the password in Entra ID. Without writeback enabled in Entra Connect, the on-premises AD password stays unchanged and the user may still be locked out of domain-joined machines. Password hash sync only copies the hash one-way (AD → Entra ID) and does not enable writeback. AD FS is a federation service — it doesn't provide SSPR writeback.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/allow-users-reset-their-password/2-self-service-password-reset",
  },
  {
    id: "AZ-104-115",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "What is the valid priority range for custom security rules in an Azure Network Security Group?",
    answer:
      "100 to 4096. Lower numbers have higher precedence — a rule with priority 100 is evaluated before a rule with priority 200.",
    choices: [
      "1 to 65535",
      "100 to 4096",
      "100 to 65500",
      "1000 to 65000",
    ],
    correctAnswer: 1,
    explanation:
      "Custom NSG rules must have a priority between 100 and 4096. Azure also creates default rules with fixed priorities of 65000, 65001, and 65500 — these cannot be modified or deleted. To override a default rule, create a custom rule with a lower priority number (e.g., 1000) that matches your traffic and sets the desired action.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/configure-network-security-groups/3-determine-network-security-groups-rules",
  },
  {
    id: "AZ-104-116",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "A default NSG rule is blocking traffic your application requires. What is the correct way to permit the traffic?",
    answer:
      "Create a new custom rule with a lower priority number than the blocking default rule. You cannot delete or modify default rules.",
    choices: [
      "Edit the default rule to change its action from Deny to Allow",
      "Delete the default rule and replace it with an allow rule",
      "Create a new allow rule with a lower priority number than the default blocking rule",
      "Create a new allow rule with a higher priority number than the default blocking rule",
    ],
    correctAnswer: 2,
    explanation:
      "Default NSG rules cannot be deleted or edited. To override one, add a custom rule with a lower priority number (e.g., priority 500 overrides priority 65500). In NSGs, lower numbers mean higher precedence — the rule with the smallest priority number wins when multiple rules match the same traffic.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/configure-network-security-groups/3-determine-network-security-groups-rules",
  },
  {
    id: "AZ-104-117",
    type: "mcq",
    difficulty: "hard",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "A VM has two NSGs: NSG-Subnet (allows inbound port 443) is applied to its subnet, and NSG-NIC (denies inbound port 443) is applied to its NIC. What is the effective result for inbound HTTPS traffic?",
    answer:
      "Traffic is denied. For inbound traffic, Azure evaluates the subnet NSG first, then the NIC NSG. Both must permit the traffic — the subnet NSG allows it, but the NIC NSG denies it.",
    choices: [
      "Allowed — the subnet NSG takes precedence over the NIC NSG for inbound traffic",
      "Denied — for inbound traffic, the NIC NSG is evaluated first and its deny wins",
      "Denied — Azure evaluates subnet NSG first then NIC NSG; both must allow for traffic to pass",
      "Allowed — allow rules always override deny rules when NSGs conflict",
    ],
    correctAnswer: 2,
    explanation:
      "For inbound traffic, Azure first evaluates rules in the NSG associated with the subnet, then rules in the NSG associated with the NIC. If the subnet NSG allows the traffic but the NIC NSG denies it, the traffic is denied. Both NSGs must allow the traffic independently. For outbound traffic the order is reversed: NIC NSG is evaluated first, then the subnet NSG.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/configure-network-security-groups/4-determine-network-security-groups-effective-rules",
  },
  {
    id: "AZ-104-118",
    type: "mcq",
    difficulty: "hard",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "A subnet has three routes for the prefix 10.1.0.0/16: a default system route (VirtualNetwork), a BGP-propagated route (VirtualNetworkGateway), and a user-defined route (VirtualAppliance). Which route does Azure select?",
    answer:
      "The user-defined route. When multiple routes share the same prefix, Azure selects based on type priority: UDR > BGP > System routes.",
    choices: [
      "The system route — default routes have implicit priority",
      "The BGP route — dynamically learned routes take precedence",
      "The user-defined route — UDRs have the highest priority",
      "The route with the lowest next-hop latency is selected at runtime",
    ],
    correctAnswer: 2,
    explanation:
      "When multiple routes have identical address prefixes, Azure applies a fixed priority order: (1) User-defined routes (highest), (2) BGP routes, (3) System routes (lowest). This allows you to override automatic routing by creating UDRs — for example, forcing all traffic through a firewall NVA even when a system or BGP route exists for the same prefix.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/control-network-traffic-flow-with-routes/2-azure-virtual-network-route",
  },
  {
    id: "AZ-104-119",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "What is the default next hop type for the prefix 172.16.0.0/12 in Azure's system routing table?",
    answer:
      "None. Traffic matching RFC 1918 private prefixes (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) is dropped by default unless overridden by a custom route.",
    choices: [
      "Internet — Azure routes all unmatched traffic to the internet by default",
      "VirtualNetwork — Azure assumes all private space belongs to the VNet",
      "None — traffic is dropped",
      "VirtualNetworkGateway — traffic is forwarded to any connected VPN gateway",
    ],
    correctAnswer: 2,
    explanation:
      "Azure system routes set the next hop for 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, and 100.64.0.0/10 to None — meaning packets destined for these RFC 1918 and shared address ranges are dropped rather than sent to the internet. This prevents accidental internet routing of private address traffic. You can override this with a UDR, for example to route VPN or peering traffic to the correct destination.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/control-network-traffic-flow-with-routes/2-azure-virtual-network-route",
  },
  {
    id: "AZ-104-120",
    type: "mcq",
    difficulty: "easy",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "At which OSI model layer does Azure Load Balancer operate?",
    answer:
      "Layer 4 (Transport). Azure Load Balancer distributes traffic based on IP address, port, and protocol — it has no visibility into application-layer content.",
    choices: [
      "Layer 3 — Network",
      "Layer 4 — Transport",
      "Layer 7 — Application",
      "Layer 2 — Data Link",
    ],
    correctAnswer: 1,
    explanation:
      "Azure Load Balancer is a Layer 4 (Transport layer) service that makes routing decisions based on a 5-tuple hash: source IP, source port, destination IP, destination port, and protocol. It cannot inspect HTTP headers, URL paths, or cookies. If you need Layer 7 routing (e.g., path-based or host-based routing), use Azure Application Gateway instead.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/intro-to-azure-load-balancer/3-how-azure-load-balancer-works",
  },
  {
    id: "AZ-104-121",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "An admin needs to route requests for /api/* to a pool of API servers and /static/* to a pool of CDN-origin servers — all behind the same public IP. Which Azure service and feature should they use?",
    answer:
      "Azure Application Gateway with path-based routing. It inspects the URL path and forwards requests to different backend pools based on the path prefix.",
    choices: [
      "Azure Load Balancer with inbound NAT rules",
      "Azure Application Gateway with path-based routing",
      "Azure Load Balancer with multiple frontend IPs",
      "Azure Traffic Manager with performance routing",
    ],
    correctAnswer: 1,
    explanation:
      "Azure Application Gateway operates at Layer 7 and supports path-based routing rules that send requests with different URL paths to different backend pools. Azure Load Balancer operates at Layer 4 and cannot inspect URL paths. Traffic Manager is DNS-based and operates globally — it doesn't route individual HTTP requests. Inbound NAT rules on Load Balancer map specific ports, not URL paths.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/intro-to-azure-application-gateway/3-how-azure-application-gateway-works",
  },
  {
    id: "AZ-104-122",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "An admin suspects an NSG rule is blocking RDP (port 3389, TCP) from IP 203.0.113.5 to VM vm-web01. Which Network Watcher tool directly verifies whether this specific traffic is allowed or denied?",
    answer:
      "IP flow verify. It performs a 5-tuple check (source IP, source port, destination IP, destination port, protocol) against the effective NSG rules and returns whether the traffic is allowed or denied.",
    choices: [
      "Connection Monitor — continuously probes connectivity between two endpoints",
      "Next hop — returns the route table entry used for a given destination",
      "IP flow verify — tests whether a specific traffic flow is allowed or denied by NSG rules",
      "Effective security rules — lists all NSG rules currently applied to a NIC or subnet",
    ],
    correctAnswer: 2,
    explanation:
      "IP flow verify takes a 5-tuple (source IP, source port, destination IP, destination port, protocol) and instantly tells you whether the matching NSG rules allow or deny that specific packet. Effective security rules shows all current rules but requires you to interpret them yourself. Connection Monitor is for continuous monitoring, not one-off verification. Next hop shows routing decisions, not NSG filtering.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/intro-to-azure-network-watcher/3-how-azure-network-watcher-works",
  },
  {
    id: "AZ-104-123",
    type: "mcq",
    difficulty: "hard",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "What HTTP response status code range does an Azure Application Gateway health probe consider as a healthy backend response?",
    answer:
      "200 to 399. Any response in this range marks the backend as healthy. Any other status code causes the probe to fail and the instance is removed from the load-balancing rotation.",
    choices: [
      "Only HTTP 200 OK",
      "200 to 299",
      "200 to 399",
      "100 to 399",
    ],
    correctAnswer: 2,
    explanation:
      "Application Gateway health probes consider a backend healthy if it responds with any HTTP status code between 200 and 399. This includes success codes (2xx) and redirect codes (3xx). Any other status — including 4xx client errors or 5xx server errors — is treated as a probe failure. After enough consecutive failures (configurable unhealthy threshold), the backend is removed from the pool until probes succeed again.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/intro-to-azure-application-gateway/3-how-azure-application-gateway-works",
  },
  {
    id: "AZ-104-124",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "How many VPN gateways can a single Azure virtual network contain?",
    answer:
      "One. A virtual network can have only one VPN gateway. This gateway can be shared with peered virtual networks via gateway transit.",
    choices: [
      "One per region the VNet spans",
      "Two — one active, one standby",
      "One",
      "Unlimited — limited only by subscription quota",
    ],
    correctAnswer: 2,
    explanation:
      "A virtual network can have only one VPN gateway. However, that gateway can be shared across multiple peered virtual networks using gateway transit (AllowGatewayTransit on the hub side, UseRemoteGateways on the spoke side). The VPN gateway itself may be deployed in Active-Active mode with two instances for high availability, but it still counts as a single logical gateway resource per VNet.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/configure-vnet-peering/3-determine-gateway-transit-connectivity",
  },
  {
    id: "AZ-104-138",
    type: "mcq",
    difficulty: "hard",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "A team needs to map the zone apex contoso.com directly to an Azure Load Balancer. The Load Balancer's public IP may change when it is recreated, and the DNS record must automatically track the new IP without manual updates. Which record type meets both requirements?",
    answer:
      "Alias record. It is the only Azure DNS record type that can be placed at the zone apex and automatically follows an Azure resource's IP when it changes.",
    choices: [
      "A record",
      "CNAME record",
      "TXT record",
      "Alias record",
    ],
    correctAnswer: 3,
    explanation:
      "A regular A record can be placed at the zone apex but requires manual updating when the Load Balancer's IP changes — defeating the auto-track requirement. CNAME solves the auto-following problem (it points to another hostname that resolves dynamically) but RFC 1034 prohibits a CNAME at the zone apex alongside the zone's mandatory SOA and NS records. TXT stores text data and is unrelated. The Azure Alias record (a special variant of A/AAAA/CNAME) solves both constraints: it can be placed at the apex AND it targets an Azure resource directly, so Azure's DNS automatically resolves it to the resource's current IP after any redeployment.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/host-domain-azure-dns/5-resolve-name-alias-record",
  },
];

export default az104mcq;
