TODO (en cours)

- Ajouter bouton fixed menu (on mobile)

Bug :

------------

TODO list

- Mettre lien vers album suivant / precedent sur chaque album
- Mettre tooltip date/arriv/dest sur le pathline en desktop

------------

TODO - A la fin

- Remettre les validation recaptcha (auth/ comment/  laravel)
- Changer les mots de passe (admin)

------------

TODO - Bug

- voir pour le chargement des pages (jusqu'a page 13 avec data vide (fetch albums (home))) (plsueirs appel de 289km à 0 en boucle)
    (report by lolo)
- voir chargement gallery quand mauvaise connexion
    - attendre le onload de toutes les images avant d'afficher
- tressautement icons sur pathline (icon haut et bas)

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
- Modifier la couleur du disabled (made-up-input) et onclick (made-up-button) (même couleur que le button)
- Gérer les cas où il n'y a pas de texte, pas de vidéos ou pas d'images (mise en forme et sécurité)
- Voir pour les étapes avec kilometres avec des virgules
- Gérer le cas où il n'y a pas encore d'album (avec responsive)
- Mise en ligne de l'api
- Gérer les clés recaptcha sur l'hébergement final
- Mise en ligne du build vue
- Mettre le site en https
- Mettre la collection postman sur github
- Fix cas d'erreur avec les likes/dislikes
- Refato avec la logique async/await 
- Finaliser la partie upload d'image (manage album)
- Finaliser la partie video youtube (manage album)
- Transition sur la admin navbar
- Mettre error sur tous les recaptcha (login ok, love ok, report ok, comment ok)
- Fix toutes les alerts confirm avec la nouvelle façon de faire
- Intégrer les composant d'input partout
- Intégrer le composant de bouton partout
- Ajout du title de chaque page
- Transitionsur les icons (home)
- Faire un dark theme publique
- Uniformiser les dark theme public et privé
- Uniformiser les variables de font et de couleur
- Changer le favicon

DEBUG

- Bouton de changement de visibilité
- Problème avec le storage sur le serveur (upload d'image)
- Tableau albums-manage (nombre d'élement par page / page suivante)
- Animation cover sur la home (tri/infinite)
- Fix recaptcha problème
- warning (NaN) quand le stepper input number est vide
- Fix scroll issue on modal
- Transition trop rapide sur le kilometersLine
- Position scroll entre home et album
- Infinite scroll cassé quand on va sur un album et qu'on revient sur la home
- crash sur firefox (vuepictureswipe)
- resp menu disparition brutal
- transition kilometerLine quand top !== 0
- transition goToTop quand change de page
- Sur mobile Menu avec la line sur la home (On ne voit pas le bas)
- Régler le scroll dans le resp menu

-----------------

Deployment

API

- Deploy HEAD commit (Git™ Version Control on cPanel)
- `composer update` (with terminal on cPanel)
- `composer install` (with terminal on cPanel)
- Update `.env` informations (db, host)
- `php artisan storage:link` (for create symbolic link to public storage) (need for images)

Vue

- `npm run build` (with latest version in local)
- `git push` (still in local)
- Update from Remote (Git™ Version Control on cPanel)
- Deploy HEAD commit (Git™ Version Control on cPanel)