(function($){

//stocker en variable le type de navigateur/os
var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

// OBJET SLIDER NIKE: start ****************************************************************
$.slider_nike = function(element, options) {

var defaults = {
'nbr_li': 1,
'vitesse_auto': 3000,
'vitesse': 500,
'auto': 0,
'type': 'normal',
'cible': 'aucune',
'isolement': 0,
'pc_only': 0,
'loop': 0,
'liquide': 0,
'drag': 1,
'creer_afficheur': 0,
'fading_mode': 0,
};

// to avoid confusions, use "plugin" to reference the current instance of the object
var plugin = this;
// mettre en setting les infos récuperée à l'exécution
plugin.settings = {};
// reference to the jQuery version of DOM element the plugin is attached to
var $element = $(element);

// Intialisation des variables generales et non réinitialisables
var compteur = 1;
var right_active;
var largeur_li;
var largeur_groupe;
var nbr_li_visibles_raw;
var nbr_li_visibles;
var nbr_li;
var nbr_groupes;
/*var largeur_ul_boutons;*/
var compteur_slides_auto;
var defilement_auto;
var reste_division;
var decalage_pour_division = 0;
var offset;
var zone;
var next;
var previous;
var x;
var oneclic;
var slid_start;
var x_start;

/* INIT *****************************************************************************************************************************/
/* *****************************************************************************************************************************/
plugin.init = function() {
	// the plugin's final properties are the merged default and user-provided options (if any)
	plugin.settings = $.extend({}, defaults, options);
	
	//modifs spéciales mobile
	if (mobile != false) {
		$element.find(".btn_left, .btn_right").css("display", "none");
		plugin.settings.drag = 1;
		
		$element.addClass("mobile");
		if (plugin.settings.pc_only == 1) {
			$element.remove();
		}
	}
	
	//créer un afficheur statique pour mobile our pour PC si pas de cible
	if (plugin.settings.creer_afficheur == 1) {
		if (mobile != false || plugin.settings.cible == "none") {
			$element.prepend('<div class="afficheur"><img src=""></div>');
			$element.find(".afficheur img").attr("src",$element.find(".grand_slider li:first-child img").attr("src"))
		
			$element.find(".grand_slider li").click(function(){
				$element.find(".afficheur img").attr("src",$(this).children("img").attr("src"));
			});
		}
	}

	// creer le masque. une fois pour tous les sliders
	if ($("#cache_slider").length == 0 && plugin.settings.isolement == 1) {
		$("body").append('<div id="cache_slider"></div>');
	}
	//en mode drag, pas de mode loop
	if (plugin.settings.drag == 1) {
		plugin.settings.loop = 0;
	}
	//en mode fading, pas de mode loop non plus
	if (plugin.settings.fading_mode == 1) {
		plugin.settings.loop = 0;
	}
	
	
	plugin.reset();
	/* SYSTEME AUTO **************************************************************/
	clearInterval(defilement_auto);
	defilement_auto = setInterval(function() {
		if (plugin.settings.auto == 1) {
			compteur++;
			if (plugin.settings.loop == 1) {
				plugin.defilement_images();
			} else if (compteur <= nbr_groupes) {
				plugin.defilement_images();
			} else {
				compteur = 1;
				plugin.defilement_images();
			}
		}
	}, plugin.settings.vitesse_auto);
	/* END SYSTEME AUTO **************************************************************/
	plugin.reset();
	

	/* DRAG AND DROP **************************************************************/
	if (plugin.settings.drag == 1) {
		if (mobile == false) {
			$element.mousedown(function(e) {
				plugin.appuyer(e);
			});
			$element.mouseup(function(e) {
				plugin.lacher();
			});
			$element.find(".conteneur_strict").mouseout(function(e) {
				plugin.lacher();
			});
		} else {
			$element.bind("touchstart", function(e) {
				clearInterval(defilement_auto);
				plugin.appuyer(e);
			});
			$element.bind("touchend", function(e) {
				plugin.lacher();
			});
		}

		$element.find('img').on('dragstart', function(event) {
			event.preventDefault();
		});
	}


	/* FULLSCREEN SYSTEM *********************************************************/
	if (mobile != false) {
		$(".btn_fs").hide();
	}

	$element.on("click", ".btn_fs", function() {
		clearInterval(defilement_auto);

		if ($element.hasClass("fullscreen")) {
			$element.removeClass("fullscreen");
			plugin.reset();
		} else {
			$element.addClass("fullscreen");
			plugin.reset();
		}

		plugin.defilement_images();
		return false;
	});
	/* END FULLSCREEN SYSTEM *********************************************************/

	$(window).resize(function() {
		plugin.reset();
	});

	/* coupaer défilement si clic */
	$element.mousedown(function(e) {
		clearInterval(defilement_auto);
	});

	/* bouton pour défiler à gauche */
	$element.find(".btn_left").click(function() {
		clearInterval(defilement_auto);
		compteur -= 1;
		if (plugin.settings.isolement == 1 && mobile == false) {
			plugin.afficher_cache();
		}

		plugin.defilement_images();
		return false;
	});

	/* bouton pour défiler à droite */
	$element.find(".btn_right").click(function() {
		clearInterval(defilement_auto);
		compteur += 1;
		if (plugin.settings.isolement == 1 && mobile == false) {
			plugin.afficher_cache();
		}

		plugin.defilement_images();
		return false;
	});

	/* bouton aller à une page précise */
	$element.on("click", ".boutons li", function() {
		compteur = $(this).index() + 1;
		if (plugin.settings.isolement == 1 && mobile == false) {
			plugin.afficher_cache();
		}

		plugin.defilement_images();
		clearInterval(defilement_auto);
		return false;
	});

	/* bouton depuis un slider menu */
	if (plugin.settings.type == "visualiseur") {
		var decal;

		$(plugin.settings.cible).on("mousedown", " .grand_slider li", function(e) {
			decal = e.pageX;
		});

		$(plugin.settings.cible).on("click", " .grand_slider li", function(e) {
			decal = Math.abs(e.pageX - decal);
			if (decal < 10 || mobile != false) {
			
				/* rajouter ceci */
				if($(this).parents(".grand_slider").find("li:first-child").is("[data-group]")){
					compteur = 0;
					$(this).prevAll().each(function(){
						compteur = compteur + Math.round($(this).attr("data-group"));
					});
					compteur++;
				}else{
					compteur = $(this).index() + 1;
				}
				/* jusqu'ici */
				
				plugin.defilement_images();
				clearInterval(defilement_auto);
				if (plugin.settings.isolement == 1 && mobile == false) {
					plugin.afficher_cache();
				}

				return false;
			}
		});
	}/* if visualiseur */

	$(window).scroll(function() {
		$("#cache_slider").fadeOut();
	});
	$("body").on("click", "#cache_slider", function() {
		$("#cache_slider").fadeOut();
	});
};
/* END INIT *****************************************************************************************************************************/
/* *****************************************************************************************************************************/

/* ACTION DEFILEMENT *****************************************************************************************************************************/
/* *****************************************************************************************************************************/
/* action qui se lance quand on clique sur un des boutons de commande (droite ou gauche) */
plugin.defilement_images = function() {
	
	/*
	if (typeof slider_data_change == 'function') { 
	slider_data_change(compteur);
	}
	*/
	
	$.event.trigger({
		type: "sliker_defilement",
		input: "dd",
	});

	$element.find(".boutons li").removeClass("selected");
	$element.find(".boutons li:nth-child(" + compteur + ")").addClass("selected");
	
	$element.find(".grand_slider li").removeClass("selected");
	$element.find(".grand_slider li:nth-child(" + compteur + ")").addClass("selected");
	
	$element.find(".grand_slider .mask").fadeIn();
	$element.find(".grand_slider li.selected .mask").fadeOut();


	/* vï¿½rifie quand le compteur est ï¿½ 1 (pos de dï¿½part) ou dï¿½passe le nombre de groupe (remise ï¿½ 0) */
	if (compteur == 1) {
		$element.find(".btn_left").css("visibility", "hidden");
	} else {
		$element.find(".btn_left").css("visibility", "visible");
	}

	if (compteur >= nbr_groupes) {
		$element.find(".btn_right").css("visibility", "hidden");
	} else {
		$element.find(".btn_right").css("visibility", "visible");
	}
	
	if (plugin.settings.loop == 1) {
		$element.find(".btn_right").css("visibility", "visible");
		$element.find(".btn_left").css("visibility", "visible");
	}

	$element.find(".grand_slider").stop();

	//les deux premières conditions n'apparaissent qu'en cas de loop
	var dernier_saut = $element.find(".grand_slider li.rajout:first").index();

	if(plugin.settings.fading_mode == 1){
		$element.find(".grand_slider").fadeOut(function(){
			if(compteur == nbr_groupes + 1){compteur = 1;}
			else if(compteur == 0){compteur = nbr_groupes;}
			$element.find(".grand_slider").css({left: "-" + largeur_groupe * (compteur - 1) + "px"});
		});
		$element.find(".grand_slider").fadeIn();
	}else if (compteur == nbr_groupes + 1){
		$element.find(".boutons li:first-child").addClass("selected");//allume le numï¿½ro malgrï¿½ qu'on soit sur le rajout
		$element.find(".grand_slider").animate({left: "-" + (largeur_li * dernier_saut) + "px"}, plugin.settings.vitesse, 'linear');
		compteur = 1;
		$element.find(".grand_slider").animate({left: "-" + largeur_groupe * (compteur - 1) + "px"}, 1);
	}else if(compteur == 0){
		compteur = nbr_groupes + 1;
		$element.find(".boutons li:last-child").addClass("selected");//allume le numï¿½ro malgrï¿½ qu'on soit sur le rajout
		$element.find(".grand_slider").animate({left: "-" + (largeur_li * dernier_saut) + "px"}, 1);
		compteur = nbr_groupes;
		$element.find(".grand_slider").animate({left: "-" + (largeur_groupe * (compteur - 1)) + "px"}, plugin.settings.vitesse, 'linear');
	}else{
		$element.find(".grand_slider").animate({left: "-" + largeur_groupe * (compteur - 1) + "px"}, plugin.settings.vitesse, 'linear');
	}
};
/* ACTION DEFILEMENT *****************************************************************************************************************************/
/* *****************************************************************************************************************************/


plugin.afficher_cache = function() {
	$("#cache_slider").fadeIn();
};

plugin.appuyer = function(e) {
	$element.find(".grand_slider").stop();
	oneclic = 1;
	if (mobile == false) {
		x_start = Math.round(e.pageX - offset.left);
	} else {
		var touch1 = e.originalEvent.touches[0];
		x_start = Math.round(touch1.pageX - offset.left);
	}
	slid_start = $element.find(".grand_slider").position();
	slid_start = Math.round(slid_start.left);
	if (mobile == false) {
		$element.find(".conteneur_strict").mousemove(function(e) {
			x = Math.round(e.pageX - offset.left);
			plugin.bouger(e);
		});
	} else {
		$element.find(".conteneur_strict").bind("touchmove", function(e) {
			var touch = e.originalEvent.touches[0];
			x = Math.round(touch.pageX - offset.left);
			plugin.bouger(e);
			
			return false;
		});
	}
};

plugin.bouger = function(e) {
	$element.find(".grand_slider").css({left: slid_start + (x - x_start)});
	if ((x - x_start) < (zone / 8 * -1)) {
		previous = 0;
		next = 1;
	}
	if ((x - x_start) > (zone / 8)) {
		next = 0;
		previous = 1;
	}
	return false;
};

plugin.lacher = function(e) {
	if (oneclic == 1) {
		oneclic = 0;
		if (mobile == false) {
			$element.find(".conteneur_strict").unbind("mousemove");
		} else {
			$element.find(".conteneur_strict").unbind("touchmove");
		}
		if (next == 1) {
			next = 0;
			compteur += 1;
			if (compteur > nbr_groupes) {
				compteur = nbr_groupes;
			}

			if (plugin.settings.isolement == 1 && mobile == false) {
				plugin.afficher_cache();
			}

			plugin.defilement_images();
		} else if (previous == 1) {
			previous = 0;
			compteur -= 1;
			if (compteur < 1) {
				compteur = 1;
			}

			if (plugin.settings.isolement == 1 && mobile == false) {
				plugin.afficher_cache();
			}

			plugin.defilement_images();
		} else {
			plugin.defilement_images();
		}
	}/* oneclic */
};

plugin.reset = function() {
	if (plugin.settings.liquide == 1) {
		$element.find(".conteneur_strict .grand_slider li").width($element.find(".conteneur_strict").width());
	}else{
		$element.find(".btn_fs").remove();
	}
	
	/* supprimer les li rajouts, ils vont être calculés à nouveau */
	$element.find(".rajout").remove();
	/* calcule la largeur d'un li */
	largeur_li = $element.find(".grand_slider li").outerWidth(true);
	if(!largeur_li){largeur_li = 20;/* generique */}
	/* compte le nombre de li visibles en même temps */
	
	nbr_li_visibles_raw = $element.find(".conteneur_strict").width() / largeur_li;
	nbr_li_visibles = Math.floor(nbr_li_visibles_raw);
	
	//choisir ici le pourcentage (0.8 = 80%) à partir duquel l'image compte comme vue meme si tronquée
	if((nbr_li_visibles_raw-nbr_li_visibles)>0.8){
		nbr_li_visibles = nbr_li_visibles+1;
	}
	
	if (nbr_li_visibles < 1) {
		nbr_li_visibles = 1;
	};
	if (nbr_li_visibles < plugin.settings.nbr_li) {
		plugin.settings.nbr_li = nbr_li_visibles;
	};
	/* calcule la largeur d'un groupe de vignettes */
	largeur_groupe = largeur_li * plugin.settings.nbr_li;
	/* compte le nombre de li */
	nbr_li = Math.ceil($element.find(".grand_slider>li").length);
	/* Fait en sorte de ne pas tenir compte des li en bout de chaine quand les lis visibles sont plus nombreux que les li par groupe.
	 Ne pas faire cette soustraction quand on est en mode loop*/
	nbr_groupes = Math.ceil((nbr_li - (nbr_li_visibles - plugin.settings.nbr_li)) / plugin.settings.nbr_li);
	
	//si un seule groupe on coupe le défilement auto (pour ne pas boucler sur le même élément)
	if (nbr_groupes <= 1) {
		nbr_groupes = 1;
		clearInterval(defilement_auto);
	};

	if (plugin.settings.loop == 1) {
		nbr_groupes = Math.ceil(nbr_li / plugin.settings.nbr_li);
	}
	/* vérifier si le compteur n'est pas absurde */
	if (compteur > nbr_groupes) {
		compteur = nbr_groupes;
	}
	
	
	//départ alternatif si spécifié par la class "selected" (à mettre sur un li)
	if($element.find(".grand_slider .selected").length==1){
		compteur = $element.find(".grand_slider .selected").index()+1;
	}else{
		$element.find(".grand_slider li:first-child").addClass("selected");
	}
	$element.find(".grand_slider li.selected .mask").fadeOut();
	
	/* Positionne le slider au départ */
	$element.find(".grand_slider").css("left", (compteur - 1) * -1 * largeur_li);
	
	
	/* affiche le bouton de défilement de droite (si il y a plus d'un groupe) (visibility pour ne pas dï¿½caler le slider) */
	if (nbr_groupes == 1 || nbr_groupes == 0) {
		$element.find(".btn_left, .btn_right").css("visibility", "hidden");
	}else if (plugin.settings.loop == 1) {
		$element.find(".btn_left, .btn_right").css("visibility", "visible");
	} else if (compteur == 1) {
		$element.find(".btn_left").css("visibility", "hidden");
		$element.find(".btn_right").css("visibility", "visible");
	} else if (compteur == nbr_groupes) {
		$element.find(".btn_left").css("visibility", "visible");
		$element.find(".btn_right").css("visibility", "hidden");
	} else {
		$element.find(".btn_left, .btn_right").css("visibility", "visible");
	}

	/* CREER DES PUCES (lien direct de page) */
	$element.find(".boutons").remove();
	if (plugin.settings.type != "visualiseur" && plugin.settings.type != "menu") {
		$element.find(".conteneur_strict").after('<ul class="boutons hide_if_one"></ul>');
		for (var i = 1; i <= nbr_groupes; i++) {
			$element.find(".boutons").append("<li><span>" + i + "</span></li>");
		}
		if ($element.find(".boutons li").length <= 1) {
			$element.find(".boutons.hide_if_one").hide();
		}
		/*
		largeur_ul_boutons = ($element.find(".boutons li").outerWidth(true)) * nbr_groupes;
		if (largeur_ul_boutons > $element.find(".conteneur_strict").width()) {
			largeur_ul_boutons = $element.find(".conteneur_strict").width();
		}
		$element.find(".boutons").width(largeur_ul_boutons);
		*/
	}/*if*/
	/* END CREER DES PUCES */

	/* à lancer une seule fois pour la première selection de puce si il y a */
	$element.find(".boutons li:nth-child(" + compteur + ")").addClass("selected");

	/* si on doit looper, rajouter des li fictifs à la fin du slide */
	if (plugin.settings.loop == 1) {
		for (var i = 0; i <= nbr_li_visibles * 2; i++) {
			$element.find(".grand_slider li:nth-child(" + i + ")").clone()
					.addClass("rajout").appendTo($element.find(".grand_slider"));
		}
	}
	offset = $element.find(".conteneur_strict").offset();
	zone = $element.find(".conteneur_strict li").width();
};

// fire up the plugin!

// call the "constructor" method init, (seul endroit ou c'est lancé, jamais rafraichis)
plugin.init();

};// OBJET SLIDER NIKE: end **********************************************************************




//ajouter le plugin en tant qu'objet jquery
$.fn.slider_nike = function(options) {
	return this.each(function() {
		if (undefined === $(this).data('slider_nike')) {
			var plugin = new $.slider_nike(this, options);
			$(this).data('slider_nike', plugin);
		}
	});
};

})(jQuery);