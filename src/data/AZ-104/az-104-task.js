// AZ-104 — Task Simulator cards (fill-in, order, match, script)
// Cards: AZ-104-090, 091, 092, 093, 094, 095, 096, 097, 098, 099
const az104task = [
  {
    id: "AZ-104-090",
    type: "task",
    taskType: "fill-in",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Compute",
    question:
      "Complete the Azure CLI command to create a Linux VM named 'myVM' in resource group 'myRG' using the UbuntuLTS image.",
    blanks: [
      { label: "az vm create \\", answer: "az vm create", hint: "az vm create" },
      { label: "--resource-group", answer: "myRG", hint: "resource group name" },
      { label: "--name", answer: "myVM", hint: "VM name" },
      { label: "--image", answer: "UbuntuLTS", hint: "image alias" },
    ],
    explanation:
      "The core flags for az vm create are --resource-group, --name, and --image. Without --admin-username and --generate-ssh-keys the command will also prompt for credentials, but these are the three mandatory positional flags you must always supply.",
    learnUrl: "https://learn.microsoft.com/en-us/cli/azure/vm#az-vm-create",
  },
  {
    id: "AZ-104-091",
    type: "task",
    taskType: "fill-in",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Storage",
    question:
      "Complete the Azure CLI command to upload a file 'report.pdf' to a blob container named 'docs' in storage account 'mystorage'.",
    blanks: [
      { label: "Command", answer: "az storage blob upload", hint: "az storage blob …" },
      { label: "--account-name", answer: "mystorage", hint: "storage account name" },
      { label: "--container-name", answer: "docs", hint: "container name" },
      { label: "--file", answer: "report.pdf", hint: "local filename" },
    ],
    explanation:
      "az storage blob upload pushes a local file to Blob Storage. With Owner or Contributor rights, the CLI silently fetches the account key via the management plane (listKeys), so no --account-key flag is needed. For least-privilege identities (e.g. a Service Principal with Storage Blob Data Contributor), add --auth-mode login instead. You can also add --name to override the blob name; otherwise the local filename is used.",
    learnUrl: "https://learn.microsoft.com/en-us/cli/azure/storage/blob#az-storage-blob-upload",
  },
  {
    id: "AZ-104-092",
    type: "task",
    taskType: "order",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Networking",
    question:
      "Put the steps in the correct order to create a Site-to-Site VPN connection from an on-premises network to an Azure VNet.",
    steps: [
      "Create a Virtual Network (VNet) in Azure",
      "Add a Gateway Subnet to the VNet",
      "Create a Virtual Network Gateway (VPN type)",
      "Create a Local Network Gateway representing the on-premises device",
      "Create the VPN Connection linking both gateways",
    ],
    explanation:
      "The Gateway Subnet must exist before a VNet Gateway can be deployed (Azure enforces this). The VNet Gateway provisions the Azure-side VPN endpoint. The Local Network Gateway defines the on-premises IP and address space. Finally, the Connection resource ties both gateways together and establishes the IPsec tunnel.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/vpn-gateway/tutorial-site-to-site-portal",
  },
  {
    id: "AZ-104-093",
    type: "task",
    taskType: "order",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Identity",
    question:
      "Put the steps in the correct order to assign an Azure RBAC role to a user at the resource group scope.",
    steps: [
      "Open the target resource group in the Azure portal",
      "Navigate to Access control (IAM)",
      "Click Add > Add role assignment",
      "Select the role (e.g. Contributor)",
      "Select the member (user, group, or service principal)",
      "Review and assign",
    ],
    explanation:
      "RBAC role assignments are always done through Access control (IAM) on the target scope (management group, subscription, resource group, or resource). You choose the role first, then the principal, then confirm. The assignment takes effect within a few minutes.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal",
  },
  {
    id: "AZ-104-094",
    type: "task",
    taskType: "match",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Storage",
    question: "Match each Azure Storage redundancy option to its correct description.",
    pairs: [
      { left: "LRS", right: "3 copies in a single datacenter" },
      { left: "ZRS", right: "3 copies across availability zones in one region" },
      { left: "GRS", right: "LRS in primary + async LRS copy in a secondary region" },
      { left: "GZRS", right: "ZRS in primary + async LRS copy in a secondary region" },
    ],
    explanation:
      "LRS is the cheapest option but has no redundancy against datacenter failure. ZRS protects against datacenter failure within a region. GRS adds geographic protection but stores the primary copies in a single datacenter (LRS). GZRS offers the highest durability by combining zone-level and geo-level redundancy.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy",
  },
  {
    id: "AZ-104-095",
    type: "task",
    taskType: "match",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Compute",
    question: "Match each Azure compute service to its correct service model.",
    pairs: [
      { left: "Azure Virtual Machines", right: "IaaS — you manage OS, runtime, and app" },
      { left: "Azure App Service", right: "PaaS — managed OS; you deploy code only" },
      { left: "Azure Container Apps", right: "Serverless containers — scale to zero" },
      { left: "Azure Functions", right: "FaaS — event-driven, consumption billing" },
    ],
    explanation:
      "The key distinction is where the management boundary sits. VMs give you the most control (and most responsibility). App Service abstracts the OS. Container Apps sits between PaaS and serverless. Functions are fully event-driven and billed per execution.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/compute-decision-tree",
  },
  {
    id: "AZ-104-096",
    type: "task",
    taskType: "fill-in",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Storage",
    question:
      "You need to upload 'report.pdf' to Azure Blob Storage using the CLI. The values are given — fill in the correct CLI command and parameter flag for each one.",
    blanks: [
      { label: "Base command", answer: "az storage blob upload", hint: "az storage …" },
      { label: "Value: 'mystorage'", answer: "--account-name", hint: "flag that accepts the storage account name" },
      { label: "Value: 'docs'", answer: "--container-name", hint: "flag that accepts the container name" },
      { label: "Value: 'report.pdf'", answer: "--file", hint: "flag that accepts the local file path" },
    ],
    explanation:
      "az storage blob upload is the base command. --account-name targets the storage account, --container-name selects the destination container, and --file provides the local path. With Owner or Contributor rights the CLI automatically retrieves the account key (listKeys), so the command works as-is. For least-privilege scenarios, add --auth-mode login and ensure the identity has Storage Blob Data Contributor.",
    learnUrl: "https://learn.microsoft.com/en-us/cli/azure/storage/blob#az-storage-blob-upload",
  },
  {
    id: "AZ-104-097",
    type: "task",
    taskType: "script",
    shell: "bash",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Compute",
    question:
      "Write the Azure CLI command to create a Linux VM named 'prodVM' in resource group 'prodRG' using the Ubuntu2204 image. Generate SSH keys automatically.",
    placeholder: "az vm create ...",
    requiredTokens: [
      { label: "az vm create", accept: ["az vm create"] },
      { label: "--resource-group prodRG", accept: ["--resource-group prodrg", "-g prodrg"] },
      { label: "--name prodVM", accept: ["--name prodvm", "-n prodvm"] },
      { label: "--image Ubuntu2204", accept: ["--image ubuntu2204"] },
      { label: "--generate-ssh-keys", accept: ["--generate-ssh-keys"] },
    ],
    helpText: `Command
    az vm create

Arguments
    --name -n        [Required] : Name of the virtual machine.
    --resource-group -g [Required] : Name of resource group.
    --image          [Required] : OS image (e.g. Ubuntu2204, Win2022Datacenter).
    --admin-username            : Username for the VM. Default: current OS user.
    --generate-ssh-keys         : Generate SSH public and private key files if missing.
    --size                      : VM size. Default: Standard_DS1_v2.
    --location -l               : Location. Default: resource group location.

Examples
    # Create a simple Linux VM
    az vm create -n myVM -g myRG --image Ubuntu2204 --generate-ssh-keys`,
    modelAnswer:
      "az vm create \\\n  --resource-group prodRG \\\n  --name prodVM \\\n  --image Ubuntu2204 \\\n  --generate-ssh-keys",
    explanation:
      "az vm create is the core command. --resource-group and --name are always mandatory. --image sets the OS; Ubuntu2204 is the current LTS alias. --generate-ssh-keys creates an RSA key pair automatically and stores the public key in ~/.ssh/id_rsa.pub if one does not already exist.",
    learnUrl: "https://learn.microsoft.com/en-us/cli/azure/vm#az-vm-create",
  },
  {
    id: "AZ-104-098",
    type: "task",
    taskType: "script",
    shell: "bash",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Networking",
    question:
      "Write the Azure CLI command to create a Virtual Network named 'myVNet' in resource group 'netRG', with address prefix 10.0.0.0/16, located in East US.",
    placeholder: "az network vnet create ...",
    requiredTokens: [
      { label: "az network vnet create", accept: ["az network vnet create"] },
      { label: "--resource-group netRG", accept: ["--resource-group netrg", "-g netrg"] },
      { label: "--name myVNet", accept: ["--name myvnet", "-n myvnet"] },
      { label: "--address-prefix 10.0.0.0/16", accept: ["--address-prefix 10.0.0.0/16"] },
      { label: "--location eastus", accept: ["--location eastus", "-l eastus"] },
    ],
    helpText: `Command
    az network vnet create

Arguments
    --name -n        [Required] : Name of the virtual network.
    --resource-group -g [Required] : Name of resource group.
    --address-prefix            : IP address prefix in CIDR notation. Default: 10.0.0.0/16.
    --location -l               : Location. Default: resource group location.
    --subnet-name               : Name of a new subnet to create within the VNet.
    --subnet-prefix             : IP address prefix for the new subnet.
    --dns-servers               : Space-separated list of DNS server IP addresses.

Examples
    # Create a VNet with a custom address space
    az network vnet create -n myVNet -g myRG --address-prefix 10.0.0.0/16 --location eastus`,
    modelAnswer:
      "az network vnet create \\\n  --resource-group netRG \\\n  --name myVNet \\\n  --address-prefix 10.0.0.0/16 \\\n  --location eastus",
    explanation:
      "az network vnet create provisions a new Virtual Network. --address-prefix defines the overall IP space in CIDR notation. --location must match the region where your resource group or resources reside. You can later add subnets with az network vnet subnet create.",
    learnUrl:
      "https://learn.microsoft.com/en-us/cli/azure/network/vnet#az-network-vnet-create",
  },
  {
    id: "AZ-104-099",
    type: "task",
    taskType: "script",
    shell: "powershell",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Identity",
    question:
      "Write the PowerShell command to assign the 'Contributor' role to a user with object ID 'aaaa-1111' scoped to subscription ID 'bbbb-2222'.",
    placeholder: "New-AzRoleAssignment ...",
    requiredTokens: [
      { label: "New-AzRoleAssignment", accept: ["new-azroleassignment"] },
      { label: "-ObjectId aaaa-1111", accept: ["-objectid aaaa-1111"] },
      { label: "-RoleDefinitionName Contributor", accept: ["-roledefinitionname contributor"] },
      { label: "-Scope /subscriptions/bbbb-2222", accept: ["-scope /subscriptions/bbbb-2222"] },
    ],
    helpText: `NAME
    New-AzRoleAssignment

SYNOPSIS
    Assigns an Azure RBAC role to a principal at a given scope.

SYNTAX
    New-AzRoleAssignment
        -ObjectId <String>
        -RoleDefinitionName <String>
        -Scope <String>
        [-Description <String>]
        [-Condition <String>]

PARAMETERS
    -ObjectId <String>
        The Entra ID object ID of the user, group, or service principal.

    -RoleDefinitionName <String>
        Name of the built-in or custom role (e.g. Owner, Contributor, Reader).

    -Scope <String>
        The scope of the assignment. Examples:
          /subscriptions/{id}
          /subscriptions/{id}/resourceGroups/{rg}
          /subscriptions/{id}/resourceGroups/{rg}/providers/...

EXAMPLES
    # Assign Contributor at subscription scope
    New-AzRoleAssignment -ObjectId 'aaaa-0000' \`
        -RoleDefinitionName 'Contributor' \`
        -Scope '/subscriptions/bbbb-1111'`,
    modelAnswer:
      "New-AzRoleAssignment `\n  -ObjectId 'aaaa-1111' `\n  -RoleDefinitionName 'Contributor' `\n  -Scope '/subscriptions/bbbb-2222'",
    explanation:
      "New-AzRoleAssignment creates an RBAC role assignment. -ObjectId is the Entra ID object ID of the principal (user, group, or service principal). -RoleDefinitionName accepts built-in role names like Contributor, Reader, or Owner. -Scope defines where the assignment applies — /subscriptions/{id} covers the entire subscription.",
    learnUrl:
      "https://learn.microsoft.com/en-us/powershell/module/az.resources/new-azroleassignment",
  },
];

export default az104task;
