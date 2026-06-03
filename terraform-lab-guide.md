# Terraform Lab — Card Authoring Guide

Reference for building `terraform-lab` cards. Each card lives in Supabase as a row
with `type = "terraform-lab"`. The `data` JSONB column holds all card-specific fields.

---

## Card data shape

```js
{
  // Required
  description:        string,   // 1–2 sentence summary shown on the lab card button in the Labs view
  question:           string,   // Full task shown inside the lab above the editor

  // Grading
  requiredTokens:     Token[],  // Substrings that must appear in the user's code (see below)
  requiredAttributes: string[], // Attribute names that must appear as assignments (line-anchored)
  listAttributes:     string[], // Attributes whose value must use [...] list syntax

  // Optional display
  scaffold:           string,   // Read-only HCL shown above the editor (provider + existing resources)
  placeholder:        string,   // Placeholder text shown in the empty editor
  helpText:           string,   // Reference text shown in the right-hand Help panel
  modelAnswer:        string,   // Full correct HCL shown to the user after a wrong submission
  explanation:        string,   // Explanation shown via "Show explanation" button
  learnUrl:           string,   // "Learn more" link (registry.terraform.io or learn.microsoft.com)
}
```

---

## Token format (`requiredTokens`)

Each token is checked as a **normalised substring** of the user's code.
Normalisation: strip surrounding quotes from values, lowercase, collapse whitespace.

```js
// Simple string (legacy) — checks norm(code).includes(norm(token))
"azurerm_virtual_network"

// Object form — preferred, supports multiple acceptable spellings
{
  label:  string,    // Displayed in the token checklist after submission
  accept: string[],  // One or more strings — ANY match = token passes
}
```

### Normalisation examples

| Raw code | After normalisation |
|----------|---------------------|
| `resource "azurerm_virtual_network" "vnet_hub"` | `resource azurerm_virtual_network vnet_hub` |
| `address_space = ["10.0.0.0/16"]` | `address_space = [10.0.0.0/16]` |
| `resource_group_name = azurerm_resource_group.rg.name` | `resource_group_name = azurerm_resource_group.rg.name` |

### Tips for tight tokens

- To check the resource type is correct: `resource "azurerm_virtual_network"`
  → normalises to `resource azurerm_virtual_network`, won't match other types.
- To check a list attribute has brackets: `"address_space = ["` 
  → normalises to `address_space = [`, fails if user writes a plain string.
- Avoid single-word tokens like `"name"` — they match anywhere in the code.
  Use `requiredAttributes` for attribute name checks instead (see below).

---

## Required attributes (`requiredAttributes`)

Checks that each listed attribute **starts a line** as an assignment.
Uses regex `^\s+<attr>\s*=` with multiline flag, so:

- `name` matches `  name = "..."` but **not** `  resource_group_name = "..."`
- `address_space` matches `  address_space = [...]` but not a comment mentioning `address_space`

Use this instead of a token whenever you need to verify an attribute name exactly.

```js
requiredAttributes: ["name", "address_space", "location", "resource_group_name"]
```

If a required attribute is missing or misspelled (e.g. `nam` instead of `name`),
the linter fires: **"Missing required attribute: name"**

---

## List attributes (`listAttributes`)

For attributes whose value must be a list (`[...]`), not a plain string.
The linter checks for `attr = "` (string assignment) and rejects it.

```js
listAttributes: ["address_space"]
```

Catches:
```hcl
address_space = "10.0.0.0/16"   # ✕ linter error
address_space = ["10.0.0.0/16"] # ✓ passes
```

---

## Linter checks (always on)

These run on every submission regardless of card data:

| Check | What triggers it | Example error |
|-------|-----------------|---------------|
| **Unclosed string** | `"` opened but no matching closing `"` by end of file | `Unclosed string — missing closing quote "` |
| **Brace balance** | More `{` than `}` outside strings | `Unclosed block — missing 1 closing brace }` |
| **Extra brace** | More `}` than `{` | `Extra closing brace — one too many }` |
| **Resource declaration** | `resource` keyword present but line doesn't match `resource "type" "name" {` | `Resource declaration must be: resource "provider_type" "local_name" {` |
| **Colon instead of equals** | Line matching `  attr: value` pattern | `Use = for attribute assignment, not :` |
| **Double equals** | `attr == value` | `Use = for assignment, not ==` |

String tracking is char-by-char (not regex), so `{` and `}` inside string values
are correctly ignored in the brace balance count.

---

## How grading works

1. **Linter** runs first. Any lint error → terminal shows `✕ <error>` lines,
   apply does not proceed, feedback shows failure regardless of tokens.

2. **Token checklist** runs independently. Each token is checked and shown
   green/red below the terminal. Passing all tokens with lint errors still = fail.

3. **Pass** = zero lint errors AND all required tokens pass.

---

## Full card example — `AZ-700-TF-001`

