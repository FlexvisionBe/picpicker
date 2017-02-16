//pickpicker JS
function picpicker_data_transfert(){
	var data_length = picpicker_export.length;
	var html_length = $("#picpicker .picture").length;
	
	//si il y a deux balises images et que la 2eme n'est plus nécessaire > delete
	if(data_length<html_length && html_length==2){
		$("#picpicker .picture").last().remove();
	}
	//si il n'y a pas assez de bases img, rajouter (max 2)
	if(html_length<data_length && data_length==2){
		var element = $("#picpicker .picture").clone();
		
		$("#picpicker .pictures").append(element);
	}
	//gérer l'affichage des crois de suppression
	if(data_length>0){
		$("#picpicker .remove").show();
	}else{
		$("#picpicker .remove").hide();
	}
	//gérer l'affichage du bouton switch
	if(data_length<2){
		$("#picpicker .switch_button").hide();
	}else{
		$("#picpicker .switch_button").show();
	}
	
	var push_cpt = 0;
	$("#picpicker .picture .format>span.pic img").each(function(){
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

//pickpicker popup
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

var picpicker_last_zoomed;
$("body").on("click","#picpicker_popup .picture .zoom",function(){
	var src = $(this).parents(".picture").find(".pic").attr("data-original");
	picpicker_last_zoomed = $(this).parents("li").find(".picture");
	
	$("#picpicker_popup #zoomer .pic img").attr("src",src);
	$("#picpicker_popup #zoomer").fadeIn();
	return false;
});

$("body").on("click","#picpicker_popup .close",function(){
	$("#picpicker_popup").fadeOut();
});

$("body").on("click","#picpicker_popup #zoomer .zoom_back",function(){
	picpicker_last_zoomed.removeClass("selected");
	$("#picpicker_popup #zoomer").fadeOut();
});

$("body").on("click","#picpicker_popup #zoomer .zoom_validation",function(){
	picpicker_select_pic(picpicker_last_zoomed,"select_only");
	$("#picpicker_popup #zoomer").fadeOut();
});

$("body").on("click","#picpicker_popup #too_much_pics_message",function(){
	$(this).fadeOut();
});

$("body").on("click","#picpicker .choice_button",function(){
	launch_picpicker_popup();
});

function launch_picpicker_popup(){
	$("#picpicker_popup .pictures_wrapper li .picture").removeClass("selected");

	$("#picpicker .picture input").each(function(){
		$("#picpicker_popup .pic[data-id="+$(this).val()+"]").parents(".picture").addClass("selected");
	});

	$("#picpicker_popup").fadeIn();
};

//picpicker afficheur
$("body").on("click","#picpicker .picture .remove",function(){

	if($("#picpicker .picture").length >=2){
		$(this).parents(".picture").remove();
	}else{
		var image = $(this).parents(".picture").find(".format>span.pic img");
		image.attr("src","");
		image.parents(".format").find("input").val("");
		$(this).hide();
		image.hide();
	}
	
	if($("#picpicker .picture").length >=2){
		$("#picpicker .switch_button").show();
	}else{
		$("#picpicker .switch_button").hide();
	}
});


$(document).ready(function(){
	if($("#picpicker .picture").length < 2){
		$("#picpicker .switch_button").hide();
	}
});
$("body").on("click","#picpicker .switch_button",function(){
	if($("#picpicker .picture").length >= 2){
		var img1 = $("#picpicker .picture:nth-child(1) .pic img");
		var img2 = $("#picpicker .picture:nth-child(2) .pic img");
		var src1 = img1.attr("src");
		var src2 = img2.attr("src");
		
		img1.attr("src",src2);
		img2.attr("src",src1);
	}
});





