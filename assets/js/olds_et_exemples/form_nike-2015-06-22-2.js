





//checkbox et radio personnalisé
$(document).ready(function () {
	$(".checkskin .input input").hide();
    checkbox_checking();
});
$("body").on("change", ".checkskin input", function () {
    checkbox_checking();
});
$("body").on("mousedown", ".checkskin", function () {
    if ($(this).find("input").prop('disabled') == false) {
        $(this).addClass("mousedown");
    }
})
$("body").mouseup(function () {
    $(".checkskin").removeClass("mousedown");
});
function checkbox_checking() {
    $(".checkskin input").each(function () {
        if ($(this).is(":checked")) {
			var checkskin =  $(this).parents(".checkskin");
            checkskin.addClass("checked");
			
			//condition spéciale dans le cas d'une "star"
			if(checkskin.is(".star") && checkskin.parent().is("fieldset")){
				checkskin.prevAll().addClass("checked");
			}
        } else {
            $(this).parents(".checkskin").removeClass("checked");
        }
    });
}//checkbox_checking













//équilibrer les tailles de names dans les formulaires (alignement)
$(document).ready(function () {
    align_names();
});//ready

function align_names() {
    $(".form").each(function (k, v) {
        var max_width = 0;
		var type_of_names = ">label .name, .relay>label .name, fieldset legend, .name.forced_align";

        $(v).find(type_of_names).not(".no_size").each(function () {
			$(this).removeAttr("style");
			
			if($(this).next().is(".clear")){
				$(this).addClass("no_size");
			}else if ($(this).actual('width') >= max_width) {
                max_width = $(this).actual('width');
            }
        });

        $(v).find(type_of_names).not(".no_size").width(max_width + 10);
    });
};









//équilibrer les tailles dees radio/checkboxs dans un fieldset trop long
$(document).ready(function () {
    equalize_fieldset();
});//ready

function equalize_fieldset() {
    $(".equalize").each(function (k, v) {
        var max_width = 0;

        $(v).find("label .name").each(function () {
			if ($(this).actual('width') >= max_width) {
                max_width = $(this).actual('width');
            }
        });

		$(v).find("label .name").width(max_width);
    });
};





/*
$(document).ready(function(){
	isolating_legend_solo();
});
$(window).resize(function(){
	isolating_legend_solo();
});
function isolating_legend_solo(){
	$(".form legend.solo").each(function(k,v){
		$(this).height("auto");
		$(this).height($(this).parent().height());
	});
};
*/













//form radio auto menu
$('body').on('change', "[data-radio-auto-menu] input", function () {
    if ($(this).is(":checked")) {
        radio_auto_menu_target($(this).parents("[data-radio-auto-menu]"));
    }
});
$(document).ready(function () {
    radio_auto_menu();
});
function radio_auto_menu() {
    $("[data-radio-auto-menu] input").each(function () {
		var prechecked = $(this).parents("fieldset").find("input:checked").length;
		
		if (prechecked==1) {
			if ($(this).is(":checked")) {
				radio_auto_menu_target($(this).parents("[data-radio-auto-menu]"));
			}
		}else{
			if($(this).parents("fieldset").find(".uncheck_default").length==1){
				radio_auto_menu_target($(this).parents("fieldset").find(".uncheck_default"));
			}
		}
    });
};
function radio_auto_menu_target(v) {
    var target = $(v).attr("data-radio-auto-menu");
    var no_targets = new Array();

    $(v).parents("fieldset").find("[data-radio-auto-menu]").each(function () {
        no_targets.push($(this).attr("data-radio-auto-menu"));
    });
	
    //cacher les lignes qui contiennent un mot clé
    for (i = 0; i < no_targets.length; i++) {
		//met en tableau les items qui contiennent cet attribut
		var item_notargets =  $("[data-target~=" + no_targets[i] + "]");
		
		
		item_notargets.each(function(){
			$(this).hide();
			$(this).not(".no_disabled").find("input,select,textarea").attr("disabled","disabled");
			$(this).filter(".empty_input").find("input,select,textarea").val("");
		});
    }

    //afficher grace au mot clé du radio checked
	var item_target =  $("[data-target~=" + target + "]");
	$(item_target).show();
	$(item_target).find("input,select,textarea").removeAttr("disabled");
}//radio_auto_menu_target












