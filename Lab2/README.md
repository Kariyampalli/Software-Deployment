# Lab2: Azure DevOps - Pipelines for a Web App (Express/NodeJS)

## Web app urls
Production: https://sd-web-application.azurewebsites.net/
Development: http://localhost:8080

## Goal and processes
This project's goal has been to exercise and get familiar with building a Release-Pipeline in Azure. 
Thus...
 1. Very simple web app has been setup in NodeJS with Express
 2. Sample test created in the web app folder
 
 Then...
 1. Project has been created in Azure DevOps
 2. Git repository consiting of the web app has been cloned into the project
 3. In Anzure Portal: A Web app was deployed (Application Insight enabled)
 4. Back in Azure Dev Ops a pipeline has been created with the corresponding azure-pipelines.yml file (Repository needs to be connected to the pipeline)
 5. Edited the stages within the azure-pipelines.yml to have the stages build, test and deployment
 6. Following restriction has been set for running the deployment stage, to prevent deployment on every commit: Authorized users are allowed to run the deployment stage after review
 
## Lessons learned
### Main issue
There were major issues with the web app finding the package.json file during the deployment stage, since it used to be in the subfolder ../Lab2/myExpressApp.
Thus, I was unfortunatelly forced to move the files package.json, package-lock.json and the folder node_modules to the root of the repository instead.

### Notable info
Other issues consisted of port-settings, tast-cases, Git, deployment of the web app, creating a suitable azure-pipelines.yml file.
In the end, Azure overall is quite of a headache to navigate especially with limited ressources and for beginners, still it has to be noted
that Azure is a great tool for deploying services via the cloud and after this exercise, I now do know how ;). 