$(document).ready(function() {

/* SLIDER FAIT MAIN ********************************************************************************************************************/
/* ******************************************************************************************************************************/
	var slider_menu_usc_combien_li_dans_groupe = 1;
	
	/* indique le groupe d'images à afficher */
	var slider_menu_usc_compteur = 1;
	/* signe utiliser pour dire si on avance ou recule */
	var slider_menu_usc_signe = "-"
	/* 1 pour active, 0 pour desactive */
	var slider_menu_usc_left_active=0;
	/* 1 pour active, 0 pour desactive */
	var slider_menu_usc_right_active=1;
	
	/* calcule la largeur d'un li */
	var slider_menu_usc_largeur_li = $("#slider_menu_usc .grand_slider li").outerWidth(true);
	/* calcule la largeur d'un groupe de vignettes */
	var slider_menu_usc_largeur_groupe = slider_menu_usc_largeur_li*slider_menu_usc_combien_li_dans_groupe;
	
	/* compte le nombre de li visibles en même temps */
	var slider_menu_usc_nbr_li_visibles = $('#slider_menu_usc .conteneur_strict').width();
	var slider_menu_usc_nbr_li_visibles = Math.round(slider_menu_usc_nbr_li_visibles/slider_menu_usc_largeur_li);
	
	/* compte le nombre de groupes d'images */
	/* compte d'abord le nombre d'image puis divise par 4 pour faire des groupes de 4 (arrondi au supérieur) */
	var slider_menu_usc_nbr_li = Math.ceil($('#slider_menu_usc .grand_slider>li').length);
	
	/* calcule le nombre de li inutiles pour le décompte de l'affichage (action en trop) */
	var slider_menu_usc_li_inutiles = slider_menu_usc_nbr_li_visibles - slider_menu_usc_combien_li_dans_groupe;
	
	var slider_menu_usc_nbr_li_ajuste = slider_menu_usc_nbr_li-slider_menu_usc_li_inutiles;
	var slider_menu_usc_nbr_groupes = Math.ceil(slider_menu_usc_nbr_li_ajuste/slider_menu_usc_combien_li_dans_groupe);
	
	/* affiche le bouton de défilement de droite (si il y a plus d'un groupe) (visibility pour ne pas décaler le slider) */
	if(slider_menu_usc_nbr_groupes==1 || slider_menu_usc_nbr_groupes==0){
		slider_menu_usc_right_active=0;
		$("#slider_menu_usc .btn_right").css("visibility","hidden");
	}else{
		$("#slider_menu_usc .btn_right").css("visibility","visible");
	}
	$("#slider_menu_usc .btn_left").css("visibility","hidden");

	
	/* masque la barre de défilement html du slider */
	$("#slider_menu_usc .conteneur_strict").css("overflow","hidden");

	
	/* SYSTEME AUTO **************************************************************/
	var compteur_slides_auto = 1;

	defilement_auto = setInterval(function () {
		
		compteur_slides_auto = compteur_slides_auto + 1;

		if(compteur_slides_auto<=slider_menu_usc_nbr_groupes){
			defil_droite()
		}else{
			if(compteur_slides_auto<=slider_menu_usc_nbr_groupes*2){
				defil_gauche()
				if(compteur_slides_auto==(slider_menu_usc_nbr_groupes*2)-1){
					compteur_slides_auto = 1;
				}
			}
		}
	}, 7000);
	/* END SYSTEME AUTO **************************************************************/	
	
	/* bouton pour défiler à gauche */
	$("#slider_menu_usc .btn_left").click(function(){
		defil_gauche()
		clearInterval(defilement_auto);
	});

	/* bouton pour défiler à droite */
	$("#slider_menu_usc .btn_right").click(function(){
		defil_droite()
		clearInterval(defilement_auto);
	});



		
	function defil_droite() {
		if(slider_menu_usc_right_active==1){
			slider_menu_usc_compteur += 1;
			slider_menu_usc_signe = "-";
			slider_menu_usc_defilement_images();
		};
		return false;
	}
	function defil_gauche() {
		if(slider_menu_usc_left_active==1){
			slider_menu_usc_compteur -= 1;
			slider_menu_usc_signe = "+";
			slider_menu_usc_defilement_images();
		};
		return false;
	}
	
	

	/* action qui se lance quand on clique sur un des boutons de commande (droite ou gauche) */
	function slider_menu_usc_defilement_images(){
	
		/* vérifie quand le compteur est à 1 (pos de départ) ou dépasse le nombre de groupe (remise à 0) */
		if(slider_menu_usc_compteur ==1){
		$("#slider_menu_usc .btn_left").css("visibility","hidden");
		slider_menu_usc_left_active=0;
		}
		else{
		$("#slider_menu_usc .btn_left").css("visibility","visible");
		slider_menu_usc_left_active=1;
		};
		
		if(slider_menu_usc_compteur == slider_menu_usc_nbr_groupes){
		$("#slider_menu_usc .btn_right").css("visibility","hidden");
		slider_menu_usc_right_active=0;
		} 
		else{
		$("#slider_menu_usc .btn_right").css("visibility","visible");
		slider_menu_usc_right_active=1;
		};

		$("#slider_menu_usc .grand_slider").animate({left:slider_menu_usc_signe+"="+slider_menu_usc_largeur_groupe+"px"});

	};/* END defilement_images */
/* ***************************************************************************************************************************************/
/* END SLIDER FAIT MAIN ********************************************************************************************************************/

});
