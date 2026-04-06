# Installation
Documentation des étapes pour l'installation, la configuration et le lancement des bases du projet.

## Prérequis 
- Serveur Ubuntu 24.04lts  
- Sécurisation du serveur : [Documentation Sécurisation](https://docs.google.com/presentation/d/1PU63Hrt2aySgctg5CeqcCKHfleh34lCsptgdP1UKmCU/edit?slide=id.g124275a85d6_0_138#slide=id.g124275a85d6_0_138)    


## Installation .NET 9 
```bash
sudo apt-get update
sudo add-apt-repository ppa:dotnet/backports
sudo apt-get install -y dotnet-sdk-9.0
```

S'il y a des erreurs, effectuer les commandes suivantes : 
```bash
sudo apt-get install -y aspnetcore-runtime-9.0
sudo apt-get install -y dotnet-runtime-9.0
```


## Installation *CodeProject.AI-Server*  
- Téléchargement du package CodeProject.AI :  
`wget https://codeproject-ai-bunny.b-cdn.net/server/installers/linux/codeproject.ai-server_2.9.5_Ubuntu_x64.zip`  

- Installation du .deb :  
```bash
unzip codeproject.ai-server_2.9.5_Ubuntu_x64.zip
ls

sudo dpkg -i codeproject.ai-server_2.9.5_Ubuntu_x64.deb
sudo apt --fix-broken install -y

pushd "/usr/bin/codeproject.ai-server-2.9.5/" && bash setup.sh && popd
pushd "/usr/bin/codeproject.ai-server-2.9.5/server" && bash ../setup.sh && popd
```


## Lancement et test du service  
- Lancement du service :  
```bash
sudo systemctl start codeproject.ai-server
sudo systemctl enable codeproject.ai-server
```  

Teste à effectuer dans le serveur, devrait retourner du html :  
```curl http://localhost:32168```  

Modification permission du port du serveur pour effectuer le test dans un browser : 
`sudo ufw allow 32168/tcp`


## Sécurisation du service avec un Reverse Proxy :  
```bash
sudo apt install nginx apache2-utils

sudo htpasswd -c /etc/nginx/.htpasswd { yourusername }
```
Entrer un user et un mot de passe.

```bash
sudo rm /etc/nginx/sites-enabled/default

sudo nano /etc/nginx/sites-available/codeproject
```  

Création d'une config, s'assurer que le contenu du fichier `codeproject` est commme suit : 
```
server {
    listen 80;

    location / {
        proxy_pass http://127.0.0.1:32168;

        auth_basic "Restricted Access";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/codeproject /etc/nginx/sites-enabled/
sudo systemctl restart nginx

sudo ufw allow 32168
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```