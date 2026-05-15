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
];

export default az104mcq;
