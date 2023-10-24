# Lab2: Azure DevOps - Pipelines for a Linux Web App (Express/NodeJS)

## Web app urls
- Production Web App: https://sd-web-application.azurewebsites.net/
- Development Web App: http://localhost:8080

## Goal and processes
This project's goal has been to exercise and get familiar with building a **_Release-Pipeline_** in **_Azure_**. 

Thus...
 1. Very simple **_Linux_** web app has been setup in **_NodeJS_**  with **_Express_**
 2. Sample test created in the web app folder
 
 Then...
 1. Project has been created in **_Azure DevOps_**
 2. **_Git repository_** consiting of the web app has been cloned into the project
 3. In **_Anzure Portal_**: A Web app was deployed (**_Application Insight_** enabled)
 4. Back in **_Azure DevOps_** a pipeline has been created with the corresponding __azure-pipelines.yml__ file (Repository needs to be connected to the pipeline)
 5. Edited the stages within the __azure-pipelines.yml__ to have the stages __build, test and deployment__
 6. Following restriction has been set for running the deployment stage, to prevent deployment on every commit: Authorized users are allowed to run the deployment stage after review
 
## Lessons learned
### Main issue
There were major issues with the web app finding the __package.json__ file during the deployment stage, since it used to be in the subfolder __../Lab2/myExpressApp__.
Thus, I was unfortunatelly forced to move the files __package.json__, __package-lock.json__ and the folder __node_modules__ to the root of the repository instead.

**Edit**: I did it. It was very simple, still so confusing - such a headache.

1. **_Azure Portal_**
2. Open Web app Service
3. Configuration
4. Application Configuration
5. Add a new Application Configuration
6. Enter for the Name PROJECT and for the value <NEW ROOT PATH> (in my case Lab2/myExpressApp)

Sources: 
- [Source 1: Git repository](https://stackoverflow.com/questions/18925075/how-can-i-set-the-root-folder-for-an-azure-websites-site)
- [Source 2: Stackoverflow](https://github.com/projectkudu/kudu/wiki/Customizing-deployments)

### Notable info
Other issues consisted of __port-settings, tast-cases, Git, deployment of the web app, creating a suitable azure-pipelines.yml__ file.
In the end, **_Azure_** overall is quite of a headache to navigate especially with limited ressources and for beginners, still it has to be noted
that **_Azure_** is a great tool for deploying services via the cloud and after this exercise, I now do know how ;). 
