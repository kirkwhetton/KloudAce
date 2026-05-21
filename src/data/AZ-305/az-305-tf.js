// AZ-305 — True / False
// Cards: AZ-305-TF-101 (design storage)
// Cards: AZ-305-TF-201, 202, 203 (NSG traffic analysis series)

const az305tf = [
    {
        id: "AZ-305-TF-101",
        exam: "AZ-305",
        difficulty: "easy",
        type: "truefalse",
        category: "Design Storage Solutions",
        question: "Azure Storage Accounts can be configured for geo-redundant storage (GRS) to provide automatic replication of data to a secondary region for disaster recovery.",
        answer: true,
        explanation:
        "Geo-redundant storage (GRS) replicates your data asynchronously to a secondary region hundreds of miles away from the primary location, providing disaster recovery in case the primary region becomes unavailable.",
        learnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy",
    },
  // ─── NSG traffic analysis series (AZ-305-TF-201/202/203) ────────────────
  // Shared scenario: VMs in Azure with NSG rules suspected of blocking traffic.
  // Goal: determine whether traffic from a specific IP is allowed or denied.
  // Each card proposes a different solution — only IP flow verify meets the goal.
  {
    id: "AZ-305-TF-201",
    exam: "AZ-305",
    type: "truefalse",
    difficulty: "medium",
    category: "Design Infrastructure Solutions",
    question:
      "Your company has deployed virtual machines to Azure. Several users report intermittent connectivity issues when accessing the virtual machines from on-premises. You suspect that network security group (NSG) rules are blocking inbound traffic.\n\nYou need to determine whether inbound traffic from a specific on-premises IP address is being allowed or denied by the NSG rules applied to the virtual machines.\n\nSolution: Use Azure Network Watcher IP flow verify to test the traffic.\n\nDoes this meet the goal?",
    answer: true,
    explanation:
      "Azure Network Watcher IP flow verify checks whether a packet is allowed or denied to or from a virtual machine based on the NSG rules applied to that VM's NIC and subnet. You specify the protocol, direction, local IP and port, and remote IP and port — it returns exactly which rule allows or denies the traffic and which NSG the rule belongs to. This is the correct tool for diagnosing NSG-related connectivity issues for a specific IP address.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/network-watcher/ip-flow-verify-overview",
  },
  {
    id: "AZ-305-TF-202",
    exam: "AZ-305",
    type: "truefalse",
    difficulty: "medium",
    category: "Design Infrastructure Solutions",
    question: "Your company has deployed virtual machines to Azure. Several users report intermittent connectivity issues when accessing the virtual machines from on-premises. You suspect that network security group (NSG) rules are blocking inbound traffic.\n\nYou need to determine whether inbound traffic from a specific on-premises IP address is being allowed or denied by the NSG rules applied to the virtual machines.\n\nSolution: Use Azure Monitor Network Insights to review the network topology and connectivity metrics for the virtual machines.\n\nDoes this meet the goal?",
    answer: false,
    explanation:
      "Azure Monitor Network Insights provides a topology view of your network resources and aggregated connectivity health metrics. It does not evaluate NSG rules against a specific source IP address and cannot tell you whether a particular packet would be allowed or denied. To test whether a specific IP's traffic is allowed or denied by NSG rules, use Azure Network Watcher IP flow verify.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/network-watcher/ip-flow-verify-overview",
  },
  {
    id: "AZ-305-TF-203",
    exam: "AZ-305",
    type: "truefalse",
    difficulty: "medium",
    category: "Design Infrastructure Solutions",
    question: "Your company has deployed virtual machines to Azure. Several users report intermittent connectivity issues when accessing the virtual machines from on-premises. You suspect that network security group (NSG) rules are blocking inbound traffic.\n\nYou need to determine whether inbound traffic from a specific on-premises IP address is being allowed or denied by the NSG rules applied to the virtual machines.\n\nSolution: Use Azure Advisor to review the NSG configuration and identify rules that may be blocking traffic.\n\nDoes this meet the goal?",
    answer: false,
    explanation:
      "Azure Advisor analyses your Azure resources and provides general best-practice recommendations — for example, flagging NSG rules that are overly permissive (such as allowing all inbound internet traffic). It does not perform per-IP traffic analysis and cannot tell you whether traffic from a specific source IP address is allowed or denied. The correct tool is Azure Network Watcher IP flow verify.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/network-watcher/ip-flow-verify-overview",
  },
];

export default az305tf;