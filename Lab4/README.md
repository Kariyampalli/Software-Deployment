# Lab 4: Setting up Wordpress with SQL in Azure Kubernetes Service (AKS) Cluster

## Create Azure Kubernetes Service (AKS) and corresponding RessourceGroup

Preconditions: Azure CLI & Log into your account.

1. **Create a Ressource Group**
   
   `az group create --name AKSGroup --location eastus`

2. **Create Windows Server account**
   
   `echo "Please enter the username to use as administrator credentials for Windows Server nodes on your cluster: " && read WINDOWS_USERNAME`

   *It will prompt you to enter a username, e.g.:*`swdeploymentaks`

   `echo "Please enter the password to use as administrator credentials for Windows Server nodes on your cluster: " && read WINDOWS_PASSWORD`

   *It will prompt you to enter a password, e.g.:*`Swdeploymentaks1`

3. **Create Azure Kubernetes Service (AKS) Cluster within the created RessourceGroup***
   
   `az aks create --resource-group AKSGroup --name AKSCluster --node-count 2 --enable-addons monitoring --generate-ssh-keys --windows-admin-username swdeploymentaks --windows-admin-password Swdeploymentaks1 --vm-set-type VirtualMachineScaleSets --network-plugin azure`

4. **Connect to your Azure Kubernetes Service (AKS) Cluster**
az aks get-credentials --resource-group AKSGroup --name AKSCluster

kubectl get nodes

kubectl apply -f ./

kubectl get pods

kubectl delete -f ./

kubectl get svc wordpress-service

Tutorials

Creating and Connecting the Azure Kubernetes Service Cluster
https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli

Create and Deploy Wordpress with MySQL Database
https://engr-syedusmanahmad.medium.com/wordpress-on-kubernetes-cluster-step-by-step-guide-749cb53e27c7
