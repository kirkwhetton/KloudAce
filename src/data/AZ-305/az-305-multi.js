// AZ-305 — Multi-select questions
// Cards: AZ-305-M-101

const az305multi = [
  {
    id: "AZ-305-M-101",
    exam: "AZ-305",
    type: "multi",
    difficulty: "hard",
    category: "Design Identity, Governance and Monitoring Solutions",
    question:
      "You have an Entra ID tenant. External partner companies need access to an internal Azure-hosted web application. The solution must meet the following requirements:\n\n• Partners must authenticate using their own organisation's credentials — no accounts should be created in your tenant\n• Access must be automatically removed when a partner contract ends\n• Access requests and approvals must be auditable\n\nWhich two features should you include in the solution? Each correct answer presents part of the solution.",
    choices: [
      "Entra ID B2B collaboration",
      "Entra ID B2C",
      "Entra ID Privileged Identity Management (PIM)",
      "Entra ID entitlement management (access packages)",
      "Entra ID Application Proxy",
      "Conditional Access policies",
    ],
    correctAnswers: [
      "Entra ID B2B collaboration",
      "Entra ID entitlement management (access packages)",
    ],
    answer:
      "Entra ID B2B collaboration lets external partners sign in using their own organisation's identity — no guest accounts need to be manually created. Entitlement management (access packages) allows you to define what resources partners can access, set automatic expiry aligned to contract end dates, and maintain a full approval and audit trail.",
    explanation:
      "B2B collaboration federates authentication to the partner's own identity provider so partners never need credentials in your tenant. Entitlement management wraps access into packages with lifecycle policies: approval workflows, periodic access reviews, and automatic expiry — directly satisfying the 'remove access when contract ends' and 'auditable' requirements. Azure AD B2C (option B) is designed for consumer-facing applications, not organisation-to-organisation scenarios. PIM (option C) manages just-in-time elevation of privileged roles within your own tenant, not external partner access. Application Proxy (option E) publishes on-premises applications, not Azure-hosted ones. Conditional Access (option F) enforces access policies but does not provision or automatically expire partner access.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-overview",
  },
];

export default az305multi;
