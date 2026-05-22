// AZ-104 — Multi-select cards
// Cards: AZ-104-021, 022, 023
const az104multi = [
  {
    id: "AZ-104-021",
    type: "multi",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Identity",
    question:
      "Which of the following are valid methods to assign Azure RBAC roles to users? (Select all that apply)",
    choices: [
      "Directly assign a role to a user account",
      "Assign a role to an Azure AD group, then add users to the group",
      "Assign a role to a managed identity",
      "Assign a role to an Azure subscription tag",
      "Assign a role to a service principal",
    ],
    correctAnswers: [
      "Directly assign a role to a user account",
      "Assign a role to an Azure AD group, then add users to the group",
      "Assign a role to a managed identity",
      "Assign a role to a service principal",
    ],
    answer:
      "RBAC roles can be assigned to users, groups, managed identities, and service principals. Tags are metadata labels — they cannot be security principals.",
    explanation:
      "The four valid security principal types in Azure RBAC are: user, group, managed identity, and service principal. Subscription tags are purely for resource organisation and billing — they play no role in access control.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview",
  },
  {
    id: "AZ-104-022",
    type: "multi",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Storage",
    question:
      "Which Azure Blob Storage access tiers incur an early deletion penalty if data is deleted before the minimum storage period? (Select all that apply)",
    choices: [
      "Hot",
      "Cool (30 days minimum)",
      "Cold (90 days minimum)",
      "Archive (180 days minimum)",
    ],
    correctAnswers: [
      "Cool (30 days minimum)",
      "Cold (90 days minimum)",
      "Archive (180 days minimum)",
    ],
    answer:
      "Cool, Cold, and Archive all have minimum storage periods — deleting early incurs a prorated penalty. Hot has no minimum.",
    explanation:
      "Hot tier is the most flexible — no minimum storage duration and no early deletion fee. Cool (30 days), Cold (90 days), and Archive (180 days) all penalise you if data is deleted, moved, or overwritten before their minimum period expires. This is important to factor in when designing tiering lifecycle policies.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview",
  },
  {
    id: "AZ-104-023",
    type: "multi",
    difficulty: "medium",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "Which of the following are required to establish VNet Peering between two Azure Virtual Networks? (Select all that apply)",
    choices: [
      "Both VNets must be in the same Azure region",
      "The VNet address spaces must not overlap",
      "Peering must be created in both directions (A→B and B→A)",
      "Both VNets must be in the same Azure subscription",
      "A VPN Gateway must be deployed in each VNet",
    ],
    correctAnswers: [
      "The VNet address spaces must not overlap",
      "Peering must be created in both directions (A→B and B→A)",
    ],
    answer:
      "Non-overlapping address spaces and bi-directional peering links are the only hard requirements. VNets can be in different regions, subscriptions, and tenants — no gateway needed.",
    explanation:
      "VNet Peering is flexible: it supports cross-region (Global VNet Peering), cross-subscription, and even cross-tenant peering. The two non-negotiable requirements are: (1) address spaces must not overlap — Azure cannot route between ambiguous IP ranges, and (2) peering is not automatic in both directions — you must explicitly create the link from each side. A VPN Gateway is only needed for VPN-based connectivity, not peering.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview",
  },
  {
    id: "AZ-104-037",
    type: "multi",
    difficulty: "extreme",
    exam: "AZ-104",
    category: "Identity",
    question:
      "Which of the following features are EXCLUSIVE to Microsoft Entra ID P2 and are NOT available in P1? (Select all that apply)",
    choices: [
      "Microsoft Entra ID Protection (user risk and sign-in risk policies)",
      "Privileged Identity Management (PIM)",
      "Self-service password reset with on-premises writeback",
      "Conditional Access based on device, group, or location",
      "Self-service group management",
    ],
    correctAnswers: [
      "Microsoft Entra ID Protection (user risk and sign-in risk policies)",
      "Privileged Identity Management (PIM)",
    ],
    answer:
      "Identity Protection and PIM are P2-only. SSPR writeback, location/group/device-based Conditional Access, and self-service group management are all included in P1.",
    explanation:
      "P2 adds two major capabilities over P1: Identity Protection (ML-based risk detection for users and sign-ins) and Privileged Identity Management (just-in-time privileged access with approval workflows and audit). Password writeback, Conditional Access, and self-service group management are all available at P1.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/understand-azure-active-directory/5-compare-azure-premium-p1-p2-plans",
  },
  {
    id: "AZ-104-038",
    type: "multi",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Identity",
    question:
      "Which of the following are supported authentication methods for Microsoft Entra Self-Service Password Reset (SSPR)? (Select all that apply)",
    choices: [
      "Mobile app notification (Microsoft Authenticator)",
      "Email to an external address",
      "Mobile phone (SMS or automated call)",
      "Security questions",
      "Smart card / PIV certificate",
      "FIDO2 security key",
    ],
    correctAnswers: [
      "Mobile app notification (Microsoft Authenticator)",
      "Email to an external address",
      "Mobile phone (SMS or automated call)",
      "Security questions",
    ],
    answer:
      "SSPR supports six methods: mobile app notification, mobile app code, email, mobile phone, office phone, and security questions. Smart cards and FIDO2 keys are not SSPR reset methods.",
    explanation:
      "The six supported SSPR authentication methods are: (1) Mobile app notification, (2) Mobile app code, (3) Email (external address), (4) Mobile phone (SMS or automated call), (5) Office phone (automated call), (6) Security questions. Smart card/certificates and FIDO2 security keys are supported for sign-in (passwordless) but are not available as SSPR reset methods.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/allow-users-reset-their-password/2-self-service-password-reset",
  },
  {
    id: "AZ-104-129",
    type: "multi",
    difficulty: "hard",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "Which of the following are valid next hop types for a User-Defined Route (UDR) in Azure? (Select all that apply)",
    choices: [
      "VirtualAppliance",
      "VirtualNetworkGateway",
      "Internet",
      "None",
      "VirtualNetwork",
      "VirtualNetworkServiceEndpoint",
    ],
    correctAnswers: [
      "VirtualAppliance",
      "VirtualNetworkGateway",
      "Internet",
      "None",
      "VirtualNetwork",
    ],
    answer:
      "Valid UDR next hop types are: VirtualAppliance, VirtualNetworkGateway, VirtualNetwork, Internet, and None. VirtualNetworkServiceEndpoint is NOT a valid UDR next hop type.",
    explanation:
      "When creating a UDR you can choose from five next hop types: VirtualAppliance (route to a firewall or NVA private IP), VirtualNetworkGateway (route to a VPN or ExpressRoute gateway), VirtualNetwork (override default routing within the VNet), Internet (force traffic to the internet), or None (drop traffic). VirtualNetworkServiceEndpoint is automatically created by Azure when service endpoints are enabled — it is not a type you can specify manually in a UDR.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/control-network-traffic-flow-with-routes/2-azure-virtual-network-route",
  },
  {
    id: "AZ-104-130",
    type: "multi",
    difficulty: "hard",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "Which of the following address prefixes have a default next hop type of None in Azure's system routes? (Select all that apply)",
    choices: [
      "10.0.0.0/8",
      "172.16.0.0/12",
      "192.168.0.0/16",
      "100.64.0.0/10",
      "0.0.0.0/0",
    ],
    correctAnswers: [
      "10.0.0.0/8",
      "172.16.0.0/12",
      "192.168.0.0/16",
      "100.64.0.0/10",
    ],
    answer:
      "The RFC 1918 private ranges (10/8, 172.16/12, 192.168/16) and shared address space (100.64/10) all have a default next hop of None — traffic is dropped. 0.0.0.0/0 routes to the Internet by default.",
    explanation:
      "Azure creates default system routes that send traffic for RFC 1918 private ranges and the 100.64.0.0/10 shared address space to a next hop of None, meaning the traffic is silently dropped. This prevents accidental internet-routing of private-range packets. The only exception is 0.0.0.0/0 (the default route), which points to the Internet — this allows all outbound traffic unless you override it with a UDR (e.g., for forced tunneling through a firewall).",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/control-network-traffic-flow-with-routes/2-azure-virtual-network-route",
  },
  {
    id: "AZ-104-131",
    type: "multi",
    difficulty: "medium",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "Which health probe protocol types does Azure Load Balancer support? (Select all that apply)",
    choices: [
      "TCP",
      "HTTP",
      "HTTPS",
      "ICMP (ping)",
      "UDP",
    ],
    correctAnswers: [
      "TCP",
      "HTTP",
      "HTTPS",
    ],
    answer:
      "Azure Load Balancer supports TCP, HTTP, and HTTPS health probes. ICMP and UDP probes are not supported.",
    explanation:
      "Load Balancer offers three health probe types: TCP (checks if a TCP connection can be established on a specified port), HTTP (sends an HTTP GET and expects a 200 response within the timeout), and HTTPS (same as HTTP but over TLS). ICMP (ping) and UDP probes are not available on Azure Load Balancer. If an instance fails the probe threshold, the load balancer stops sending new connections to it — but existing connections are not terminated.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/intro-to-azure-load-balancer/3-how-azure-load-balancer-works",
  },
  {
    id: "AZ-104-132",
    type: "multi",
    difficulty: "hard",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "Which Azure Network Watcher tools can directly identify whether an NSG rule is responsible for blocking traffic? (Select all that apply)",
    choices: [
      "IP flow verify",
      "Effective security rules",
      "Connection troubleshoot",
      "Packet capture",
      "Topology",
      "Next hop",
    ],
    correctAnswers: [
      "IP flow verify",
      "Effective security rules",
      "Connection troubleshoot",
    ],
    answer:
      "IP flow verify, Effective security rules, and Connection troubleshoot can all identify NSG-related blocking. Packet capture, Topology, and Next hop do not directly surface NSG rule violations.",
    explanation:
      "IP flow verify evaluates a 5-tuple against current NSG rules and immediately reports whether the specific traffic is allowed or denied. Effective security rules shows the consolidated view of all NSG rules applied to a NIC or subnet, letting you identify which rule is matching. Connection troubleshoot sends TCP probes and reports the fault type — one of the possible fault types it returns is NetworkSecurityRule, indicating an NSG is blocking the connection. Packet capture collects raw traffic but does not interpret NSG rules. Topology visualises resource relationships. Next hop returns routing information, not security group filtering.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/intro-to-azure-network-watcher/3-how-azure-network-watcher-works",
  },

  // ── Compute: Virtual Machines & App Service ────────────────────────

  {
    id: "AZ-104-164",
    type: "multi",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Compute",
    question: "Which of the following Azure managed disk types can be used as an OS disk? Select all that apply.",
    choices: [
      "Ultra Disk",
      "Premium SSD v2",
      "Premium SSD",
      "Standard SSD",
      "Standard HDD",
    ],
    correctAnswers: ["Premium SSD", "Standard SSD", "Standard HDD"],
    answer: "Premium SSD, Standard SSD, and Standard HDD can all be used as OS disks. Ultra Disk and Premium SSD v2 are data disks only.",
    explanation:
      "Ultra Disk and Premium SSD v2 are high-performance data disk options only — Azure does not support them as OS disks. Premium SSD is the recommended OS disk for production workloads needing consistent low latency. Standard SSD suits web servers and light enterprise use. Standard HDD is appropriate for dev/test or non-critical systems. Always check this constraint when designing a storage layout: your OS disk tier and your data disk tier can differ.",
    learnUrl: "https://learn.microsoft.com/en-us/training/modules/configure-virtual-machines/4-determine-virtual-machine-storage",
  },
  {
    id: "AZ-104-165",
    type: "multi",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Compute",
    question: "Which of the following statements about Azure Availability Zones are correct? Select all that apply.",
    choices: [
      "Every Azure region supports Availability Zones",
      "Each enabled region has a minimum of three separate availability zones",
      "Each zone has independent power, cooling, and networking",
      "Availability Zones and Availability Sets provide identical protection",
      "Availability Zones protect against the failure of an entire datacenter within a region",
    ],
    correctAnswers: [
      "Each enabled region has a minimum of three separate availability zones",
      "Each zone has independent power, cooling, and networking",
      "Availability Zones protect against the failure of an entire datacenter within a region",
    ],
    answer: "Enabled regions have at least three zones, each with independent power/cooling/networking, protecting against full datacenter failure.",
    explanation:
      "Not every Azure region supports Availability Zones — only designated regions have them, and those regions guarantee at least three physically separate zones. Each zone has its own power, cooling, and network infrastructure, so a failure in one zone does not affect the others. Availability Zones and Availability Sets are different: Zones are physically separate datacenters in a region; Sets are a logical grouping within a single datacenter providing fault and update domain separation. Use Zones for datacenter-level resilience and Sets for rack-level and planned maintenance resilience.",
    learnUrl: "https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-availability/6-review-availability-zones",
  },
  {
    id: "AZ-104-166",
    type: "multi",
    difficulty: "hard",
    exam: "AZ-104",
    category: "Compute",
    question: "Which of the following are valid use cases for multi-container groups in Azure Container Instances? Select all that apply.",
    choices: [
      "Running a web app container alongside a sidecar that pulls updated content from source control",
      "Replacing an Azure Kubernetes Service cluster for large-scale microservice orchestration",
      "Running an application container with a logging sidecar that ships output to long-term storage",
      "Running a monitoring container that periodically probes the application container and raises alerts",
      "Achieving stronger security isolation between workloads than a single VM provides",
    ],
    correctAnswers: [
      "Running a web app container alongside a sidecar that pulls updated content from source control",
      "Running an application container with a logging sidecar that ships output to long-term storage",
      "Running a monitoring container that periodically probes the application container and raises alerts",
    ],
    answer: "Sidecar content updaters, logging sidecars, and monitoring sidecars are the documented multi-container group patterns for ACI.",
    explanation:
      "Multi-container groups are ACI's answer to the sidecar pattern: a primary container and one or more helper containers co-scheduled on the same host, sharing network and storage. Microsoft documents three specific patterns — content updater sidecars, log/metric collection sidecars, and application monitoring sidecars. ACI is not a replacement for AKS for large-scale microservice orchestration; AKS handles that. Containers provide lightweight isolation sharing the host kernel — they do not provide stronger isolation than a VM, which uses a hypervisor to create a hard security boundary.",
    learnUrl: "https://learn.microsoft.com/en-us/training/modules/configure-azure-container-instances/5-implement-container-groups",
  },
];

export default az104multi;
