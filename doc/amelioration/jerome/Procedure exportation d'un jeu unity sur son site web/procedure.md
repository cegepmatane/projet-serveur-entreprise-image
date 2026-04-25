

# Exportation d'un jeu Unity vers son site web
Documentation des étapes pour l'exportation d'un jeu Unity vers son site web



### Prérequis
- Connexion SFTP au serveur web
- Unity Hub 3.17.3
- Unity 6.4
- Un projet sur Unity 6.4



## Installation du module Web Build Support
Ouvrez Unity Hub. Assurez-vous qu'aucune fenêtre de l'éditeur n'est ouverte.

Sélectionnez l'onglet "Instalations"
<br>
![onglet instalation](./images/instalation%20web%20editor/Instalation%20web%20editor%201.png)
<br>
<br>

Sur l'installation de Unity 6.4, ouvrez le menu "Gestion" puis sélectionnez l'option "Ajouter module"
![menu gestion](./images/instalation%20web%20editor/Instalation%20web%20editor%202.png)
![option ajouter menu](./images/instalation%20web%20editor/Instalation%20web%20editor%203.png)
<br>
<br>

Défilez le menu jusqu'à ce que vous voyiez le module "Web Build Support", puis cliquez dessus pour l'installer.
![web build support](./images/instalation%20web%20editor/Instalation%20web%20editor%204.png)
<br>
<br>

Une fois le module installé, fermez le menu d'ajout de module et retournez à l'onglet "Projets".

Lancez le projet que vous souhaitez exporter sur le web.



## Compilation du jeu en format web
Dans l'éditeur Unity, ouvrez le menu de profils de compilation avec le raccourci clavier en appuyant simultanément sur les touches "Ctrl", "Shift" et "B".

Appuyez sur le bouton "Ajouter profil de compilation"
![ajouter profil de compilation](./images/compilation/Compilation%201.png)
<br>
<br>

Sélectionnez l'option "Web". Ne cochez aucune des configurations de profil de compilation. Appuyez sur le bouton "Ajouter profil de compilation".
![profil de compilation web](./images/compilation/Compilation%202.png)
![ajouter profil de compilation web](./images/compilation/Compilation%203.png)
<br>
<br>

Défilez puis ouvrez le sous-menu "Paramètres de publication". Dans le menu déroulant "Format de compression", choisissez l'option "Désactivé".
![ajouter profil de compilation](./images/compilation/Compilation%204.png)
![ajouter profil de compilation](./images/compilation/Compilation%205.png)
<br>
<br>

Ouvrez le sous-menu "Résolution et présentation". Dans le champ "Largeur du canvas par défaut", entrez 1280 et dans le champ "Hauteur du canvas par défaut", entrez 720.
![ajouter profil de compilation](./images/compilation/Compilation%206.png)
![ajouter profil de compilation](./images/compilation/Compilation%207.png)
<br>
<br>

Appuyez sur le bouton "Compiler". Une nouvelle fenêtre apparaîtra. Sélectionnez l'emplacement où vous souhaitez enregistrer votre jeu. Prenez en note cet emplacement. Donnez ensuite un nom à votre jeu (le nom ne doit contenir d'espaces) puis cliquez sur le bouton enregistrer.
![ajouter profil de compilation](./images/compilation/Compilation%208.png)
![ajouter profil de compilation](./images/compilation/Compilation%209.png)
<br>
<br>



## Exportation vers le serveur web
Une fois la compilation complétée, transférez le répertoire sur votre serveur web avec SFTP à /var/www/html.



## Tester le jeu
Dans un navigateur internet, entrez dans la barre d'URL <votre ip>/<nom du jeu>