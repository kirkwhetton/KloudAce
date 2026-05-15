// AZ-700 — Task / Script (CLI & PowerShell lab questions)
// Cards: AZ-700-123, 124, 125

const az700task = [
  {
    id: "AZ-700-123",
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
    id: "AZ-700-124",
    exam: "AZ-700",
    type: "task",
    taskType: "script",
    shell: "powershell",
    difficulty: "hard",
    category: "Hybrid Connectivity",
    question:
      "Using PowerShell, create a VPN Gateway named `HubVpnGw` in resource group `NetRG`. The gateway should use the existing public IP `HubVpnGwPip` and the GatewaySubnet from VNet `HubVNet`. Set the gateway type to `Vpn`, VPN type to `RouteBased`, and SKU to `VpnGw1`.",
    modelAnswer:
      "New-AzVirtualNetworkGateway -ResourceGroupName NetRG -Name HubVpnGw -Location eastus -IpConfigurations (New-AzVirtualNetworkGatewayIpConfig -Name gwipconfig -SubnetId (Get-AzVirtualNetworkSubnetConfig -Name GatewaySubnet -VirtualNetwork (Get-AzVirtualNetwork -Name HubVNet -ResourceGroupName NetRG)).Id -PublicIpAddressId (Get-AzPublicIpAddress -Name HubVpnGwPip -ResourceGroupName NetRG).Id) -GatewayType Vpn -VpnType RouteBased -Sku VpnGw1",
    requiredTokens: [
      { label: "New-AzVirtualNetworkGateway",  accept: ["new-azvirtualnetworkgateway"] },
      { label: "-ResourceGroupName NetRG",      accept: ["-resourcegroupname netrg"] },
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
    id: "AZ-700-125",
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
];

export default az700task;
