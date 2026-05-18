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

  // ── Find the Fault cards ────────────────────────────────
  {
    id: "AZ-104-100",
    type: "task",
    taskType: "fault",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Networking",
    question: "Web traffic to the subnet is being blocked. Review the NSG rules and identify the fault.",
    scenario:
`NSG: nsg-web  |  Applied to: subnet-web

Priority 100 → Inbound | Deny | Any protocol | Any source → Any port
Priority 200 → Inbound | Allow | TCP | Any source → port 443`,
    faults: [
      "The Allow HTTPS rule should use UDP instead of TCP for HTTPS traffic",
      "The Deny All rule at priority 100 is evaluated before the Allow HTTPS rule at priority 200",
      "NSG rules cannot use 'Any' as source — a specific CIDR range must be specified",
      "Inbound rules cannot filter by port number — use an Application Security Group instead",
    ],
    correctFault: "The Deny All rule at priority 100 is evaluated before the Allow HTTPS rule at priority 200",
    fix: "Set the Allow HTTPS rule to a priority lower than 100 (e.g. 90), so it is evaluated first.",
    explanation:
      "Azure NSG rules are processed in priority order — lower numbers first. The Deny All rule at priority 100 matches all inbound traffic before the Allow HTTPS rule at priority 200 is ever reached. Moving the Allow rule to priority 90 ensures port 443 is permitted.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview#security-rules",
  },
  {
    id: "AZ-104-101",
    type: "task",
    taskType: "fault",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Identity",
    question:
      "A service principal should only read blobs from one storage account, but it can access blobs across the entire subscription. Identify the fault in the role assignment command.",
    scenario:
`Goal: Grant 'sp-reporting-app' read access to blobs in 'analytics-store' only.

az role assignment create \\
  --assignee sp-reporting-app \\
  --role "Storage Blob Data Reader" \\
  --scope "/subscriptions/aaaa-1111"`,
    faults: [
      "'Storage Blob Data Reader' does not allow listing containers — use 'Storage Blob Data Contributor'",
      "Service principals cannot be assigned RBAC roles; use a managed identity instead",
      "The --scope is set to the subscription, granting read access to all storage accounts in the subscription",
      "az role assignment create requires --role-definition-id instead of --role for service principals",
    ],
    correctFault: "The --scope is set to the subscription, granting read access to all storage accounts in the subscription",
    fix:
      "Set --scope to the full ARM resource ID of the storage account instead of the subscription. Use the format: /subscriptions/{id}/resourceGroups/{rg}/providers/Microsoft.Storage/storageAccounts/{name}",
    explanation:
      "Azure RBAC scope determines the blast radius of an assignment. Using /subscriptions/{id} grants the role across every resource in the subscription. To restrict access to a single storage account, the --scope must target that account's full ARM resource ID.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal",
  },
  {
    id: "AZ-104-102",
    type: "task",
    taskType: "fault",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Storage",
    question:
      "The operations team requires the storage account to remain readable from the secondary region even if the primary region goes offline. Identify the fault.",
    scenario:
`Storage account: sa-ops-backups
Replication: GRS (Geo-Redundant Storage)
Requirement: Secondary region must be readable without a failover.`,
    faults: [
      "GRS does not replicate data outside the primary region — ZRS must be used for geographic redundancy",
      "GRS replicates data to a secondary region but the secondary endpoint is not readable until a failover — use RA-GRS",
      "The storage account must be in a paired region to enable geo-replication",
      "GRS requires enabling the 'Hierarchical Namespace' feature to allow secondary reads",
    ],
    correctFault: "GRS replicates data to a secondary region but the secondary endpoint is not readable until a failover — use RA-GRS",
    fix:
      "Change the replication setting from GRS to RA-GRS. RA-GRS exposes a permanent read-only secondary endpoint (ending in '-secondary') that is always accessible.",
    explanation:
      "Both GRS and RA-GRS replicate data asynchronously to a secondary region. The difference is access: GRS only activates the secondary endpoint after Microsoft initiates a failover, while RA-GRS exposes a permanent secondary read endpoint at all times.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy#read-access-to-data-in-the-secondary-region",
  },
  {
    id: "AZ-104-103",
    type: "task",
    taskType: "fault",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Networking",
    question:
      "Two VNets are peered and both show 'Connected' status, but VMs in VNet-A cannot reach VMs in VNet-B. No NSGs are blocking the traffic. Identify the fault.",
    scenario:
`VNet-A: 10.0.0.0/16  (East US)
VNet-B: 10.1.0.0/16  (East US)

Peerings configured:
  VNet-A → VNet-B  |  Status on VNet-A: Connected
  VNet-B → VNet-A  |  (not created)

No overlapping address spaces. No NSG rules blocking the address ranges.`,
    faults: [
      "The address spaces 10.0.0.0/16 and 10.1.0.0/16 overlap and cannot be peered",
      "VNet peering requires a VPN Gateway on each VNet to route traffic between them",
      "The peering from VNet-B to VNet-A was never created — peering must be established in both directions",
      "VNet peering is only supported between VNets in the same resource group",
    ],
    correctFault: "The peering from VNet-B to VNet-A was never created — peering must be established in both directions",
    fix:
      "Create a peering from VNet-B to VNet-A: az network vnet peering create --name VNetB-to-VNetA --vnet-name VNet-B --remote-vnet VNet-A ...",
    explanation:
      "Azure VNet peering is not transitive and must be created in both directions. A peering from VNet-A to VNet-B shows 'Connected' on VNet-A's side, but traffic cannot flow until VNet-B also has a peering back to VNet-A. Only when both sides are configured does communication work.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview",
  },
  {
    id: "AZ-104-104",
    type: "task",
    taskType: "fault",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Governance",
    question:
      "A user with the Owner role is trying to delete the 'rg-prod-legacy' resource group but the operation fails. Identify the fault.",
    scenario:
`User role: Owner (subscription scope)
Action: Delete resource group 'rg-prod-legacy'

Error:
  "The scope '.../resourceGroups/rg-prod-legacy' cannot perform
   delete operation because following scope(s) are locked:
   '.../storageAccounts/legacystore'"`,
    faults: [
      "The Owner role does not permit resource group deletion — the user needs 'Resource Group Contributor'",
      "A resource group cannot be deleted while it contains resources — all resources must be removed first",
      "A resource lock on 'legacystore' is preventing deletion — the lock must be removed first",
      "The resource group is in a different Azure AD tenant and cannot be modified from this subscription",
    ],
    correctFault: "A resource lock on 'legacystore' is preventing deletion — the lock must be removed first",
    fix:
      "Navigate to 'legacystore' → Locks (or the resource group Locks blade) → delete the CanNotDelete or ReadOnly lock, then retry the resource group deletion.",
    explanation:
      "Azure resource locks (CanNotDelete and ReadOnly) override RBAC — even an Owner cannot delete a locked resource. The error message identifies the locked resource. Locks must be explicitly removed before destructive operations can proceed. Only users with Owner or User Access Administrator can remove locks.",
    learnUrl:
      "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources",
  },

  // ── Identity & Governance task cards ────────────────────────────

  {
    id: "AZ-104-105",
    type: "task",
    taskType: "fill-in",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Identity",
    question:
      "You need to assign the 'Reader' role to 'alex@contoso.com' scoped to resource group 'rg-prod' in subscription 'aaaa-1111'. The values are given — fill in the correct CLI command and flags.",
    blanks: [
      { label: "Base command", answer: "az role assignment create" },
      { label: "Value: 'alex@contoso.com'", answer: "--assignee" },
      { label: "Value: 'Reader'", answer: "--role" },
      { label: "Value: '/subscriptions/aaaa-1111/resourceGroups/rg-prod'", answer: "--scope" },
    ],
    explanation:
      "az role assignment create is the command for granting RBAC access. --assignee accepts a UPN, object ID, or service principal ID. --role accepts a built-in or custom role name. --scope targets where the assignment applies — a management group, subscription, resource group, or specific resource. Assignments inherit downward, so a Reader assignment on a resource group applies to all resources within it.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-cli",
  },
  {
    id: "AZ-104-106",
    type: "task",
    taskType: "order",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Identity",
    question:
      "Put the steps in the correct order to enable Self-Service Password Reset (SSPR) for all users in the Azure portal.",
    steps: [
      "Open Microsoft Entra ID in the Azure portal",
      "Select 'Password reset' under the Manage section",
      "Set 'Self-service password reset enabled' to All",
      "Select authentication methods and the minimum number required",
      "Click Save",
    ],
    explanation:
      "SSPR is configured in the Entra ID blade under Password reset. You first choose the scope (None, Selected, or All), then define which authentication methods are permitted and how many the user must register. The setting takes effect immediately after Save. You can also configure registration, notifications, and on-premises integration (writeback) from the same blade.",
    learnUrl: "https://learn.microsoft.com/en-us/training/modules/allow-users-reset-their-password/3-implement-azure-ad-self-service-password-reset",
  },
  {
    id: "AZ-104-107",
    type: "task",
    taskType: "match",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Identity",
    question: "Match each Azure built-in RBAC role to its correct permission set.",
    pairs: [
      { left: "Owner", right: "Full access to all resources including the right to assign roles" },
      { left: "Contributor", right: "Create and manage all resource types, but cannot assign roles" },
      { left: "Reader", right: "View existing resources only — no create, modify, or delete" },
      { left: "User Access Administrator", right: "Manage user access to Azure resources, but cannot create resources" },
    ],
    explanation:
      "These four are the fundamental built-in roles. Owner = Contributor + role assignment rights. Contributor is the broadest 'do everything except access management' role. Reader is fully read-only. User Access Administrator is the inverse of Contributor — it can manage access but not resources. Most real-world assignments use Contributor or custom roles to limit blast radius.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles",
  },
  {
    id: "AZ-104-108",
    type: "task",
    taskType: "fill-in",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Identity",
    question:
      "You need to create a new Entra ID user. The values are given — fill in the correct CLI command and parameter flags for each.",
    blanks: [
      { label: "Base command", answer: "az ad user create" },
      { label: "Value: 'Alex Chen'", answer: "--display-name" },
      { label: "Value: 'alexchen@contoso.onmicrosoft.com'", answer: "--user-principal-name" },
      { label: "Value: 'TempPass123!'", answer: "--password" },
    ],
    explanation:
      "az ad user create provisions a new user in Entra ID. --display-name is the human-readable name shown in the portal. --user-principal-name is the sign-in identity (must match a verified domain on the tenant). --password sets the initial credential. It's best practice to also add --force-change-password-next-sign-in true so the user is prompted to set their own password on first login.",
    learnUrl: "https://learn.microsoft.com/en-us/cli/azure/ad/user#az-ad-user-create",
  },
  {
    id: "AZ-104-109",
    type: "task",
    taskType: "match",
    difficulty: "hard",
    exam: "AZ-104",
    category: "Identity",
    question: "Match each Microsoft Entra ID group type or membership type to its correct description.",
    pairs: [
      { left: "Security group", right: "Controls access to shared resources; can include users, devices, and service principals" },
      { left: "Microsoft 365 group", right: "Provides shared mailbox, calendar, Teams, and SharePoint site; supports external members" },
      { left: "Dynamic User membership", right: "Members auto-added/removed by user attribute rules (e.g. department = Marketing); requires Entra ID P1" },
      { left: "Dynamic Device membership", right: "Members auto-added/removed by device attribute rules; only supported in Security groups, not M365 groups" },
    ],
    explanation:
      "Security groups are the workhorse for RBAC and resource access. M365 groups are collaboration-first and also available to non-admins. Dynamic membership removes manual group maintenance — an Entra ID P1 license is required for both Dynamic User and Dynamic Device. Note the exam-relevant distinction: Dynamic Device is only available in Security groups; M365 groups support Dynamic User only.",
    learnUrl: "https://learn.microsoft.com/en-us/training/modules/create-configure-manage-identities/5-groups",
  },

  // ── Identity & Governance script cards ────────────────────────────

  {
    id: "AZ-104-110",
    type: "task",
    taskType: "script",
    shell: "bash",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Identity",
    question:
      "Write the Azure CLI command to create a new Entra ID user with display name 'Alex Chen', UPN 'alexchen@contoso.onmicrosoft.com', password 'TempPass123!', and force a password change on first sign-in.",
    placeholder: "az ad user create ...",
    requiredTokens: [
      { label: "az ad user create", accept: ["az ad user create"] },
      { label: "--display-name 'Alex Chen'", accept: ["--display-name alex chen"] },
      { label: "--user-principal-name alexchen@contoso.onmicrosoft.com", accept: ["--user-principal-name alexchen@contoso.onmicrosoft.com"] },
      { label: "--password TempPass123!", accept: ["--password temppass123!"] },
      { label: "--force-change-password-next-sign-in true", accept: ["--force-change-password-next-sign-in true", "--force-change-password-next-sign-in"] },
    ],
    modelAnswer:
      "az ad user create \\\n  --display-name 'Alex Chen' \\\n  --user-principal-name alexchen@contoso.onmicrosoft.com \\\n  --password 'TempPass123!' \\\n  --force-change-password-next-sign-in true",
    explanation:
      "az ad user create provisions a user directly in Entra ID. --force-change-password-next-sign-in true ensures the user sets their own password on first login, preventing the admin from knowing the final credential. The UPN must match a domain verified on the tenant — contoso.onmicrosoft.com is always available as the default domain.",
    learnUrl: "https://learn.microsoft.com/en-us/cli/azure/ad/user#az-ad-user-create",
  },
  {
    id: "AZ-104-111",
    type: "task",
    taskType: "script",
    shell: "bash",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Identity",
    question:
      "Write the Azure CLI command to assign the 'Contributor' role to service principal 'sp-dev-team' scoped to resource group 'rg-dev' in subscription 'aaaa-1111'.",
    placeholder: "az role assignment create ...",
    requiredTokens: [
      { label: "az role assignment create", accept: ["az role assignment create"] },
      { label: "--assignee sp-dev-team", accept: ["--assignee sp-dev-team"] },
      { label: "--role Contributor", accept: ["--role contributor"] },
      { label: "--scope /subscriptions/aaaa-1111/resourceGroups/rg-dev", accept: ["--scope /subscriptions/aaaa-1111/resourcegroups/rg-dev"] },
    ],
    modelAnswer:
      "az role assignment create \\\n  --assignee sp-dev-team \\\n  --role \"Contributor\" \\\n  --scope \"/subscriptions/aaaa-1111/resourceGroups/rg-dev\"",
    explanation:
      "Scoping the assignment to a specific resource group limits the service principal's access to only the resources inside rg-dev. Assigning at subscription scope (/subscriptions/aaaa-1111) would give access to all resource groups — a broader blast radius. Always apply the principle of least privilege by using the narrowest scope that meets the requirement.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-cli",
  },
  {
    id: "AZ-104-112",
    type: "task",
    taskType: "script",
    shell: "powershell",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Identity",
    question:
      "Write the PowerShell command to list all RBAC role assignments scoped to resource group 'rg-prod' in subscription 'aaaa-1111'.",
    placeholder: "Get-AzRoleAssignment ...",
    requiredTokens: [
      { label: "Get-AzRoleAssignment", accept: ["get-azroleassignment"] },
      { label: "-Scope /subscriptions/aaaa-1111/resourceGroups/rg-prod", accept: ["-scope /subscriptions/aaaa-1111/resourcegroups/rg-prod"] },
    ],
    modelAnswer:
      "Get-AzRoleAssignment `\n  -Scope '/subscriptions/aaaa-1111/resourceGroups/rg-prod'",
    explanation:
      "Get-AzRoleAssignment returns all role assignments visible at the specified scope, including inherited assignments from parent scopes (subscription, management group). Use -RoleDefinitionName to filter by role or -SignInName to filter by user. To audit all assignments across a subscription, omit the resource group from the scope path.",
    learnUrl: "https://learn.microsoft.com/en-us/powershell/module/az.resources/get-azroleassignment",
  },
  {
    id: "AZ-104-113",
    type: "task",
    taskType: "script",
    shell: "bash",
    difficulty: "easy",
    exam: "AZ-104",
    category: "Identity",
    question:
      "Write the Azure CLI command to create an Entra ID security group named 'Network-Admins' with mail nickname 'NetworkAdmins'.",
    placeholder: "az ad group create ...",
    requiredTokens: [
      { label: "az ad group create", accept: ["az ad group create"] },
      { label: "--display-name Network-Admins", accept: ["--display-name network-admins"] },
      { label: "--mail-nickname NetworkAdmins", accept: ["--mail-nickname networkadmins"] },
    ],
    modelAnswer:
      "az ad group create \\\n  --display-name 'Network-Admins' \\\n  --mail-nickname 'NetworkAdmins'",
    explanation:
      "az ad group create defaults to a Security group. The --mail-nickname must be unique in the tenant and cannot contain spaces. After creating the group you can add users with 'az ad group member add --group Network-Admins --member-id <object-id>' and then assign RBAC roles to the group instead of individual users for easier management.",
    learnUrl: "https://learn.microsoft.com/en-us/cli/azure/ad/group#az-ad-group-create",
  },
  {
    id: "AZ-104-114",
    type: "task",
    taskType: "script",
    shell: "bash",
    difficulty: "medium",
    exam: "AZ-104",
    category: "Identity",
    question:
      "Write the Azure CLI command to remove the 'Reader' role assignment from user 'bob@contoso.com' scoped to resource group 'rg-prod' in subscription 'aaaa-1111'.",
    placeholder: "az role assignment delete ...",
    requiredTokens: [
      { label: "az role assignment delete", accept: ["az role assignment delete"] },
      { label: "--assignee bob@contoso.com", accept: ["--assignee bob@contoso.com"] },
      { label: "--role Reader", accept: ["--role reader"] },
      { label: "--scope /subscriptions/aaaa-1111/resourceGroups/rg-prod", accept: ["--scope /subscriptions/aaaa-1111/resourcegroups/rg-prod"] },
    ],
    modelAnswer:
      "az role assignment delete \\\n  --assignee bob@contoso.com \\\n  --role \"Reader\" \\\n  --scope \"/subscriptions/aaaa-1111/resourceGroups/rg-prod\"",
    explanation:
      "az role assignment delete revokes access by removing the assignment. The --scope must exactly match the scope the assignment was created at — specifying a parent scope will not cascade-delete child assignments. If you're unsure of the exact scope, run 'az role assignment list --assignee bob@contoso.com' first to confirm before deleting.",
    learnUrl: "https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-cli",
  },

  // ── Networking task cards ─────────────────────────────────────────

  {
    id: "AZ-104-133",
    type: "task",
    taskType: "order",
    difficulty: "hard",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "Put the steps in the correct order that Azure follows to select which route forwards a packet from a VM.",
    steps: [
      "Collect every route whose address prefix contains the packet's destination IP",
      "Select the route with the longest (most specific) matching prefix",
      "If two routes share the identical prefix length, apply type priority: UDR first, then BGP, then system routes",
      "Forward the packet to the next hop defined by the winning route",
    ],
    explanation:
      "Azure routing uses a two-stage selection. First, all routes whose prefix overlaps the destination IP are candidates — a /24 and a /16 can both match the same destination. Then, the longest prefix wins because it describes a narrower, more specific address range. Only when two candidates have the same prefix length does the type priority order (UDR > BGP > system) apply as a tiebreaker.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/control-network-traffic-flow-with-routes/2-azure-virtual-network-route",
  },
  {
    id: "AZ-104-134",
    type: "task",
    taskType: "match",
    difficulty: "medium",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "Match each Azure Load Balancer session persistence mode to its traffic distribution behaviour.",
    pairs: [
      { left: "None (default)",               right: "5-tuple hash — any healthy backend can handle each independent request" },
      { left: "Client IP (2-tuple)",          right: "Source IP + destination IP hash — same client IP always hits the same backend" },
      { left: "Client IP and Protocol (3-tuple)", right: "Source IP + destination IP + protocol hash — same client IP and protocol type always hits the same backend" },
    ],
    explanation:
      "None uses a full 5-tuple hash so different requests from the same client may reach different backends — stateless apps work best here. 2-tuple stickiness pins a client IP to one backend regardless of source port changes, useful for session-aware apps. 3-tuple adds the protocol dimension so HTTP and HTTPS sessions from the same client can be tracked independently. Session persistence requires an Entra-level session cookie or IP-based affinity — it does not guarantee the same backend if that backend goes unhealthy.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/intro-to-azure-load-balancer/3-how-azure-load-balancer-works",
  },
  {
    id: "AZ-104-135",
    type: "task",
    taskType: "fill-in",
    difficulty: "hard",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "A VM has an NSG on both its subnet and its NIC. Complete the statement about inbound and outbound NSG evaluation order.",
    blanks: [
      { label: "For inbound traffic, Azure evaluates the ___ NSG first", answer: "subnet", hint: "outer container — evaluated first on the way in" },
      { label: "then the ___ NSG", answer: "NIC", hint: "individual network adapter" },
      { label: "For outbound traffic, Azure evaluates the ___ NSG first", answer: "NIC", hint: "evaluated first on the way out" },
      { label: "then the ___ NSG", answer: "subnet", hint: "outer container — evaluated last on the way out" },
    ],
    explanation:
      "Evaluation order is mirror-symmetric: inbound traffic passes through the subnet NSG before the NIC NSG; outbound traffic passes through the NIC NSG before the subnet NSG. In both directions, both NSGs must independently allow the traffic — a deny at either level blocks it. This lets you apply broad subnet-level rules and fine-grained per-VM rules simultaneously.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/configure-network-security-groups/4-determine-network-security-groups-effective-rules",
  },
  {
    id: "AZ-104-136",
    type: "task",
    taskType: "script",
    shell: "bash",
    difficulty: "hard",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "Write the Azure CLI command to add a UDR that forces all outbound internet traffic (0.0.0.0/0) through a Network Virtual Appliance at private IP 10.0.0.4, in route table rt-spoke in resource group rg-network.",
    placeholder: "az network route-table route create ...",
    requiredTokens: [
      { label: "az network route-table route create", accept: ["az network route-table route create"] },
      { label: "--resource-group rg-network",         accept: ["--resource-group rg-network", "-g rg-network"] },
      { label: "--route-table-name rt-spoke",         accept: ["--route-table-name rt-spoke"] },
      { label: "--name route-to-nva",                 accept: ["--name route-to-nva"] },
      { label: "--address-prefix 0.0.0.0/0",         accept: ["--address-prefix 0.0.0.0/0"] },
      { label: "--next-hop-type VirtualAppliance",    accept: ["--next-hop-type virtualappliance"] },
      { label: "--next-hop-ip-address 10.0.0.4",     accept: ["--next-hop-ip-address 10.0.0.4"] },
    ],
    helpText: `Command
    az network route-table route create

Arguments
    --resource-group -g  [Required] : Name of resource group.
    --route-table-name   [Required] : Name of the route table.
    --name -n            [Required] : Name of the route.
    --address-prefix     [Required] : Destination CIDR prefix (e.g. 0.0.0.0/0).
    --next-hop-type      [Required] : VirtualAppliance | VirtualNetworkGateway |
                                      VnetLocal | Internet | None
    --next-hop-ip-address           : Required when next-hop-type is VirtualAppliance.

Examples
    # Force all internet traffic through a firewall NVA
    az network route-table route create \\
      -g myRG --route-table-name myRT --name to-firewall \\
      --address-prefix 0.0.0.0/0 --next-hop-type VirtualAppliance \\
      --next-hop-ip-address 10.0.0.4`,
    modelAnswer:
      "az network route-table route create \\\n  --resource-group rg-network \\\n  --route-table-name rt-spoke \\\n  --name route-to-nva \\\n  --address-prefix 0.0.0.0/0 \\\n  --next-hop-type VirtualAppliance \\\n  --next-hop-ip-address 10.0.0.4",
    explanation:
      "0.0.0.0/0 is the default route prefix — it matches all destinations that no more-specific route covers, making it the catch-all for internet traffic. VirtualAppliance is the next-hop type for NVAs and firewalls; it requires --next-hop-ip-address pointing to the appliance's private IP. After creating the route, associate the route table with the subnet: az network vnet subnet update --route-table rt-spoke. Without that association the route has no effect.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/control-network-traffic-flow-with-routes/2-azure-virtual-network-route",
  },
  {
    id: "AZ-104-137",
    type: "task",
    taskType: "script",
    shell: "powershell",
    difficulty: "hard",
    exam: "AZ-104",
    devAdded: "2026-05-18T00:00:00Z",
    category: "Networking",
    question:
      "Write the PowerShell commands to add an inbound NSG rule that allows HTTPS (TCP/443) from any source at priority 100 to NSG 'nsg-web' in resource group 'rg-network', then save the change.",
    placeholder: "$nsg = Get-AzNetworkSecurityGroup ...",
    requiredTokens: [
      { label: "Get-AzNetworkSecurityGroup",            accept: ["get-aznetworksecuritygroup"] },
      { label: "-Name nsg-web",                          accept: ["-name nsg-web"] },
      { label: "-ResourceGroupName rg-network",          accept: ["-resourcegroupname rg-network"] },
      { label: "Add-AzNetworkSecurityRuleConfig",        accept: ["add-aznetworksecurityruleconfig"] },
      { label: "-NetworkSecurityGroup $nsg",             accept: ["-networksecuritygroup $nsg"] },
      { label: "-Name Allow-HTTPS",                      accept: ["-name allow-https"] },
      { label: "-Protocol Tcp",                          accept: ["-protocol tcp"] },
      { label: "-Direction Inbound",                     accept: ["-direction inbound"] },
      { label: "-Priority 100",                          accept: ["-priority 100"] },
      { label: "-DestinationPortRange 443",              accept: ["-destinationportrange 443"] },
      { label: "-Access Allow",                          accept: ["-access allow"] },
      { label: "Set-AzNetworkSecurityGroup",             accept: ["set-aznetworksecuritygroup"] },
    ],
    helpText: `Cmdlets
    Get-AzNetworkSecurityGroup   : Retrieves an existing NSG object
    Add-AzNetworkSecurityRuleConfig : Adds a rule to an NSG object in memory
    Set-AzNetworkSecurityGroup   : Pushes the modified NSG object back to Azure

Common parameters for Add-AzNetworkSecurityRuleConfig
    -NetworkSecurityGroup  : The NSG object to modify
    -Name                  : Rule name
    -Protocol              : Tcp | Udp | Icmp | * (Any)
    -Direction             : Inbound | Outbound
    -Priority              : 100–4096
    -SourceAddressPrefix   : IP, CIDR, or service tag (* for Any)
    -SourcePortRange       : Port number or * for Any
    -DestinationAddressPrefix : IP, CIDR, or service tag (* for Any)
    -DestinationPortRange  : Port number or * for Any
    -Access                : Allow | Deny

Examples
    $nsg = Get-AzNetworkSecurityGroup -Name myNSG -ResourceGroupName myRG
    $nsg | Add-AzNetworkSecurityRuleConfig -Name Allow-SSH -Protocol Tcp \`
      -Direction Inbound -Priority 200 \`
      -SourceAddressPrefix * -SourcePortRange * \`
      -DestinationAddressPrefix * -DestinationPortRange 22 -Access Allow
    $nsg | Set-AzNetworkSecurityGroup`,
    modelAnswer:
      "$nsg = Get-AzNetworkSecurityGroup `\n  -Name 'nsg-web' `\n  -ResourceGroupName 'rg-network'\n\n$nsg | Add-AzNetworkSecurityRuleConfig `\n  -Name 'Allow-HTTPS' `\n  -Protocol Tcp `\n  -Direction Inbound `\n  -Priority 100 `\n  -SourceAddressPrefix * `\n  -SourcePortRange * `\n  -DestinationAddressPrefix * `\n  -DestinationPortRange 443 `\n  -Access Allow\n\n$nsg | Set-AzNetworkSecurityGroup",
    explanation:
      "The pattern is get-modify-push: retrieve the NSG object, pipe it into Add-AzNetworkSecurityRuleConfig to attach a new rule in memory, then pipe into Set-AzNetworkSecurityGroup to write the change to Azure. Note the difference from New-AzNetworkSecurityRuleConfig: Add- both creates the config and attaches it to the NSG object in one step, removing the need to call $nsg.SecurityRules.Add() separately. Protocol and Direction values are case-sensitive strings: 'Tcp' not 'TCP', 'Inbound' not 'inbound'.",
    learnUrl:
      "https://learn.microsoft.com/en-us/training/modules/configure-network-security-groups/5-create-network-security-groups-rules",
  },
];

export default az104task;
