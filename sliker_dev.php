<?php include("./inc/header.php"); ?>
<div id="wrapper">

<ul id="buttons_dl">
	<li>
		<a href="./assets/js/sliker.js" target="_blank" download="sliker.js">
		télécharger le <strong>js</strong>
		</a>
	</li>
	<li>
		<a href="./assets/less/sliker.less" target="_blank" download="sliker.less">
		télécharger le <strong>less</strong>
		</a>
	</li>
</ul>

<h1><i class="fa fa-link"></i> SliKer</h1>

<!-- /FIN DU HEADER ------------------------------------------------------------------------------->
<!-- /FIN DU HEADER ------------------------------------------------------------------------------->











<div id="slider_classique" class="sliker safeload">
	<div class="conteneur_strict">
		<ul class="grand_slider">
			<?php for($i=1;$i<=20;$i++){ ?>
			<li class="<?php if($i==3){echo "selected";} ?>">
				<div class="illu_prop">
					<img class="template" src="<?php echo $pathLinkFile; ?>img/ratio/3_2.png">
					<span class="illu">
						<span>
						<span>
							<img class="" src="<?php echo $pathLinkFile; ?>img/examples/<?php echo $i; ?>.jpg">
						</span>
						</span>
					</span>
				</div>
			</li>
			<?php } ?>
		</ul>
	</div>
	
	<a class="btn_left" href=""><span><i class="fa fa-chevron-left"></i></span></a>
	<a class="btn_right" href=""><span><i class="fa fa-chevron-right"></i></span></a>
	<a class="btn_fs" href=""><span><i class="fa fa-expand"></i></span></a>
</div>





</div><!-- /wrapper -->
<?php include("./inc/footer.php"); ?>
<script>
$(document).ready(function() {


$('#slider_classique').slider_nike({
'nbr_li':1,
'vitesse_auto':3000,
'vitesse': 500,
'auto':0,
'type':"none",
'cible':"none",
'isolement': 0,
'pc_only':0,
'loop':0,
'liquide':1,
'drag':0,
'creer_afficheur': 0,
'fading_mode': 1,
'buffering_nbr': 3,
});




});//DOC READY END



</script>
