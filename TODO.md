TODO

Fonctionnel

- Quand un album est supprimer, supprimer les files images également
- Ajouter le bouton de suppresion sur les images d'un album
- Faire une modal de confirmation
- Améliorer le composant modal
- Faire une pagination avec lazy load sur les albums (10 albums par page)
- gérer le order_by (sort) pour pouvoir trier les albums
- ajouter barre de recherche d'album (dashboard)
- Ajouter des confirmations (modal) sur tous les changements d'état (suppression, visible, ok)
- Ajouter le bouton de report côté public (et empécher qu'une seule personne puisse spam 1 signalement (localhost ?))
- Gérer l'ajout de commentaire côté public
- Ajouter un recpatcha pour l'ajout de commentaire

Design

- Trouver des icones sympa pour : 
    - les flèches (retour et destination)
    - position
    - signalement commentaire (flag)
    - loading
    - Validation / suppression
    - visible (eye)
- Faire un loading stylé (home) avec skeleton loader ?
- Faire un loading stylé (album) avec transitions ?
- Gérer la grid des images (justified gallery)
- Faire des transitions sympa entre les pages (dont arrivé sur le site)
- Uniformiser les covers (responsive)
- Styliser les bas de page
- Ajouter les mentions légales
- Gérer au niveau du front un trux pour les jours de repos (si la destination est la même que l'arrivé et que l'étape est à 0) indiqué 'repos' à la place des kilomètres et n'afficher qu'une ville et pas deux fois la même.

Options

- Bouton like sur les commentaires ?

--------------------------------------------------------

DONE

Fonctionnel

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

Design

