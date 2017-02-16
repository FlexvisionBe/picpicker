<?php include("./inc/header.php"); ?>
<div id="wrapper" class="responsive">

<ul id="buttons_dl">
	<li>
		<a href="./assets/js/picpicker.js" target="_blank" download="picpicker.js">
		télécharger le <strong>js</strong>
		</a>
	</li>
	<li>
		<a href="./assets/less/picpicker.less" target="_blank" download="picpicker.less">
		télécharger le <strong>less</strong>
		</a>
	</li>
</ul>

<h1><i class="fa fa-camera"></i> PicPicker</h1>
<!-- /FIN DU HEADER ------------------------------------------------------------------------------->
<!-- /FIN DU HEADER ------------------------------------------------------------------------------->



<?php for($m=1;$m<=2;$m++){ ?>
<div class="picpicker">
	<div class="command">
		<span class="choice_button">
			<i class="fa fa-camera"></i> Modifier
		</span>
		<span class="switch_button">
			<i class="fa fa-arrows-h"></i> Inverser l'ordre des photos
		</span>
	</div>
	<div class="pictures">
		<?php for($i=1;$i<=2;$i++){ ?>
		<?php if($i==2){$photo_name="example_2_3_pic";}else{$photo_name="example_3_2_pic";} ?>
		<div class="picture"> 
			<div class="format">
				<img class="template" src="<?php echo $pathLinkFile; ?>img/picpicker/template_3_2.png">
				<span class="pic"><img src="<?php echo $pathLinkFile; ?>img/pictures/<?php echo $photo_name; ?>.jpg"></span>
				<span class="bg_icon"><i class="fa fa-camera"></i></span>
				<input type="hidden" name="house-picture[]">
			</div>
			<span class="remove"><i class="fa fa-times"></i></span>
			<span class="shadow"><img src="<?php echo $pathLinkFile; ?>img/picpicker/shadow_bottom_picture_corner.png"></span>
		</div>
		<?php } ?>
	</div>
</div><!-- \picpicker -->
<?php } ?>













<div id="picpicker_popup" class="two_pics">
<div class="height_wrapper">
<div class="width_wrapper">
<div class="margin_wrapper">
	<div class="head">
		<div class="title">
			Choisissez votre photo
		</div>
		<div class="text">
			
		</div>
		<div class="close">
			<i class="fa fa-times"></i>
		</div>
	</div>
	<div id="zoomer">
		<div class="bar">
			<span class="zoom_back">
				<i class="fa fa-reply-all"></i> Revenir à la liste
			</span>
		</div>
		<div class="pic">
			<img src="<?php echo $pathLinkFile; ?>img/pictures/example_3_2_pic.jpg">
		</div>
		<div class="btns">
			<span class="zoom_back">
				<i class="fa fa-times"></i>
			</span>
			<span class="zoom_validation">
				<i class="fa fa-check"></i>
			</span>
		</div>
	</div>
	<div id="too_much_pics_message">
		<div>
			<span>
				Vous ne pouvez pas sélectionner plus d'images.
				<br /><br />
				(maximum 2)
			</span>
		</div>
	</div>
	<div class="pictures_wrapper">
		<ul>
			<?php for($i=1;$i<=50;$i++){ ?>
			<?php if($i%2==0){$photo_name="example_2_3_pic";}else{$photo_name="example_3_2_pic";} ?>
			<li>
				<div class="picture"> 
					<img class="template" src="<?php echo $pathLinkFile; ?>img/picpicker/template_3_2.png">
					<span class="pic" data-id="<?php echo $i*123; ?>" data-original="<?php echo $pathLinkFile; ?>img/pictures/<?php echo $photo_name; ?>.jpg">
						<img src="<?php echo $pathLinkFile; ?>img/pictures/thumb/<?php echo $photo_name; ?>.jpg">
					</span>
					<span class="zoom"><i class="fa fa-search"></i></span>
				</div>
			</li>
			<?php } ?>
		</ul>
	</div>
	<div class="foot">
		<span class="validation">
			<i class="fa fa-check"></i> Valider ma sélection
		</span>
	</div>
</div><!-- \margin_wrapper -->
</div><!-- /width_wrapper -->
</div><!-- /height_wrapper -->
</div><!-- /picpicker_popup -->




<?php include("./inc/footer.php"); ?>