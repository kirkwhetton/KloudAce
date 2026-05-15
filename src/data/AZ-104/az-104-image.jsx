// AZ-104 — Image MCQ cards (requires JSX for diagram components)
// Cards: AZ-104-027, 028
import { VNetNsgDiagram, StorageRedundancyDiagram } from "../diagrams.jsx";

const az104image = [
  {
    id: "AZ-104-027",
    type: "image-mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Networking",
    diagram: VNetNsgDiagram,
    imageAlt:
      "VNet diagram with two subnets, VM-A in Subnet-A with NSG-A blocking port 22, VM-B in Subnet-B with a question mark",
    question:
      "VM-B has a web app that should be reachable from the internet on port 443, but connections are failing. The red question mark indicates a missing resource. What should be added to fix this?",
    choices: [
      "A Network Security Group (NSG) on Subnet-B allowing inbound port 443",
      "A VPN Gateway in the VNet",
      "A second NIC on VM-B",
      "A VNet peering connection to Subnet-A",
    ],
    correctAnswer: 0,
    answer:
      "An NSG on Subnet-B (or VM-B's NIC) with an inbound rule allowing port 443 from the internet.",
    explanation:
      "By default, Azure denies all inbound internet traffic to a subnet unless explicitly allowed. VM-A's NSG blocks SSH (port 22) — similarly, Subnet-B needs an NSG rule to permit HTTPS (443). A VPN Gateway is for hybrid connectivity, a second NIC doesn't affect firewall rules, and peering only connects VNets internally.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview",
  },
  {
    id: "AZ-104-028",
    type: "image-mcq",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Storage",
    diagram: StorageRedundancyDiagram,
    imageAlt:
      "Storage redundancy diagram showing 3 copies across 3 zones in a primary region, plus 2 copies in a secondary paired region",
    question: "Which redundancy option does this diagram show?",
    choices: [
      "GRS — Geo-Redundant Storage",
      "ZRS — Zone-Redundant Storage",
      "GZRS — Geo-Zone-Redundant Storage",
      "LRS — Locally Redundant Storage",
    ],
    correctAnswer: 2,
    answer:
      "GZRS — Geo-Zone-Redundant Storage. 3 copies across availability zones in the primary region, plus asynchronous replication to a secondary region.",
    explanation:
      "GZRS combines the best of ZRS and GRS: zone resilience in the primary region (protecting against datacenter failures) AND geographic redundancy (protecting against full region outages). GRS only uses LRS in the primary region (no zone spread). ZRS has no secondary region. LRS keeps all 3 copies in a single datacenter.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy",
  },
];

export default az104image;
