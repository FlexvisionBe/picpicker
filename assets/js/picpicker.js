//TRANSFERT DES DONNEES VERS LA PAGE
//reconnait le bon block photo grace à la class ".active_picpicker"
function picpicker_data_transfert(){
	var data_length = picpicker_export.length;
	var html_length = $(".active_picpicker .picture").length;
	
	//si il y a deux balises images et que la 2eme n'est plus nécessaire > delete
	if(data_length<html_length && html_length==2){
		$(".active_picpicker .picture").last().remove();
	}
	//si il n'y a pas assez de bases img, rajouter (max 2)
	if(html_length<data_length && data_length==2){
		var element = $(".active_picpicker .picture").clone();
		
		$(".active_picpicker .pictures").append(element);
	}
	//gérer l'affichage des crois de suppression
	if(data_length>0){
		$(".active_picpicker .remove").show();
	}else{
		$(".active_picpicker .remove").hide();
	}
	//gérer l'affichage du bouton switch
	if(data_length<2){
		$(".active_picpicker.switch_button").hide();
	}else{
		$(".active_picpicker .switch_button").show();
	}
	
	var push_cpt = 0;
	$(".active_picpicker .picture .format>span.pic img").each(function(){
		if(typeof picpicker_export[push_cpt] === 'undefined'){
			$(this).hide();
			$(this).attr("src","");
			$(this).parents(".format").find("input").val("");
		}else{
			$(this).show();
			$(this).attr("src",picpicker_export[push_cpt]);
			$(this).parents(".format").find("input").val(picpicker_export_id[push_cpt]);
		};
	
		push_cpt++;
	});
};










//VALIDER LE POPUP
//stocker la source et l'id des images choisies en variables puis fermer le popup
var picpicker_export;
var picpicker_export_id;
$("body").on("click","#picpicker_popup .validation",function(){
	picpicker_export = [];
	picpicker_export_id = [];
	
	$("#picpicker_popup .picture.selected").each(function(){
		var src = $(this).find(".pic").attr("data-original");
		picpicker_export.push(src);
		var id_pic = $(this).find(".pic").attr("data-id");
		picpicker_export_id.push(id_pic);
	});
	
	picpicker_data_transfert();
	
	$("#picpicker_popup").fadeOut();
});













//SELECTIONNER UNE IMAGE DANS LE POPUP
//au clic ou au zoom->clic(voir systeme de zoom pour ce dernier)
$("body").on("click","#picpicker_popup .picture",function(){
	picpicker_select_pic($(this));
});
function picpicker_select_pic(pic,fixed_state){
	if($("#picpicker_popup").is(".two_pics")){
		var selected_max = 2;
	}else{
		var selected_max = 1;
	}

	var selected_nbr = $("#picpicker_popup .picture.selected").length;

	if(pic.is(".selected")){
		if(fixed_state != "select_only"){
			pic.removeClass("selected");
		}
	}else{
		if(selected_max==1){
			$("#picpicker_popup .picture").removeClass("selected");
			pic.addClass("selected");
		}else{
			if(selected_nbr<selected_max) {
				pic.addClass("selected");
			}else{
				$("#too_much_pics_message").fadeIn();
				too_much_pics_message_delay = setInterval(function () {
					$("#too_much_pics_message").fadeOut();
					clearInterval(too_much_pics_message_delay);
				}, 2000);
			}
		}
	}
}//picpicker_select_pic
















//SYSTEME DE ZOOM
//sauvegarder l'image choisie (en cas de validation par après) et ouvrir le zoom
var picpicker_last_zoomed;
$("body").on("click","#picpicker_popup .picture .zoom",function(){
	picpicker_last_zoomed = $(this).closest(".picture");
	var src = picpicker_last_zoomed.find(".pic").attr("data-original");
	
	$("#picpicker_popup #zoomer .pic img").attr("src",src);
	$("#picpicker_popup #zoomer").fadeIn();
	return false;
});

//fermer le zoom et déselectionner cette image
$("body").on("click","#picpicker_popup #zoomer .zoom_back",function(){
	picpicker_last_zoomed.removeClass("selected");
	$("#picpicker_popup #zoomer").fadeOut();
});

//fermer le zoom et sélectionner cette image
//une fonction est utilisée car la variante de multi-selection complique la donne.
//"select_only" = pas d'inversion d'état, toujours sélectionner
$("body").on("click","#picpicker_popup #zoomer .zoom_validation",function(){
	picpicker_select_pic(picpicker_last_zoomed,"select_only");
	$("#picpicker_popup #zoomer").fadeOut();
});













//FERMETURES SIMPLES (pas de changements)
//fermer le popup
$("body").on("click","#picpicker_popup .close",function(){
	$("#picpicker_popup").fadeOut();
});
//fermer le warning trop de photos
$("body").on("click","#picpicker_popup #too_much_pics_message",function(){
	$(this).fadeOut();
});











//OUVRIR LE POPUP (et preselectionner)
//au clic sur le bouton 'modifier", ouvrir le popup
$("body").on("click",".picpicker .choice_button",function(){
	launch_picpicker_popup($(this).closest(".picpicker"));
});
//déselectionner toutes les pics du popup puis préselectionner uniquement
//ce qui correspond aux images déjà affichées (sécurité si images vides)
function launch_picpicker_popup(this_plugin){
	$("#picpicker_popup .pictures_wrapper li .picture").removeClass("selected");

	$(".picpicker").removeClass("active_picpicker");
	this_plugin.addClass("active_picpicker");
	
	this_plugin.find(".picture input").each(function(){
		if ($(this).val() == null || $(this).val()==''){
		
		}else{
			$("#picpicker_popup .pic[data-id="+$(this).val()+"]").parents(".picture").addClass("selected");
		}
	});

	$("#picpicker_popup").fadeIn();
};













//SUPPRESSION D'UNE IMAGE
//si deux images dispos, supprimer completement le bloc picture.
//sinon, vider les inputs et masquer le bloc picture
$("body").on("click",".picpicker .picture .remove",function(){
	var this_plugin = $(this).closest(".picpicker");
	
	if(this_plugin.find(".picture").length >=2){
		$(this).parents(".picture").remove();
	}else{
		var image = $(this).parents(".picture").find(".format>span.pic img");
		image.attr("src","");
		image.parents(".format").find("input").val("");
		$(this).hide();
		image.hide();
	}
	
	check_the_switchbutton(this_plugin);
});












//BOUTON D'INVERSION
//si il n'y a qu'une image affichée, ne pas montrer le bouton d'inversion d'ordre des photos
$(document).ready(function(){
	$(".picpicker").each(function(){
		check_the_switchbutton($(this));
	});
});
//cette fonction est utilisée ici ainsi que lors de la suppression d'une image
function check_the_switchbutton(this_plugin){
	if(this_plugin.find(".picture").length < 2){
		this_plugin.find(".switch_button").hide();
	}else{
		this_plugin.find(".switch_button").show();
	}
};
//au clic sur le bouton, inverser les deux photos (si deux sont dispos, sinon le bouton n'existe pas)
$("body").on("click",".picpicker .switch_button",function(){
	var this_plugin = $(this).closest(".picpicker");
	
	if(this_plugin.find(".picture").length >= 2){
		var img1 = this_plugin.find(".picture:nth-child(1) .pic img");
		var img2 = this_plugin.find(".picture:nth-child(2) .pic img");
		var src1 = img1.attr("src");
		var src2 = img2.attr("src");
		
		img1.attr("src",src2);
		img2.attr("src",src1);
	}
});





