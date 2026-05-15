// AZ-104 — Multi-select cards
// Cards: AZ-104-021, 022, 023
const az104multi = [
  {
    id: "AZ-104-021",
    type: "multi",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Identity",
    question:
      "Which of the following are valid methods to assign Azure RBAC roles to users? (Select all that apply)",
    choices: [
      "Directly assign a role to a user account",
      "Assign a role to an Azure AD group, then add users to the group",
      "Assign a role to a managed identity",
      "Assign a role to an Azure subscription tag",
      "Assign a role to a service principal",
    ],
    correctAnswers: [
      "Directly assign a role to a user account",
      "Assign a role to an Azure AD group, then add users to the group",
      "Assign a role to a managed identity",
      "Assign a role to a service principal",
    ],
    answer:
      "RBAC roles can be assigned to users, groups, managed identities, and service principals. Tags are metadata labels — they cannot be security principals.",
    explanation:
      "The four valid security principal types in Azure RBAC are: user, group, managed identity, and service principal. Subscription tags are purely for resource organisation and billing — they play no role in access control.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview",
  },
  {
    id: "AZ-104-022",
    type: "multi",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Storage",
    question:
      "Which Azure Blob Storage access tiers incur an early deletion penalty if data is deleted before the minimum storage period? (Select all that apply)",
    choices: [
      "Hot",
      "Cool (30 days minimum)",
      "Cold (90 days minimum)",
      "Archive (180 days minimum)",
    ],
    correctAnswers: [
      "Cool (30 days minimum)",
      "Cold (90 days minimum)",
      "Archive (180 days minimum)",
    ],
    answer:
      "Cool, Cold, and Archive all have minimum storage periods — deleting early incurs a prorated penalty. Hot has no minimum.",
    explanation:
      "Hot tier is the most flexible — no minimum storage duration and no early deletion fee. Cool (30 days), Cold (90 days), and Archive (180 days) all penalise you if data is deleted, moved, or overwritten before their minimum period expires. This is important to factor in when designing tiering lifecycle policies.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview",
  },
  {
    id: "AZ-104-023",
    type: "multi",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Networking",
    question:
      "Which of the following are required to establish VNet Peering between two Azure Virtual Networks? (Select all that apply)",
    choices: [
      "Both VNets must be in the same Azure region",
      "The VNet address spaces must not overlap",
      "Peering must be created in both directions (A→B and B→A)",
      "Both VNets must be in the same Azure subscription",
      "A VPN Gateway must be deployed in each VNet",
    ],
    correctAnswers: [
      "The VNet address spaces must not overlap",
      "Peering must be created in both directions (A→B and B→A)",
    ],
    answer:
      "Non-overlapping address spaces and bi-directional peering links are the only hard requirements. VNets can be in different regions, subscriptions, and tenants — no gateway needed.",
    explanation:
      "VNet Peering is flexible: it supports cross-region (Global VNet Peering), cross-subscription, and even cross-tenant peering. The two non-negotiable requirements are: (1) address spaces must not overlap — Azure cannot route between ambiguous IP ranges, and (2) peering is not automatic in both directions — you must explicitly create the link from each side. A VPN Gateway is only needed for VPN-based connectivity, not peering.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview",
  },
];

export default az104multi;
