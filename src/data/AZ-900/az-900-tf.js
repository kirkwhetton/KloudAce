// AZ-900 — True / False
// Cards: AZ-900-121, 125, 127, 129, 132, 134, 137, 140, 142

const az900tf = [
  {
    id: "AZ-900-121",
    difficulty: "easy",
    exam: "AZ-900",
    type: "truefalse",
    category: "Cloud Concepts",
    question: "Elasticity in cloud computing refers to the ability to automatically add or remove resources to match current demand.",
    answer: true,
    explanation:
      "Elasticity is the dynamic, often automatic, scaling of resources — up when demand spikes, down when demand drops — so you pay only for what you use. Scalability is the broader ability of a system to handle growth, which may include manual or planned scaling. Elasticity implies automation and real-time responsiveness.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/scale-partition",
  },
  {
    id: "AZ-900-125",
    difficulty: "easy",
    exam: "AZ-900",
    type: "truefalse",
    category: "Azure Architecture",
    question: "Azure sovereign regions (such as Azure Government and Azure China) are physically and logically isolated from the global public Azure cloud.",
    answer: true,
    explanation:
      "Sovereign regions are separate Azure deployments designed for specific national regulatory requirements. Azure Government is operated by US-government-cleared personnel; Azure China is operated by 21Vianet under Chinese law. Both maintain physical and logical isolation — different endpoints, separate compliance certifications, and independent management planes from the global Azure cloud.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/azure-government/documentation-government-welcome",
  },
  {
    id: "AZ-900-127",
    difficulty: "easy",
    exam: "AZ-900",
    type: "truefalse",
    category: "Core Services",
    question: "Azure Virtual Desktop allows users to run a full Windows desktop experience hosted in Azure, accessible from any device including browsers and mobile.",
    answer: true,
    explanation:
      "Azure Virtual Desktop (AVD) hosts Windows 10/11 virtual desktops and RemoteApp streams in Azure. Users connect from Windows, Mac, iOS, Android, or any HTML5 browser. It supports Windows multi-session — multiple users sharing a single VM — dramatically reducing VDI costs compared to traditional on-premises solutions.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-desktop/overview",
  },
  {
    id: "AZ-900-129",
    difficulty: "easy",
    exam: "AZ-900",
    type: "truefalse",
    category: "Core Services",
    question: "Azure SQL Database is a fully managed PaaS service — Microsoft handles OS patching, SQL Server updates, backups, and high availability automatically.",
    answer: true,
    explanation:
      "Azure SQL Database is PaaS — unlike SQL Server on a VM (IaaS) where you manage the OS and SQL installation, Azure handles all infrastructure maintenance. Built-in features include automatic backups, point-in-time restore, and high availability via an availability group under the hood. You focus on schema, queries, and data.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/azure-sql/database/sql-database-paas-overview",
  },
  {
    id: "AZ-900-132",
    difficulty: "easy",
    exam: "AZ-900",
    type: "truefalse",
    category: "Core Services",
    question: "Azure Machine Learning is a platform for building and training custom ML models — it is separate from Azure AI Services, which provides pre-built AI APIs requiring no model training.",
    answer: true,
    explanation:
      "These two services serve different audiences. Azure Machine Learning is for data scientists and ML engineers who need to train custom models using PyTorch, TensorFlow, or scikit-learn — with experiment tracking, a model registry, and MLOps pipelines. Azure AI Services (Cognitive Services) is for developers who need AI capabilities (e.g. image recognition, translation) via simple REST calls without any training.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/machine-learning/overview-what-is-azure-machine-learning",
  },
  {
    id: "AZ-900-134",
    difficulty: "easy",
    exam: "AZ-900",
    type: "truefalse",
    category: "Management & Governance",
    question: "Azure Resource Locks prevent accidental deletion or modification and can be applied at the resource, resource group, or subscription level — even overriding Owner-level RBAC permissions.",
    answer: true,
    explanation:
      "Resource Locks have two types: CanNotDelete (read and modify allowed, delete blocked) and ReadOnly (no modifications or deletions). Locks are inherited downward through the scope hierarchy. Critically, they override RBAC — even an Owner cannot delete a locked resource without first removing the lock. This makes them essential for protecting critical production resources.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources",
  },
  {
    id: "AZ-900-137",
    difficulty: "easy",
    exam: "AZ-900",
    type: "truefalse",
    category: "Management & Governance",
    question: "Azure Service Health provides personalised alerts about Azure outages, planned maintenance, and health advisories that specifically affect your resources and regions.",
    answer: true,
    explanation:
      "Azure Service Health has three components: Azure Status (global public outage page for all customers), Service Health (personalised dashboard of issues affecting your subscriptions, services, and regions), and Resource Health (per-resource health status). You configure alerts to notify your team via email, SMS, webhook, or Logic App when an event affects your resources.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/service-health/overview",
  },
  {
    id: "AZ-900-140",
    difficulty: "easy",
    exam: "AZ-900",
    type: "truefalse",
    category: "Cost Management",
    question: "Azure Reserved Instances can reduce VM costs by up to 72% compared to pay-as-you-go pricing, in exchange for a 1-year or 3-year commitment.",
    answer: true,
    explanation:
      "Reserved Instances (RIs) are a billing commitment — you agree to use a specific VM size and region for 1 or 3 years and receive a significant discount (up to ~72% for 3-year all-upfront). You can pay upfront, monthly, or hybrid. RIs are ideal for predictable, continuously running workloads. For interruptible workloads, Azure Spot VMs offer even deeper discounts but can be evicted with 30 seconds notice.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/cost-management-billing/reservations/save-compute-costs-reservations",
  },
  {
    id: "AZ-900-142",
    difficulty: "easy",
    exam: "AZ-900",
    type: "truefalse",
    category: "Security & Compliance",
    question: "Microsoft Entra ID (formerly Azure Active Directory) is Microsoft's cloud-based identity service and is used to authenticate users for Azure, Microsoft 365, and third-party applications.",
    answer: true,
    explanation:
      "Entra ID is the identity backbone of the Microsoft cloud. It supports Single Sign-On (SSO), Multi-Factor Authentication (MFA), Conditional Access, and B2B/B2C identity federation. Every Azure subscription is associated with an Entra ID tenant. It is distinct from on-premises Active Directory Domain Services (AD DS), though the two can be synchronised using Microsoft Entra Connect.",
    learnUrl: "https://learn.microsoft.com/en-us/entra/fundamentals/whatis",
  },
];

export default az900tf;
