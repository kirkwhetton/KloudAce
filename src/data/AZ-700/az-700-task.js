// AZ-700 — Task / Script (CLI & PowerShell lab questions)
// Cards: AZ-700-T-101 … AZ-700-T-110

const az700task = [
  {
    id: "AZ-700-T-101",
    exam: "AZ-700",
    type: "task",
    taskType: "script",
    shell: "bash",
    difficulty: "medium",
    category: "Security & Monitoring",
    question:
      "Create a Network Security Group named `AppNSG` in resource group `NetRG` (region `eastus`), then add an inbound rule named `AllowHTTPS` that allows TCP port 443 from any source with priority `100`.",
    modelAnswer:
      "az network nsg create --resource-group NetRG --name AppNSG --location eastus\naz network nsg rule create --resource-group NetRG --nsg-name AppNSG --name AllowHTTPS --priority 100 --protocol Tcp --destination-port-ranges 443 --access Allow --direction Inbound",
    requiredTokens: [
      { label: "az network nsg create",        accept: ["az network nsg create"] },
      { label: "--name AppNSG",                accept: ["--name appnsg", "-n appnsg"] },
      { label: "az network nsg rule create",   accept: ["az network nsg rule create"] },
      { label: "--nsg-name AppNSG",            accept: ["--nsg-name appnsg"] },
      { label: "--name AllowHTTPS",            accept: ["--name allowhttps", "-n allowhttps"] },
      { label: "--priority 100",               accept: ["--priority 100"] },
      { label: "--destination-port-ranges 443", accept: ["--destination-port-ranges 443", "--destination-port-range 443"] },
      { label: "--access Allow",               accept: ["--access allow"] },
      { label: "--direction Inbound",          accept: ["--direction inbound"] },
    ],
    helpText: `az network nsg create — Create a Network Security Group
az network nsg rule create — Add a rule to an NSG

CREATE NSG:
  az network nsg create -g <RG> -n <NSG_NAME> -l <LOCATION>

ADD RULE:
  az network nsg rule create -g <RG> --nsg-name <NSG>
    -n <RULE_NAME> --priority <NUM> --protocol <Tcp|Udp|*>
    --destination-port-ranges <PORT> --access <Allow|Deny>
    --direction <Inbound|Outbound>

KEY FLAGS:
  --priority              100-4096 (lower = evaluated first)
  --destination-port-ranges  Single port, range (80-443), or *
  --access                Allow or Deny
  --direction             Inbound or Outbound

EXAMPLE:
  az network nsg create -g NetRG -n AppNSG -l eastus
  az network nsg rule create -g NetRG --nsg-name AppNSG \
    -n AllowHTTPS --priority 100 --protocol Tcp \
    --destination-port-ranges 443 --access Allow --direction Inbound`,
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/manage-network-security-group",
  },
  {
    id: "AZ-700-T-102",
    exam: "AZ-700",
    type: "task",
    taskType: "script",
    shell: "powershell",
    difficulty: "hard",
    category: "Hybrid Connectivity",
    question:
      "Using the 'New-AzVirtualNetworkGateway' PowerShell command, create a VPN Gateway named `HubVpnGw` in resource group `NetRG`. The gateway should use the existing public IP `HubVpnGwPip` and the GatewaySubnet from VNet `HubVNet`. Set the gateway type to `Vpn`, VPN type to `RouteBased`, and SKU to `VpnGw1`.",
    modelAnswer:
      "New-AzVirtualNetworkGateway -ResourceGroupName NetRG -Name HubVpnGw -Location eastus -IpConfigurations (New-AzVirtualNetworkGatewayIpConfig -Name gwipconfig -SubnetId (Get-AzVirtualNetworkSubnetConfig -Name GatewaySubnet -VirtualNetwork (Get-AzVirtualNetwork -Name HubVNet -ResourceGroupName NetRG)).Id -PublicIpAddressId (Get-AzPublicIpAddress -Name HubVpnGwPip -ResourceGroupName NetRG).Id) -GatewayType Vpn -VpnType RouteBased -Sku VpnGw1",
    requiredTokens: [
      { label: "New-AzVirtualNetworkGateway",  accept: ["new-azvirtualnetworkgateway"] },
      { label: "-ResourceGroupName NetRG",     accept: ["-resourcegroupname netrg"] },
      { label: "-Name HubVpnGw",               accept: ["-name hubvpngw"] },
      { label: "-GatewayType Vpn",             accept: ["-gatewaytype vpn"] },
      { label: "-VpnType RouteBased",          accept: ["-vpntype routebased"] },
      { label: "-Sku VpnGw1",                  accept: ["-sku vpngw1"] },
    ],
    helpText: `New-AzVirtualNetworkGateway — Create a VPN or ExpressRoute gateway

USAGE:
  New-AzVirtualNetworkGateway
    -ResourceGroupName <RG>
    -Name <GW_NAME>
    -Location <REGION>
    -IpConfigurations <GatewayIpConfig[]>
    -GatewayType <Vpn|ExpressRoute>
    -VpnType <RouteBased|PolicyBased>
    -Sku <VpnGw1|VpnGw2|VpnGw3|...>

BUILD IpConfig HELPER:
  $subnet = (Get-AzVirtualNetwork -Name HubVNet -ResourceGroupName NetRG |
             Get-AzVirtualNetworkSubnetConfig -Name GatewaySubnet)
  $pip    = Get-AzPublicIpAddress -Name HubVpnGwPip -ResourceGroupName NetRG
  $gwIp   = New-AzVirtualNetworkGatewayIpConfig -Name gwipconfig \`
              -SubnetId $subnet.Id -PublicIpAddressId $pip.Id

KEY PARAMETERS:
  -GatewayType   Vpn (site-to-site/P2S) or ExpressRoute
  -VpnType       RouteBased (recommended) or PolicyBased
  -Sku           VpnGw1 / VpnGw2 / VpnGw3 / VpnGw1AZ etc.

EXAMPLE:
  New-AzVirtualNetworkGateway -ResourceGroupName NetRG -Name HubVpnGw \`
    -Location eastus -IpConfigurations $gwIp \`
    -GatewayType Vpn -VpnType RouteBased -Sku VpnGw1`,
    learnUrl: "https://learn.microsoft.com/en-us/azure/vpn-gateway/tutorial-create-gateway-portal",
  },
  {
    id: "AZ-700-134",
    exam: "AZ-700",
    type: "task",
    taskType: "script",
    shell: "bash",
    difficulty: "medium",
    category: "Virtual Networking",
    question:
      "Create a Virtual Network named `CoreVNet` in resource group `NetRG`, located in `eastus`, with address space `10.0.0.0/16`, and add a subnet named `AppSubnet` with prefix `10.0.1.0/24`.",
    modelAnswer:
      "az network vnet create --resource-group NetRG --name CoreVNet --location eastus --address-prefixes 10.0.0.0/16 --subnet-name AppSubnet --subnet-prefixes 10.0.1.0/24",
    requiredTokens: [
      { label: "az network vnet create",            accept: ["az network vnet create"] },
      { label: "--resource-group NetRG",             accept: ["--resource-group netrg", "-g netrg"] },
      { label: "--name CoreVNet",                    accept: ["--name corevnet", "-n corevnet"] },
      { label: "--location eastus",                  accept: ["--location eastus", "-l eastus"] },
      { label: "--address-prefixes 10.0.0.0/16",    accept: ["--address-prefixes 10.0.0.0/16", "--address-prefix 10.0.0.0/16"] },
      { label: "--subnet-name AppSubnet",            accept: ["--subnet-name appsubnet"] },
      { label: "--subnet-prefixes 10.0.1.0/24",     accept: ["--subnet-prefixes 10.0.1.0/24", "--subnet-prefix 10.0.1.0/24"] },
    ],
    helpText: `az network vnet create — Create a virtual network

USAGE:
  az network vnet create --resource-group <RG> --name <NAME>
    --location <LOCATION> --address-prefixes <CIDR>
    [--subnet-name <SUBNET>] [--subnet-prefixes <CIDR>]

KEY FLAGS:
  -g / --resource-group   Resource group name
  -n / --name             VNet name
  -l / --location         Azure region (e.g. eastus)
  --address-prefixes      Address space in CIDR notation
  --subnet-name           Name of an initial subnet
  --subnet-prefixes       CIDR for the initial subnet

EXAMPLE:
  az network vnet create -g NetRG -n CoreVNet -l eastus \
    --address-prefixes 10.0.0.0/16 \
    --subnet-name AppSubnet --subnet-prefixes 10.0.1.0/24`,
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/quick-create-cli",
  },
  // ─── Virtual Networking ───────────────────────────────────────────────────
  {
    id: "AZ-700-T-108",
    exam: "AZ-700",
    type: "task",
    taskType: "script",
    shell: "bash",
    difficulty: "hard",
    category: "Virtual Networking",
    question:
      "Create a bidirectional VNet peering between `HubVNet` and `SpokeVNet` (both in resource group `NetRG`). The Hub side must allow gateway transit. The Spoke side must use remote gateways. Enter both commands.",
    modelAnswer:
      "az network vnet peering create --resource-group NetRG --name HubToSpoke --vnet-name HubVNet --remote-vnet SpokeVNet --allow-vnet-access --allow-forwarded-traffic --allow-gateway-transit\naz network vnet peering create --resource-group NetRG --name SpokeToHub --vnet-name SpokeVNet --remote-vnet HubVNet --allow-vnet-access --use-remote-gateways",
    requiredTokens: [
      { label: "az network vnet peering create",   accept: ["az network vnet peering create"] },
      { label: "--vnet-name HubVNet",              accept: ["--vnet-name hubvnet"] },
      { label: "--remote-vnet SpokeVNet",          accept: ["--remote-vnet spokevnet"] },
      { label: "--allow-gateway-transit",          accept: ["--allow-gateway-transit"] },
      { label: "--vnet-name SpokeVNet",            accept: ["--vnet-name spokevnet"] },
      { label: "--remote-vnet HubVNet",            accept: ["--remote-vnet hubvnet"] },
      { label: "--use-remote-gateways",            accept: ["--use-remote-gateways"] },
    ],
    helpText: `az network vnet peering create — Create a VNet peering link

USAGE:
  az network vnet peering create
    -g / --resource-group <RG>
    -n / --name <PEERING_NAME>
    --vnet-name <LOCAL_VNET>
    --remote-vnet <REMOTE_VNET>
    [--allow-vnet-access]
    [--allow-forwarded-traffic]
    [--allow-gateway-transit]   Hub side — Hub shares its gateway with the spoke
    [--use-remote-gateways]     Spoke side — Spoke uses the Hub's gateway

KEY NOTES:
  - Peering is NOT bidirectional from a single command
  - Run the command TWICE: once from each VNet's perspective
  - --allow-gateway-transit goes on the Hub-side peering link
  - --use-remote-gateways goes on the Spoke-side peering link
  - Both flags must be set, on their respective links, for transit to work

EXAMPLE:
  # Hub → Spoke
  az network vnet peering create -g NetRG -n HubToSpoke \\
    --vnet-name HubVNet --remote-vnet SpokeVNet \\
    --allow-vnet-access --allow-forwarded-traffic --allow-gateway-transit

  # Spoke → Hub
  az network vnet peering create -g NetRG -n SpokeToHub \\
    --vnet-name SpokeVNet --remote-vnet HubVNet \\
    --allow-vnet-access --use-remote-gateways`,
    explanation:
      "VNet peering must be created in both directions — Azure does not automatically create the return link. The gateway transit flags are asymmetric: --allow-gateway-transit belongs on the Hub-side link (the Hub is offering its gateway), while --use-remote-gateways belongs on the Spoke-side link (the Spoke is consuming it). Setting --use-remote-gateways without --allow-gateway-transit on the Hub side, or vice versa, leaves the spoke unable to reach on-premises.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview",
  },
  {
    id: "AZ-700-T-109",
    exam: "AZ-700",
    type: "task",
    taskType: "order",
    difficulty: "medium",
    category: "Virtual Networking",
    question:
      "You need to restrict an Azure Storage Account so that only VMs in `AppSubnet` (10.0.1.0/24) can reach it — no public internet access. Arrange the steps to configure this correctly using Service Endpoints.",
    steps: [
      "Enable the Microsoft.Storage service endpoint on AppSubnet within the VNet",
      "Open the Storage Account networking settings and set 'Allow access from' to 'Selected networks'",
      "Add AppSubnet as a virtual network rule on the Storage Account firewall",
      "Verify connectivity from a VM in AppSubnet and confirm public access is denied",
    ],
    explanation:
      "The service endpoint must be enabled on the subnet first — this extends the VNet's identity to the Storage service so Azure can enforce a subnet-scoped firewall rule. Only then can the subnet be selected as a valid virtual network rule on the storage account. Switching access to 'Selected networks' before adding the subnet rule would temporarily block all access, so configuring the rule immediately after is the correct sequence. Testing last confirms both that the allowed path works and that the public path is correctly denied.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-service-endpoints-overview",
  },

  // ─── Domain 1: Hybrid Networking ─────────────────────────────────────────
  {
    id: "AZ-700-T-103",
    exam: "AZ-700",
    type: "task",
    taskType: "script",
    shell: "bash",
    difficulty: "hard",
    category: "Hybrid Connectivity",
    question:
      "Create a Local Network Gateway named `OnPremGW` in resource group `NetRG` (region `eastus`) representing an on-premises site with public IP `203.0.113.10` and address space `192.168.0.0/16`. Then create a Site-to-Site VPN connection named `HubToOnPrem` connecting the existing VPN Gateway `HubVpnGw` to this Local Network Gateway, using shared key `Str0ngSecret!` and connection type `IPsec`.",
    modelAnswer:
      "az network local-gateway create --resource-group NetRG --name OnPremGW --location eastus --gateway-ip-address 203.0.113.10 --local-address-prefixes 192.168.0.0/16\naz network vpn-connection create --resource-group NetRG --name HubToOnPrem --location eastus --vnet-gateway1 HubVpnGw --local-gateway2 OnPremGW --shared-key Str0ngSecret! --connection-type IPsec",
    requiredTokens: [
      { label: "az network local-gateway create",          accept: ["az network local-gateway create"] },
      { label: "--gateway-ip-address 203.0.113.10",        accept: ["--gateway-ip-address 203.0.113.10"] },
      { label: "--local-address-prefixes 192.168.0.0/16",  accept: ["--local-address-prefixes 192.168.0.0/16", "--local-address-prefix 192.168.0.0/16"] },
      { label: "az network vpn-connection create",         accept: ["az network vpn-connection create"] },
      { label: "--vnet-gateway1 HubVpnGw",                 accept: ["--vnet-gateway1 hubvpngw"] },
      { label: "--local-gateway2 OnPremGW",                accept: ["--local-gateway2 onpremgw"] },
      { label: "--shared-key",                             accept: ["--shared-key"] },
      { label: "--connection-type IPsec",                  accept: ["--connection-type ipsec"] },
    ],
    helpText: `az network local-gateway create — Define an on-premises site for S2S VPN
az network vpn-connection create — Connect a VNet Gateway to a Local Gateway

LOCAL GATEWAY:
  az network local-gateway create -g <RG> -n <NAME> -l <LOC>
    --gateway-ip-address <PUBLIC_IP>
    --local-address-prefixes <CIDR> [<CIDR2> ...]

VPN CONNECTION:
  az network vpn-connection create -g <RG> -n <NAME> -l <LOC>
    --vnet-gateway1 <GW_NAME>
    --local-gateway2 <LNG_NAME>
    --shared-key <PSK>
    --connection-type IPsec

KEY NOTES:
  - Local Network Gateway represents the on-premises side
  - --gateway-ip-address is the on-premises router's public IP
  - --vnet-gateway1 must already exist (created separately)
  - Connection type for S2S is always IPsec

EXAMPLE:
  az network local-gateway create -g NetRG -n OnPremGW -l eastus \\
    --gateway-ip-address 203.0.113.10 \\
    --local-address-prefixes 192.168.0.0/16
  az network vpn-connection create -g NetRG -n HubToOnPrem -l eastus \\
    --vnet-gateway1 HubVpnGw --local-gateway2 OnPremGW \\
    --shared-key Str0ngSecret! --connection-type IPsec`,
    explanation:
      "A Site-to-Site VPN requires two resources: a Local Network Gateway that models the on-premises router (public IP + address prefixes) and a VPN Connection that links your Azure VPN Gateway to it. The shared key (PSK) must match on both ends for IKE negotiation to succeed.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/vpn-gateway/tutorial-site-to-site-portal",
  },

  // ─── Domain 2: Core Networking Infrastructure ─────────────────────────────
  {
    id: "AZ-700-T-104",
    exam: "AZ-700",
    type: "task",
    taskType: "match",
    difficulty: "medium",
    category: "Virtual Networking",
    question:
      "Match each VNet Peering setting to its correct effect when enabled on a peering link.",
    pairs: [
      {
        left:  "Allow gateway transit",
        right: "Lets the remote peer VNet use this VNet's gateway for external connectivity",
      },
      {
        left:  "Use remote gateways",
        right: "Routes this VNet's traffic out through the peer VNet's gateway",
      },
      {
        left:  "Allow forwarded traffic",
        right: "Accepts traffic that originated outside the peer VNet (e.g. from a spoke via hub)",
      },
      {
        left:  "Allow virtual network access",
        right: "Enables private-IP communication between VMs in both VNets",
      },
    ],
    explanation:
      "Gateway transit lets a hub share its VPN/ER gateway with spokes — spokes enable 'Use remote gateways'. Forwarded traffic is needed in hub-spoke topologies where traffic from one spoke passes through the hub NVA before reaching another spoke. Virtual network access is on by default and is what actually allows the peered VNets to communicate.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview",
  },

  // ─── Domain 3: Routing ────────────────────────────────────────────────────
  {
    id: "AZ-700-T-105",
    exam: "AZ-700",
    type: "task",
    taskType: "order",
    difficulty: "medium",
    category: "Routing",
    question:
      "You need to force all internet-bound traffic from a workload subnet through Azure Firewall using a User-Defined Route. Arrange the steps in the correct sequence.",
    steps: [
      "Create a route table with az network route-table create in the same region as the VNet",
      "Add a 0.0.0.0/0 route with next hop type VirtualAppliance pointing to the Firewall private IP",
      "Associate the route table with the workload subnet",
      "Review effective routes on a VM NIC to confirm the custom route is active",
    ],
    explanation:
      "The route table must exist before routes can be added to it, and must be associated with the subnet before it takes effect. Checking effective routes is the final verification step — it shows whether Azure applied the UDR or if a system route is overriding it. Azure Firewall must have IP forwarding enabled on its NIC, which is handled automatically when the Firewall resource is provisioned.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/firewall/tutorial-firewall-deploy-portal",
  },

  // ─── Domain 4: Security & Monitoring ─────────────────────────────────────
  {
    id: "AZ-700-T-106",
    exam: "AZ-700",
    type: "task",
    taskType: "script",
    shell: "bash",
    difficulty: "hard",
    category: "Security & Monitoring",
    question:
      "Enable NSG flow logs on the Network Security Group `AppNSG` (resource group `NetRG`, region `eastus`). Logs should be sent to the storage account `diagstorage`, flow logging should be enabled, and logs retained for `90` days.",
    modelAnswer:
      "az network watcher flow-log create --location eastus --name AppNSGFlowLog --nsg AppNSG --resource-group NetRG --storage-account diagstorage --enabled true --retention 90",
    requiredTokens: [
      { label: "az network watcher flow-log create",  accept: ["az network watcher flow-log create"] },
      { label: "--nsg AppNSG",                         accept: ["--nsg appnsg"] },
      { label: "--storage-account diagstorage",        accept: ["--storage-account diagstorage"] },
      { label: "--enabled true",                       accept: ["--enabled true"] },
      { label: "--retention 90",                       accept: ["--retention 90"] },
      { label: "--location eastus",                    accept: ["--location eastus", "-l eastus"] },
    ],
    helpText: `az network watcher flow-log create — Enable NSG flow logs

USAGE:
  az network watcher flow-log create
    --location <REGION>           (region where Network Watcher exists)
    --name <FLOW_LOG_NAME>
    --nsg <NSG_NAME>
    --resource-group <RG>         (NSG's resource group)
    --storage-account <SA_NAME>
    --enabled <true|false>
    [--retention <DAYS>]          (0 = forever, 1-365)
    [--log-version <1|2>]         (v2 includes byte/packet counts per flow)

KEY NOTES:
  - Network Watcher must exist in the same region as the NSG
  - Storage account must be in the same subscription
  - Use --log-format JSON (default) or --log-version 2 for richer data
  - Flow logs are written to the storage account under a fixed blob path

EXAMPLE:
  az network watcher flow-log create \\
    -l eastus -n AppNSGFlowLog --nsg AppNSG \\
    -g NetRG --storage-account diagstorage \\
    --enabled true --retention 90`,
    explanation:
      "NSG flow logs capture which IPs and ports were allowed or denied by an NSG. They are managed through Azure Network Watcher and stored in a Storage Account blob container. Retention days controls auto-deletion; setting 0 keeps logs indefinitely. Version 2 flow logs also record byte and packet counts, useful for anomaly detection.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/network-watcher/network-watcher-nsg-flow-logging-overview",
  },

  // ─── Domain 5: Private Access ─────────────────────────────────────────────
  {
    id: "AZ-700-T-107",
    exam: "AZ-700",
    type: "task",
    taskType: "match",
    difficulty: "medium",
    category: "Private Access",
    question:
      "Match each Azure service to the Private DNS zone that must be linked to your VNet for Private Endpoint DNS resolution to work.",
    pairs: [
      {
        left:  "Azure Blob Storage",
        right: "privatelink.blob.core.windows.net",
      },
      {
        left:  "Azure Key Vault",
        right: "privatelink.vaultcore.azure.net",
      },
      {
        left:  "Azure SQL Database",
        right: "privatelink.database.windows.net",
      },
      {
        left:  "Azure Container Registry",
        right: "privatelink.azurecr.io",
      },
    ],
    explanation:
      "When a Private Endpoint is created, the service's public FQDN (e.g. myaccount.blob.core.windows.net) must resolve to the endpoint's private IP inside your VNet. Azure creates a CNAME to the privatelink subdomain (e.g. myaccount.privatelink.blob.core.windows.net), and the matching Private DNS Zone holds the A record. The zone must be linked to every VNet that needs resolution — without this link, clients still resolve the public IP.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-dns",
  },
  {
    id: "AZ-700-T-110",
    exam: "AZ-700",
    type: "task",
    taskType: "match",
    difficulty: "medium",
    category: "Hybrid Connectivity",
    question:
      "Match each ExpressRoute encryption approach to the correct description of its scope and requirements.",
    pairs: [
      {
        left:  "MACsec",
        right: "Layer 2 link encryption between the customer edge router and MSEE — requires ExpressRoute Direct",
      },
      {
        left:  "IPsec over ExpressRoute private peering",
        right: "End-to-end Layer 3 encryption through the Azure backbone — requires a VPN Gateway in Azure",
      },
      {
        left:  "Standard ExpressRoute (no encryption)",
        right: "Private connection through Microsoft's backbone — traffic is unencrypted at the network layer",
      },
      {
        left:  "Site-to-Site VPN without ExpressRoute",
        right: "Encrypted IKE/IPsec tunnel — travels over the public internet with no dedicated circuit",
      },
    ],
    explanation:
      "MACsec operates at Layer 2 and is only available on ExpressRoute Direct, where the customer's router has a direct physical connection to the MSEE — provider-managed circuits don't expose this link. IPsec over ExpressRoute private peering layers a VPN tunnel inside the circuit, so traffic is encrypted end-to-end even though the circuit itself is unencrypted; a VPN Gateway in Azure terminates the tunnel. Standard ExpressRoute without either option is private but not encrypted — suitable when network isolation is sufficient. A standard Site-to-Site VPN provides encryption but uses the public internet rather than a dedicated circuit, giving less predictable latency.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/expressroute/expressroute-about-encryption",
  },
];

export default az700task;
