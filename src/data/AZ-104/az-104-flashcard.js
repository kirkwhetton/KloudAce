// AZ-104 — Flashcard cards
// Cards: AZ-104-019, AZ-104-167 – AZ-104-170 (Compute)
const az104flashcard = [
  {
    id: "AZ-104-019",
    type: "flashcard",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Monitoring",
    question: "What is Microsoft Defender for Cloud and what is a Secure Score?",
    answer:
      "Defender for Cloud is a cloud security posture management (CSPM) tool that continuously assesses Azure resources for security risks. The Secure Score is a percentage representing how well your environment follows security best practices — higher is better. It provides prioritised remediation recommendations.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/secure-score-security-controls",
  },

  // ── Compute: Virtual Machines, Scale Sets & App Service ───────────

  {
    id: "AZ-104-167",
    type: "flashcard",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Compute",
    question: "What is the difference between vertical scaling and horizontal scaling for Azure virtual machines?",
    answer:
      "Vertical scaling (scale up/down) changes the size of an existing VM — adding more CPU and memory to a single machine. It usually requires a VM reboot and is capped by the largest available hardware SKU in the region. Horizontal scaling (scale out/in) adds or removes VM instances. It is far more flexible, can reach thousands of instances, and is the foundation of VM Scale Sets with autoscaling.",
    learnUrl: "https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-availability/8-identify-creating-scale-sets",
  },
  {
    id: "AZ-104-168",
    type: "flashcard",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Compute",
    question: "What are Azure Virtual Machine Scale Sets, and what two orchestration modes do they support?",
    answer:
      "VM Scale Sets let you deploy and manage a group of load-balanced VMs that automatically scale in or out based on demand or a schedule. They support two orchestration modes: Uniform (all VMs created from the same base OS image and configuration — true autoscaling) and Flexible (VMs in the same set can use different images or sizes). The orchestration mode must be chosen at creation time and cannot be changed.",
    learnUrl: "https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-availability/8-identify-creating-scale-sets",
  },
  {
    id: "AZ-104-169",
    type: "flashcard",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Compute",
    question: "What is a deployment slot in Azure App Service and how does it enable zero-downtime deployments?",
    answer:
      "A deployment slot is a separate live environment within an App Service web app (e.g. a staging slot) with its own hostname. Code is deployed to the slot first; App Service warms up all instances before the swap. When swapped, traffic is redirected instantly with no dropped requests. If the new version has issues, swapping back restores the previous version immediately. Available on Standard, Premium, and Isolated v2 tiers only.",
    learnUrl: "https://learn.microsoft.com/en-us/training/modules/configure-azure-app-service/6-create-deployment-slots",
  },
  {
    id: "AZ-104-170",
    type: "flashcard",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Compute",
    question: "What are the three types of virtual machine maintenance events in Azure, and who initiates each?",
    answer:
      "1. Unplanned hardware maintenance — Azure predicts component failure and uses Live Migration to move the VM with a brief pause; no reboot required. 2. Unexpected downtime — hardware fails without warning; Azure auto-migrates the VM to a healthy host in the same datacenter, causing a reboot. 3. Planned maintenance — periodic Microsoft-initiated platform updates for reliability and security; only one update domain is rebooted at a time. Note: Microsoft does NOT update the guest OS or software — that is the customer's responsibility.",
    learnUrl: "https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-availability/2-plan-for-maintenance-downtime",
  },
];

export default az104flashcard;
