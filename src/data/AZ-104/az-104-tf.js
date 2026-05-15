// AZ-104 — True / False cards
// Cards: AZ-104-003, 004, 005, 006, 007, 008, 009, 010, 011, 013, 015, 017, 024, 025, 026
const az104tf = [
  {
    id: "AZ-104-003",
    type: "truefalse",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Storage",
    question:
      "The Azure Blob Storage Hot tier has a minimum storage duration of 30 days, and deleting data before that period incurs an early deletion penalty.",
    answer: false,
    explanation:
      "The Hot tier has no minimum storage duration and no early deletion penalty — it is the most flexible tier. Cool (30 days), Cold (90 days), and Archive (180 days) all enforce minimum periods with prorated penalties for early deletion.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview",
  },
  {
    id: "AZ-104-004",
    type: "truefalse",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Networking",
    question:
      "An Azure Virtual Network (VNet) allows resources to communicate privately with each other, the internet, and on-premises networks without any additional configuration.",
    answer: false,
    explanation:
      "A VNet provides private communication between resources by default, but internet access for VMs requires a public IP or NAT Gateway, and on-premises connectivity requires a VPN Gateway or ExpressRoute. NSGs and UDRs may also need configuring for secure access.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview",
  },
  {
    id: "AZ-104-005",
    type: "truefalse",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Identity",
    question:
      "Microsoft Entra ID (formerly Azure AD) supports Multi-Factor Authentication (MFA) and Conditional Access policies to protect access to applications.",
    answer: true,
    explanation:
      "Entra ID is Azure's cloud-based identity platform. It natively supports MFA, Conditional Access, and Single Sign-On (SSO). Conditional Access lets you enforce policies such as requiring MFA only when users sign in from outside the corporate network.",
    learnUrl:
      "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks",
  },
  {
    id: "AZ-104-006",
    type: "truefalse",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Compute",
    question:
      "Azure Cosmos DB is a relational database service that supports only the SQL API for querying data.",
    answer: false,
    explanation:
      "Cosmos DB is a fully managed NoSQL database — not relational. It supports multiple APIs including SQL (Core), MongoDB, Cassandra, Gremlin, and Table. This multi-model capability is one of its key differentiators from Azure SQL Database.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/cosmos-db/introduction",
  },
  {
    id: "AZ-104-007",
    type: "truefalse",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Compute",
    question:
      "Azure Functions charges you for compute time even when no code is executing, because a dedicated server is always reserved for your function app.",
    answer: false,
    explanation:
      "Azure Functions on the Consumption plan is serverless — you are billed only for the number of executions and the time your code actually runs. When idle, you pay nothing. A dedicated server is only reserved if you choose the App Service Plan or Premium Plan.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview",
  },
  {
    id: "AZ-104-008",
    type: "truefalse",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Compute",
    question:
      "In Azure Kubernetes Service (AKS), Microsoft manages the Kubernetes control plane, so you are not charged for the control plane nodes.",
    answer: true,
    explanation:
      "AKS is a managed Kubernetes offering — Azure handles the control plane (API server, etcd, scheduler) at no extra cost and performs health monitoring and upgrades. You only pay for the worker (agent) nodes you provision to run your workloads.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/aks/intro-kubernetes",
  },
  {
    id: "AZ-104-009",
    type: "truefalse",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Monitoring",
    question:
      "Azure Key Vault can be integrated with Azure services using Managed Identities, eliminating the need to store credentials or connection strings in application code.",
    answer: true,
    explanation:
      "Managed Identities give Azure resources an Entra ID identity that can be granted access to Key Vault. The application retrieves secrets at runtime without any credentials in code or config files — Azure handles token acquisition and rotation automatically.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/key-vault/general/overview",
  },
  {
    id: "AZ-104-010",
    type: "truefalse",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Monitoring",
    question:
      "Azure Monitor Log Analytics uses KQL (Kusto Query Language) to query log data collected from Azure resources and on-premises environments.",
    answer: true,
    explanation:
      "Log Analytics is the workspace-based log store within Azure Monitor. All log queries are written in KQL, which supports filtering, aggregation, joins, and time-series analysis. Application Insights also uses KQL for querying telemetry.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-overview",
  },
  {
    id: "AZ-104-011",
    type: "truefalse",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Compute",
    question:
      "Azure Container Apps can scale down to zero instances when there is no incoming traffic, meaning you pay nothing during idle periods on the Consumption plan.",
    answer: true,
    explanation:
      "Scale-to-zero is a key feature of Azure Container Apps on the Consumption plan. When no requests or events are being processed, the app scales to zero and incurs no compute cost. This makes it highly cost-effective for bursty or intermittent workloads.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/container-apps/overview",
  },
  {
    id: "AZ-104-013",
    type: "truefalse",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Storage",
    question:
      "A Shared Access Signature (SAS) token grants time-limited, scoped access to Azure Storage resources without exposing the storage account key.",
    answer: true,
    explanation:
      "A SAS token is a URI that encodes specific permissions (read, write, delete), which resources are accessible, and an expiry time. It lets you delegate restricted access to external parties without sharing the account key. User Delegation SAS is the most secure variant — backed by Entra ID credentials rather than the account key.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview",
  },
  {
    id: "AZ-104-015",
    type: "truefalse",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Networking",
    question:
      "Azure Load Balancer operates at Layer 7 of the OSI model, enabling it to route traffic based on HTTP URL paths and host headers.",
    answer: false,
    explanation:
      "Azure Load Balancer operates at Layer 4 (TCP/UDP) — it distributes traffic based on IP address and port only, with no awareness of HTTP content. URL path-based and host header routing require Azure Application Gateway, which operates at Layer 7.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-overview",
  },
  {
    id: "AZ-104-017",
    type: "truefalse",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Identity",
    question:
      "A System-assigned Managed Identity is automatically deleted when the Azure resource it is associated with is deleted.",
    answer: true,
    explanation:
      "System-assigned Managed Identities share the lifecycle of their resource — when the VM, Function App, or other resource is deleted, the identity is deleted too. User-assigned Managed Identities are independent resources that must be manually deleted and can be shared across multiple Azure resources.",
    learnUrl:
      "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview",
  },
  {
    id: "AZ-104-024",
    type: "truefalse",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Identity",
    question:
      "A user assigned the Reader role on a resource group can create new resources inside that resource group.",
    answer: false,
    explanation:
      "Reader is read-only — it grants visibility into resources but no ability to create, modify, or delete anything. You need at least Contributor to create resources.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles",
  },
  {
    id: "AZ-104-025",
    type: "truefalse",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Storage",
    question:
      "Azure Blob Storage in the Archive tier can be read immediately without any rehydration delay.",
    answer: false,
    explanation:
      "Archive tier blobs are stored offline and must be rehydrated to Hot or Cool tier before they can be read. Standard rehydration can take up to 15 hours; high-priority rehydration is faster but costs more.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/storage/blobs/archive-rehydrate-overview",
  },
  {
    id: "AZ-104-026",
    type: "truefalse",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Networking",
    question:
      "Network Security Groups (NSGs) can be associated with both subnets and individual network interfaces (NICs).",
    answer: true,
    explanation:
      "NSGs are flexible — you can attach them at the subnet level (applies to all VMs in the subnet) or at the NIC level (applies to a single VM). When both are present, traffic must pass both sets of rules. This lets you layer security: broad rules at the subnet, specific overrides at the NIC.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview",
  },
];

export default az104tf;
