// AZ-900 — Multi-Select
// Cards: AZ-900-143, 144

const az900multi = [
  {
    id: "AZ-900-143",
    difficulty: "easy",
    exam: "AZ-900",
    type: "multi",
    category: "Management & Governance",
    question: "Which of the following are features of Azure Policy? (Select all that apply)",
    choices: [
      "Enforce organisational standards by auditing or denying non-compliant resources",
      "Automatically remediate non-compliant resources using DeployIfNotExists policy effects",
      "Replace Azure RBAC as the mechanism for controlling who can access resources",
      "Assign policies at management group, subscription, or resource group scope",
      "Generate a compliance score showing the percentage of compliant resources",
    ],
    correctAnswers: [
      "Enforce organisational standards by auditing or denying non-compliant resources",
      "Automatically remediate non-compliant resources using DeployIfNotExists policy effects",
      "Assign policies at management group, subscription, or resource group scope",
      "Generate a compliance score showing the percentage of compliant resources",
    ],
    answer:
      "Azure Policy audits/enforces standards, auto-remediates via DeployIfNotExists, scopes at multiple levels, and reports a compliance score. It does NOT replace RBAC.",
    explanation:
      "Azure Policy controls WHAT resources look like (configuration compliance). RBAC controls WHO can do what (access control). They are complementary, not interchangeable. DeployIfNotExists is a powerful Policy effect that automatically deploys a resource — for example, enabling diagnostic settings on every new VM — when a non-compliant resource is detected.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/governance/policy/overview",
  },
  {
    id: "AZ-900-144",
    difficulty: "easy",
    exam: "AZ-900",
    type: "multi",
    category: "Cloud Concepts",
    question: "Which of the following are recognised benefits of cloud computing compared to on-premises infrastructure? (Select all that apply)",
    choices: [
      "Trade capital expenditure (CapEx) for operational expenditure (OpEx)",
      "Benefit from economies of scale",
      "Stop guessing capacity — scale resources on demand",
      "Eliminate all security responsibilities by moving to the cloud",
      "Go global in minutes by deploying to multiple Azure regions",
    ],
    correctAnswers: [
      "Trade capital expenditure (CapEx) for operational expenditure (OpEx)",
      "Benefit from economies of scale",
      "Stop guessing capacity — scale resources on demand",
      "Go global in minutes by deploying to multiple Azure regions",
    ],
    answer:
      "Cloud benefits include CapEx→OpEx shift, economies of scale, on-demand scaling, and global reach. Security is NEVER fully eliminated — it is a shared responsibility.",
    explanation:
      "The shared responsibility model means you never hand off all security to the provider. Microsoft handles physical security, network infrastructure, and the hypervisor. You remain responsible for your data, identities, access controls, and application security. All other options are genuine cloud benefits cited in AZ-900 exam objectives.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/strategy/cloud-concepts",
  },
];

export default az900multi;