```js
{
  id:         "AZ-700-TF-001",
  exam:       "AZ-700",
  category:   "Core Networking Infrastructure",
  type:       "terraform-lab",
  difficulty: "easy",
  is_free:    true,

  data: {
    question: "Deploy a Virtual Network for the hub layer of a hub-and-spoke topology.\n\nRequirements: name `vnet-hub`, address space `10.0.0.0/16`, location `uksouth`. Reference `azurerm_resource_group.rg` for both `location` and `resource_group_name` — do not hardcode the values.",

    scaffold: `terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "rg-network-hub"
  location = "uksouth"
}`,

    placeholder: `resource "azurerm_virtual_network" "" {

}`,

    helpText: `Resource: azurerm_virtual_network

Required arguments
  name                  string   The name of the Virtual Network.
  address_space         list     One or more CIDR blocks. Always a list, e.g. ["10.0.0.0/16"]
  location              string   Azure region. Reference the RG:
                                   azurerm_resource_group.rg.location
  resource_group_name   string   Resource Group to deploy into. Reference:
                                   azurerm_resource_group.rg.name

Syntax
  resource "azurerm_virtual_network" "<local_name>" {
    name                = "<string>"
    address_space       = ["<cidr>"]
    location            = azurerm_resource_group.rg.location
    resource_group_name = azurerm_resource_group.rg.name
  }`,

    requiredTokens: [
      { label: 'resource "azurerm_virtual_network"',
        accept: ['resource "azurerm_virtual_network"'] },
      { label: 'name = "vnet-hub"',
        accept: ['vnet-hub'] },
      { label: 'address_space = ["..."]',
        accept: ['address_space = [', 'address_space= [', 'address_space =['] },
      { label: '"10.0.0.0/16"',
        accept: ['10.0.0.0/16'] },
      { label: 'location = azurerm_resource_group.rg.location',
        accept: ['azurerm_resource_group.rg.location'] },
      { label: 'resource_group_name = azurerm_resource_group.rg.name',
        accept: ['azurerm_resource_group.rg.name'] },
    ],

    listAttributes:     ["address_space"],
    requiredAttributes: ["name", "address_space", "location", "resource_group_name"],

    modelAnswer: `resource "azurerm_virtual_network" "vnet_hub" {
  name                = "vnet-hub"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
}`,

    explanation: "azurerm_virtual_network requires four arguments: name, address_space (a list of CIDR strings), location, and resource_group_name. Referencing azurerm_resource_group.rg.name rather than hardcoding the string lets Terraform build the dependency graph automatically — the VNet will only be created after the resource group exists. address_space is always a list even when supplying a single CIDR.",

    learnUrl: "https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_network",
  }
}
```

---

## Common Azure Terraform gotchas worth teaching

| Gotcha | Detail |
|---|---|
| `address_space` vs `address_prefixes` | VNets use `address_space`; subnets use `address_prefixes`. Both are lists. |
| `GatewaySubnet` casing | Azure reserved name — must be exactly `GatewaySubnet`, not `gatewaysubnet` or `gateway-subnet` |
| List attributes | `address_space`, `address_prefixes`, `dns_servers` are always `["..."]` even with one value |
| Resource references | Prefer `azurerm_resource_group.rg.name` over hardcoding `"rg-network-hub"` — builds the dependency graph |
| `/27` vs `/29` for GatewaySubnet | `/29` is the absolute minimum; `/27` is recommended for zone-redundancy |

---

## Terminal output behaviour

| Situation | terraform validate | terraform apply |
|---|---|---|
| Lint errors (bad syntax) | Shows `✕ <error>` lines | Does not run |
| Valid HCL, all tokens pass | `Success! The configuration is valid.` | `Apply complete! Resources: 1 added, 0 changed, 0 destroyed.` |
| Valid HCL, tokens fail | `Success! The configuration is valid.` | `Apply failed. No changes. 0 added, 0 changed, 0 destroyed.` |

`terraform validate` only reflects HCL syntax — not value correctness. Token failures are surfaced in the requirements checklist below the terminal, not as Terraform errors.

---

## Card catalogue

### AZ-700-TF-001 — Deploy a Virtual Network (easy)
- **Description (card button):** "Deploy an Azure Virtual Network using Terraform infrastructure as code."
- Resource: `azurerm_virtual_network`
- Key teaching points: `address_space` is a list, reference the resource group rather than hardcoding
- `listAttributes`: `["address_space"]`
- `requiredAttributes`: `["name", "address_space", "location", "resource_group_name"]`

### AZ-700-TF-002 — Deploy the GatewaySubnet (easy)
- **Description (card button):** "Deploy the GatewaySubnet required for VPN Gateway and ExpressRoute connectivity."
- Resource: `azurerm_subnet`
- Key teaching points: `address_prefixes` not `address_space`; `GatewaySubnet` name is Azure-reserved and case-sensitive; reference parent VNet with `virtual_network_name`
- `listAttributes`: `["address_prefixes"]`
- `requiredAttributes`: `["name", "address_prefixes", "virtual_network_name", "resource_group_name"]`

---

## ID convention

```
AZ-700-TF-001   ← exam prefix + TF + zero-padded sequence
AZ-700-TF-002
AZ-104-TF-001
```

Increment the sequence per exam. Check existing IDs before inserting.
