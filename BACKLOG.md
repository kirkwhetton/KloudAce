# KloudAce Backlog

A running list of feature ideas, labs, and improvements to pick up later.

---

## Portal Labs

### Virtual Network Gateway / Site-to-Site VPN lab (idea)
New Portal Lab for creating a Virtual Network Gateway, following the existing AZ-700 Load Balancer lab pattern (`src/labs/PortalSim/blades/`).

The lab should test:
1. That the user understands (or learns) that the VPN Gateway requires a dedicated subnet, named `GatewaySubnet`, with an appropriate size.
2. That the user knows (or learns) what needs to be configured end-to-end: VNet (with GatewaySubnet), Virtual Network Gateway, Local Network Gateway (on-prem side), and a Connection object linking the two gateways.
3. _TBD — to be filled in._

---
