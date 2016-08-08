function replace_name(){
	$("[data-group] input").each(function(){
		$(this).val($(this).attr("name"));
	});
};

$(".replace_names_link").click(function(){
	replace_name();
});

$(document).ready(function() {
	$('.select2-base').select2();
});


// centrer verticalement un élément
$(".vert_center").each(function(k,v) {
	var haut_par = $(v).parent().height();
	var haut = $(v).height();
	var decalage = (haut_par-haut)/2;
	$(v).css("position","relative");
	$(v).css("top",decalage);
});
$(".hor_center").each(function(k,v) {
	var larg_par = $(v).parent().width();
	var larg = $(v).width();
	var decalage = (larg_par-larg)/2;
	$(v).css("position","relative");
	$(v).css("left",decalage);
});

//etendre propager un lien vers son parent
$(".expend").click(function(e){
	if($(e.target).hasClass("link_block")){
	
	}else if($(e.target).parents(".link_block").length){
	
	}else{
		var link = $(this).find(".link").attr("href");
		window.location = link;
	}
});






$("body").on("click",".autopopup .close",function(){
	$(this).parents(".autopopup").fadeOut();
});
$("body").on("click","[id^='popup_']",function(e){
   if(e.target == this){
       $(this).fadeOut();
   }
});
$("[data-popup]").click(function(){
	var id_popup = $(this).attr("data-popup");
	
	show_popup(id_popup);
	return false;
});
function show_popup(id) {
	var popup = $("#"+id);
	
	if(popup.is(".generated")){
		popup.fadeIn();
	}else{
		popup.contents().wrapAll("<div class='content_wrapper'>");
		popup.contents().wrapAll("<div class='margin_wrapper'>");
		popup.contents().wrapAll("<div class='vert_wrapper'>");
		popup.contents().wrapAll("<div class='hor_wrapper'>");
		popup.contents().wrapAll("<div class='center_wrapper'>");
		popup.find(".content_wrapper").append("<span class='close cross'><i class='fa fa-times'></i></span>");
		
		popup.addClass("generated");
		popup.fadeIn();
	}

}









$("pre, blockquote").on("click","span",function(){
	target = $(this).parents("pre, blockquote");

	if(target.is(".selected")){
		target.removeClass("selected");
	}else{
		target.addClass("selected");
	}
});






$(document).ready(function() {
	$("pre").each(function(){
		$(this).append('<span>code <i class="fa fa-chevron-down"></i><i class="fa fa-chevron-up"></i></span>');
	});
	$("blockquote").each(function(){
		$(this).append('<span>infos <i class="fa fa-chevron-down"></i><i class="fa fa-chevron-up"></i></span>');
	});
});


/*
 JQUERY VALIDATE
*/
$(document).ready(function () {
    $("form").validate();
});

/*
 $(".btn_ctn .next").click(function () {
 
 });*/

jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});


var form = $("form");

$("#test_form").click(function () {
    if (form.valid()) {
        var index_page = $(this).closest(".page").index() + 1;

        $(".page").removeClass("active");
        $(".page:nth-child(" + (index_page + 1) + ")").addClass("active");

        $('html,body').scrollTop(0);
    } else {
        $('.customErrorValidation').show();
    }
});


function initValidation($form) {

    /*
     if ($form.attr("novalidate")) {
     return;
     }
     */

    $form.validate({
        errorPlacement: function (error, element) {

            $error = $(element).parent().find('.customErrorValidation').first();
            if ($error.length == 0) {
                $error = $(element).parent().parent().find('.customErrorValidation').first();
            }

            errorStr = "";
            if (error.html() != "") {
                errorStr = "<span><i class=\"fa fa-caret-down arrow\"></i>" + error.html() + "<i class = \"fa fa-info-circle info\"></i></span>";
            }
            $error.html(errorStr);
        },
        success: function (error) {
            error.remove();
        }
    });
}
$('form').each(function () {
    initValidation($(this));
});



$(".customErrorValidation").each(function () {

    if ($(this).parents(".label,label").length == 1) {
        var conteneur = $(this).parents(".label,label");
    } else {
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
    var deca_top = input.offset().top - 21 - conteneur.offset().top;

    $(this).css({
        left: deca_left + "px",
        top: deca_top + "px",
    });
});



















$("#start_example_loader").click(function(){
	autoloader("start");
});
$("#stop_example_loader").click(function(){
	autoloader("stop");
});



















