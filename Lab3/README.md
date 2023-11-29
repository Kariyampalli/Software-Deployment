# Lab 3: Setting up a Docker-Environemnt

In this exercise a `Docker-Environment` will be set in two different ways, split into Teil 1 and Teil 2 (Teil/Part). Teil 1 uses images pulished on the Docker Hub, Teil 2 in the other hand will use self defined and created images instead.

<img src="https://logowik.com/content/uploads/images/301_docker.jpg" style="height: 100px; width: 130px"/> <img src="https://www.rogoit.de/webdesign-typo3-blog-duisburg/wp-content/uploads/2016/06/debian-logo-horizontal.gif" style="height: 100px; width:200px;"/> <img src="https://qloudea.com/blog/wp-content/uploads/2022/11/mysql-logo.jpg" style="height: 100px; width:200px;"/>

<img src="https://miro.medium.com/v2/resize:fit:474/1*hRd-FJvsygykeIhNFROxBw.jpeg" style="height: 100px; width:200px;"/> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/1200px-PHP-logo.svg.png" style="height: 100px; width:200px;"/> <img src="https://www.metoki.ch/wp-content/uploads/WordPress_logo_metoki-blau_1200x800.jpg" style="height: 100px; width:200px;"/>

## Why use Docker?

**_" I don't know why it doesn't work on your computer, it works on mine_** 🤔 **_"_**

_`Docker` is a powerful platform for developing, shipping, and running applications in containers. There are several compelling reasons why someone might choose to use `Docker`:_

1. **Portability:**
   `Docker-Containers` encapsulate an application and its dependencies, ensuring consistency across different environments.

2. **Isolation:**
   Containers provide lightweight and isolated environments, preventing interference and conflicts with other applications.

3. **Efficiency:**
   `Docker` uses a layered file system for efficient disk usage and quick image downloads. Containers start up and shut down rapidly.

4. **Scalability:**
   `Docker` enables easy scaling of applications by running multiple containers based on the same image. Orchestration tools like Kubernetes enhance scalability.

5. **Resource Utilization:**
   `Docker` allows efficient use of system resources by running containers on a shared operating system kernel.

6. **DevOps Practices:**
   `Docker` supports DevOps practices by providing a consistent environment for development, testing, and production.

7. **Microservices Architecture:**
   `Docker` supports a microservices architecture, allowing developers to break down monolithic applications into smaller, modular services.

8. **Version Control:**
   `Docker-Images` are versioned, providing a mechanism for tracking changes and rolling back to previous versions.

9. **Community and Ecosystem:**
   `Docker` has a large and active community, contributing to a vast ecosystem of pre-built images available on `Docker Hub`.

10. **Cross-Platform Compatibility:**
    `Docker` runs on various operating systems, including `Linux`, `Windows`, and `macOS`.

# Teil 1

In Part 1 (Teil 1), a `docker-compose` file with images installed from the `Docker Hub` was created.

1. Create a `docker-dompose` file

2. Install required Images from the `Docker Hub` (In our case `Wordpress` and `MySql`)
   `docker pull [Image name]`

3. Reference them in the image section of your `docker-compose` file

4. Set options of the services/image-containers

5. Then open the `Docker Desktop App` and run `docker-compose up -d`, to build and deploy the `Docker-Environment`, its image-containers and the images.

6. Open and test your image-containers by runing certain command (See Teil 2) or openning on the specified ports.

<img src=".\Screenshots\Teil1\Teil1_Wordpress.JPG" style="height: 500px; width:700px;"/>

<img src=".\Screenshots\Teil1\Deployed.JPG" style="height: 500px; width:700px;"/>

# Teil 2

In Part 2 (Teil 2), two `Docker-Images` and its image-containers, one for `WordPress` and another for `MySql` with both using `Debian Bullseye` as a base were created. Furthermore, a `docker-compose` file was created as well, to connect both the `Wordpress-Image-Container` and the `MySQL-Image-Container`.

## Docker-compose file

`Docker Compose` simplifies the orchestration of multi-container applications, making it easier to manage and deploy complex setups. It is a powerful tool for both development and production environments, providing a unified configuration file to define the structure and behavior of your application's components.

Following command builds and deploys the referenced images, image-containers within the `docker-compose` file: `docker-compose up -d --build`

### Images

Another way to build your images and their corresponding containers can be done as follows:

1. `docker build -t [image name]`
2. `docker run -d -p 8080:80 [image name]`

<img src=".\Screenshots\Teil2\Deployed.JPG" style="height: 500px; width:700px;"/>

## MySQL-Image

Due to the way the `Dockerfile` of the `MySQL-Image` is written, additional folder and files had to be created, to get the image running. Please keep in mind that the creation of the docker environment should be kept as simplistic as possible, since it will most likely be shared with other people, for this exercise purposes it should do fine.

1. Create a `Dockerfile` for your `MySQL-Image`

2. Chose a base for your image, such as `MySQL`, `Ubuntu`, `Debian`. In this example `Debain (Bullseye)` is used as the base (operating system) for this image and a `MySQL-Server` is installed onto the operating system

3. Define Environment variables (In our case Database information) and write what should be run first (configurations) in order for your `MySQL-Server` to be able to get started

### Test your MySQL-Image

To test your MySQL-Image, use the following command: `docker exec -it [image container name] mysql -u wordpress -p`. In this case the name of the image-container is `teil2-mysql-1`

It asks you to put in the password defined in the environment section within the DockerFile. After entering the password, the database should be accessable and displayed as a command line. After that SQL-Commands can be entered to create tables, show databases etc.

<img src=".\Screenshots\Teil2\Show_Database.JPG" style="height: 200px; width:200px;"/>

## Wordpress-Image

This `Wordpress-Image` has been created with `Debian (Bullseye)` as a base.

1. Create a `Dockerfile` for your `Wordpress-Image`

2. Chose a base for your image, such as `Wordpress`, `Ubuntu`, `Debian`. In this example `Debain (Bullseye)` is used as the base (operating system) for this image and `Wordpress`, `PHP` and `Apache` has been installed onto the operating system.

3. Define Environment variables (In our case Database information) and write what should be run first (configurations) in order for your `Wordpress site` to be accessible

### Test your Wordpress-Image

To test your Wordpress-Image, use a command such as for the `MySQL-Image` or open the site on your browser with the defined port. In this case with port `8888`.

<img src=".\Screenshots\Teil2\apache.JPG" style="height: 500px; width:700px;"/>

# Tutorials and Docs

### Installing Images

- [Installing via Docker Hub](https://docs.docker.com/docker-hub/quickstart/)

- [Images/Docker Hub](https://hub.docker.com/)

### Creating a DockerFile

- [Documentations](https://docs.docker.com/engine/reference/builder/)

- [Best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

### Example installations of MySQL and Wordpress on Ubuntu

- [Server setup Ubuntu](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04)

- [Ubuntu, MySQL, PHP, Apache](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-16-04)

- [Ubuntu, Wodpress, PHP, Apache](https://www.digitalocean.com/community/tutorials/how-to-install-wordpress-with-lamp-on-ubuntu-16-04)
