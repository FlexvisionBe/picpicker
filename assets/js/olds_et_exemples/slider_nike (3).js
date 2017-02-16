$(document).ready(function() {

	/* MODIFIABLE */
	var slider_principal_combien_li_dans_groupe = 1;/* En gros, de combien de slides il avance quand on clique sur suivant (min=1 max=nombre de slides) */
	var slider_principal_vitesse_defilement_auto = 3000;/* temps entre les mouvements du slider (1000 vaut une seconde) */
	var slider_principal_vitesse_transition = 500;/*vitesse du coulissement d'un slide à un autre (1000 vaut une seconde) */
	/* END MODIFIABLE */
	
	
	
	/* indique le groupe d'images à afficher */
	var slider_principal_compteur = 1;
	/* variable utilisée pour indiquer vers quelle page aller en cas de bouton direct. Ici 1 (et pass 0) signifie image 1 */
	var slider_principal_num_page_visee = "rien";
	/* signe utiliser pour dire si on avance ou recule */
	var slider_principal_signe = "-"
	/* détermine le type de positionnement du slider pour l'action de déplacement qui va suivre directement */
	var slider_principal_type_deplacement = "relatif"
	/* 1 pour active, 0 pour desactive */
	var slider_principal_left_active=0;
	/* 1 pour active, 0 pour desactive */
	var slider_principal_right_active=1;
	
	/* calcule la largeur d'un li */
	var slider_principal_largeur_li = $("#slider_principal .grand_slider li").outerWidth(true);
	/* calcule la largeur d'un groupe de vignettes */
	var slider_principal_largeur_groupe = slider_principal_largeur_li*slider_principal_combien_li_dans_groupe;
	
	/* compte le nombre de li visibles en même temps */
	var slider_principal_nbr_li_visibles = $('#slider_principal .conteneur_strict').width();
	var slider_principal_nbr_li_visibles = Math.round(slider_principal_nbr_li_visibles/slider_principal_largeur_li);
	
	/* compte le nombre de groupes d'images */
	/* compte d'abord le nombre d'image puis divise par 4 pour faire des groupes de 4 (arrondi au supérieur) */
	var slider_principal_nbr_li = Math.ceil($('#slider_principal .grand_slider>li').length);
	
	/* calcule le nombre de li inutiles pour le décompte de l'affichage (action en trop) */
	var slider_principal_li_inutiles = slider_principal_nbr_li_visibles - slider_principal_combien_li_dans_groupe;
	
	var slider_principal_nbr_li_ajuste = slider_principal_nbr_li-slider_principal_li_inutiles;
	var slider_principal_nbr_groupes = Math.ceil(slider_principal_nbr_li_ajuste/slider_principal_combien_li_dans_groupe);
	
	/* affiche le bouton de défilement de droite (si il y a plus d'un groupe) (visibility pour ne pas décaler le slider) */
	if(slider_principal_nbr_groupes==1 || slider_principal_nbr_groupes==0){
		slider_principal_right_active=0;
		$("#slider_principal .btn_right").css("visibility","hidden");
	}else{
		$("#slider_principal .btn_right").css("visibility","visible");
	}
	$("#slider_principal .btn_left").css("visibility","hidden");

	
	/* masque la barre de défilement html du slider */
	$("#slider_principal .conteneur_strict").css("overflow","hidden");

	
	/* CREER DES PUCES (lien direct de page) */
	for (var slider_principal_i=1;slider_principal_i<=slider_principal_nbr_li;slider_principal_i++) {
		$("#slider_principal .boutons").append("<li></li>");
	}
	
	/* END CREER DES PUCES */
	
	/* SYSTEME AUTO **************************************************************/
	var compteur_slides_auto = 1;

	defilement_auto = setInterval(function () {
		
		if($("#slider_principal").attr("class")=="auto"){
			compteur_slides_auto = compteur_slides_auto + 1;
			if(compteur_slides_auto<=slider_principal_nbr_groupes){
				defil_droite()
			}else{
				if(compteur_slides_auto<=slider_principal_nbr_groupes*2){
					defil_gauche()
					if(compteur_slides_auto==(slider_principal_nbr_groupes*2)-1){
						compteur_slides_auto = 1;
					}
				}
			}
		}
	}, slider_principal_vitesse_defilement_auto);
	/* END SYSTEME AUTO **************************************************************/	
	
	/* bouton pour défiler à gauche */
	$("#slider_principal .btn_left").click(function(){
		defil_gauche()
		clearInterval(defilement_auto);
		return false;
	});

	/* bouton pour défiler à droite */
	$("#slider_principal .btn_right").click(function(){
		defil_droite()
		clearInterval(defilement_auto);
		return false;
	});
	
	/* bouton aller à une page précise */
	$("#slider_principal .boutons li").click(function(){
		slider_principal_num_page_visee=$(this).index()+1;
//		$("#slider_principal .boutons li").removeClass("selected");
//		$(this).addClass("selected");
		go_to_num();
		return false;
	});



		
	function defil_droite() {
		if(slider_principal_right_active==1){
			slider_principal_compteur += 1;
			slider_principal_signe = "-";
			slider_principal_type_deplacement = "relatif";
			slider_principal_defilement_images();
		};
	}
	function defil_gauche() {
		if(slider_principal_left_active==1){
			slider_principal_compteur -= 1;
			slider_principal_signe = "+";
			slider_principal_type_deplacement = "relatif";
			slider_principal_defilement_images();
		};
	}
	function go_to_num() {
		slider_principal_compteur = slider_principal_num_page_visee;
		slider_principal_type_deplacement = "absolu";
		clearInterval(defilement_auto);
		slider_principal_defilement_images();
	}
	
	
	/* à lancer une seule fois pour la première selection de puce si il y a */
	$("#slider_principal .boutons li:nth-child("+slider_principal_compteur+")").addClass("selected");
	
	/* action qui se lance quand on clique sur un des boutons de commande (droite ou gauche) */
	function slider_principal_defilement_images(){
		$("#slider_principal .boutons li").removeClass("selected");
		$("#slider_principal .boutons li:nth-child("+slider_principal_compteur+")").addClass("selected");

		
		/* vérifie quand le compteur est à 1 (pos de départ) ou dépasse le nombre de groupe (remise à 0) */
		if(slider_principal_compteur ==1){
		$("#slider_principal .btn_left").css("visibility","hidden");
		slider_principal_left_active=0;
		}
		else{
		$("#slider_principal .btn_left").css("visibility","visible");
		slider_principal_left_active=1;
		};
		
		if(slider_principal_compteur == slider_principal_nbr_groupes){
		$("#slider_principal .btn_right").css("visibility","hidden");
		slider_principal_right_active=0;
		} 
		else{
		$("#slider_principal .btn_right").css("visibility","visible");
		slider_principal_right_active=1;
		};
		
		if(slider_principal_type_deplacement =="relatif"){
		$("#slider_principal .grand_slider").stop();
		$("#slider_principal .grand_slider").animate({left:slider_principal_signe+"="+slider_principal_largeur_groupe+"px"},slider_principal_vitesse_transition);
		};
		if(slider_principal_type_deplacement =="absolu"){
		$("#slider_principal .grand_slider").stop();
		$("#slider_principal .grand_slider").animate({left:"-"+slider_principal_largeur_groupe*(slider_principal_compteur-1)+"px"},slider_principal_vitesse_transition);
		};
	};/* END defilement_images */

});/* document.ready */
