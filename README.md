Bot Discord, cérémonie de répartition et coupe des maisons

Un bot Discord pour un serveur de roleplay dans l'univers d'Harry Potter : il répartit les personnages dans les maisons et fait vivre une coupe des maisons basée sur la participation.

Projet personnel, fin 2024. Conception et développement en JavaScript par Julie François.

Le contexte

Sur le serveur, les joueurs incarnent leurs personnages grâce à des « tuppers » : un autre bot republie leurs messages sous le nom et l'avatar du personnage. Il manquait un élément central de l'univers : la répartition dans les maisons et la compétition entre elles.

Ce que fait le bot
Cérémonie de répartition : chaque tupper reçoit une maison attribuée au hasard, comme avec le Choixpeau.
Comptage des points : chaque message envoyé par un tupper rapporte des points à sa maison.
Coupe des maisons : plus un personnage participe au roleplay, plus sa maison progresse dans le classement.

Les personnages, leurs maisons et les points sont enregistrés dans une base de données.

Pourquoi c'est intéressant

Le bot transforme la participation en jeu collectif : il encourage les joueurs à écrire plus souvent, sans modifier leur façon habituelle de jouer.

Stack technique
JavaScript (Node.js)
API Discord
Base de données MongoDB pour les personnages, les maisons et les points

Julie François, Designer UX/UI juliefrancois.fr
