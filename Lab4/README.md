# Lab 4: Setting up Wordpress with SQL in Azure Kubernetes Service (AKS) Cluster
**Prerequisites**
- Install _Azure CLI_ & _kubectl_ (should already be installed with _Azure CLI_) 
- Log into your _Azure_ account 

## Create Azure Kubernetes Service (AKS) and corresponding RessourceGroup

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
   
   `az aks get-credentials --resource-group AKSGroup --name AKSCluster`<br><br><br>


   > Dispaly the created nodes: `kubectl get nodes`

## Create Wordpress service, MySQL service and their Volumes (pvc/pv)

1. **Copy/Create following files:**
<br>

>  MySql service: Create `mysql-service.yaml` file
```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: mysql-service
spec:
  ports:
    - port: 3306
      protocol: TCP
  selector:
    app: mysql

```

<br><br>
> MySql volumes: Create `mysql-pv-pvc.yaml` file
```yaml
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: mysql-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  storageClassName: default
  hostPath:
    path: /mnt/data/mysql

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: default
  volumeName: mysql-pv 
  selector:
    matchLabels:
      app: mysql

```

<br><br>
> MySql secret: Create `mysql-secret.yaml` file
```yaml
---
apiVersion: v1
kind: Secret
metadata:
  name: mysql-secret
type: Opaque
data:
  mysql-root-password: eW91cl9kYXRh
```

<br><br>
> MySql container (database): Create `mysql-statefulset.yaml` file
```yaml
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
  labels:
    app: mysql
spec:
  replicas: 1
  serviceName: mysql
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
        - name: database
          image: mysql:5.7
          args:
            - "--ignore-db-dir=lost+found"
          envFrom:
            - secretRef:
                name: mysql-secret
          env:
            - name: MYSQL_FORCE_RECOVERY
              value: "1" # Setting this to "1" will force InnoDB recovery
          ports:
            - containerPort: 3306
          volumeMounts:
            - name: mysql-data
              mountPath: /var/lib/mysql
      volumes:
        - name: mysql-data
          persistentVolumeClaim:
            claimName: mysql-pvc
```

<br><br>
> Wordpress service, container and deployment: Create `wordpress-deployment.yaml` file
```yaml
---
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress
spec:
  replicas: 2
  selector:
    matchLabels:
      app: wordpress
  template:
    metadata:
      labels:
        app: wordpress
    spec:
      containers:
        - name: wordpress
          image: wordpress:5.8.3-php7.4-apache
          ports:
            - containerPort: 80
              name: wordpress
          volumeMounts:
            - name: wordpress-data
              mountPath: /var/www/html
          env:
            - name: WORDPRESS_DB_HOST
              value: mysql-service.default.svc.cluster.local
            - name: WORDPRESS_DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-secret
                  key: MYSQL_ROOT_PASSWORD
            - name: WORDPRESS_DB_USER
              value: root
            - name: WORDPRESS_DB_NAME
              value: mysql
      volumes:
        - name: wordpress-data
          persistentVolumeClaim:
            claimName: wordpress-pvc
---
kind: Service
apiVersion: v1
metadata:
  name: wordpress-service
spec:
  type: LoadBalancer # Change this line to use LoadBalancer
  selector:
    app: wordpress
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30007
```
<br><br>
> Wordpress Volumes: Create `wordpress-pv-pvc.yaml` file
```yaml
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: wordpress-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: manual
  hostPath:
    path: /home/ubuntu/project/wp-data

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: wordpress-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: manual
```

## Run and deploy Wordpress

1. **Create and Deploy Wordpress**
   
This command runs all the files within the directory the terminal is currently in: `kubectl apply -f ./`  (run single file: `kubectl apply -f your-file.yaml`)

2. **Access Wordpress**
  
This command shows you the external IP, which allows Wordpress to be reached from the outside kubectl: `kubectl get svc wordpress-service`

**Other useful commands**
If you want to delete a create ressource (Service, Volume, etc.), use e.g.: 
`kubectl apply -f your-file.yaml` or for all use `kubectl delete -f ./`

To get your Pods
`kubectl get pods`

## Tutorials

Creating and Connecting the Azure Kubernetes Service Cluster
https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli

Create and Deploy Wordpress with MySQL Database
https://engr-syedusmanahmad.medium.com/wordpress-on-kubernetes-cluster-step-by-step-guide-749cb53e27c7
