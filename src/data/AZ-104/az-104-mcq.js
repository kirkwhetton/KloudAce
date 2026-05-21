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

  // ── Case Study 1: Identity & Access — Calder Finance Ltd. ────────────────
  // Cards: AZ-104-139 to AZ-104-143

  {
    id: "AZ-104-139",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Identity",
    caseStudy: "contoso-identity",
    scenario:
`CALDER FINANCE LTD. — Identity & Access Case Study

Company Overview
Calder Finance Ltd. is a UK-based financial services firm with 800 employees across three offices: London HQ (400 staff), Manchester (250 staff), and Edinburgh (150 staff). The company is regulated by the Financial Conduct Authority (FCA), which requires audit logs for all privileged access changes.

Current Environment
• On-premises AD domain: contoso.local — Windows Server 2019 DCs, one per office, replicated across sites
• 800 user accounts, 12 security groups, and 4 service accounts managed in AD
• Licences: Microsoft 365 Business Basic (includes Entra ID Free only — no P1 or P2)
• Office internet egress IPs: London 203.0.113.0/25, Manchester 203.0.113.128/26, Edinburgh 203.0.113.192/26
• Helpdesk handles ~200 password-reset calls per month at an estimated cost of £15 per call
• Six IT administrators share a permanently-active Global Administrator account — no individual accountability

Planned Changes
Azure subscription provisioned with two resource groups: rg-prod (production) and rg-dev (development). A 10-person junior developer team will build and test VMs in rg-dev. Line-of-business apps will migrate to Azure IaaS over the next 12 months.

Technical Requirements
TR1  Hybrid identity — all 800 on-premises AD accounts must authenticate to Azure and Microsoft 365 using existing domain credentials with no second password
TR2  Conditional MFA — MFA must be enforced for every sign-in that originates outside the three office IP ranges; this must apply to all users without per-user configuration changes
TR3  Least privilege — each junior developer may create and manage VMs in rg-dev only; no developer may read or modify any resource in rg-prod
TR4  Self-service passwords — users must reset forgotten passwords via an Entra portal; the new password must immediately work for Windows domain logon without IT intervention; current licences must be upgraded to the minimum tier required
TR5  Privileged access — no administrator may hold standing Global Administrator rights; every elevation request must require peer approval and generate an audit entry meeting FCA requirements

Business Requirements
BR1  Reduce helpdesk password-reset tickets by at least 90% within 60 days of go-live
BR2  Provide the FCA compliance team with a daily report of all privileged role activations`,
    question:
      "To satisfy TR1, Calder Finance's architect must enable hybrid identity so that on-premises AD users can authenticate to Azure and Microsoft 365 using their existing contoso.local credentials. Which service must be installed on a domain-joined Windows Server to provide this synchronisation?",
    answer:
      "Microsoft Entra ID Connect (Azure AD Connect) — installed on a domain-joined Windows Server to sync users, groups, and password hashes from on-premises AD to Entra ID.",
    choices: [
      "Microsoft Entra ID Connect (Azure AD Connect)",
      "Azure Active Directory Domain Services (Azure AD DS)",
      "Microsoft Entra External ID",
      "Microsoft Entra Verified ID",
    ],
    correctAnswer: 0,
    explanation:
      "Microsoft Entra ID Connect (formerly Azure AD Connect) is the on-premises agent that syncs identities from an on-premises AD domain to Entra ID, enabling single sign-on with existing credentials — directly satisfying TR1. Azure AD DS is a managed domain service that runs inside Azure; it does not sync identities out of an on-premises AD and is used for lift-and-shift scenarios requiring Kerberos/LDAP. External ID manages B2B guest and B2C customer identities. Verified ID is a decentralised identity verification service — none of these three sync on-premises AD accounts.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/create-configure-manage-identities/2-configure-azure-active-directory",
  },
  {
    id: "AZ-104-140",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Identity",
    caseStudy: "contoso-identity",
    scenario:
`CALDER FINANCE LTD. — Identity & Access Case Study

Company Overview
Calder Finance Ltd. is a UK-based financial services firm with 800 employees across three offices: London HQ (400 staff), Manchester (250 staff), and Edinburgh (150 staff). The company is regulated by the Financial Conduct Authority (FCA), which requires audit logs for all privileged access changes.

Current Environment
• On-premises AD domain: contoso.local — Windows Server 2019 DCs, one per office, replicated across sites
• 800 user accounts, 12 security groups, and 4 service accounts managed in AD
• Licences: Microsoft 365 Business Basic (includes Entra ID Free only — no P1 or P2)
• Office internet egress IPs: London 203.0.113.0/25, Manchester 203.0.113.128/26, Edinburgh 203.0.113.192/26
• Helpdesk handles ~200 password-reset calls per month at an estimated cost of £15 per call
• Six IT administrators share a permanently-active Global Administrator account — no individual accountability

Planned Changes
Azure subscription provisioned with two resource groups: rg-prod (production) and rg-dev (development). A 10-person junior developer team will build and test VMs in rg-dev. Line-of-business apps will migrate to Azure IaaS over the next 12 months.

Technical Requirements
TR1  Hybrid identity — all 800 on-premises AD accounts must authenticate to Azure and Microsoft 365 using existing domain credentials with no second password
TR2  Conditional MFA — MFA must be enforced for every sign-in that originates outside the three office IP ranges; this must apply to all users without per-user configuration changes
TR3  Least privilege — each junior developer may create and manage VMs in rg-dev only; no developer may read or modify any resource in rg-prod
TR4  Self-service passwords — users must reset forgotten passwords via an Entra portal; the new password must immediately work for Windows domain logon without IT intervention; current licences must be upgraded to the minimum tier required
TR5  Privileged access — no administrator may hold standing Global Administrator rights; every elevation request must require peer approval and generate an audit entry meeting FCA requirements

Business Requirements
BR1  Reduce helpdesk password-reset tickets by at least 90% within 60 days of go-live
BR2  Provide the FCA compliance team with a daily report of all privileged role activations`,
    question:
      "To satisfy TR3, junior developer Priya must be able to create and manage VMs in rg-dev. She must have no visibility or access to rg-prod or any other subscription resource. Which RBAC assignment meets this requirement while adhering to the principle of least privilege?",
    answer:
      "Assign Virtual Machine Contributor at the rg-dev resource group scope — grants VM management rights scoped only to rg-dev with no access to rg-prod.",
    choices: [
      "Assign Owner at the subscription scope",
      "Assign Virtual Machine Contributor at the rg-dev resource group scope",
      "Assign Contributor at the subscription scope",
      "Assign Reader at the subscription scope and Owner at the rg-dev resource group scope",
    ],
    correctAnswer: 1,
    explanation:
      "Virtual Machine Contributor grants exactly the permissions needed to create and manage VMs — including attaching NICs and disks — without exposing storage account keys or network configuration to the assignee. Scoping the assignment to rg-dev means rg-prod is completely outside Priya's access boundary. Option A (Owner at subscription) gives full control over every resource group including rg-prod. Option C (Contributor at subscription) is similarly over-broad. Option D combines subscription-level Reader — which lets Priya enumerate all resources across both resource groups — with rg-dev Owner, which is more permissive than needed for VM management alone.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/configure-role-based-access-control/4-create-role-assignment",
  },
  {
    id: "AZ-104-141",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Identity",
    caseStudy: "contoso-identity",
    scenario:
`CALDER FINANCE LTD. — Identity & Access Case Study

Company Overview
Calder Finance Ltd. is a UK-based financial services firm with 800 employees across three offices: London HQ (400 staff), Manchester (250 staff), and Edinburgh (150 staff). The company is regulated by the Financial Conduct Authority (FCA), which requires audit logs for all privileged access changes.

Current Environment
• On-premises AD domain: contoso.local — Windows Server 2019 DCs, one per office, replicated across sites
• 800 user accounts, 12 security groups, and 4 service accounts managed in AD
• Licences: Microsoft 365 Business Basic (includes Entra ID Free only — no P1 or P2)
• Office internet egress IPs: London 203.0.113.0/25, Manchester 203.0.113.128/26, Edinburgh 203.0.113.192/26
• Helpdesk handles ~200 password-reset calls per month at an estimated cost of £15 per call
• Six IT administrators share a permanently-active Global Administrator account — no individual accountability

Planned Changes
Azure subscription provisioned with two resource groups: rg-prod (production) and rg-dev (development). A 10-person junior developer team will build and test VMs in rg-dev. Line-of-business apps will migrate to Azure IaaS over the next 12 months.

Technical Requirements
TR1  Hybrid identity — all 800 on-premises AD accounts must authenticate to Azure and Microsoft 365 using existing domain credentials with no second password
TR2  Conditional MFA — MFA must be enforced for every sign-in that originates outside the three office IP ranges; this must apply to all users without per-user configuration changes
TR3  Least privilege — each junior developer may create and manage VMs in rg-dev only; no developer may read or modify any resource in rg-prod
TR4  Self-service passwords — users must reset forgotten passwords via an Entra portal; the new password must immediately work for Windows domain logon without IT intervention; current licences must be upgraded to the minimum tier required
TR5  Privileged access — no administrator may hold standing Global Administrator rights; every elevation request must require peer approval and generate an audit entry meeting FCA requirements

Business Requirements
BR1  Reduce helpdesk password-reset tickets by at least 90% within 60 days of go-live
BR2  Provide the FCA compliance team with a daily report of all privileged role activations`,
    question:
      "To satisfy TR2, MFA must be enforced for all 800 users when authenticating from any location outside the three office IP ranges. The solution must not require an administrator to configure MFA individually on each user account. Which Azure feature should the architect configure?",
    answer:
      "Microsoft Entra Conditional Access — define a Named Location for each office IP range, then create a policy that requires MFA when the sign-in location is outside those named locations.",
    choices: [
      "Enable per-user MFA in the Entra ID portal for all 800 accounts",
      "Microsoft Entra Conditional Access with Named Locations for each office IP range",
      "Microsoft Entra Privileged Identity Management (PIM)",
      "Azure Policy with a 'Require MFA' deny effect at the subscription scope",
    ],
    correctAnswer: 1,
    explanation:
      "Conditional Access evaluates sign-in signals — user identity, device compliance, network location, and risk level — and applies controls like MFA based on policy rules. Defining the three office IP ranges as Named Locations and targeting the policy at all users satisfies TR2 with zero per-user configuration. Per-user MFA (option A) requires 800 individual changes and cannot dynamically respond to location — it enforces MFA always or never. PIM governs privileged role activation, not authentication flows. Azure Policy governs the configuration of Azure resources, not user sign-in behaviour.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/create-configure-manage-identities/8-implement-multi-factor-authentication",
  },
  {
    id: "AZ-104-142",
    type: "mcq",
    difficulty: "hard",
    exam: "AZ-104",
    category: "Identity",
    caseStudy: "contoso-identity",
    scenario:
`CALDER FINANCE LTD. — Identity & Access Case Study

Company Overview
Calder Finance Ltd. is a UK-based financial services firm with 800 employees across three offices: London HQ (400 staff), Manchester (250 staff), and Edinburgh (150 staff). The company is regulated by the Financial Conduct Authority (FCA), which requires audit logs for all privileged access changes.

Current Environment
• On-premises AD domain: contoso.local — Windows Server 2019 DCs, one per office, replicated across sites
• 800 user accounts, 12 security groups, and 4 service accounts managed in AD
• Licences: Microsoft 365 Business Basic (includes Entra ID Free only — no P1 or P2)
• Office internet egress IPs: London 203.0.113.0/25, Manchester 203.0.113.128/26, Edinburgh 203.0.113.192/26
• Helpdesk handles ~200 password-reset calls per month at an estimated cost of £15 per call
• Six IT administrators share a permanently-active Global Administrator account — no individual accountability

Planned Changes
Azure subscription provisioned with two resource groups: rg-prod (production) and rg-dev (development). A 10-person junior developer team will build and test VMs in rg-dev. Line-of-business apps will migrate to Azure IaaS over the next 12 months.

Technical Requirements
TR1  Hybrid identity — all 800 on-premises AD accounts must authenticate to Azure and Microsoft 365 using existing domain credentials with no second password
TR2  Conditional MFA — MFA must be enforced for every sign-in that originates outside the three office IP ranges; this must apply to all users without per-user configuration changes
TR3  Least privilege — each junior developer may create and manage VMs in rg-dev only; no developer may read or modify any resource in rg-prod
TR4  Self-service passwords — users must reset forgotten passwords via an Entra portal; the new password must immediately work for Windows domain logon without IT intervention; current licences must be upgraded to the minimum tier required
TR5  Privileged access — no administrator may hold standing Global Administrator rights; every elevation request must require peer approval and generate an audit entry meeting FCA requirements

Business Requirements
BR1  Reduce helpdesk password-reset tickets by at least 90% within 60 days of go-live
BR2  Provide the FCA compliance team with a daily report of all privileged role activations`,
    question:
      "To satisfy TR4 and BR1, Calder Finance must enable SSPR with on-premises password writeback so that a reset in the Entra portal immediately updates contoso.local, allowing the user's Windows domain logon to work straight away. Calder Finance currently holds Microsoft 365 Business Basic licences (Entra ID Free). What is the minimum licence upgrade required to unlock on-premises password writeback?",
    answer:
      "Microsoft Entra ID P1 (or P2) — on-premises password writeback via SSPR requires at minimum an Entra ID P1 licence; it is not available on Entra ID Free.",
    choices: [
      "No upgrade needed — on-premises writeback is included free with Entra ID Connect",
      "Upgrade to Microsoft Entra ID Free tier 2",
      "Upgrade to Microsoft Entra ID P1 or P2",
      "Upgrade to Microsoft 365 E5 — P1 is insufficient for writeback in hybrid environments",
    ],
    correctAnswer: 2,
    explanation:
      "SSPR for cloud-only accounts is available at no extra cost on Entra ID Free. However, password writeback — which pushes the reset back to on-premises AD so that Windows domain logon works — is a premium feature requiring at least Microsoft Entra ID P1. P2 also includes it. There is no 'Entra ID Free tier 2'. Microsoft 365 E5 includes P2, but P1 is sufficient and is the minimum, making E5 an over-purchase. Entra ID Connect itself is free to install; it is the writeback entitlement that requires the licence upgrade.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/allow-users-reset-their-password/3-implement-azure-ad-self-service-password-reset",
  },
  {
    id: "AZ-104-143",
    type: "mcq",
    difficulty: "hard",
    exam: "AZ-104",
    category: "Identity",
    caseStudy: "contoso-identity",
    scenario:
`CALDER FINANCE LTD. — Identity & Access Case Study

Company Overview
Calder Finance Ltd. is a UK-based financial services firm with 800 employees across three offices: London HQ (400 staff), Manchester (250 staff), and Edinburgh (150 staff). The company is regulated by the Financial Conduct Authority (FCA), which requires audit logs for all privileged access changes.

Current Environment
• On-premises AD domain: contoso.local — Windows Server 2019 DCs, one per office, replicated across sites
• 800 user accounts, 12 security groups, and 4 service accounts managed in AD
• Licences: Microsoft 365 Business Basic (includes Entra ID Free only — no P1 or P2)
• Office internet egress IPs: London 203.0.113.0/25, Manchester 203.0.113.128/26, Edinburgh 203.0.113.192/26
• Helpdesk handles ~200 password-reset calls per month at an estimated cost of £15 per call
• Six IT administrators share a permanently-active Global Administrator account — no individual accountability

Planned Changes
Azure subscription provisioned with two resource groups: rg-prod (production) and rg-dev (development). A 10-person junior developer team will build and test VMs in rg-dev. Line-of-business apps will migrate to Azure IaaS over the next 12 months.

Technical Requirements
TR1  Hybrid identity — all 800 on-premises AD accounts must authenticate to Azure and Microsoft 365 using existing domain credentials with no second password
TR2  Conditional MFA — MFA must be enforced for every sign-in that originates outside the three office IP ranges; this must apply to all users without per-user configuration changes
TR3  Least privilege — each junior developer may create and manage VMs in rg-dev only; no developer may read or modify any resource in rg-prod
TR4  Self-service passwords — users must reset forgotten passwords via an Entra portal; the new password must immediately work for Windows domain logon without IT intervention; current licences must be upgraded to the minimum tier required
TR5  Privileged access — no administrator may hold standing Global Administrator rights; every elevation request must require peer approval and generate an audit entry meeting FCA requirements

Business Requirements
BR1  Reduce helpdesk password-reset tickets by at least 90% within 60 days of go-live
BR2  Provide the FCA compliance team with a daily report of all privileged role activations`,
    question:
      "To satisfy TR5 and BR2, Calder Finance must eliminate standing Global Administrator access. Every elevation must be individually requested, approved by a peer, time-limited, and produce a tamper-evident audit record for the FCA compliance team. Which Entra ID feature satisfies all elements of this requirement?",
    answer:
      "Microsoft Entra Privileged Identity Management (PIM) — converts permanent role assignments to eligible assignments with just-in-time activation, configurable approval workflows, and a full audit log.",
    choices: [
      "Microsoft Entra ID Identity Protection with risky sign-in policies",
      "Microsoft Entra Conditional Access with an admin-only named location block",
      "Azure Resource Locks set to ReadOnly on the subscription",
      "Microsoft Entra Privileged Identity Management (PIM)",
    ],
    correctAnswer: 3,
    explanation:
      "PIM replaces permanent role assignments with eligible ones. When an administrator needs elevated access, they submit an activation request; a designated approver (peer) must accept it; access is granted for a configured time window only; and every activation, approval, and expiry is recorded in the PIM audit log — directly meeting both TR5 and the FCA requirement in BR2. Identity Protection detects anomalous sign-in behaviour but cannot require approval for role elevation. Conditional Access can block sign-ins from certain locations but has no concept of role activation workflows. Resource Locks prevent accidental deletion of Azure resources and are entirely unrelated to Entra ID role management.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/create-configure-manage-identities/9-configure-azure-ad-privileged-identity-management",
  },

  // ── Case Study 2: Virtual Networks — Zephyr Commerce ────────────────
  // Cards: AZ-104-144 to AZ-104-148

  {
    id: "AZ-104-144",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Networking",
    caseStudy: "tailspin-vnet",
    scenario:
`ZEPHYR COMMERCE — Virtual Network Case Study

Company Overview
Zephyr Commerce is a UK e-commerce retailer migrating its entire infrastructure to Azure. The company operates a 24/7 online storefront, a B2B partner portal, and internal development environments. Corporate policy mandates that all outbound internet traffic be inspected and logged before leaving Azure.

Current On-Premises Environment
• Single data centre in London: network 192.168.0.0/24
• On-premises edge router public IP: 203.0.113.1 (static, ISP-managed)
• All internet traffic currently breaks out through this single London router

Planned Azure Architecture — East US region
Hub VNet (10.0.0.0/16) — shared services
  Subnets currently provisioned:
    management   10.0.0.0/24
    firewall     10.0.1.0/24  ← Azure Firewall deployed, private IP 10.0.1.4
    app          10.0.2.0/24
  Not yet deployed: Virtual Network Gateway (architect is blocked by a validation error)

Spoke-Dev VNet (10.1.0.0/16) — development
  Subnets: workload-dev 10.1.0.0/24 (10 developer VMs)

Spoke-Prod VNet (10.2.0.0/16) — production
  Subnets: workload-prod 10.2.0.0/24 (web tier), db-prod 10.2.1.0/24 (database tier)

Peering Status
  Hub ↔ Spoke-Dev   Connected  (Allow forwarded traffic: Enabled on both sides)
  Hub ↔ Spoke-Prod  Connected  (Allow forwarded traffic: Enabled on both sides)
  Spoke-Dev ↔ Spoke-Prod  Not created

Technical Requirements
TR1  Firewall inspection — all internet-bound traffic from Spoke-Dev and Spoke-Prod must route through the Hub Azure Firewall (10.0.1.4) for inspection; no spoke VM may reach the internet directly
TR2  Environment isolation — Spoke-Prod VMs must not receive any direct inbound traffic from Spoke-Dev VMs (10.1.0.0/16); cross-environment access must be blocked at the network layer without removing Hub connectivity for either spoke
TR3  On-premises connectivity — the London data centre (192.168.0.0/24) must connect to the Hub over an encrypted IPsec Site-to-Site VPN terminating at a managed Azure VPN Gateway in the Hub
TR4  Shared services access — Spoke-Dev VMs must reach shared services in the Hub (Firewall, DNS) but must not communicate directly with Spoke-Prod

Operational Notes
• No UDRs (User Defined Routes) have been configured on any subnet
• The VPN Gateway deployment is failing — root cause under investigation
• Network Watcher flow logs are reviewed weekly by the security team`,
    question:
      "As part of planning the TR4 shared-services access model, the network team investigates why Spoke-Dev VMs (10.1.0.0/16) cannot reach Spoke-Prod VMs (10.2.0.0/16) despite both peerings showing Connected and no NSGs blocking those address ranges. Understanding this behaviour will inform the routing design. What is the root cause?",
    answer:
      "Azure VNet peering is non-transitive — packets from Spoke-Dev destined for Spoke-Prod are dropped at the Hub because the Hub has no route that forwards traffic between the two spoke peering links.",
    choices: [
      "The address spaces 10.1.0.0/16 and 10.2.0.0/16 overlap, preventing routing between them",
      "VNet peering only supports a single spoke per hub — a second peering overrides the first",
      "Azure VNet peering is non-transitive — traffic between spokes does not flow through the hub automatically without a direct peering or UDR",
      "The peerings must be in the same resource group as the Hub VNet before spoke-to-spoke routing is possible",
    ],
    correctAnswer: 2,
    explanation:
      "VNet peering establishes a direct Layer-3 path between exactly two VNets — it is not transitive. When a Spoke-Dev VM sends a packet to 10.2.x.x, it arrives at the Hub over the Spoke-Dev peering link. The Hub, however, has no matching UDR or system route that forwards this packet onward to Spoke-Prod via the second peering link — so the packet is dropped. To enable spoke-to-spoke communication you either create a direct Spoke-Dev ↔ Spoke-Prod peering, or add UDRs on each spoke pointing inter-spoke traffic at the Hub Firewall (10.0.1.4), which can then forward it. The address spaces are non-overlapping (/16 ranges starting at different octets). Multiple peerings per hub are fully supported.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/configure-vnet-peering/3-determine-gateway-transit-connectivity",
  },
  {
    id: "AZ-104-145",
    type: "mcq",
    difficulty: "hard",
    exam: "AZ-104",
    category: "Networking",
    caseStudy: "tailspin-vnet",
    scenario:
`ZEPHYR COMMERCE — Virtual Network Case Study

Company Overview
Zephyr Commerce is a UK e-commerce retailer migrating its entire infrastructure to Azure. The company operates a 24/7 online storefront, a B2B partner portal, and internal development environments. Corporate policy mandates that all outbound internet traffic be inspected and logged before leaving Azure.

Current On-Premises Environment
• Single data centre in London: network 192.168.0.0/24
• On-premises edge router public IP: 203.0.113.1 (static, ISP-managed)
• All internet traffic currently breaks out through this single London router

Planned Azure Architecture — East US region
Hub VNet (10.0.0.0/16) — shared services
  Subnets currently provisioned:
    management   10.0.0.0/24
    firewall     10.0.1.0/24  ← Azure Firewall deployed, private IP 10.0.1.4
    app          10.0.2.0/24
  Not yet deployed: Virtual Network Gateway (architect is blocked by a validation error)

Spoke-Dev VNet (10.1.0.0/16) — development
  Subnets: workload-dev 10.1.0.0/24 (10 developer VMs)

Spoke-Prod VNet (10.2.0.0/16) — production
  Subnets: workload-prod 10.2.0.0/24 (web tier), db-prod 10.2.1.0/24 (database tier)

Peering Status
  Hub ↔ Spoke-Dev   Connected  (Allow forwarded traffic: Enabled on both sides)
  Hub ↔ Spoke-Prod  Connected  (Allow forwarded traffic: Enabled on both sides)
  Spoke-Dev ↔ Spoke-Prod  Not created

Technical Requirements
TR1  Firewall inspection — all internet-bound traffic from Spoke-Dev and Spoke-Prod must route through the Hub Azure Firewall (10.0.1.4) for inspection; no spoke VM may reach the internet directly
TR2  Environment isolation — Spoke-Prod VMs must not receive any direct inbound traffic from Spoke-Dev VMs (10.1.0.0/16); cross-environment access must be blocked at the network layer without removing Hub connectivity for either spoke
TR3  On-premises connectivity — the London data centre (192.168.0.0/24) must connect to the Hub over an encrypted IPsec Site-to-Site VPN terminating at a managed Azure VPN Gateway in the Hub
TR4  Shared services access — Spoke-Dev VMs must reach shared services in the Hub (Firewall, DNS) but must not communicate directly with Spoke-Prod

Operational Notes
• No UDRs (User Defined Routes) have been configured on any subnet
• The VPN Gateway deployment is failing — root cause under investigation
• Network Watcher flow logs are reviewed weekly by the security team`,
    question:
      "To satisfy TR1, all internet-bound traffic from Spoke-Prod VMs must be redirected through the Azure Firewall at 10.0.1.4 in the Hub. The Hub-to-Spoke-Prod peering already has 'Allow forwarded traffic' enabled on both sides, but Spoke-Prod VMs currently break out to the internet directly. What must be configured to redirect this traffic?",
    answer:
      "Create a route table with a 0.0.0.0/0 route (next-hop type: VirtualAppliance, next-hop IP: 10.0.1.4) and associate that route table with every subnet in Spoke-Prod.",
    choices: [
      "Set a custom DNS server of 10.0.1.4 on the Spoke-Prod VNet configuration page",
      "Add an NSG outbound Deny rule for destination 0.0.0.0/0 on each Spoke-Prod subnet",
      "Create a route table with a 0.0.0.0/0 UDR (next-hop: VirtualAppliance, IP: 10.0.1.4) and associate it with every Spoke-Prod subnet",
      "Enable IP forwarding on each Spoke-Prod VM's NIC and point the default gateway to 10.0.1.4",
    ],
    correctAnswer: 2,
    explanation:
      "A UDR with prefix 0.0.0.0/0 overrides Azure's built-in system route that sends internet traffic directly to the internet. Specifying next-hop type VirtualAppliance and next-hop IP 10.0.1.4 causes the Azure fabric to re-route matching packets to the Firewall for inspection — satisfying TR1. Critically, the route table must be associated with each subnet in Spoke-Prod; creating the table without associating it has no effect. Setting a custom DNS server affects name resolution only, not packet routing. An NSG outbound Deny rule drops the traffic completely rather than redirecting it, breaking internet access. IP forwarding on VM NICs allows a VM to act as a router for traffic passing through it — this does not redirect the VM's own internet-bound traffic.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/control-network-traffic-flow-with-routes/2-azure-virtual-network-route",
  },
  {
    id: "AZ-104-146",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Networking",
    caseStudy: "tailspin-vnet",
    scenario:
`ZEPHYR COMMERCE — Virtual Network Case Study

Company Overview
Zephyr Commerce is a UK e-commerce retailer migrating its entire infrastructure to Azure. The company operates a 24/7 online storefront, a B2B partner portal, and internal development environments. Corporate policy mandates that all outbound internet traffic be inspected and logged before leaving Azure.

Current On-Premises Environment
• Single data centre in London: network 192.168.0.0/24
• On-premises edge router public IP: 203.0.113.1 (static, ISP-managed)
• All internet traffic currently breaks out through this single London router

Planned Azure Architecture — East US region
Hub VNet (10.0.0.0/16) — shared services
  Subnets currently provisioned:
    management   10.0.0.0/24
    firewall     10.0.1.0/24  ← Azure Firewall deployed, private IP 10.0.1.4
    app          10.0.2.0/24
  Not yet deployed: Virtual Network Gateway (architect is blocked by a validation error)

Spoke-Dev VNet (10.1.0.0/16) — development
  Subnets: workload-dev 10.1.0.0/24 (10 developer VMs)

Spoke-Prod VNet (10.2.0.0/16) — production
  Subnets: workload-prod 10.2.0.0/24 (web tier), db-prod 10.2.1.0/24 (database tier)

Peering Status
  Hub ↔ Spoke-Dev   Connected  (Allow forwarded traffic: Enabled on both sides)
  Hub ↔ Spoke-Prod  Connected  (Allow forwarded traffic: Enabled on both sides)
  Spoke-Dev ↔ Spoke-Prod  Not created

Technical Requirements
TR1  Firewall inspection — all internet-bound traffic from Spoke-Dev and Spoke-Prod must route through the Hub Azure Firewall (10.0.1.4) for inspection; no spoke VM may reach the internet directly
TR2  Environment isolation — Spoke-Prod VMs must not receive any direct inbound traffic from Spoke-Dev VMs (10.1.0.0/16); cross-environment access must be blocked at the network layer without removing Hub connectivity for either spoke
TR3  On-premises connectivity — the London data centre (192.168.0.0/24) must connect to the Hub over an encrypted IPsec Site-to-Site VPN terminating at a managed Azure VPN Gateway in the Hub
TR4  Shared services access — Spoke-Dev VMs must reach shared services in the Hub (Firewall, DNS) but must not communicate directly with Spoke-Prod

Operational Notes
• No UDRs (User Defined Routes) have been configured on any subnet
• The VPN Gateway deployment is failing — root cause under investigation
• Network Watcher flow logs are reviewed weekly by the security team`,
    question:
      "To satisfy TR2, Spoke-Prod VMs must not receive direct inbound traffic from Spoke-Dev VMs (10.1.0.0/16). The two spokes are not directly peered. The solution must block Dev-to-Prod traffic at the network layer without disrupting the Hub-to-Spoke-Prod peering or the Spoke-Dev VMs' access to Hub shared services. What is the correct approach?",
    answer:
      "Apply an NSG to the Spoke-Prod subnets containing a Deny inbound rule with source address prefix 10.1.0.0/16, set at a priority higher than any Allow rules for legitimate traffic.",
    choices: [
      "Delete the Hub-to-Spoke-Dev peering to cut all connectivity from Dev VMs to the Hub and Prod",
      "Apply an NSG to the Spoke-Prod subnets with a Deny inbound rule for source CIDR 10.1.0.0/16",
      "Deploy Azure DDoS Protection Standard on the Spoke-Prod VNet to block Dev traffic",
      "Configure Service Endpoints on the Spoke-Prod subnets and restrict access to the production virtual network only",
    ],
    correctAnswer: 1,
    explanation:
      "An NSG Deny rule on the Spoke-Prod subnets targeting source 10.1.0.0/16 blocks inbound packets from any Dev VM at the network layer — directly satisfying TR2. Because the rule is applied only to Spoke-Prod subnets, the Hub-to-Spoke-Dev peering remains intact, preserving TR4 (Dev VMs can still reach Hub shared services). Deleting the Hub-to-Dev peering would also prevent Dev VMs from reaching the Azure Firewall and DNS in the Hub, violating TR4 — it is an unnecessarily destructive change. Azure DDoS Protection Standard defends against volumetric and protocol attacks from the public internet and has no effect on traffic between private VNets. Service Endpoints extend VNet identity to selected Azure PaaS services; they do not block or filter traffic between Azure VMs.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/configure-network-security-groups/3-implement-network-security-groups",
  },
  {
    id: "AZ-104-147",
    type: "mcq",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Networking",
    caseStudy: "tailspin-vnet",
    scenario:
`ZEPHYR COMMERCE — Virtual Network Case Study

Company Overview
Zephyr Commerce is a UK e-commerce retailer migrating its entire infrastructure to Azure. The company operates a 24/7 online storefront, a B2B partner portal, and internal development environments. Corporate policy mandates that all outbound internet traffic be inspected and logged before leaving Azure.

Current On-Premises Environment
• Single data centre in London: network 192.168.0.0/24
• On-premises edge router public IP: 203.0.113.1 (static, ISP-managed)
• All internet traffic currently breaks out through this single London router

Planned Azure Architecture — East US region
Hub VNet (10.0.0.0/16) — shared services
  Subnets currently provisioned:
    management   10.0.0.0/24
    firewall     10.0.1.0/24  ← Azure Firewall deployed, private IP 10.0.1.4
    app          10.0.2.0/24
  Not yet deployed: Virtual Network Gateway (architect is blocked by a validation error)

Spoke-Dev VNet (10.1.0.0/16) — development
  Subnets: workload-dev 10.1.0.0/24 (10 developer VMs)

Spoke-Prod VNet (10.2.0.0/16) — production
  Subnets: workload-prod 10.2.0.0/24 (web tier), db-prod 10.2.1.0/24 (database tier)

Peering Status
  Hub ↔ Spoke-Dev   Connected  (Allow forwarded traffic: Enabled on both sides)
  Hub ↔ Spoke-Prod  Connected  (Allow forwarded traffic: Enabled on both sides)
  Spoke-Dev ↔ Spoke-Prod  Not created

Technical Requirements
TR1  Firewall inspection — all internet-bound traffic from Spoke-Dev and Spoke-Prod must route through the Hub Azure Firewall (10.0.1.4) for inspection; no spoke VM may reach the internet directly
TR2  Environment isolation — Spoke-Prod VMs must not receive any direct inbound traffic from Spoke-Dev VMs (10.1.0.0/16); cross-environment access must be blocked at the network layer without removing Hub connectivity for either spoke
TR3  On-premises connectivity — the London data centre (192.168.0.0/24) must connect to the Hub over an encrypted IPsec Site-to-Site VPN terminating at a managed Azure VPN Gateway in the Hub
TR4  Shared services access — Spoke-Dev VMs must reach shared services in the Hub (Firewall, DNS) but must not communicate directly with Spoke-Prod

Operational Notes
• No UDRs (User Defined Routes) have been configured on any subnet
• The VPN Gateway deployment is failing — root cause under investigation
• Network Watcher flow logs are reviewed weekly by the security team`,
    question:
      "To begin implementing TR3, the architect must configure an Azure resource that tells the VPN Gateway about the on-premises side of the tunnel — specifically Zephyr Commerce's London edge router (public IP 203.0.113.1) and the address space it protects (192.168.0.0/24). Which Azure resource fulfils this role?",
    answer:
      "Local Network Gateway — an Azure resource that stores the on-premises VPN device's public IP and the address prefixes reachable behind it.",
    choices: [
      "Virtual Network Gateway",
      "VPN Connection resource",
      "Local Network Gateway",
      "Network Virtual Appliance (NVA)",
    ],
    correctAnswer: 2,
    explanation:
      "The Local Network Gateway is Azure's representation of the on-premises side of a Site-to-Site VPN. It holds the public IP of the on-premises router (203.0.113.1) and the address prefixes reachable through that router (192.168.0.0/24). The Virtual Network Gateway is the managed Azure-side VPN endpoint deployed inside the Hub VNet — it is the Azure half of the tunnel. The VPN Connection resource links the two gateways together and carries the shared pre-shared key and IPsec/IKE policy; it is created after both gateways exist. An NVA is a third-party VM-based network appliance running inside Azure and is unrelated to representing an on-premises device.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/connect-on-premises-network-with-vpn-gateway/2-connect-on-premises-networks-to-azure-using-site-to-site-vpn-gateways",
  },
  {
    id: "AZ-104-148",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Networking",
    caseStudy: "tailspin-vnet",
    scenario:
`ZEPHYR COMMERCE — Virtual Network Case Study

Company Overview
Zephyr Commerce is a UK e-commerce retailer migrating its entire infrastructure to Azure. The company operates a 24/7 online storefront, a B2B partner portal, and internal development environments. Corporate policy mandates that all outbound internet traffic be inspected and logged before leaving Azure.

Current On-Premises Environment
• Single data centre in London: network 192.168.0.0/24
• On-premises edge router public IP: 203.0.113.1 (static, ISP-managed)
• All internet traffic currently breaks out through this single London router

Planned Azure Architecture — East US region
Hub VNet (10.0.0.0/16) — shared services
  Subnets currently provisioned:
    management   10.0.0.0/24
    firewall     10.0.1.0/24  ← Azure Firewall deployed, private IP 10.0.1.4
    app          10.0.2.0/24
  Not yet deployed: Virtual Network Gateway (architect is blocked by a validation error)

Spoke-Dev VNet (10.1.0.0/16) — development
  Subnets: workload-dev 10.1.0.0/24 (10 developer VMs)

Spoke-Prod VNet (10.2.0.0/16) — production
  Subnets: workload-prod 10.2.0.0/24 (web tier), db-prod 10.2.1.0/24 (database tier)

Peering Status
  Hub ↔ Spoke-Dev   Connected  (Allow forwarded traffic: Enabled on both sides)
  Hub ↔ Spoke-Prod  Connected  (Allow forwarded traffic: Enabled on both sides)
  Spoke-Dev ↔ Spoke-Prod  Not created

Technical Requirements
TR1  Firewall inspection — all internet-bound traffic from Spoke-Dev and Spoke-Prod must route through the Hub Azure Firewall (10.0.1.4) for inspection; no spoke VM may reach the internet directly
TR2  Environment isolation — Spoke-Prod VMs must not receive any direct inbound traffic from Spoke-Dev VMs (10.1.0.0/16); cross-environment access must be blocked at the network layer without removing Hub connectivity for either spoke
TR3  On-premises connectivity — the London data centre (192.168.0.0/24) must connect to the Hub over an encrypted IPsec Site-to-Site VPN terminating at a managed Azure VPN Gateway in the Hub
TR4  Shared services access — Spoke-Dev VMs must reach shared services in the Hub (Firewall, DNS) but must not communicate directly with Spoke-Prod

Operational Notes
• No UDRs (User Defined Routes) have been configured on any subnet
• The VPN Gateway deployment is failing — root cause under investigation
• Network Watcher flow logs are reviewed weekly by the security team`,
    question:
      "To satisfy TR3, the architect attempts to deploy a Virtual Network Gateway into the Hub VNet but Azure immediately rejects the deployment with a validation error. Reviewing the Hub VNet shows three subnets: management (10.0.0.0/24), firewall (10.0.1.0/24), and app (10.0.2.0/24). What is causing the deployment failure?",
    answer:
      "The Hub VNet does not contain a subnet named exactly 'GatewaySubnet' — Azure requires a subnet with this precise name before a Virtual Network Gateway can be deployed into a VNet.",
    choices: [
      "The Hub VNet address space 10.0.0.0/16 is too small to accommodate a Virtual Network Gateway",
      "A Virtual Network Gateway cannot be deployed into a VNet that already has active peering connections",
      "The Hub VNet is missing a subnet named exactly 'GatewaySubnet' — Azure enforces this specific name for VPN Gateway deployments",
      "The firewall subnet (10.0.1.0/24) IP range overlaps with the address space reserved for Virtual Network Gateway internal use",
    ],
    correctAnswer: 2,
    explanation:
      "Azure enforces that a Virtual Network Gateway must reside in a subnet named exactly 'GatewaySubnet' — the name is case-sensitive and cannot be changed to anything else. The Hub VNet's three current subnets (management, firewall, app) do not include one with this name, which is why Azure rejects the deployment immediately. The fix is to add a new subnet named 'GatewaySubnet' — a minimum of /27 (32 addresses) is recommended by Microsoft to allow for future gateway SKU upgrades. A /16 address space is vastly larger than any gateway requires. Active VNet peerings do not prevent gateway deployment. There are no reserved address ranges that conflict with the firewall subnet.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/connect-on-premises-network-with-vpn-gateway/2-connect-on-premises-networks-to-azure-using-site-to-site-vpn-gateways",
  },

  // ── Case Study 3: Storage — Ironbridge Logistics ─────────────────────
  // Cards: AZ-104-149 to AZ-104-153

  {
    id: "AZ-104-149",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Storage",
    caseStudy: "northwind-storage",
    scenario:
`IRONBRIDGE LOGISTICS — Storage Case Study

Company Overview
Ironbridge Logistics is a UK logistics company with 1,200 employees managing 50 depots across England, Scotland, and Wales. They handle shipping manifests, daily CCTV footage from depot cameras, HMRC-regulated financial audit logs, and a large shared operational file store used by 400 HQ office staff.

Current On-Premises Environment
• HQ Windows file server (London): 8 TB of shared operational data; 400 staff mount it as a drive via SMB
• CCTV footage: stored on local NAS at each depot; UK law requires minimum 30-day retention
• Financial audit logs: retained for 7 years per HMRC requirements; written once and accessed only during audits (typically every 3–4 years)
• All data currently archived to LTO tape manually — slow to retrieve and costly to maintain
• No Azure storage deployed — all infrastructure is on-premises

Planned Azure Architecture — UK South region
• Resource group: rg-northwind-storage
• Primary storage account: sa-nwtraders-ops (Standard GPv2, UK South)
  Current replication: LRS — under review
  Containers: invoices, cctv-footage, audit-logs
• Planned Azure file share to replace the HQ file server
• Three depot offices (Manchester, Edinburgh, Cardiff) each run a Windows Server 2022 VM

Technical Requirements
TR1  Zone resilience — all blob data in sa-nwtraders-ops must survive the loss of a single availability zone in UK South; geo-replication must not be enabled
TR2  Automated CCTV lifecycle — footage uploaded daily must automatically move Hot → Cool at 30 days, Cool → Cold at 90 days, and be permanently deleted at 365 days; no manual steps may be required
TR3  Partner invoice access — the accounts payable team at a third-party partner must access invoice PDFs in the invoices container for exactly 48 hours; the storage account access key must never be shared
TR4  File server migration — the HQ Windows file server must be replaced by an Azure file share; 400 on-premises staff must continue to mount it as a drive via SMB with the same UNC path experience; the share must survive a single-zone failure in UK South
TR5  Depot hybrid cache — each of the three depot Windows servers must hold a local hot cache of the Azure file share; any file not accessed within 60 days must automatically tier off the local server to Azure to free local disk space while remaining accessible on demand

Business Requirements
BR1  Minimum-cost archive — financial audit logs must be retained for 7 years at the lowest possible per-GB storage cost; retrieval latency of several hours is acceptable
BR2  Cost reduction — total storage spend must fall by at least 40% versus current tape and NAS capex within 18 months`,
    question:
      "To satisfy TR1, Ironbridge Logistics must change the replication setting on sa-nwtraders-ops so that blob data survives the failure of a single availability zone in UK South. Geo-replication must not be enabled. Which replication option is correct?",
    answer:
      "Zone-Redundant Storage (ZRS) — replicates data synchronously across three availability zones in a single region, surviving a full zone failure with no geo-replication.",
    choices: [
      "Geo-Redundant Storage (GRS)",
      "Zone-Redundant Storage (ZRS)",
      "Read-Access Geo-Redundant Storage (RA-GRS)",
      "Geo-Zone-Redundant Storage (GZRS)",
    ],
    correctAnswer: 1,
    explanation:
      "ZRS synchronously replicates three copies of each object across three separate availability zones within a single region. If one zone suffers an outage, the data remains fully accessible from the other two — satisfying TR1's zone-resilience requirement. GRS and RA-GRS add an asynchronous copy to a paired secondary region, which TR1 explicitly prohibits; additionally, the primary-region copy in GRS uses LRS (single datacenter), so it provides no zone-failure protection on its own. GZRS combines ZRS in the primary region with geo-replication to a secondary — it would satisfy the zone-resilience requirement but violates the 'no geo-replication' constraint in TR1.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/configure-storage-accounts/5-determine-replication-strategy",
  },
  {
    id: "AZ-104-150",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Storage",
    caseStudy: "northwind-storage",
    scenario:
`IRONBRIDGE LOGISTICS — Storage Case Study

Company Overview
Ironbridge Logistics is a UK logistics company with 1,200 employees managing 50 depots across England, Scotland, and Wales. They handle shipping manifests, daily CCTV footage from depot cameras, HMRC-regulated financial audit logs, and a large shared operational file store used by 400 HQ office staff.

Current On-Premises Environment
• HQ Windows file server (London): 8 TB of shared operational data; 400 staff mount it as a drive via SMB
• CCTV footage: stored on local NAS at each depot; UK law requires minimum 30-day retention
• Financial audit logs: retained for 7 years per HMRC requirements; written once and accessed only during audits (typically every 3–4 years)
• All data currently archived to LTO tape manually — slow to retrieve and costly to maintain
• No Azure storage deployed — all infrastructure is on-premises

Planned Azure Architecture — UK South region
• Resource group: rg-northwind-storage
• Primary storage account: sa-nwtraders-ops (Standard GPv2, UK South)
  Current replication: LRS — under review
  Containers: invoices, cctv-footage, audit-logs
• Planned Azure file share to replace the HQ file server
• Three depot offices (Manchester, Edinburgh, Cardiff) each run a Windows Server 2022 VM

Technical Requirements
TR1  Zone resilience — all blob data in sa-nwtraders-ops must survive the loss of a single availability zone in UK South; geo-replication must not be enabled
TR2  Automated CCTV lifecycle — footage uploaded daily must automatically move Hot → Cool at 30 days, Cool → Cold at 90 days, and be permanently deleted at 365 days; no manual steps may be required
TR3  Partner invoice access — the accounts payable team at a third-party partner must access invoice PDFs in the invoices container for exactly 48 hours; the storage account access key must never be shared
TR4  File server migration — the HQ Windows file server must be replaced by an Azure file share; 400 on-premises staff must continue to mount it as a drive via SMB with the same UNC path experience; the share must survive a single-zone failure in UK South
TR5  Depot hybrid cache — each of the three depot Windows servers must hold a local hot cache of the Azure file share; any file not accessed within 60 days must automatically tier off the local server to Azure to free local disk space while remaining accessible on demand

Business Requirements
BR1  Minimum-cost archive — financial audit logs must be retained for 7 years at the lowest possible per-GB storage cost; retrieval latency of several hours is acceptable
BR2  Cost reduction — total storage spend must fall by at least 40% versus current tape and NAS capex within 18 months`,
    question:
      "To satisfy TR2 and BR2, CCTV footage in the cctv-footage container must automatically transition through access tiers and be deleted on schedule with no manual intervention. Which Azure feature implements this rule-based tiering and deletion?",
    answer:
      "Azure Blob Storage lifecycle management policy — a JSON rule set that evaluates conditions (e.g. lastModified > 30 days) and applies tier transitions or deletion actions automatically.",
    choices: [
      "Azure Backup policy with custom retention rules applied to the storage account",
      "Azure Blob Storage lifecycle management policy with if-then transition and delete rules",
      "An Azure Policy definition with a 'modify' effect targeting blob access tiers",
      "Storage account replication rules configured with automatic tier transition schedules",
    ],
    correctAnswer: 1,
    explanation:
      "Blob lifecycle management policies are rule-based JSON definitions applied at the storage account level. Each rule has an if section (conditions such as 'last modified more than 30 days ago') and a then section (actions such as 'tierToCool', 'tierToCold', or 'delete'). Azure evaluates these rules continuously against every blob — no manual steps are required, satisfying TR2. Azure Backup handles VM disks and database backups; it cannot perform blob tier transitions or automated deletions based on age. Azure Policy governs resource configuration compliance (e.g. enforcing minimum replication tiers) — it has no data-plane lifecycle capability. Storage account replication settings control data durability across zones and regions; they have nothing to do with access tier management.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/configure-blob-storage/5-create-blob-lifecycle-management-policy",
  },
  {
    id: "AZ-104-151",
    type: "mcq",
    difficulty: "hard",
    exam: "AZ-104",
    category: "Storage",
    caseStudy: "northwind-storage",
    scenario:
`IRONBRIDGE LOGISTICS — Storage Case Study

Company Overview
Ironbridge Logistics is a UK logistics company with 1,200 employees managing 50 depots across England, Scotland, and Wales. They handle shipping manifests, daily CCTV footage from depot cameras, HMRC-regulated financial audit logs, and a large shared operational file store used by 400 HQ office staff.

Current On-Premises Environment
• HQ Windows file server (London): 8 TB of shared operational data; 400 staff mount it as a drive via SMB
• CCTV footage: stored on local NAS at each depot; UK law requires minimum 30-day retention
• Financial audit logs: retained for 7 years per HMRC requirements; written once and accessed only during audits (typically every 3–4 years)
• All data currently archived to LTO tape manually — slow to retrieve and costly to maintain
• No Azure storage deployed — all infrastructure is on-premises

Planned Azure Architecture — UK South region
• Resource group: rg-northwind-storage
• Primary storage account: sa-nwtraders-ops (Standard GPv2, UK South)
  Current replication: LRS — under review
  Containers: invoices, cctv-footage, audit-logs
• Planned Azure file share to replace the HQ file server
• Three depot offices (Manchester, Edinburgh, Cardiff) each run a Windows Server 2022 VM

Technical Requirements
TR1  Zone resilience — all blob data in sa-nwtraders-ops must survive the loss of a single availability zone in UK South; geo-replication must not be enabled
TR2  Automated CCTV lifecycle — footage uploaded daily must automatically move Hot → Cool at 30 days, Cool → Cold at 90 days, and be permanently deleted at 365 days; no manual steps may be required
TR3  Partner invoice access — the accounts payable team at a third-party partner must access invoice PDFs in the invoices container for exactly 48 hours; the storage account access key must never be shared
TR4  File server migration — the HQ Windows file server must be replaced by an Azure file share; 400 on-premises staff must continue to mount it as a drive via SMB with the same UNC path experience; the share must survive a single-zone failure in UK South
TR5  Depot hybrid cache — each of the three depot Windows servers must hold a local hot cache of the Azure file share; any file not accessed within 60 days must automatically tier off the local server to Azure to free local disk space while remaining accessible on demand

Business Requirements
BR1  Minimum-cost archive — financial audit logs must be retained for 7 years at the lowest possible per-GB storage cost; retrieval latency of several hours is acceptable
BR2  Cost reduction — total storage spend must fall by at least 40% versus current tape and NAS capex within 18 months`,
    question:
      "To satisfy BR1, financial audit logs must be stored in the audit-logs container for 7 years at the lowest possible cost. The logs are written once and read only during an HMRC audit, which occurs at most once every 3–4 years. Retrieval latency of several hours is acceptable. Which blob access tier is correct, and what is the key operational trade-off the team must understand?",
    answer:
      "Archive tier — lowest per-GB storage cost of any blob tier, but blobs are stored offline and must be rehydrated (up to 15 hours on standard priority) before they can be read.",
    choices: [
      "Cool tier — lower cost than Hot, instant retrieval, ideal for data accessed infrequently but within days",
      "Cold tier — lower cost than Cool with a 90-day minimum duration, suitable for rarely accessed data",
      "Archive tier — lowest storage cost of all tiers, but blobs are offline and require rehydration of up to 15 hours before they can be read",
      "Hot tier — highest cost but zero retrieval latency, essential for compliance data that may need urgent access",
    ],
    correctAnswer: 2,
    explanation:
      "The Archive tier has the lowest per-GB storage price of any Azure Blob tier, making it the correct choice for write-once data held for 7 years and accessed only during infrequent audits — directly satisfying BR1. The critical trade-off is that archived blobs are stored offline; they cannot be read directly. To access a blob, it must first be rehydrated by either copying it to the Hot or Cool tier or by changing its tier in-place — standard priority rehydration takes up to 15 hours, while high priority takes approximately 1 hour for objects under 10 GB. A 180-day minimum storage duration applies; early deletion incurs a prorated charge. Cool (30-day minimum) and Cold (90-day minimum) have meaningfully lower per-GB prices than Hot but are still significantly more expensive than Archive over a 7-year horizon. Hot tier maximises access speed at the highest cost — entirely unsuitable for data accessed once every several years.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/configure-blob-storage/3-create-blob-access-tiers",
  },
  {
    id: "AZ-104-152",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Storage",
    caseStudy: "northwind-storage",
    scenario:
`IRONBRIDGE LOGISTICS — Storage Case Study

Company Overview
Ironbridge Logistics is a UK logistics company with 1,200 employees managing 50 depots across England, Scotland, and Wales. They handle shipping manifests, daily CCTV footage from depot cameras, HMRC-regulated financial audit logs, and a large shared operational file store used by 400 HQ office staff.

Current On-Premises Environment
• HQ Windows file server (London): 8 TB of shared operational data; 400 staff mount it as a drive via SMB
• CCTV footage: stored on local NAS at each depot; UK law requires minimum 30-day retention
• Financial audit logs: retained for 7 years per HMRC requirements; written once and accessed only during audits (typically every 3–4 years)
• All data currently archived to LTO tape manually — slow to retrieve and costly to maintain
• No Azure storage deployed — all infrastructure is on-premises

Planned Azure Architecture — UK South region
• Resource group: rg-northwind-storage
• Primary storage account: sa-nwtraders-ops (Standard GPv2, UK South)
  Current replication: LRS — under review
  Containers: invoices, cctv-footage, audit-logs
• Planned Azure file share to replace the HQ file server
• Three depot offices (Manchester, Edinburgh, Cardiff) each run a Windows Server 2022 VM

Technical Requirements
TR1  Zone resilience — all blob data in sa-nwtraders-ops must survive the loss of a single availability zone in UK South; geo-replication must not be enabled
TR2  Automated CCTV lifecycle — footage uploaded daily must automatically move Hot → Cool at 30 days, Cool → Cold at 90 days, and be permanently deleted at 365 days; no manual steps may be required
TR3  Partner invoice access — the accounts payable team at a third-party partner must access invoice PDFs in the invoices container for exactly 48 hours; the storage account access key must never be shared
TR4  File server migration — the HQ Windows file server must be replaced by an Azure file share; 400 on-premises staff must continue to mount it as a drive via SMB with the same UNC path experience; the share must survive a single-zone failure in UK South
TR5  Depot hybrid cache — each of the three depot Windows servers must hold a local hot cache of the Azure file share; any file not accessed within 60 days must automatically tier off the local server to Azure to free local disk space while remaining accessible on demand

Business Requirements
BR1  Minimum-cost archive — financial audit logs must be retained for 7 years at the lowest possible per-GB storage cost; retrieval latency of several hours is acceptable
BR2  Cost reduction — total storage spend must fall by at least 40% versus current tape and NAS capex within 18 months`,
    question:
      "To satisfy TR3, a third-party accounts payable team needs read access to invoice PDFs in the invoices container for exactly 48 hours. The storage account access key must not be shared. Which solution correctly meets both constraints?",
    answer:
      "Generate a Service SAS token scoped to the invoices container with Read permission and a 48-hour expiry — access is automatically revoked when the token expires and the account key is never exposed.",
    choices: [
      "Create a guest user in Entra ID for the partner and assign the Storage Blob Data Reader role scoped to the invoices container",
      "Enable anonymous public read access on the invoices container, then disable it after 48 hours",
      "Generate a Service SAS token scoped to the invoices container with Read permission and a 48-hour expiry window",
      "Share the storage account access key with the partner and ask them to delete it after 48 hours",
    ],
    correctAnswer: 2,
    explanation:
      "A Service SAS generates a signed URI that delegates read access to a specific container for a precisely defined time window. After 48 hours the token expires and access is automatically revoked — the storage account key is never transmitted. This satisfies both constraints in TR3. Creating an Entra ID guest user requires the partner organisation to have Entra ID, requires the B2B invitation to be accepted, and the role assignment does not expire automatically without additional Entra ID Governance configuration — it is more complex than needed for a one-off time-limited window. Enabling anonymous public access makes the container readable by anyone on the internet without credentials — this is a significant security exposure far beyond TR3's intent, and disabling it after 48 hours is a manual step that can be forgotten. Sharing the storage account access key grants full control over the entire storage account (not just the invoices container), directly violates TR3's key-sharing constraint, and relies on the partner to delete it responsibly.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/configure-storage-security/4-create-shared-access-signatures",
  },
  {
    id: "AZ-104-153",
    type: "mcq",
    difficulty: "hard",
    exam: "AZ-104",
    category: "Storage",
    caseStudy: "northwind-storage",
    scenario:
`IRONBRIDGE LOGISTICS — Storage Case Study

Company Overview
Ironbridge Logistics is a UK logistics company with 1,200 employees managing 50 depots across England, Scotland, and Wales. They handle shipping manifests, daily CCTV footage from depot cameras, HMRC-regulated financial audit logs, and a large shared operational file store used by 400 HQ office staff.

Current On-Premises Environment
• HQ Windows file server (London): 8 TB of shared operational data; 400 staff mount it as a drive via SMB
• CCTV footage: stored on local NAS at each depot; UK law requires minimum 30-day retention
• Financial audit logs: retained for 7 years per HMRC requirements; written once and accessed only during audits (typically every 3–4 years)
• All data currently archived to LTO tape manually — slow to retrieve and costly to maintain
• No Azure storage deployed — all infrastructure is on-premises

Planned Azure Architecture — UK South region
• Resource group: rg-northwind-storage
• Primary storage account: sa-nwtraders-ops (Standard GPv2, UK South)
  Current replication: LRS — under review
  Containers: invoices, cctv-footage, audit-logs
• Planned Azure file share to replace the HQ file server
• Three depot offices (Manchester, Edinburgh, Cardiff) each run a Windows Server 2022 VM

Technical Requirements
TR1  Zone resilience — all blob data in sa-nwtraders-ops must survive the loss of a single availability zone in UK South; geo-replication must not be enabled
TR2  Automated CCTV lifecycle — footage uploaded daily must automatically move Hot → Cool at 30 days, Cool → Cold at 90 days, and be permanently deleted at 365 days; no manual steps may be required
TR3  Partner invoice access — the accounts payable team at a third-party partner must access invoice PDFs in the invoices container for exactly 48 hours; the storage account access key must never be shared
TR4  File server migration — the HQ Windows file server must be replaced by an Azure file share; 400 on-premises staff must continue to mount it as a drive via SMB with the same UNC path experience; the share must survive a single-zone failure in UK South
TR5  Depot hybrid cache — each of the three depot Windows servers must hold a local hot cache of the Azure file share; any file not accessed within 60 days must automatically tier off the local server to Azure to free local disk space while remaining accessible on demand

Business Requirements
BR1  Minimum-cost archive — financial audit logs must be retained for 7 years at the lowest possible per-GB storage cost; retrieval latency of several hours is acceptable
BR2  Cost reduction — total storage spend must fall by at least 40% versus current tape and NAS capex within 18 months`,
    question:
      "To satisfy TR5, each of the three depot Windows servers must cache a local copy of the Azure file share and automatically release files unused for 60 days to Azure, freeing local disk space while keeping those files accessible on demand. Which service and configuration achieves this?",
    answer:
      "Deploy Azure File Sync on each depot server, register each server with a Storage Sync Service, join them to a sync group pointing at the Azure file share, and enable cloud tiering with a date-based policy of 60 days.",
    choices: [
      "Configure Azure CDN with the Azure file share as the origin and set the cache TTL to 60 days on each depot server",
      "Deploy Azure File Sync on each depot server with cloud tiering enabled and a 60-day date-based tiering policy",
      "Schedule a daily Azure CLI script on each depot server to move files older than 60 days to the Azure file share",
      "Mount the Azure file share directly on each depot server via SMB and configure a local LRU disk cache with a 60-day eviction policy",
    ],
    correctAnswer: 1,
    explanation:
      "Azure File Sync installs a lightweight Windows agent on each server and registers it with a Storage Sync Service resource. A sync group maps a local NTFS path (the cache) to a cloud endpoint (the Azure file share). With cloud tiering enabled and a date policy set to 60 days, any file not accessed within that window is replaced on local disk with a tiny reparse point — the file's content lives only in Azure Files, but opening the file triggers a transparent on-demand recall. This exactly satisfies TR5's local cache and automatic 60-day tiering requirements without any manual scripting. Azure CDN is an HTTP/HTTPS content delivery network for web assets; it cannot mount SMB file shares or perform file-level tiering. A scheduled CLI script could move files but would require manual maintenance, does not support transparent on-demand recall, and would break the UNC path experience for depot users. Directly mounting the Azure file share provides access but no local caching — every file read goes across the WAN to Azure, introducing latency and WAN dependency that defeats the purpose of TR5.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/configure-azure-files-file-sync/5-azure-file-sync",
  },

  // ── Compute: Virtual Machines ──────────────────────────────────────

  {
    id: "AZ-104-154",
    type: "mcq",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Compute",
    question: "An administrator is designing a VM naming convention that must work for both Windows and Linux VMs. What are the maximum name lengths for each OS type?",
    answer: "Windows VMs: 15 characters (NetBIOS limit). Linux VMs: 64 characters.",
    choices: [
      "Windows: 15 characters; Linux: 64 characters",
      "Windows: 64 characters; Linux: 15 characters",
      "Both Windows and Linux: 15 characters",
      "Both Windows and Linux: 64 characters",
    ],
    correctAnswer: 0,
    explanation:
      "Windows VMs are subject to the NetBIOS 15-character name constraint. Linux VMs allow up to 64 characters. This distinction is critical when designing a naming convention — a scheme like 'prod-eus-webserver-01' works on Linux but exceeds the Windows limit. Plan your naming convention around the 15-character Windows ceiling if the estate includes both OS types.",
    learnUrl: "https://learn.microsoft.com/en-us/training/modules/configure-virtual-machines/2-review-cloud-services-responsibilities",
  },
  {
    id: "AZ-104-155",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Compute",
    question: "A database team wants to attach an Azure Ultra Disk to a VM running SAP HANA to achieve the highest possible IOPS. Which statement about Ultra Disk is correct?",
    answer: "Ultra Disk supports up to 160,000 IOPS and 4,000 MB/s throughput but cannot be used as an OS disk — it is a data disk only.",
    choices: [
      "Ultra Disk supports up to 160,000 IOPS and can be used as either an OS disk or a data disk",
      "Ultra Disk supports up to 20,000 IOPS and can be used as an OS disk on Linux VMs only",
      "Ultra Disk supports up to 160,000 IOPS but cannot be used as an OS disk — it is a data disk only",
      "Ultra Disk supports up to 80,000 IOPS and requires a Premium storage account",
    ],
    correctAnswer: 2,
    explanation:
      "Ultra Disk is Azure's highest-performance disk option — up to 160,000 IOPS and 4,000 MB/s throughput — designed for top-tier workloads like SAP HANA and latency-sensitive databases. The key exam constraint: Ultra Disk and Premium SSD v2 cannot serve as OS disks. Only Premium SSD, Standard SSD, and Standard HDD support the OS disk role. If Ultra Disk is required, the OS must reside on a separate Premium SSD.",
    learnUrl: "https://learn.microsoft.com/en-us/training/modules/configure-virtual-machines/4-determine-virtual-machine-storage",
  },
  {
    id: "AZ-104-156",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Compute",
    question: "A team wants to use Azure App Service deployment slots to validate changes in a staging environment before swapping to production. Which pricing tiers support deployment slots?",
    answer: "Standard, Premium, and Isolated v2 tiers — Free, Shared, and Basic do not support deployment slots.",
    choices: [
      "Free, Basic, and Standard tiers",
      "Basic, Standard, and Premium tiers",
      "Standard, Premium, and Isolated v2 tiers",
      "All App Service tiers include at least one deployment slot",
    ],
    correctAnswer: 2,
    explanation:
      "Deployment slots are a feature of the Standard, Premium, and Isolated v2 tiers only. Free, Shared, and Basic tiers do not support them. The number of slots scales with tier — Standard allows up to 5, Premium and Isolated v2 allow up to 20. If a team on a Basic plan tries to create a staging slot, the option is simply not available in the portal.",
    learnUrl: "https://learn.microsoft.com/en-us/training/modules/configure-azure-app-service/6-create-deployment-slots",
  },
  {
    id: "AZ-104-157",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Compute",
    question: "An administrator configures automated backups for an Azure App Service web app. The app has 7 GB of files and connects to an Azure SQL Database. The storage account used for backups has a firewall rule enabled that blocks all public access. What will happen when the backup runs?",
    answer: "The backup will fail — App Service cannot write to a storage account that has a firewall enabled blocking public access.",
    choices: [
      "The backup succeeds because App Service uses a managed identity to bypass storage firewalls",
      "The backup succeeds for app files only; the database is excluded automatically when the firewall blocks access",
      "The backup fails because a storage account with a firewall enabled cannot be used as an App Service backup destination",
      "The backup fails because the combined 7 GB app and database content exceeds the 5 GB backup limit",
    ],
    correctAnswer: 2,
    explanation:
      "Azure App Service backup has two key constraints tested on the exam. First, the total backup size limit is 10 GB (app content plus connected databases combined) — 7 GB is within limits. Second, if the destination storage account has a firewall enabled that blocks public network access, App Service cannot write the backup and the job fails. The fix is to either disable the storage firewall or use a storage account without firewall restrictions. App Service does not automatically bypass storage firewalls via managed identity in this scenario.",
    learnUrl: "https://learn.microsoft.com/en-us/training/modules/configure-azure-app-service/8-back-up-app-service",
  },
  {
    id: "AZ-104-158",
    type: "mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Compute",
    question: "A developer is designing a containerised workload to run on Azure Container Instances (ACI). They need to allocate exactly 2 vCPUs and 8 GB of memory to the container. Which statement about ACI resource configuration is correct?",
    answer: "ACI supports custom CPU (0.1–4 vCPU) and memory (0.1–16 GB) per container; values are fixed for the container's lifetime and cannot be changed without recreating it.",
    choices: [
      "ACI allocates resources automatically and does not support custom CPU or memory values",
      "ACI supports up to 2 vCPUs and 8 GB memory per container; higher values require Azure Kubernetes Service",
      "ACI supports 0.1–4 vCPUs and 0.1–16 GB memory per container; these values are fixed for the container's lifetime",
      "ACI supports up to 8 vCPUs and 32 GB memory per container and resources can be adjusted while the container is running",
    ],
    correctAnswer: 2,
    explanation:
      "Azure Container Instances allows custom resource allocation between 0.1 and 4 vCPUs, and 0.1 and 16 GB of memory per container. The requested 2 vCPUs and 8 GB are within range. The critical constraint is that these values are immutable for the container's lifetime — to change them, the container must be deleted and recreated. For multi-container groups, Azure sums all container requests to determine total resource allocation on the host.",
    learnUrl: "https://learn.microsoft.com/en-us/training/modules/configure-azure-container-instances/2-container-instances",
  },
  {
    id: "AZ-104-159",
    type: "mcq",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Compute",
    question: "A company runs stable production VMs that will be needed for the next three years. They want to maximise cost savings on compute. Which purchasing model provides the greatest discount compared to pay-as-you-go?",
    answer: "Azure Reserved VM Instances with a 1-year or 3-year commitment — savings of up to 72% versus pay-as-you-go.",
    choices: [
      "Pay-as-you-go with auto-shutdown schedules during off-hours",
      "Azure Spot VMs with eviction handling configured",
      "Azure Reserved VM Instances (1-year or 3-year commitment) — up to 72% savings",
      "Azure Hybrid Benefit using existing on-premises Windows Server licences",
    ],
    correctAnswer: 2,
    explanation:
      "Azure Reserved VM Instances offer up to 72% savings over pay-as-you-go in exchange for a 1-year or 3-year commitment. For stable, predictable production workloads running continuously, Reserved Instances are the correct cost-optimisation choice. Auto-shutdown reduces cost by eliminating idle compute but cannot match the Reserved Instance discount for always-on workloads. Spot VMs offer steep discounts but can be evicted at any time — they are unsuitable for production. Azure Hybrid Benefit reduces licensing costs by reusing existing Windows Server or SQL Server licences but does not alone provide 72% savings.",
    learnUrl: "https://learn.microsoft.com/en-us/training/modules/configure-virtual-machines/6-determine-virtual-machine-pricing",
  },
];

export default az104mcq;
