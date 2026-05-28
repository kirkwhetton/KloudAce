const QUESTIONS = [

  // ── Azure services ──────────────────────────────────────────────
  {
    id: "nts-001",
    prompt: "A serverless compute service that runs event-triggered code without provisioning or managing servers, supporting HTTP triggers, timers, queues and more.",
    answers: ["Azure Functions", "Functions"],
    hint: "Think: events → code, no servers",
    difficulty: "easy",
  },
  {
    id: "nts-002",
    prompt: "A fully managed, globally distributed NoSQL database supporting multiple APIs including SQL, MongoDB, Cassandra, Gremlin and Table Storage.",
    answers: ["Azure Cosmos DB", "Cosmos DB"],
    hint: "Named after something astronomical",
    difficulty: "easy",
  },
  {
    id: "nts-003",
    prompt: "A platform-as-a-service offering for hosting web applications, REST APIs and mobile back ends without managing the underlying infrastructure.",
    answers: ["Azure App Service", "App Service"],
    hint: "PaaS web hosting — no VM management",
    difficulty: "easy",
  },
  {
    id: "nts-004",
    prompt: "A cloud service for securely storing and tightly controlling access to secrets, encryption keys, API keys, passwords and certificates.",
    answers: ["Azure Key Vault", "Key Vault"],
    hint: "A digital safe for secrets and keys",
    difficulty: "easy",
  },
  {
    id: "nts-005",
    prompt: "A layer 7 load balancer that provides a built-in CDN, caching, global anycast routing, SSL offloading and automatic failover across Microsoft's global edge network.",
    answers: ["Azure Front Door", "Front Door", "AFD"],
    hint: "The entry point to your global app",
    difficulty: "medium",
  },
  {
    id: "nts-006",
    prompt: "A managed Kubernetes container orchestration service that automates the deployment, scaling and management of containerised applications.",
    answers: ["Azure Kubernetes Service", "AKS"],
    hint: "Managed K8s on Azure",
    difficulty: "medium",
  },
  {
    id: "nts-007",
    prompt: "A fully managed PaaS service that provides secure RDP and SSH connectivity to virtual machines directly in the Azure portal, without requiring public IP addresses on the VMs.",
    answers: ["Azure Bastion", "Bastion"],
    hint: "A managed jump host you never touch",
    difficulty: "medium",
  },
  {
    id: "nts-008",
    prompt: "A dedicated private network connection between your on-premises infrastructure and Azure datacenters that bypasses the public internet entirely.",
    answers: ["Azure ExpressRoute", "ExpressRoute"],
    hint: "A private highway to Azure",
    difficulty: "hard",
  },
  {
    id: "nts-009",
    prompt: "A DNS-based global traffic routing service that distributes traffic to services across Azure regions using methods such as priority, weighted, geographic and performance.",
    answers: ["Azure Traffic Manager", "Traffic Manager"],
    hint: "Routes users to the best endpoint using DNS",
    difficulty: "hard",
  },
  {
    id: "nts-010",
    prompt: "A layer 7 application delivery controller providing SSL termination, URL-based routing, cookie-based session affinity and a built-in web application firewall for regional workloads.",
    answers: ["Azure Application Gateway", "Application Gateway"],
    hint: "Like Front Door, but regional not global",
    difficulty: "hard",
  },

  // ── Azure Blob Storage access tiers ────────────────────────────
  {
    id: "nts-011",
    prompt: "The Azure Blob Storage access tier designed for data that is accessed frequently. It has the highest storage cost but the lowest access cost.",
    answers: ["Hot", "Hot tier"],
    hint: "Frequently accessed = this temperature",
    difficulty: "easy",
  },
  {
    id: "nts-012",
    prompt: "The Azure Blob Storage access tier for data that is infrequently accessed and stored for at least 30 days. Lower storage cost than Hot, higher access cost.",
    answers: ["Cool", "Cool tier", "Cold", "Cold tier"],
    hint: "Not quite hot, not quite frozen",
    difficulty: "easy",
  },
  {
    id: "nts-013",
    prompt: "The Azure Blob Storage access tier for rarely accessed data stored for at least 180 days. Lowest storage cost but data must be rehydrated before it can be read.",
    answers: ["Archive", "Archive tier"],
    hint: "Long-term, rarely touched — requires rehydration",
    difficulty: "easy",
  },

  // ── Storage redundancy ──────────────────────────────────────────
  {
    id: "nts-014",
    prompt: "The Azure Storage redundancy option that replicates data three times within a single datacentre in the primary region. Lowest cost, no zone or region protection.",
    answers: ["Locally redundant storage", "LRS"],
    hint: "Three copies, one building",
    difficulty: "medium",
  },
  {
    id: "nts-015",
    prompt: "The Azure Storage redundancy option that replicates data synchronously across three availability zones in the primary region, protecting against datacenter-level failures.",
    answers: ["Zone-redundant storage", "ZRS"],
    hint: "Three zones, one region",
    difficulty: "medium",
  },
  {
    id: "nts-016",
    prompt: "The Azure Storage redundancy option that replicates data to a secondary region hundreds of miles away, providing protection against a full regional outage.",
    answers: ["Geo-redundant storage", "GRS"],
    hint: "Two regions, no read access to the secondary",
    difficulty: "medium",
  },
  {
    id: "nts-017",
    prompt: "The Azure Storage redundancy option that replicates to a secondary region AND allows read access from that secondary region, enabling higher read availability.",
    answers: ["Read-access geo-redundant storage", "RA-GRS"],
    hint: "Like GRS but you can read from the backup region",
    difficulty: "hard",
  },

  // ── Cloud service models ────────────────────────────────────────
  {
    id: "nts-018",
    prompt: "The cloud service model where the provider manages everything — hardware, OS, middleware and application. The customer only uses the software through a browser.",
    answers: ["SaaS", "Software as a Service"],
    hint: "Microsoft 365, Salesforce, Gmail",
    difficulty: "easy",
  },
  {
    id: "nts-019",
    prompt: "The cloud service model where the provider manages the hardware, OS and runtime. The customer deploys and manages their own applications and data.",
    answers: ["PaaS", "Platform as a Service"],
    hint: "Azure App Service, Azure SQL Database",
    difficulty: "easy",
  },
  {
    id: "nts-020",
    prompt: "The cloud service model where the provider manages only the physical hardware and virtualisation layer. The customer manages everything from the OS upward.",
    answers: ["IaaS", "Infrastructure as a Service"],
    hint: "Azure VMs — you manage the OS, middleware and apps",
    difficulty: "easy",
  },

  // ── Azure tools and governance ──────────────────────────────────
  {
    id: "nts-021",
    prompt: "The free Azure service that analyses your resources and provides personalised best practice recommendations across cost, security, reliability, operational excellence and performance.",
    answers: ["Azure Advisor", "Advisor"],
    hint: "Think of it as a personal Azure consultant",
    difficulty: "easy",
  },
  {
    id: "nts-022",
    prompt: "The Azure tool that lets you estimate the monthly cost of Azure resources before you deploy them, by selecting services and configuring their settings.",
    answers: ["Azure Pricing Calculator", "Pricing Calculator"],
    hint: "Used before you deploy to estimate spend",
    difficulty: "easy",
  },
  {
    id: "nts-023",
    prompt: "The Azure tool that helps you calculate potential savings from migrating on-premises workloads to Azure by comparing current on-premises costs against projected Azure costs.",
    answers: ["Total Cost of Ownership Calculator", "TCO Calculator", "Azure TCO Calculator"],
    hint: "Compares on-premises vs Azure costs to show savings",
    difficulty: "medium",
  },
  {
    id: "nts-024",
    prompt: "The Azure service that lets you define, assign and manage policies to enforce organisational rules and assess compliance across all your resources at scale.",
    answers: ["Azure Policy", "Policy"],
    hint: "Governance guardrails for your entire Azure estate",
    difficulty: "easy",
  },
  {
    id: "nts-025",
    prompt: "The Azure feature that lets you group multiple Azure subscriptions under a single billing account and management hierarchy, applying policies and access control at scale.",
    answers: ["Management Groups", "Azure Management Groups"],
    hint: "One level above subscriptions in the hierarchy",
    difficulty: "medium",
  },

  // ── Azure support plans ─────────────────────────────────────────
  {
    id: "nts-026",
    prompt: "The Azure support plan included free for all customers that provides access to Azure Advisor recommendations, documentation, community forums and billing support only.",
    answers: ["Basic", "Basic support", "Basic support plan"],
    hint: "Free for everyone — no technical support cases",
    difficulty: "medium",
  },
  {
    id: "nts-027",
    prompt: "The Azure support plan providing business-hours access to technical support via email, suited for developers in non-production environments.",
    answers: ["Developer", "Developer support", "Developer support plan"],
    hint: "For developers — email only, business hours",
    difficulty: "medium",
  },
  {
    id: "nts-028",
    prompt: "The Azure support plan providing 24/7 access to technical support by email and phone, with a one-hour response time for critical cases.",
    answers: ["Standard", "Standard support", "Standard support plan"],
    hint: "24/7, phone and email, 1-hour critical response",
    difficulty: "hard",
  },

  // ── Azure networking ────────────────────────────────────────────
  {
    id: "nts-029",
    prompt: "The Azure networking feature that contains a set of inbound and outbound rules used to filter network traffic to and from Azure resources based on IP address, port and protocol.",
    answers: ["Network Security Group", "NSG"],
    hint: "A stateful firewall attached to a subnet or NIC",
    difficulty: "medium",
  },
  {
    id: "nts-030",
    prompt: "The Azure feature that allows virtual networks in the same or different regions to communicate with each other using Microsoft's backbone network, without traffic going over the public internet.",
    answers: ["VNet Peering", "Virtual Network Peering", "Azure VNet Peering"],
    hint: "Connects two VNets so they talk like one",
    difficulty: "medium",
  },
];

export default QUESTIONS;
