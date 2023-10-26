# Lab2: Azure DevOps - Pipelines for a Linux Web App (Express/NodeJS)

## Web app urls

- Production/Released Web App: https://sd-release-web-application.azurewebsites.net/
- Development Web App: https://sd-web-application.azurewebsites.net/
- Screenshots of the project: ./Lab2/Screenshots
  
## Goals and processes

This project's goal has been to exercise and get familiar with building a **_Release-Pipeline_** in **_Azure_**. 

Thus...
 1. Very simple *Linux* web app has been setup in *NodeJS*  with *Express*
 2. Sample test case (with *Jest*) created in the web app folder
 
 Then...
 1. Project has been created in *Azure DevOps*
 2. *Git repository* consisting of the web app has been cloned into the project
 3. In *Azure Portal*: 2 x Web apps were deployed with **_Application Insight_** enabled (One web app for development and one for the release/production).
 4. Back in *Azure DevOps* 2 x pipelines have been created with each having its own pipeline.yml file (Release pipeline with `release-pipeline.yml` and development pipeline with `development-pipeline.yml`) - Repository needs to be connected to the pipelines.
 5. Edited the stages within the `development-pipeline.yml` to have the stages **_build, test and deployment_**
 6. Configured the release pipeline to only have a **_release job_**  in the `release-pipeline.yml` and to take the build created in the building stage of the development pipeline.
 7. Following restrictions have been set before running the release pipeline, to prevent releasing on every commit:
    - Authorized users are allowed to run the release pipeline after review (checking)
    - Checking will be asked in the release pipeline as soon as the development pipeline is run
 
## Lessons learned

### Main issue
There were major issues with the web app finding the `package.json` file during the deployment stage, since it used to be in the subfolder *../Lab2/myExpressApp*.
Thus, I was unfortunatelly forced to move the files `package.json`, `package-lock.json` and the folder `node_modules` to the root of the repository instead.

**Edit**: I did it. It was very simple, still so confusing - *"quite of a headache"*.

1. **_Azure Portal_**
2. Open Web app Service
3. Configuration
4. Application Configuration
5. Add a new Application Configuration
6. Enter for the Name `PROJECT` and for the value `<NEW ROOT PATH>` (in my case Lab2/myExpressApp)

Sources: 
- [Source 1: Git repository](https://github.com/projectkudu/kudu/wiki/Customizing-deployments)
- [Source 2: Stackoverflow](https://stackoverflow.com/questions/18925075/how-can-i-set-the-root-folder-for-an-azure-websites-site)

### Notable info

Other issues consisted of *port-settings, tast-cases, Git, deployment of the web app, creating suitable pipeline.yml* files.
In the end, *Azure* overall is quite of a headache to navigate especially with limited ressources and for beginners, still it has to be noted
that *Azure* is a great tool for deploying services via the cloud and after this exercise, I certainly do know how ;). 
