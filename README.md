# YATS - Formation NodeJS
Partie NodeJS de la formation
---
C'est la partie NodeJS de la formation du YATS hackathon 2022
L'application textmsg est basée sur NodeJS et vous permet d'exposer des APIs.
Normalement ces APIs sont connectés a une base de données mysql et utilisent le Sequelize
## Architecture
L'application est dans le style MVC mais comme il n'y a pas d'interface utilisateur elle
se contente d'exposer les APIs.
Le controler se trouve dans le repertoire `routes`, fichier `textcontroller.js`
Le business logic se trouve dans le repertoire `businesslogic`
Dans le module business logic on fait les validations et on appelle le module `textmsgaccess`
pour lire les données stockées dans une base de données ou autre.
`package.json` et le fichier qui indique les modules qui doivent être installées pour permettre à l'application de functionner.
## Application sans Sequelize et Mysql
Pour vous permette de tester Nodejs san installer mysql package.json a une liste minimale de modules. Cette liste n'utilize pas le ORM Squelize.
Commentez le deux premières lignes du fichier  `textmsglogic.js`comme suit:
`//const SequelizeConnect   = require("../SequelizeConnect.js");
//const Initializer = require("../Models/init-models");`


### Installer les modules nécessaires
Il faut d'abord installer NodeJS avec au minimum version 16.13.
Une fois NodeJS installé, installer les modules nécessaires avec cette commande:
`npm install (sur une ligne de commande DOS)`
Les modules qui sont installées ne contiennent pas Sequelize. Une fois les modules installées on peut lancer l'application avec cette commande:
`npm start (sur une ligne de commande DOS)`.
Cela devrait demarrer l'application qui va écouter sur le port 3040.
L'application utilise le fichier data.json dans le repertoire dataaccess pour simuler une base de données
`{
  "records": [
    {"userid": "cotonou", "password": "hackbenin","msgid": 0}
  ]
}`
Seulement deux APIs sont illustrés dans la version qui tourne sans Sequelize et Mysql:1, et 2(Lire les ids des messages et ajouter message). Le reste des APIs ainsi que la sauvegarde du fichier data.json est un exercise qui vous est laissé. 
### Liste d'APIs
Utiliser CURL ou postman pour tester les APIs
1. `curl –X POST https://localhost:3040/textmsg/listeridtextes -H “application/json” –d “{\”identifiant\”:\”cotonou\“, \”passe\”:\”hackbenin\”}”`
2. `curl –X POST https://localhost:3040/textmsg/ajoutertexte -H “application/json” –d “{\”identifiant\”:\”Cotonou\“, \”passe\”:\”hackbenin\”, \”texte\”:\”hello\",\"id\":1}` 
3. `curl –X POST https://localhost:3040/textmsg/liretexte -H “application/json” –d “{\”identifiant\”:\”cotonou\“, \”passe\”:\”hackbenin\”,\”id\”:1}”`
4. `curl –X POST https://local)host:3040/textmsg/nouveaumotdepasse -H “application/json” –d “{\”identifiant\”:\”cotonou\“, \”passe\”:\”hackbenin\”,\”nouveaupasse\":\"hackbenin\"}`
5. `curl –X POST https://localhost:3040/textmsg/listertextes -H “application/json” –d “{\”identifiant\”:\”cotonou\“, \”passe\”:\”hackbenin\”}”`
6. `curl –X DELETE https://localhost:3040/textmsg/liretexte -H “application/json” –d “{\”identifiant\”:\”cotonou\“, \”passe\”:\”hackbenin\”,\”id\”:1}”`

## Application avec Sequelize et Mysql
Vous devez installer Mysql s'il n'est pas déja installé. Voir la section ci-dessous pour installer Sequelize.
Pour utiliser l'application avec Sequelize et Mysql, il faut renommer le fichier `textmsgaccessdb` en `textmsgaccess` à la place du fichier qui utilise `data.json`.
Retirer les commentaires du fichier `textmsg` comme suit:
`const SequelizeConnect   = require("../SequelizeConnect.js");
const Initializer = require("../Models/init-models");`

# Ressources
Le fichier `packagefull.json` contient la liste des modules qui permettent d'utiliser Sequelize avec l'application.
Pour installer Sequelize, utiliser le lien suivant: [Premier Pas avec Sequelize](https://sagot.dev/articles/premiers-pas-sequelize/)
