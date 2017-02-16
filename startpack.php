<?php include("./inc/header.php"); ?>
<div id="wrapper">

<ul id="buttons_dl">
	<li>
		<a href="./assets/js/startpack.js" target="_blank" download="startpack.js">
		télécharger le <strong>js</strong>
		</a>
	</li>
	<li>
		<a href="./assets/less/startpack.less" target="_blank" download="startpack.less">
		télécharger le <strong>less</strong>
		</a>
	</li>
</ul>

<h1><i class="fa fa-shopping-bag"></i> Startpack</h1>

<!-- /FIN DU HEADER ------------------------------------------------------------------------------->
<!-- /FIN DU HEADER ------------------------------------------------------------------------------->










<div class="formflex_title">
	Autopopup
</div>
<div data-popup="popup_example">
	ouvrir le popup en utilisant data-popup="" (cliquer sur ce texte pour tester)
</div>
<div class="autopopup w500 m50 r10" id="popup_example">
	<div class="popup_title">
		Popup example
	</div>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales justo sit amet quam volutpat, vitae luctus dui tincidunt. Nunc fermentum libero sapien, et placerat nisi sollicitudin sit amet. Maecenas adipiscing tristique dolor, ac varius magna varius non. Pellentesque sodales, diam eu tincidunt convallis, nisl massa pharetra purus, id elementum lorem risus eu dolor. Nulla imperdiet fermentum placerat. Sed dui orci, egestas vel justo ut, cursus interdum diam. Aliquam pharetra vitae mauris et ultrices.
		<br /><br />
		Morbi sed augue nisi. Vivamus vehicula eros in lorem auctor, adipiscing pretium urna pulvinar. Praesent vitae imperdiet ante. Mauris eu pellentesque magna. Donec consectetur mauris orci, ultricies congue mauris ultricies vel. Aliquam ac lectus massa. Ut ac est turpis.
	</p>
	<div class="popup_buttons">
		<div class="left">
			<div class="popup_cancel close">
				Annuler
			</div>
		</div>
		<div class="right">
			<div class="popup_validate">
				Valider
			</div>
		</div>
	</div>
</div>
<pre>
&ltdiv data-popup="popup_example">
	ouvrir le popup en utilisant data-popup="" (cliquer sur ce texte pour tester)
&lt/div>
&ltdiv class="autopopup w500 m50 r10" id="popup_example">
	&ltdiv class="popup_title">
		Popup example
	&lt/div>
	&ltp>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales justo sit amet quam volutpat, vitae luctus dui tincidunt. Nunc fermentum libero sapien, et placerat nisi sollicitudin sit amet. Maecenas adipiscing tristique dolor, ac varius magna varius non. Pellentesque sodales, diam eu tincidunt convallis, nisl massa pharetra purus, id elementum lorem risus eu dolor. Nulla imperdiet fermentum placerat. Sed dui orci, egestas vel justo ut, cursus interdum diam. Aliquam pharetra vitae mauris et ultrices.
		&ltbr />&ltbr />
		Morbi sed augue nisi. Vivamus vehicula eros in lorem auctor, adipiscing pretium urna pulvinar. Praesent vitae imperdiet ante. Mauris eu pellentesque magna. Donec consectetur mauris orci, ultricies congue mauris ultricies vel. Aliquam ac lectus massa. Ut ac est turpis.
	&lt/p>
	&ltdiv class="popup_buttons">
		&ltdiv class="left">
			&ltdiv class="popup_cancel close">
				Annuler
			&lt/div>
		&lt/div>
		&ltdiv class="right">
			&ltdiv class="popup_validate">
				Valider
			&lt/div>
		&lt/div>
	&lt/div>
&lt/div>
</pre>
<blockquote>
- utiliser la class "test" sur autopopup pour l'afficher de base (utile pour l'intégrer)<br />
<br />
- wXXX définit la largeur du popup (toutes les centaines de 100 à 1000 sont dispos)<br />
<br />
- mXX définit la taille de la marge du popup (de m5 à m50, tous les multiples de 5)<br />
<br />
- rXX définit l'arrondi du popup (de r5 à r50, tous les multiples de 5)<br />
<br />
- un div avec la class "popup_title" mettra en forme automotiquement un titre (comme exemple)<br />
<br />
- il est possible de structurer automatiquement deux boutons annuler/valider (comme exemple).<br />
Pour ce faire, copier le code html de ".popup_buttons" dans l'exemple ci-dessus.<br />
</blockquote>






<div class="formflex_title">
	autoloader
</div>
<div>
	<span id="start_example_loader">
		autoloader("start");
	</span>
	<br />
	<span id="stop_example_loader">
		autoloader("stop");
	</span>
</div>
<blockquote>
- En construction
</blockquote>











</div><!-- /wrapper -->
<?php include("./inc/footer.php"); ?>