//form lang menu
// au clic, lancer la fonction lang avec en param la langue du bouton
$('body').on('click', "[data-lang-menu] [data-lang]", function () {
	lang_menu_target($(this));
});
// lancer la fonction langue globale qui parcourt TOUT
$(document).ready(function () {
    lang_menu();
});
// fonction globale qui lance tous les menus au chargement
function lang_menu() {
    $("[data-lang-menu] [data-lang]").each(function () {
		//trouver le bouton de langue enfoncé apr defaut (si y en a un)
		var preselected = $(this).parents("[data-lang-menu]").find("[data-lang].selected").length;
		
		//si y en a un, lancer la fonction avec cette valeur, sinon lancer avec le premier bouton
		if (preselected==1) {
			if ($(this).is(".selected")) {
				lang_menu_target($(this));
			}
		}else{
			var first_button = $(this).parents("[data-lang-menu]").find("[data-lang]:first");
			lang_menu_target(first_button);
		}
    });
};
//fonction generale (l'attribut est l'ID de la langue)
function lang_menu_target(v) {
	//stocker l'identifiant de ce menu
	var target_general = $(v).parents("[data-lang-menu]").attr("data-lang-menu");
	//stocker la langue (sous forme de numero souvent)
	var target_extension = $(v).attr("data-lang");
	//créer l'id des éléments à matcher en combinant l'id et la langue à afficher
    var target = target_general+"-"+target_extension;
	
	//gerer le menu en lui meme (selected etc)
	$(v).parents("[data-lang-menu]").find("[data-lang]").removeClass("selected");
	$(v).addClass("selected");
	
	//cacher tous les éléments liés à cet ID langue
	$("[data-lang-category=" + target_general + "]").hide();

    //afficher grace au mot clé de l'onglet sélectionné
	$("[data-lang-target~=" + target + "]").show();
}//form lang menu




//Menu de traduction en autopopup
//OUVERTURE ET RECUPERATION
$('body').on('click', "[data-lang-target] input,[data-lang-target] textarea", function () {
	var id_lang_verif = $(this).parents("[data-lang-category]").attr("data-lang-category");
	if($("[data-lang-menu="+id_lang_verif+"]").is(".mode_popup")){
		lang_auto_popup($(this));
	}
});
var unique_input_id_cpt=0;
function lang_auto_popup(input){
	//VARIABLES ET STOCKAGE
	//Nom du regroupement (sans l'extension de la langue)
	var id_lang = input.parents("[data-lang-target]").attr("data-lang-category");
	//Le texte de l'input clické, dans la langue cliquée
	var label_text = input.closest("label").find(".name").text();
	//stocker l'index de l'input par rapport à son parent (afin de trouver ses équivalents plus tard)
	var index_input = input.closest("[data-lang-target]").find("input,textarea").index(input); 
	//stockage des inputs équivalents
	var array_input_multilang = [];
	input.parents("[data-lang-category]").parent().find("[data-lang-category="+id_lang+"]").each(function(){
		var sibling_element = $(this).find("input,textarea").eq(index_input);
		sibling_element.attr("data-unique-input-id",unique_input_id_cpt);
		unique_input_id_cpt++;
		array_input_multilang.push(sibling_element);
	});
	//tableau avec les noms abrégés des langues
	var lang_name = [];
	$("[data-lang-menu="+id_lang+"] li").each(function(){
		lang_name.push($(this).html());
	});
	
	

	$("#popup_lang_zoom").remove();
	$("body").append('<div id="popup_lang_zoom" class="autopopup new m15 w500">');
	$("#popup_lang_zoom").append('<div class="popup_title">'+label_text+'</div>');
	$("#popup_lang_zoom").append('<div class="form">');
	var cpt=0;
	$(array_input_multilang).each(function(){
		$("#popup_lang_zoom .form").append("<label>");
		$("#popup_lang_zoom .form label:last").append('<span class="name">'+lang_name[cpt]+'</span>');
		cpt++;
		$("#popup_lang_zoom .form label:last").append($(this).clone());
		$("#popup_lang_zoom .form label:last").append('<span class="clear"></span>');
	});
	$("#popup_lang_zoom").append('<div class="popup_buttons"><div class="left"><span class="popup_cancel close">Annuler</span></div><div class="right"><span class="popup_validate">Valider</span></div></div>');
	
	align_names();
	show_popup("popup_lang_zoom");
}

