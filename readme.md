# FORMFLEX
### <http://flexvision.be/formflex/sliker.php>

`sliker` est un plugin slider/slideshow écrit en `jQuery`

# dépendances
- `jQuery`: une version récente sans limitation précise
- `Less`: le css de ce plugin est écrit en LESS, quelques variables de couleur devront être définies pour son bon fonctionnement.
- ´FontAwesome´: les flèches de navigation utilisent des icones FontAwesome. Il est possible de s'en passer (voir plus bas)

# Installation
1. récuperer les fichiers `sliker.less` et `sliker.js` à la racine du projet GitHUb
2. inclure le fichier `sliker.js` dans la document avant la fermeture de la balise `</body>`
3. lier et génerer un css à partir de `sliker.less`

# Utilisation
- créer la structure html suivant l'exemple
```html
<div id="slider_example" class="sliker">
	<div class="conteneur_strict">
		<ul class="grand_slider">
			<li><img src="./example.jpg"></li>
			<li><img src="./example.jpg"></li>
			<li><img src="./example.jpg"></li>
		</ul>
	</div>
</div>
```
- déclarer le slider en javascript
```javascript
$('#slider_example').slider_nike({
'nbr_li':1, //nombre d'éléments qui défilent à chaque mouvement.
'vitesse_auto':3000, //temps entre deux mouvements automatiques.
'vitesse': 500, //rapidité du mouvement (automatique ou manuel, même paramètre).
'auto':0, //activer ou non le défilement automatique.
'type':"none", //définit le role du slider dans le cas d'une liaison. Options: visualiseur, menu, none.
'cible':"none", //spécifie l'id du slider compagnon dans le cas d'une liaison (ex: #slider_deux).
'isolement': 0, //si actif, le slider est isolé par un fond noir transparent lors de son utilisation.
'pc_only':0, //si actif, le slider sera éffacé sur tous les dispositifs mobiles.
'loop':0, //si actif, le slider répetera son contenu indéfiniment, créant un rail infini.
'liquide':1, //si actif, l'élément prendra, de façon élastique, toute la zone du slider.
'drag':0, //permet la manipulation du slider aux doigts ou en cliquer/glisser à la souris.
'creer_afficheur': 0, //crée automatiquement une zone avec l'image zoomée au dessus du slider.
'fading_mode': 1, //remplace la transition en "déplacement de rail" par un fondu.
'buffering_nbr': 1, //nombre d'image préchargé autour de l'image active. Nécessite l'utilisation de data-src au lieu de src.
'fullscreen': 0, //affiche ou masque le bouton fullscreen.
'bullets': 1, //affiche ou maque les puces du slider.
'bullets_limit': 20, //limite de puces au délà de laquelle celles ci se transforme en un menu pages (ex: 7/22).
});
```

# Personnalisation

## Couleurs
Par défaut, le less de Slike chercher après la variable @theme et se sert de celle-ci pour coloriser ses éléments de navigation.
Il est donc nécessaire que cette variable existe.
Il est toutefois possible de modifier ses couleurs indépendement en utilisant en ciblant le slider en CSS et 
en utilisant un mixin LESS :
```css
.sliker_colors(@color,@bg);
```
- @color pour la couleur de fond (au repos) des puces et fleches.
- @bg pour la couleur active (survol) des puces et fleches.

##### Exemple
```css
#slider_example{
.sliker_colors(red,white);
}
```

## Icones
Par défaut, Sliker utilise des icones font-awesome pour ses flèches de navigation et des span arrondis en CSS pour ses puces.
Ces éléments sont remplaçables facilement par d'autres icones (FontAwesome ou autre).

- pour remplacer les flèches, ajouter un attribut ´data-arrow´ à la base du slider et y spécifier la classe FontAwesome ou autre (set d'icone personnalisé). Si l'icone utilisée possède une terminaison en -left ou en -right, le système appliquera les flèches correpondantes au coté ciblé.

##### Exemple
```html
<div id="slider_example" class="sliker" data-arrow="fa fa-caret-left" >
	<div class="conteneur_strict">
		...
```


- 


- mettre ".full" sur la balise "img" si on souhaite qu'elle prenne 100% du li, sinon elle prendra sa taille réelle<br />
<br />
- départ sur un slide précis possible (comme ici) grace à la classe "selected" à mettre sur un "li".<br />
<br />
- pour masquer les puces, mettre la class "no_btn" sur la base du slider.<br />
<br />
- mettre la class "vam" (pour vertical align middle) sur la base du slider pour que les li soient alignés verticalement<br />
<br />
- mettre la classe "safeload" à la racine (.sliker) afin d'avoir un chargement moins saccadé dans le cas d'un slider élastique (une image)<br />
<br />
- utiliser l'attribut data-arrow sur la base du slider en indiquant une class font-awesome (ou autre) sans la terminaison -left -right (ex: "fa fa-caret")<br />
<br />
- utiliser l'attribut data-bullet pour utiliser une icone comme puce à la place d'un span arrondi => spécifier la class font-awesome entière dans l'attribut (ex: "fa fa-star")<br />
<br />
<br />
<br />
<br />
VARIABLES LESS
<br />
Ces variables s'appliquent en css. Il faut cibler le slider dans le css normal (par son id par exemple) et lui appliquer un de ces mixins: 
<br />
<br />

<br /><br />
.sliker_bullets(@size,@round);<br />
@size pour la taille: hauteur et largeur de la puce ou font-size de l'icone.<br />
@round pour l'arrondi de la puce (ex:2px pour un carré légèrement arrondi) => inutile si la puce est une icone<br />
<br /><br />
.sliker_bullets_out(@spacing);<br />
@spacing pour modifier les marges (top et bot) des boutons<br />
- ce mixin sort les puces du slideret les positionnes après celui ci.<br />
Ecrire .sliker_bullets_out; sans option est donc tout à fait viable;
<br /><br />
.sliker_bullets_in(@spacing);<br />
! position par defaut !<br />
@spacing pour modifier la marge des boutons (séparation du bas du slider)<br />
- ce mixin rentre les puces dans le bas du slider, par dessus le contenu<br />
Ecrire .sliker_bullets_in; sans option est viable et appliquera la marge par defaut;
<br /><br />
.sliker_arrows_out(@spacing);<br />
@spacing pour modifier l'espacement entre les fleches et le bord du slider (sans compter le padding autour de l'icone)<br />
- ce mixin sort les fleches en dehors du slider<br />
Ecrire .sliker_arrows_out; utilsera un spacing de 0px et les fleches seront contre le slider.
<br /><br />
.sliker_arrows_in(@spacing);<br />
! position par defaut !<br />
@spacing pour modifier l'espacement entre les fleches et le bord du slider (sans compter le padding autour de l'icone)<br />
- ce mixin rentre les fleches dans le slider<br />
Ecrire .sliker_arrows_in; utilsera un spacing de 0px (par defaut) et les fleches seront contre le slider.
