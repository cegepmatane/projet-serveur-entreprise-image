# Amélioration
Procédure des étapes et des commandes pour effectuer la partie amélioration du service.  

## Répartition des tâche du devis 
### Emmanuel :  
- [ ] *Installation des modules de la section ‘Image Processing’, cela inclut ‘Background Remover’, ‘Cartoonizer’, ‘Portrait Filter’ et ‘Super Resolution’.*
- [ ] *Intégrer un module OCR (reconnaissance de texte dans les images) pour ajouter une seconde capacité IA au projet*

### Jérome : 
- [ ] *Exportation et mise en ligne du jeu de Chevalier d’Unity dans le sous domaine de notre site web https://jeu.aiimageproject.online*
- [ ] *Rate limiting sur l’API (Apache mod_ratelimit ou Nginx limit_req) par IP et-ou par token pour éviter abus et DDOS sur service IA gourmand en GPU/CPU*

### Cédric : 
- [ ] *Optimisation : Installation et test de différent module de la catégorie ‘Object Detection YOLOv.x’ depuis le panel de CodeProject.AI Serveur, pour utiliser le module le plus adapté à notre projet. ‘Object Detection (YOLOv5 6.2)’ est celui installé et utilisé actuellement, mais les autres n’ont pas été essayé.*
- [ ] *Documenter l’API publique avec OpenAPI/Swagger sur aiimageproject.online/doc pour permettre à d’autres développeurs d’utiliser le service.*  
Note : Ce serait vrm bien que tu le fasse d'ici le 29 pour la présentation à l'UQAR

### Alexandre : 
- [ ] *Ajouter une page « Comment ça marche » avec diagramme interactif expliquant la chaîne image => YOLO => bounding boxes*  
Note : Ce serait vrm bien que tu le fasse d'ici le 29 pour la présentation à l'UQAR
- [ ] *Créer une galerie des détections remarquables (meilleures réussites + échecs amusants du modèle) pour montrer les limites honnêtement*
- [ ] *Tokens d’authentification générés par le serveur et distribués aux deux clients (site web + jeu) : refus de service si token absent ou invalide*

### Victor : 
- [ ] *Dashboard d’utilisation publique façon status page : nombre de requêtes traitées, uptime, modules installés, latence moyenne par module*
- [ ] *Chaque fois que le Panel CodeProject.Ai Serveur retourne un log d’erreur, créer une alerte simple via message de chat et l’enregistrer dans le fichier du serveur.*
- [ ] *Rate limiting sur l’API (Apache mod_ratelimit ou Nginx limit_req) par IP et-ou par token pour éviter abus et DDOS sur service IA gourmand en GPU/CPU*  
Note : Selon Jérome, il parait que c'est déja fait, parlé avec lui pour voir.
