// AZ-900 — Multiple Choice Questions
// Cards: AZ-900-101, 103, 107, 110, 115, 119, 122–124, 126, 128, 130–131, 133, 135–136, 138–139, 141

const az900mcq = [
  {
    id: "AZ-900-101",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Cloud Concepts",
    question: "What are the three cloud service models?",
    answer:
      "IaaS (Infrastructure as a Service) — you manage OS and up. PaaS (Platform as a Service) — you manage the application. SaaS (Software as a Service) — you just use the software. Each model shifts more management responsibility to the cloud provider.",
    choices: [
      "IaaS (infrastructure control), PaaS (platform + runtime managed), SaaS (fully managed software)",
      "IaaS (serverless compute), PaaS (virtual machine hosting), SaaS (container orchestration)",
      "IaaS (managed database), PaaS (full OS control), SaaS (bare-metal server access)",
      "IaaS (software subscriptions), PaaS (network management), SaaS (on-premises hardware)",
    ],
    correctAnswer: 0,
    explanation:
      "IaaS gives you the most control (VMs, storage, networking). PaaS abstracts the OS so you focus on code. SaaS is fully managed — think Microsoft 365. Options B, C, and D mix up the definitions.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/strategy/cloud-concepts",
  },
  {
    id: "AZ-900-103",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Cloud Concepts",
    question: "What are the three cloud deployment models?",
    answer:
      "Public cloud (resources owned and operated by a third-party provider like Azure), Private cloud (resources used exclusively by one organisation), and Hybrid cloud (combines public and private, allowing data and apps to move between them).",
    choices: [
      "Public (shared multi-tenant), Private (single organisation), Hybrid (combination of both)",
      "Public (on-premises hardware), Private (serverless only), Hybrid (IaaS only)",
      "Public (government restricted), Private (open internet access), Hybrid (SaaS only)",
      "Public (single tenant), Private (multi-tenant), Hybrid (on-premises only)",
    ],
    correctAnswer: 0,
    explanation:
      "Public cloud is multi-tenant shared infrastructure. Private cloud is dedicated to one org. Hybrid connects the two. Options B, C, and D all contain incorrect definitions.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/considerations/cloud-models",
  },
  {
    id: "AZ-900-107",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Azure Architecture",
    question: "What are Azure Availability Zones?",
    answer:
      "Physically separate datacenters within a single Azure region, each with independent power, cooling, and networking. Deploying across zones protects against datacenter-level failures and enables 99.99% SLA for supported services.",
    choices: [
      "Physically separate datacenters within a region with independent power and networking, protecting against datacenter failures",
      "Separate Azure regions grouped together to provide global redundancy for all services",
      "Virtual network segments that isolate traffic between Azure services within a subscription",
      "Scheduled maintenance windows during which Azure performs updates across all regions simultaneously",
    ],
    correctAnswer: 0,
    explanation:
      "Availability Zones are within a single region — not across regions. Option B describes region pairs. Option C describes VNets/NSGs. Option D is unrelated.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview",
  },
  {
    id: "AZ-900-110",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Azure Architecture",
    question: "What is the Azure Management hierarchy from top to bottom?",
    answer:
      "Management Groups → Subscriptions → Resource Groups → Resources. Management groups contain subscriptions, subscriptions contain resource groups, and resource groups contain individual resources. Policies and access applied at a higher level inherit down.",
    choices: [
      "Management Groups → Subscriptions → Resource Groups → Resources",
      "Subscriptions → Management Groups → Resource Groups → Resources",
      "Resources → Resource Groups → Management Groups → Subscriptions",
      "Subscriptions → Resource Groups → Management Groups → Resources",
    ],
    correctAnswer: 0,
    explanation:
      "The hierarchy flows top-down: Management Groups at the top for policy governance, then Subscriptions (billing boundary), then Resource Groups (lifecycle grouping), then individual Resources. All other options have the order wrong.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/governance/management-groups/overview",
  },
  {
    id: "AZ-900-115",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Security & Compliance",
    question: "What is Microsoft Defender for Cloud?",
    answer:
      "A cloud security posture management (CSPM) and workload protection service. It continuously assesses your Azure resources, provides a Secure Score, and gives actionable recommendations to improve security across hybrid and multi-cloud environments.",
    choices: [
      "A CSPM service that assesses resources, provides a Secure Score, and recommends security improvements",
      "A firewall service that blocks all inbound internet traffic to Azure virtual machines by default",
      "An identity service that replaces Microsoft Entra ID for authenticating users in Azure",
      "A compliance tool that automatically generates audit reports for ISO 27001 and SOC 2 certifications",
    ],
    correctAnswer: 0,
    explanation:
      "Defender for Cloud focuses on posture management and threat protection. It doesn't replace Entra ID (Option C) or function as a simple firewall (Option B). While it helps with compliance, it doesn't auto-generate certifications (Option D).",
    learnUrl: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-cloud-introduction",
  },
  {
    id: "AZ-900-119",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Cost Management",
    question: "What factors affect the cost of Azure services?",
    answer:
      "Resource type and size, region (prices vary by geography), bandwidth (outbound data transfer is charged), reservation vs pay-as-you-go pricing, and licence costs. Using Azure Pricing Calculator helps estimate costs before deployment.",
    choices: [
      "Resource type, region, bandwidth (outbound), pricing model (reserved vs PAYG), and licences",
      "Only the number of VMs deployed — all other resources are included at no extra cost",
      "Region only — all Azure services cost the same regardless of size or type",
      "Inbound data transfer and number of user accounts in Microsoft Entra ID",
    ],
    correctAnswer: 0,
    explanation:
      "Azure pricing depends on multiple factors. Inbound data is typically free but outbound is charged. Options B, C, and D all oversimplify or misstate the pricing model.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/pricing-calculator",
  },
  {
    id: "AZ-900-122",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Cloud Concepts",
    question: "What is the difference between vertical scaling (scale up) and horizontal scaling (scale out)?",
    answer:
      "Vertical scaling (scale up) increases the size/power of an existing resource — e.g. upgrading a VM to a larger SKU. Horizontal scaling (scale out) adds more instances of a resource — e.g. adding more VMs. Horizontal scaling is preferred for cloud-native apps as it is near-limitless and enables high availability.",
    choices: [
      "Scale up = larger resource; Scale out = more instances — horizontal scaling is preferred for cloud-native apps",
      "Scale up = more instances; Scale out = larger resource — vertical scaling is always cheaper in the cloud",
      "Scale up and scale out are identical — both add additional virtual machines to handle load",
      "Scale up applies only to databases; scale out applies only to compute workloads",
    ],
    correctAnswer: 0,
    explanation:
      "Vertical scaling has hard limits (you can't go beyond the largest available SKU) and typically requires a restart. Horizontal scaling is near-limitless and supports high availability by running multiple redundant instances. Azure services like VMSS, App Service, and AKS support automatic horizontal scaling.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/scale-partition",
  },
  {
    id: "AZ-900-123",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Cloud Concepts",
    question: "What does 'economies of scale' mean in the context of cloud computing?",
    answer:
      "Cloud providers like Microsoft purchase hardware, power, and cooling at massive scale, reducing per-unit costs and passing those savings on to customers. This is why cloud resources can be cheaper than equivalent on-premises infrastructure.",
    choices: [
      "Cloud providers buy at massive scale, reducing per-unit costs and passing savings to customers",
      "Customers save money by purchasing Azure Reserved Instances instead of pay-as-you-go resources",
      "Azure charges more per unit as usage increases, incentivising efficient resource use",
      "Economies of scale only apply to enterprise customers with negotiated pricing agreements",
    ],
    correctAnswer: 0,
    explanation:
      "Microsoft operates at a scale no individual organisation can match — millions of servers, global supply chains, and highly optimised datacenters. This enables lower costs per GB, per core, and per watt. It's a fundamental cloud adoption driver and a core AZ-900 exam concept.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/strategy/cloud-concepts",
  },
  {
    id: "AZ-900-124",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Azure Architecture",
    question: "What is an Azure Region Pair?",
    answer:
      "Each Azure region is paired with another region in the same geography (e.g. East US ↔ West US). In a major outage, Azure prioritises recovery of at least one region per pair. Some services like GRS automatically replicate to the paired region, and planned maintenance never takes both regions offline simultaneously.",
    choices: [
      "Two regions in the same geography paired for prioritised recovery and data residency during major outages",
      "Two datacenters within the same region that replicate data synchronously for high availability",
      "A primary and DR region that must be manually configured and connected by the customer",
      "Two Azure subscriptions linked together for combined billing and governance",
    ],
    correctAnswer: 0,
    explanation:
      "Region pairs are a key Azure resilience concept pre-defined by Microsoft. GRS and GZRS storage automatically replicate to the paired region. Pairs are always within the same geopolitical boundary for data residency compliance. Planned maintenance is staggered across pairs so both are never simultaneously unavailable.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/reliability/cross-region-replication-azure",
  },
  {
    id: "AZ-900-126",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Core Services",
    question: "What is Azure Container Instances (ACI)?",
    answer:
      "The fastest and simplest way to run a container in Azure — no VMs or orchestration to manage. Billed per second of container execution. Ideal for isolated, short-lived, or burst workloads. Unlike AKS, there is no cluster to set up.",
    choices: [
      "A serverless container service for isolated tasks — no VM or cluster management, billed per second",
      "A fully managed Kubernetes service for orchestrating containerised applications at scale",
      "A service for building and storing private container images",
      "A PaaS platform for containerised web apps with built-in scaling, CI/CD, and Dapr integration",
    ],
    correctAnswer: 0,
    explanation:
      "ACI is the simplest container runtime — ideal for burst workloads, batch jobs, and dev/test. AKS (option B) is for orchestrating many containers at scale. Azure Container Registry (option C) stores images. Azure Container Apps (option D) is the PaaS option with KEDA-based scaling and Dapr support.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/container-instances/container-instances-overview",
  },
  {
    id: "AZ-900-128",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Core Services",
    question: "What is Azure DNS and what does it NOT do?",
    answer:
      "Azure DNS is a hosting service for DNS domains using Microsoft's global name server infrastructure. It supports public zones (internet-facing) and private zones (VNet-internal resolution for Private Endpoints). It does NOT sell domain names — those must be purchased from a domain registrar.",
    choices: [
      "Hosts DNS zones on Microsoft's infrastructure for public and private resolution — does NOT sell domain names",
      "A firewall that intercepts and filters DNS queries to block malicious domains",
      "A VPN service that encrypts DNS traffic between on-premises networks and Azure",
      "A CDN that caches DNS responses at edge PoPs to accelerate global resolution",
    ],
    correctAnswer: 0,
    explanation:
      "Azure DNS is a DNS hosting service — you delegate your existing domain's name servers to Azure, then manage records there. It does not register domains. Azure Private DNS is used with Private Endpoints to resolve PaaS service FQDNs (e.g. storage.blob.core.windows.net) to private IPs inside a VNet.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/dns/dns-overview",
  },
  {
    id: "AZ-900-130",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Core Services",
    question: "Which Azure database service is best suited for a globally distributed application needing a flexible, document-based schema with multi-region write capability?",
    answer:
      "Azure Cosmos DB — a globally distributed NoSQL database supporting schema-flexible JSON documents, multiple APIs (SQL, MongoDB, Cassandra, Gremlin, Table), and turnkey multi-region writes with low-latency SLAs.",
    choices: [
      "Azure Cosmos DB — globally distributed NoSQL with flexible schemas and multi-region writes",
      "Azure SQL Database — a relational PaaS database with strict schema enforcement via T-SQL",
      "Azure Table Storage — a simple key-value store suited to flat tabular data",
      "Azure Synapse Analytics — a data warehouse for large-scale analytical (OLAP) queries",
    ],
    correctAnswer: 0,
    explanation:
      "Cosmos DB is the right choice when you need schema flexibility, global distribution, and single-digit millisecond latency. Azure SQL is relational and enforces strict schemas. Table Storage is a simpler NoSQL option with limited querying. Synapse is for analytics/reporting, not transactional applications.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/cosmos-db/introduction",
  },
  {
    id: "AZ-900-131",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Core Services",
    question: "What is Azure AI Services (formerly Cognitive Services)?",
    answer:
      "A collection of pre-built AI APIs for vision, speech, language, and decision tasks — available via REST API or SDK with no ML expertise required. Examples: Computer Vision, Speech-to-Text, Translator, Language Understanding, and Azure OpenAI Service.",
    choices: [
      "Pre-built AI APIs for vision, speech, language, and decision tasks — no ML training required",
      "A managed platform for building, training, and deploying custom machine learning models",
      "A data pipeline service for ingesting and preparing large datasets for ML training jobs",
      "A monitoring service that uses AI to detect anomalies in Azure resource performance metrics",
    ],
    correctAnswer: 0,
    explanation:
      "Azure AI Services (Cognitive Services) provides ready-made AI via simple API calls — you bring your data, the AI capability is pre-built. Azure Machine Learning (option B) is where you train custom models. Options C and D describe other Azure services entirely.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/ai-services/what-are-ai-services",
  },
  {
    id: "AZ-900-133",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Management & Governance",
    question: "What are the three primary Azure management interfaces, and what differentiates them?",
    answer:
      "Azure Portal (browser-based GUI — best for exploration and one-off tasks), Azure CLI (cross-platform command-line — best for shell scripting and automation), Azure PowerShell (PowerShell module — best for Windows/PowerShell environments). All three have equivalent capability.",
    choices: [
      "Azure Portal (GUI — exploration), Azure CLI (cross-platform scripting), Azure PowerShell (PowerShell automation) — all equivalent capability",
      "Azure Portal (Linux only), Azure CLI (Windows only), Azure PowerShell (macOS only)",
      "Azure Portal (VMs only), Azure CLI (storage only), Azure PowerShell (networking only)",
      "Azure Portal is deprecated — Azure CLI and PowerShell are the only supported management interfaces",
    ],
    correctAnswer: 0,
    explanation:
      "All three tools can perform the same Azure management operations — the choice is about context and preference. Azure Cloud Shell (in the browser) provides both CLI and PowerShell without installing anything locally. The AZ-900 exam expects you to know that they are interchangeable in terms of capability.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/azure-portal/azure-portal-overview",
  },
  {
    id: "AZ-900-135",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Management & Governance",
    question: "What is the difference between a CanNotDelete lock and a ReadOnly lock in Azure?",
    answer:
      "CanNotDelete allows read and modify operations but blocks all deletions. ReadOnly blocks both modifications and deletions — the resource is effectively frozen. ReadOnly is more disruptive and can break services that write state during normal operation (e.g. a storage account ReadOnly lock prevents listing keys).",
    choices: [
      "CanNotDelete allows read/modify but blocks delete; ReadOnly blocks all modifications and deletions",
      "CanNotDelete is applied at subscription scope only; ReadOnly is applied at resource group scope only",
      "CanNotDelete blocks all changes including reads; ReadOnly allows reads but blocks writes",
      "Both are identical — the only difference is the label shown in the Azure portal",
    ],
    correctAnswer: 0,
    explanation:
      "CanNotDelete is the less disruptive option — teams can still update configurations, just not delete the resource. ReadOnly should be used carefully; it can cause operational issues for services that write metadata or update state during normal operation. Both override RBAC permissions.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources",
  },
  {
    id: "AZ-900-136",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Management & Governance",
    question: "What is Azure Advisor?",
    answer:
      "A free, personalised cloud consultant built into the Azure portal. It analyses your Azure usage and configuration and provides prioritised recommendations across five pillars: Cost, Security, Reliability, Operational Excellence, and Performance.",
    choices: [
      "A free built-in service providing recommendations across Cost, Security, Reliability, Performance, and Operational Excellence",
      "A paid monitoring service that alerts you when resources exceed defined performance thresholds",
      "A policy engine that automatically remediates security violations across your subscriptions",
      "An AI chatbot that answers Azure documentation questions inside the Azure portal",
    ],
    correctAnswer: 0,
    explanation:
      "Azure Advisor surfaces actionable recommendations from telemetry and best-practice analysis — for example: 'You have 3 underutilised VMs — consider resizing to save cost' or 'Enable soft delete on this Key Vault'. It requires no configuration and is free. Recommendations are personalised to your actual resource usage.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/advisor/advisor-overview",
  },
  {
    id: "AZ-900-138",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Management & Governance",
    question: "What is Azure Arc and what problem does it solve?",
    answer:
      "Azure Arc extends Azure management capabilities — RBAC, Azure Policy, Defender for Cloud, Azure Monitor, and tags — to resources outside Azure, including on-premises servers, VMs in other clouds (AWS/GCP), and Kubernetes clusters. Arc-enabled resources appear in the Azure portal alongside native Azure resources.",
    choices: [
      "Extends Azure management (Policy, RBAC, Monitor, Defender) to on-premises and multi-cloud resources",
      "A VPN service that connects on-premises networks to Azure VNets over encrypted IPSec tunnels",
      "A CDN that caches Azure portal assets at edge PoPs to reduce portal load times",
      "A migration tool that automatically lifts and shifts on-premises VMs to Azure",
    ],
    correctAnswer: 0,
    explanation:
      "Azure Arc solves the hybrid/multi-cloud management problem — instead of separate toolsets for on-premises and cloud resources, Arc brings everything under one Azure control plane. Once Arc-enabled, on-premises servers and Kubernetes clusters can receive Azure Policy assignments, appear in Azure Monitor, and be protected by Defender for Cloud.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/azure-arc/overview",
  },
  {
    id: "AZ-900-139",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Cost Management",
    question: "What is the Azure Total Cost of Ownership (TCO) Calculator and how does it differ from the Pricing Calculator?",
    answer:
      "The TCO Calculator estimates the cost savings of migrating on-premises infrastructure to Azure over 3–5 years — including hardware, software, electricity, cooling, and staffing. The Pricing Calculator estimates the monthly cost of specific Azure services before you deploy them. Use TCO for business case justification; use Pricing Calculator for pre-deployment budgeting.",
    choices: [
      "TCO Calculator: migration savings over time (on-prem vs Azure); Pricing Calculator: monthly cost of specific Azure services pre-deployment",
      "TCO Calculator: real-time spending tracking against budget; Pricing Calculator: historical billing analysis",
      "They are the same tool — TCO is the old name and Pricing Calculator is the new name",
      "TCO Calculator: calculates Azure costs; Pricing Calculator: calculates on-premises costs",
    ],
    correctAnswer: 0,
    explanation:
      "This distinction is a common AZ-900 exam question. TCO = business case tool (justify migration to leadership). Pricing Calculator = technical planning tool (estimate monthly spend before deploying). Both are free and available publicly at azure.microsoft.com without signing in.",
    learnUrl: "https://azure.microsoft.com/en-us/pricing/tco/calculator/",
  },
  {
    id: "AZ-900-141",
    difficulty: "easy",
    exam: "AZ-900",
    type: "mcq",
    category: "Cost Management",
    question: "What is the key difference between the Azure Developer and Standard support plans?",
    answer:
      "Developer ($29/mo) is for non-production environments — provides email support with an 8-business-hour response SLA. Standard ($100/mo) is for production workloads — adds 24/7 phone support and a 1-hour response SLA for Severity A (critical) cases.",
    choices: [
      "Developer: email + 8-hr response (non-prod); Standard: 24/7 phone + 1-hr Severity A response (production)",
      "Developer: 24/7 phone support for all cases; Standard: email only during business hours",
      "Developer and Standard are identical in features — the only difference is price",
      "Basic plan includes 24/7 phone support for critical issues; Developer plan adds architecture guidance",
    ],
    correctAnswer: 0,
    explanation:
      "Support plan tiers appear on the AZ-900 exam. Basic is free (no technical support). Developer is non-production. Standard is the minimum for production. Professional Direct ($1,000/mo) adds faster SLAs and proactive guidance. Premier is a custom enterprise agreement. The key exam-relevant distinction is Developer vs Standard — specifically the 24/7 availability and Severity A SLA.",
    learnUrl: "https://azure.microsoft.com/en-us/support/plans/",
  },
];

export default az900mcq;
