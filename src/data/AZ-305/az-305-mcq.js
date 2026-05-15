// AZ-305 — Multiple Choice Questions
// Cards: AZ-305-101, 102

const az305mcq = [
    {
        id: "AZ-305-MCQ-101",
        exam: "AZ-305",
        type: "mcq",
        difficulty: "medium",
        category: "Design Infrastructure Solutions",
        question: "You are designing a solution for a global enterprise that requires high availability and disaster recovery for a mission-critical web application hosted in Azure. The application must remain available even if an entire Azure region becomes unavailable. Which architecture should you recommend?",
        answer:
            "Deploy the application across two or more Azure regions using Azure Traffic Manager for DNS-based global load balancing and automatic failover. Use paired regions and geo-redundant storage for data. This ensures high availability and disaster recovery if a region fails.",
        choices: [
            "Deploy the application in a single Azure region with Availability Zones",
            "Deploy the application across two or more Azure regions with Azure Traffic Manager",
            "Use Azure Load Balancer with VMs in a single region",
            "Deploy the application in a single region with geo-redundant storage only",
        ],
        correctAnswer: 1,
        explanation:
            "For region-level disaster recovery, you must deploy across multiple regions and use a global load balancer like Azure Traffic Manager. Availability Zones protect against datacenter failures within a region, not regional outages. Azure Load Balancer is regional. Geo-redundant storage alone does not provide application failover.",
        learnUrl: "https://learn.microsoft.com/en-us/azure/architecture/resiliency/recovery-loss-azure-region",
    },
    {
        id: "AZ-305-MCQ-102",
        exam: "AZ-305",
        type: "mcq",
        difficulty: "hard",
        category: "Design Identity, Governance and Monitoring Solutions",
        question: "You are designing an Azure solution for a company with multiple applications running in different subscriptions. The company wants to centralize identity management, enforce conditional access policies, and enable single sign-on (SSO) for all users. What should you recommend as the core identity platform?",
        answer:
            "Implement Microsoft Entra ID as the central identity platform. Integrate all applications with Entra ID, configure conditional access policies, and enable SSO for users across subscriptions.",
        choices: [
            "Deploy a separate Entra ID tenant for each subscription",
            "Deploy Entra ID as a single, centralized identity provider",
            "Rely on Entra ID B2C for all internal applications",
            "Use on-premises Active Directory only, with no cloud integration",
        ],
        correctAnswer: 1,
        explanation:
            "Entra ID is designed for centralized identity management, SSO, and conditional access across multiple subscriptions and applications. Separate tenants fragment identity. Entra ID B2C is for external/customer identities. On-prem AD alone cannot enforce cloud-based policies or SSO for Azure resources.",
        learnUrl: "https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-whatis",
    },
    {
        id: "AZ-305-MCQ-103",
        exam: "AZ-305",
        type: "mcq",
        difficulty: "easy",
        category: "Design Storage Solutions",
        question: "A remote contractor needs temporary access to upload and download files from an Azure Blob Storage container. The contractor should not have permanent credentials or broad access to your Azure resources. Which solution should you use?",
        answer: "Generate a Shared Access Signature (SAS) token with an expiry for the required blob container and provide it to the contractor.",
        choices: [
            "Generate a Shared Access Signature (SAS) token with an expiry for the blob container",
            "Assign the Storage Blob Data Contributor role to the contractor's Azure AD account",
            "Create an access key for the storage account and share it with the contractor",
            "Enable public read access on the blob container for the duration of the contract"
        ],
        correctAnswer: 0,
        explanation:
            "A SAS token with an expiry grants time-limited, scoped access to Azure Blob Storage without exposing account keys or requiring permanent permissions. Assigning RBAC roles or sharing access keys grants broader or longer-term access than required. Enabling public access is insecure and not recommended.",
        learnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview"
    }
];

export default az305mcq;
