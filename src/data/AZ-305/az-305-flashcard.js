// AZ-305 — Flashcards
// Cards: AZ-305-FC-101

const az305flashcard = [
    {
        id: "AZ-305-FC-101",
        difficulty: "medium",
        exam: "AZ-305",
        type: "flashcard",
        category: "Design Business Continuity Solutions",
        question: "What is the difference between Azure Site Recovery and Azure Backup when designing business continuity solutions?",
        answer:
            "Azure Site Recovery provides disaster recovery by replicating entire virtual machines or workloads to another Azure region or on-premises site, enabling failover and failback. Azure Backup protects data by creating point-in-time backups of files, VMs, or databases, allowing recovery from accidental deletion or corruption but not full site failover.",
        learnUrl: "https://learn.microsoft.com/en-us/azure/backup/backup-overview"
    },
    {
        id: "AZ-305-FC-102",
        difficulty: "hard",
        exam: "AZ-305",
        type: "flashcard",
        category: "Design Business Continuity Solutions",
        question: "What is the role of Azure BICEP (ARM templates) in business continuity?",
        answer:
            "Azure Bicep (ARM templates) enable the deployment and management of Azure resources in a consistent and repeatable manner. In business continuity, they can be used to automate the recovery of applications and infrastructure by defining the desired state and configuration of resources, making it easier to restore services in the event of a failure.",
        learnUrl: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/overview"
    }
];

export default az305flashcard;