//FERMETURE ET RESTITUTION
$('body').on('click', ".popup_validate", function () {
	var inputs_array = $(this).parents(".content_wrapper").find(".form").find("input,textarea");
	
	inputs_array.each(function(){
		var unique_id = $(this).attr("data-unique-input-id");
		$(this).removeAttr("data-unique-input-id");
		
		$(this).insertAfter($("[data-unique-input-id="+unique_id+"]"));
		$("[data-unique-input-id="+unique_id+"]").remove();
	});
	
	$(this).parents("#popup_lang_zoom").fadeOut();
});











$(".customErrorValidation").each(function(){

	if($(this).parents(".label,label").length==1){
		var conteneur = $(this).parents(".label,label");
	}else{
		var conteneur = $(this).parents(".lane, fieldset");
	}

	
	
	//si plusieurs input dans le même parent, on se base sur le name pour les associer
	/*
	if(conteneur.find("input").length == 1){
		var input = conteneur.find("input");
	}else{
		var message_name = $(this).attr("data-name");
		var input = conteneur.find('input[name="'+message_name+'"]');
	}
	*/
	var input = conteneur.find("input, select, textarea");

	var deca_left = input.offset().left - conteneur.offset().left;
	var deca_top = input.offset().top-21 - conteneur.offset().top;
	
	$(this).css({
	left: deca_left+"px",
	top: deca_top+"px",
	});
});




function empty_the_inputs(inputs_parent){
	$(inputs_parent).find('input[type="text"],input[type="password"],textarea').val("");
	$(inputs_parent).find("input, textarea").removeAttr('checked');
	$(inputs_parent).find(".checked").removeClass('checked');
	$(inputs_parent).find(".children_wrapper").remove();
}





//ajouter un enfant (via templates séparés)
function insert_child(v){
	var template_name = $(v).attr("data-child-template-cmd");
	var template = $("[data-child-template=" + template_name + "]");
	
	//si le div "children_wrapper" rassemblant les enfants de l'élémen
	//est inexistant, le créer, avec ou sans déclarer la fonction de tri (jquery ui sortable)
	
	if($(v).closest(".category").find(".children_wrapper").length<1){
		if($(v).parents(".sortable").length>=1){
			$(v).closest(".category").append('<div class="sortable children_wrapper">');
			$(".sortable").sortable({handle: ".move",update:function(event,ui){callback_form_add($(this))}});
		}else{
			$(v).closest(".category").append('<div class="children_wrapper">');
		}
	}
	
	//trouver le groupe d'enfant relatif à cet élément
	var children_wrapper = $(v).closest(".category").find(".children_wrapper:first");
	//trouver l'élément faisant office de parent au niveau de la logique de la structure
	var parent = $(v).closest(".category");
	//cloner le template adéquat et le mettre en variable, prêt pour la suite
	var element = $(template).clone(true).removeAttr("data-child-template");
	
	//insérer l'élément dans le groupe d'enfants
	children_wrapper.append(element);
	
	//aller au parent logique et prendre, dans un attribut préparé, la mise en forme de la structure créee jusque là
	var ancestor_name_structure = parent.attr("data-form-base");
	

	
	//récuperation du compteur d'enfants
	//si il n'est aps encore définit, se baser sur le nombre de frères existants
	//sinon, récuperer le cpt sur l'attribut du groupe d'enfant, l'incrementer et l'écraser.
	if(children_wrapper.is("[data-child-cpt]")){
		var recup_current_cpt = children_wrapper.attr("data-child-cpt");
		var new_item_cpt = recup_current_cpt;
		new_item_cpt++;
	}else{
		var prev_brother_cpt = element.prevAll().length;
		var new_item_cpt = prev_brother_cpt;
	}
	children_wrapper.attr("data-child-cpt",new_item_cpt);
	
	

	//créer la base du nouveau name en assemblant les pièces récuperées (il manque le nom du champs)
	//puis stocker cette valeur au niveau actuel afin qu'elle soit dispo pour les sous niveaux suivants.
	var structure_width_new_level = ancestor_name_structure+"[children]["+new_item_cpt+"]";
	element.attr("data-form-base",structure_width_new_level);
	
	
	//stocker l'id de langue pour l'insérer dans les enfants créés
	var langue_id = parent.find("[data-lang-category]").attr("data-lang-category");
	//remplacer l'attribut de selection de langue avec l'id du nouveau parent
	element.find("[data-lang-iso]").each(function(){
		var lang_iso = $(this).attr("data-lang-iso");

		$(this).attr("data-lang-target",langue_id+"-"+lang_iso)
		$(this).attr("data-lang-category",langue_id)
	});
	//rafraichir le menu des langues (masquer les non selectionnées)
	lang_menu();
	
	each_input_update_name(element,structure_width_new_level);
	replace_name();
}//insert-child

