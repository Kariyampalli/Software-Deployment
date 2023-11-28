# Lab 1: ARM-Templates

This is only a small software deployment exercise with minimalistic settings (On a student subscription plan offered by _Azure_). Please make sure to create and set up your subscriptions, ARM-Template etc. the way its suited best for you.

# ARM-Template

Form to deploy certain services (resources provided by _Azure_). In that case only a storage account and a web app with following leverages paramters:

- Name of the storage account
- Resource group (Given through a command. See section _Azure CLI_)
- Location
- Web-app name

## Setup & Installation

### Text editor

_Visual Studio_ is more suited for creating an _ARM-Temaplate_. Make sure to install the _Azure Resource Manager Tools Extension_.

### AZURE CLI

In a command line, use follwing commands in the following order to deploy your template:

1. ` az login`

   _Login with your Azure account._

2. ` az group create --name sd-resource-group --location eastus`

   _Creates resource group for your resources defined wihtin your \_ARM-Template_.\_

3. `az deployment group create--resource-group sd-resource-group --template-file azuredeploy.json --parameters azuredeploy.parameters.json`

   _Deployes your resources defined in your template with the defined resource group._

### Alternatives

An _ARM-Template_ can also be created,exported etc. by using the _Azure_ website or _Powershell CLI_.

## Sources

https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/quickstart-create-templates-use-visual-studio-code?tabs=CLI

https://github.com/Azure/azure-quickstart-templates/blob/master/demos/100-marketplace-sample/azuredeploy.parameters.json

https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/quickstart-create-templates-use-the-portal
