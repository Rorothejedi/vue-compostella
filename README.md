TODO (priorité haute)

- Modifier la couleur du disabled (made-up-input) et onclick (made-up-button) (même couleur que le button)

------------

TODO (priorité moyenne)

- Gérer les cas où il n'y a pas de texte, pas de vidéos ou pas d'images (mise en forme et sécurité)

- Intégrer les composant d'input partout
- Intégrer le composant de bouton partout

- Gérer le cas où il n'y a pas encore d'album (avec responsive)

- Gérer au niveau du front un truc pour les jours de repos (si la destination est la même que l'arrivé et que l'étape est à 0) indiqué 'repos' à la place des kilomètres et n'afficher qu'une ville et pas deux fois la même.
- Gérer le cas ou je ne ferais pas d'album pour toutes les étapes (possibilité de sauté une étape ?) (a réfléchir)
- Gérer correctement les jours de repos

------------

TODO (priorité basse)

- Voir pour les étapes avec kilometres avec des virgules
- Uniformiser les variables de font et de couleur
- Finaliser les transitions sympa entre les pages (dont arrivé sur le site)
- Test avec des données réel (étapes prévue en france et espagne)

------------

TODO - A la fin

- Mettre la collection postman sur github
- Mise en ligne de l'api
- Mise en ligne du build vue
- Gérer les clés recaptcha sur l'hébergement final

------------

Optionnel

- Refacto row du tableau pour la page album-manage
- Intégrer un coeur pour les likes comme ceux de twitter
- Mettre la confirmation sur
    - Suppression photo
    - Modification photo
    - Suppression lien vidéo
    - Modification lien vidéo

- Ajouter une option admin de desactivation des commentaires pour l'album
- Transition entre l'accueil et les albums avec un transition qui comporte le nom de la ville de départ et d'arrivé
- Voir pour tooltip (title importants (kilomètes parcourus))
- Faire un dark theme publique
- Faire des onglets (infos, photos, videos) pour album manage
- Faire une intégration du konami code

--------------------------------------------------------

DONE

- Gérer la redirection automatique en cas d'erreur 401 (unauthenticated)
- Gérer la modification des data principale sur un album
- Faire le calcul des km_total directement côté serveur (recalculer toutes les valeurs en fonction du new km_step)
- Faire passer la data km_total_max pour les albums
- VisibilityButton sur la view edit
- DeleteButton sur la view edit
- Gérer l'ajout des images sur un album
- Retirer une image de la preview au click
- Créer un composant modal
- Supprimer une image d'un album
- Enregistrer la width / height de chaque image dans la db
- Modifier les data d'une image (main, text)
- Ajouter un ordre aux images dans un album
- Ajouter les boutons de changements d'ordre sur les images d'un album
- Ajouter un icon sur les images d'un album qui indique s'il y a un texte non null dessus
- Quand un album est supprimer, supprimer les files images également
- Ajouter le bouton de suppresion sur les images d'un album
- Refacto Dashboard et ImageManage
- Faire une page dédié pour les commentaires signalés
- Faire une barre admin (en haut de l'écran)
- Faire un count des commentaire signalé
- Ajouter le nombre de commentaire signalé dans la barre d'admin (sur le bouton pour accéder aux reports)
- Gérer l'ajout de commentaire côté public
- Faire un bouton de suppression de commentaire côté public si on est authentifié
- Ajouter le bouton de report côté public
- Ajouter un bouton de like sur les commentaires
- Empêcher que le bouton de report et de like puisse être spam (localstorage)
- Mettre l'ajout d'album dans une modal
- Faire une pagination avec lazy load sur les albums (10 albums par page)
- Gérer l'optimisation des images côté serveur
- Gérer les thumbnails côté serveur (pour les main et celles d'un album)
- Débug le lazy load de l'accueil depuis les autres pages
- Gérer la grid des images (justified gallery)
- Résoudre les soucis avec le vue-picture-wipe
- Faire un bouton "gérer l'album" sur le côté public avec isAuthenticated
- Resoudre bug (2nd click sur "gérer les album fait planter") 
- Gérer l'affichage de la grid justified dès le mounted du composant
- Resoudre bug avec trop de photo inline
- Gérer le resize de la grid d'image au redimentionement de la fenetre
- Résoudre bug "plein écran" sur la gallery
- Gérer le composant KilometersLine
- Ajouter les icons material design des fonts google
- Ajouter icones (place) au début des kilomètres sur le composant KilometersLine
- Faire composant bouton (adaptatif - loading/icon/disable)
- Faire le loveButton dans un composant séparé
- Faire le responsive des commentaires
- Design pour le bouton gérer l'album
- Ajouter crud pour video youtube
- Design pour les boutons de la barre d'admin
- Trier les images par album_order côté serveur
- Ne pas montrer au public un commentaire ayant été signalé plus de 3 fois
- gérer le order_by (sort) pour pouvoir trier les albums
- gérer le order_by (sort) pour pouvoir trier les albums (infinite)
- Supprimer la POC sur kinesis
- Faire le PathLine
    - Centrer les points en hover
    - Gérer les icons sur le côté
    - Empêcher la superposition des points
    - Gérer le resize de la fenetre (height)
    - Faire un WS pour avoir les données depuis serveur
    - Gérer le responsive pour les grand écran
- Terminer les covers de l'accueil (grande taille)
- Uniformiser les covers (responsive)
- Faire un bouton pour revenir en haut de page (home)
- Refacto sur la gestion de l'edit d'album
- Ajouter des notifications pour confirmer les actions (ajout, suppression, edit, report, etc)
- Mettre la confirmation sur
    - Suppression de commentaire signalé
    - Signalement de commentaire (page album public)(warning)
    - Suppression de commentaires (page album public)(warning)
    - Message posté (success)
- Ajouter un recaptcha pour l'ajout de commentaire
- Adapation responsive pour le composant KilometersLine
- Mettre des tooltips pour les titles important
- Ajouter les mentions légales
- Ajouter le bouton backToTop sur les pages album et legal
- Redesign login page
- Mettre le recaptcha sur le login (pour l'admin)
- Mettre un loading sur le bouton de déconnexion
- Fix l'apparition des images sur l'accueil (pop après coup) & loader home
- Clear albums infinite quand on modifie, supprime ou rend visible un album
- Faire le PathLine
    - Faire un ecran dédié pour les petits ecrans
- Gérer les smartphones (responsive) pour l'accueil
- mettre des alertes sur les inputs (error) et des alertes 
    - pour le login
    - pour la modif d'album
- Fix le loading sur l'accueil

- Intégrer recaptcha pour les likes et les signalements public (avec mixin)