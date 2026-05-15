// AZ-900 — Flashcards
// Cards: AZ-900-102, 104–106, 108–109, 111–114, 116–118, 120

const az900flashcard = [
  {
    id: "AZ-900-102",
    difficulty: "easy",
    exam: "AZ-900",
    type: "flashcard",
    category: "Cloud Concepts",
    question: "What is the difference between CapEx and OpEx in cloud computing?",
    answer:
      "CapEx (Capital Expenditure) is upfront spending on physical infrastructure you own. OpEx (Operational Expenditure) is pay-as-you-go spending. Cloud shifts IT costs from CapEx to OpEx — you pay only for what you use with no large upfront investment.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/well-architected/cost-optimization/cost-model",
  },
  {
    id: "AZ-900-104",
    difficulty: "easy",
    exam: "AZ-900",
    type: "flashcard",
    category: "Cloud Concepts",
    question: "What does 'high availability' mean in Azure?",
    answer:
      "The ability of a system to remain operational and accessible for a high percentage of time, minimising downtime. Azure expresses this as an SLA percentage (e.g. 99.9% = ~8.7 hours downtime/year, 99.99% = ~52 minutes/year).",
    learnUrl: "https://learn.microsoft.com/en-us/azure/well-architected/reliability/principles",
  },
  {
    id: "AZ-900-105",
    difficulty: "easy",
    exam: "AZ-900",
    type: "flashcard",
    category: "Cloud Concepts",
    question: "What is the shared responsibility model?",
    answer:
      "A framework defining which security tasks are handled by the cloud provider vs the customer. Microsoft always manages physical security, hardware, and the network. Customers always manage their data and identities. OS and application responsibility depends on the service model (IaaS/PaaS/SaaS).",
    learnUrl: "https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility",
  },
  {
    id: "AZ-900-106",
    difficulty: "easy",
    exam: "AZ-900",
    type: "flashcard",
    category: "Azure Architecture",
    question: "What is an Azure Region?",
    answer:
      "A geographical area containing one or more datacenters connected by a low-latency network. Azure has 60+ regions worldwide. Resources are deployed to a region and data residency is maintained within that region unless you configure otherwise.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/reliability/regions-overview",
  },
  {
    id: "AZ-900-108",
    difficulty: "easy",
    exam: "AZ-900",
    type: "flashcard",
    category: "Azure Architecture",
    question: "What is an Azure Resource Group?",
    answer:
      "A logical container that holds related Azure resources for a solution. Resources in a group share the same lifecycle — you can deploy, update, and delete them together. A resource can only belong to one resource group at a time.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal",
  },
  {
    id: "AZ-900-109",
    difficulty: "easy",
    exam: "AZ-900",
    type: "flashcard",
    category: "Azure Architecture",
    question: "What is Azure Resource Manager (ARM)?",
    answer:
      "The deployment and management service for Azure. It provides a consistent management layer for creating, updating, and deleting resources. ARM templates allow infrastructure-as-code deployments using JSON or Bicep.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/overview",
  },
  {
    id: "AZ-900-111",
    difficulty: "easy",
    exam: "AZ-900",
    type: "flashcard",
    category: "Core Services",
    question: "What is Azure Blob Storage used for?",
    answer:
      "Storing unstructured data such as images, videos, backups, and logs. It offers three access tiers: Hot (frequent access), Cool (infrequent), and Archive (rarely accessed, lowest cost). Ideal for storing massive amounts of data accessible via HTTP/HTTPS.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction",
  },
  {
    id: "AZ-900-112",
    difficulty: "easy",
    exam: "AZ-900",
    type: "flashcard",
    category: "Core Services",
    question: "What is Azure SQL Database?",
    answer:
      "A fully managed relational database service (PaaS) based on the latest stable version of Microsoft SQL Server. Azure handles patching, backups, and high availability automatically. Supports elastic scaling and built-in intelligence.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/azure-sql/database/sql-database-paas-overview",
  },
  {
    id: "AZ-900-113",
    difficulty: "easy",
    exam: "AZ-900",
    type: "flashcard",
    category: "Core Services",
    question: "What is the purpose of Azure Content Delivery Network (CDN)?",
    answer:
      "A distributed network of servers that caches content close to users to reduce latency and improve performance. Ideal for static assets (images, videos, scripts). Azure CDN integrates with Blob Storage, App Service, and custom origins.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/cdn/cdn-overview",
  },
  {
    id: "AZ-900-114",
    difficulty: "easy",
    exam: "AZ-900",
    type: "flashcard",
    category: "Core Services",
    question: "What is Azure Virtual Network (VNet) peering?",
    answer:
      "A mechanism to connect two VNets so resources in each can communicate privately using Microsoft's backbone network, without traffic going over the public internet. Peering can be within a region (VNet peering) or across regions (Global VNet peering).",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview",
  },
  {
    id: "AZ-900-116",
    difficulty: "easy",
    exam: "AZ-900",
    type: "flashcard",
    category: "Security & Compliance",
    question: "What is Azure Policy?",
    answer:
      "A service that enforces organisational standards and assesses compliance across Azure resources. Policies can audit, deny, or auto-remediate resource configurations. Examples include enforcing specific VM SKUs or requiring tags on all resources.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/governance/policy/overview",
  },
  {
    id: "AZ-900-117",
    difficulty: "easy",
    exam: "AZ-900",
    type: "flashcard",
    category: "Security & Compliance",
    question: "What is Role-Based Access Control (RBAC) in Azure?",
    answer:
      "A system that manages who has access to Azure resources, what they can do, and what areas they can access. Built on three elements: Security Principal (who), Role Definition (what permissions), and Scope (where). Follows least-privilege principle.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview",
  },
  {
    id: "AZ-900-118",
    difficulty: "easy",
    exam: "AZ-900",
    type: "flashcard",
    category: "Security & Compliance",
    question: "What is the Azure Trust Center / Microsoft Service Trust Portal?",
    answer:
      "A portal providing access to Microsoft's security, privacy, and compliance documentation. It includes audit reports, data protection resources, and compliance guides for regulations like GDPR, ISO, and SOC. Used to verify Microsoft's compliance posture.",
    learnUrl: "https://learn.microsoft.com/en-us/compliance/regulatory/offering-home",
  },
  {
    id: "AZ-900-120",
    difficulty: "easy",
    exam: "AZ-900",
    type: "flashcard",
    category: "Cost Management",
    question: "What is Azure Cost Management + Billing?",
    answer:
      "A suite of tools to monitor, allocate, and optimise Azure spending. It provides cost analysis dashboards, budgets with alerts, and recommendations to right-size resources. Helps organisations avoid unexpected bills and enforce spending limits.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/cost-management-billing/cost-management-billing-overview",
  },
];

export default az900flashcard;