//cloner ou suprrimer un elemennt de formulaire
function clone_form_element(v){
	//récuperer l'identifiant de groupe
	//définir l'élément original à duppliquer
	var group = $(v).attr("data-group");
	var original = $("[data-group=" + group + "]").first();
	var last = $("[data-group=" + group + "]").last();
	var element = $(original).clone(true).addClass("clone");
	
	empty_the_inputs(element);
	
	$(element).insertAfter(last);
	
	initialize_form_add_remove_buttons(v);
	
	//en cas d'incrementation des names en manuel (optionnel)
	if($(element).is(".manual_increment")){
		
		if(original.is("[data-group-cpt]")){
			var recup_current_cpt = original.attr("data-group-cpt");
			var new_item_cpt = recup_current_cpt;
			new_item_cpt++;
		}else{
			var prev_brother_cpt = element.prevAll("[data-group=" + group + "]").length;
			var new_item_cpt = prev_brother_cpt;
		}
		$("[data-group=" + group + "]").attr("data-group-cpt",new_item_cpt);
	
	
		var structure_width_new_level = last.attr("data-form-base").split("[");
		structure_width_new_level = structure_width_new_level[0]+"["+new_item_cpt+"]";
		
		
		element.attr("data-form-base",structure_width_new_level);
		
		each_input_update_name(element,structure_width_new_level);
	};
	replace_name();
}//clone_form_element

//parcourir les names de l'élément nouvellement créé.
//créer le name en combinant la structure récuperée et le nom de base du champs stocké sur l'input lui même dans un attribut
function each_input_update_name(element,structure_width_new_level){
	element.find("[data-name]").each(function(){
		//si deux champs ont le même name il faudra faire un compteur. a créer ici (pas fait)
		$(this).attr("name",structure_width_new_level+"["+$(this).attr("data-name")+"]")
		//ceci est utile pour débuger
		//$(this).attr("title",structure_width_new_level+"["+$(this).attr("data-name")+"]")
		//$(this).val(structure_width_new_level+"["+$(this).attr("data-name")+"]")
	});
}

function delete_form_element(v){
	v.remove();
	initialize_form_add_remove_buttons(v);
}
//fonction lancée par jquery ui en cas de tri
function callback_form_add(v){
	initialize_form_add_remove_buttons(v.find("[data-group]"));
}
function initialize_form_add_remove_buttons(v){
	var group = v.attr("data-group");
	var last = $("[data-group=" + group + "]").last();
	$("[data-group=" + group + "]").removeClass("dupplicate_wrapper");
	last.addClass("dupplicate_wrapper");
}//initialize_form_add_remove_buttons

$(document).ready(function(){
	$(".form [data-group]").each(function(){
		initialize_form_add_remove_buttons($(this));
	});
	if($(".sortable").length>=1){
		$(".sortable").sortable({handle: ".move",update:function(event,ui){callback_form_add($(this))}});
	}
});
$("body").on("click", ".form .dupplicate", function (e) {
    e.preventDefault();
    clone_form_element($(this).closest("[data-group]"));
    return false;
});
$("body").on("click", ".form .children_add", function (e) {
    e.preventDefault();
    insert_child($(this));
    return false;
});
$("body").on("click", ".form .delete", function(){
	if($(this).parents(".category").length > 0){
		delete_form_element($(this).closest(".category"));
	}else{
		delete_form_element($(this).closest("[data-group]"));
	}
    return false;
});


















/* TRASH

$(element).find("[name]").each(function(){
	var name = $(this).attr("name");
	name = name.replace("[0]","["+cpt+"]"); 
	
	$(this).attr("name",name);
});

$(element).find("[data-target]").each(function(){
	var name = $(this).attr("data-target");
	name = name.replace("_0_","_"+cpt+"_"); 
	
	$(this).attr("data-target",name);
});







var cpt = $(original).attr("data-manual-increment");
cpt++;
$(original).attr("data-manual-increment",cpt);

$(element).find("[name]").each(function(){
	var name = $(this).attr("name");
	name = name.replace("[0]","["+cpt+"]"); 
	
	$(this).attr("name",name);
});
$(element).find("[data-target]").each(function(){
	var name = $(this).attr("data-target");
	name = name.replace("_0_","_"+cpt+"_"); 
	
	$(this).attr("data-target",name);
});

*/