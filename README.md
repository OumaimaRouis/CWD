# README: Documentation Test Technique 


## Schémas de Données
Dans ce test technique, j'ai utilisé les schémas de données suivants avec la base de données MySQL :

### •	Auth (authentification)
Représente l'authentification. Le schéma inclut les champs suivants :

o	Id (number) : Identifiant unique de l'utilisateur
o	Name (string) : Nom d'utilisateur de l'utilisateur
o	Email (string) : Adresse e-mail de l'utilisateur
o	Password (string) : Mot de passe de l’utilisateur

### •	Mekla
Représente les opérations CRUD pour les posts de mekla. Le schéma inclut les champs suivants :

o	Id (number) : Identifiant unique du ‘mekla’
o	Title (string) : Titre du ‘mekla’
o	Content (string) : Contenu du ‘mekla’
o	fileUrl (string) : URL du fichier à télécharger, peut être nul

## Instructions pour Lancer l'Application :

### Construire l'image Docker :
docker build -t my-app .
### Lancer le conteneur :
docker run -p 3000:3000 my-app




## Points d'Entrée

API REST
### Authentification (auth.controller.ts)
Ce fichier contient les contrôleurs pour les opérations liées à l'authentification des utilisateurs.

### Inscription
Méthode : POST
URL : http://localhost:3000/auth/register
Exemple de requête en JSON :
{
  "name": "test",
  "email": "test@gmail.com",
  "password": "password123"
}

### Connexion
Méthode : POST
URL : http://localhost:3000/auth/login
Exemple de requête en JSON :
{
  "email": "test@gmail.com",
  "password": "password123"
}

### Vérification de l'email
Méthode : POST
URL : http://localhost:3000/auth/send-verification-email
Exemple de requête en JSON :
{
  "email": "test@gmail.com"
}

### Réinitialisation du mot de passe
Méthode : POST
URL : http://localhost:3000/auth/send-password-reset-email
Exemple de requête en JSON :
{
  "email": "test@gmail.com"
}

### AuthService (auth.service.ts)
Ce fichier contient les services qui implémentent le logique métier pour les opérations d'authentification, y compris l'inscription, la connexion, l'envoi des emails de vérification et de réinitialisation de mot de passe.

### AuthEntity (auth.entity.ts)
Ce fichier définit l'entité Auth, qui représente les utilisateurs dans la base de données. Il inclut les propriétés telles que l'ID, le nom, l'email, le mot de passe, la vérification et le token de réinitialisation.

### AuthModule (auth.module.ts)
Ce fichier configure le module d'authentification en déclarant et en reliant les contrôleurs, les services et les entités nécessaires pour l'authentification.








### Mekla (mekla.controller.ts)
Ce fichier contient les contrôleurs pour les opérations CRUD sur les entités Mekla.

### Créer un nouveau ‘mekla’
Méthode : POST
URL : http://localhost:3000/mekla
Exemple de requête en JSON :

{
  "title": "test",
  "content": "content",
  "fileUrl": "https://www.osureunion.fr/wp-content/uploads/2022/03/pdf-exemple.pdf"
}

### Voir tous les ‘mekla’
Méthode : GET
URL : http://localhost:3000/mekla

### Voir un ‘mekla’ par son id

Méthode : GET
URL : http://localhost:3000/mekla/1




###Modifier un ‘mekla’ par son id

Méthode : PUT
URL : http://localhost:3000/mekla/1

Exemple de requête en JSON :
{
  "title": "modification test",
  "content": "content",
  "fileUrl": "https://www.osureunion.fr/wp-content/uploads/2022/03/pdf-exemple.pdf"
}

### Supprimer un ‘mekla’ par son id

Méthode : DELETE
URL : http://localhost:3000/mekla/1

### MeklaService (mekla.service.ts)
Ce fichier contient les services qui implémentent la logique métier pour les opérations CRUD sur les entités Mekla.

### MeklaEntity (mekla.entity.ts)
Ce fichier définit l'entité Mekla, qui représente les posts Mekla dans la base de données. Il inclut les propriétés telles que l'ID, le titre, le contenu et l'URL du fichier.



### MeklaModule (mekla.module.ts)
Ce fichier configure le module Mekla en déclarant et en reliant les contrôleurs, les services et les entités nécessaires pour les opérations CRUD sur les entités Mekla.


## Interactions
J'ai exploré davantage NestJS en consultant la documentation sur : NestJS Documentation: https://docs.nestjs.com/

J'ai appris le CRUD à l'aide de : Tutoriel CRUD sur YouTube: https://www.youtube.com/watch?v=dAy4TZXzZck

Pour l'authentification, j'ai consulté plusieurs sites et vidéos, notamment :

Tutoriel d'authentification sur YouTube: https://www.youtube.com/watch?v=ED8uWgE-KeY 
Documentation sur l'authentification de NestJS: https://docs.nestjs.com/security/authentication
Pour NodeMailer, j'ai utilisé :

Tutoriel FreeCodeCamp sur NodeMailer avec NestJS: https://www.freecodecamp.org/news/how-to-use-nodemailer-in-nestjs/
et Tutorile sur Youtube: https://www.youtube.com/watch?v=Pu1YP5PZKFc
