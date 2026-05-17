// AZ-700 — Multi-select questions
// Cards: AZ-700-M-101

const az700multi = [
  {
    id: "AZ-700-M-101",
    exam: "AZ-700",
    type: "multi",
    difficulty: "medium",
    category: "Virtual Networking",
    question: "Which of the following IP addresses are RFC 1918 private addresses? (Select three)",
    choices: [
      "10.4.20.1",
      "172.20.15.8",
      "192.168.10.50",
      "172.32.10.5",
      "8.8.4.4",
      "104.18.22.45",
      "20.60.128.10",
    ],
    correctAnswers: [
      "10.4.20.1",
      "172.20.15.8",
      "192.168.10.50",
    ],
    answer:
      "The three RFC 1918 private ranges are 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. The other four addresses are publicly routable.",
    explanation:
      "RFC 1918 defines three private address blocks: 10.0.0.0–10.255.255.255 (/8), 172.16.0.0–172.31.255.255 (/12), and 192.168.0.0–192.168.255.255 (/16). A common trap is 172.32.10.5 — it starts with 172 but falls outside the /12 range, which only extends to 172.31.255.255, making it a public address. In Azure VNet design, all three RFC 1918 blocks are valid address spaces; traffic to these ranges is never routed over the internet.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-faq#what-address-ranges-can-i-use-in-my-vnets",
  },
];

export default az700multi;
