$(document).ready(function() {

/* SLIDER FAIT MAIN ********************************************************************************************************************/
/* ******************************************************************************************************************************/
	var slider_de_tete_combien_li_dans_groupe = 5;
	
	/* indique le groupe d'images à afficher */
	var slider_de_tete_compteur = 1;
	/* signe utiliser pour dire si on avance ou recule */
	var slider_de_tete_signe = "-"
	/* 1 pour active, 0 pour desactive */
	var slider_de_tete_left_active=0;
	/* 1 pour active, 0 pour desactive */
	var slider_de_tete_right_active=1;
	
	/* calcule la largeur d'un li */
	var slider_de_tete_largeur_li = $("#slider_de_tete .grand_slider li").outerWidth(true);
	/* calcule la largeur d'un groupe de vignettes */
	var slider_de_tete_largeur_groupe = slider_de_tete_largeur_li*slider_de_tete_combien_li_dans_groupe;
	
	/* compte le nombre de li visibles en même temps */
	var slider_de_tete_nbr_li_visibles = $('#slider_de_tete .conteneur_strict').width();
	var slider_de_tete_nbr_li_visibles = Math.round(slider_de_tete_nbr_li_visibles/slider_de_tete_largeur_li);
	
	/* compte le nombre de groupes d'images */
	/* compte d'abord le nombre d'image puis divise par 4 pour faire des groupes de 4 (arrondi au supérieur) */
	var slider_de_tete_nbr_li = Math.ceil($('#slider_de_tete .grand_slider>li').length);
	
	/* calcule le nombre de li inutiles pour le décompte de l'affichage (action en trop) */
	var slider_de_tete_li_inutiles = slider_de_tete_nbr_li_visibles - slider_de_tete_combien_li_dans_groupe;
	
	var slider_de_tete_nbr_li_ajuste = slider_de_tete_nbr_li-slider_de_tete_li_inutiles;
	var slider_de_tete_nbr_groupes = Math.ceil(slider_de_tete_nbr_li_ajuste/slider_de_tete_combien_li_dans_groupe);
	
	/* affiche le bouton de défilement de droite (si il y a plus d'un groupe) (visibility pour ne pas décaler le slider) */
	if(slider_de_tete_nbr_groupes==1 || petitslider_accueil_nbr_groupes==0){
		slider_de_tete_right_active=0;
		$("#slider_de_tete .btn_right").css("visibility","hidden");
	}else{
		$("#slider_de_tete .btn_right").css("visibility","visible");
	}
	$("#slider_de_tete .btn_left").css("visibility","hidden");

	
	/* masque la barre de défilement html du slider */
	$("#slider_de_tete .conteneur_strict").css("overflow","hidden");

	
	/* bouton pour défiler à gauche */
	$("#slider_de_tete .btn_left").click(function(){
		if(slider_de_tete_left_active==1){
			slider_de_tete_compteur -= 1;
			slider_de_tete_signe = "+";
			slider_de_tete_defilement_images();
		};
		return false;
	});
	
	/* bouton pour défiler à droite */
	$("#slider_de_tete .btn_right").click(function(){
		if(slider_de_tete_right_active==1){
			slider_de_tete_compteur += 1;
			slider_de_tete_signe = "-";
			slider_de_tete_defilement_images();
		};
		return false;
	});
	
	

	/* action qui se lance quand on clique sur un des boutons de commande (droite ou gauche) */
	function slider_de_tete_defilement_images(){
	
		/* vérifie quand le compteur est à 1 (pos de départ) ou dépasse le nombre de groupe (remise à 0) */
		if(slider_de_tete_compteur ==1){
		$("#slider_de_tete .btn_left").css("visibility","hidden");
		slider_de_tete_left_active=0;
		}
		else{
		$("#slider_de_tete .btn_left").css("visibility","visible");
		slider_de_tete_left_active=1;
		};
		
		if(slider_de_tete_compteur == slider_de_tete_nbr_groupes){
		$("#slider_de_tete .btn_right").css("visibility","hidden");
		slider_de_tete_right_active=0;
		} 
		else{
		$("#slider_de_tete .btn_right").css("visibility","visible");
		slider_de_tete_right_active=1;
		};

		$("#slider_de_tete .grand_slider").animate({left:slider_de_tete_signe+"="+slider_de_tete_largeur_groupe+"px"});

	};/* END defilement_images */
/* ***************************************************************************************************************************************/
/* END SLIDER FAIT MAIN ********************************************************************************************************************/

});
