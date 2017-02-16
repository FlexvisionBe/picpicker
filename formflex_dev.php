<?php include("./inc/header.php"); ?>
<div id="wrapper">

<form action="">


<!-- /FIN DU HEADER ------------------------------------------------------------------------------->
<!-- /FIN DU HEADER ------------------------------------------------------------------------------->






<div class="replace_names_link">afficher names</div>

<div class="form">
<ul class="lang_menu mode_popup" data-lang-menu="children_test">
	<li data-lang="fr">fr</li>
	<li data-lang="nl">nl</li>
	<li data-lang="en">en</li>
</ul>

<div class="sortable">
<div class="category manual_increment" data-group-cpt="999" data-group="children_group_erer" data-this-cpt="0">
	<div>
		<?php for($i=1;$i<=3;$i++) : ?>
		<?php
			if($i==1){$lang="fr";}
			if($i==2){$lang="nl";}
			if($i==3){$lang="en";}
		?>
		<fieldset data-lang-target="children_test-<?php echo $lang; ?>" data-lang-category="children_test" data-lang-iso="<?php echo $lang; ?>" data-form-base="form[pages][1295]">
			<label>
				<input type="hidden" value="0" class="sortable_get_position">
				<span class="round_icon gray_on_white move"><i class="fa fa-arrows"></i></span>
			</label>
		
			<label>
				<span class="name">rue</span>
				<input type="text" name="form[pages][1295][0][street][<?php echo $lang; ?>]" data-name="street" size="30" value="">
				
				<span class="customErrorValidation"></span>
				<span class="clear"></span>
			</label>
		
			<label>
				<span class="name">numero</span>
				<input type="text" name="form[pages][1295][0][number][<?php echo $lang; ?>]" data-name="number" size="5" value="">
				
				<span class="customErrorValidation"></span>
				<span class="clear"></span>
			</label>
			
			<label>
				<span class="name">Ville test</span>
				<input type="text" name="form[pages][1295][0][city][<?php echo $lang; ?>]" data-name="city" size="20" value="">
				
				<span class="customErrorValidation"></span>
				<span class="clear"></span>
			</label>

			<label>
				<span class="round_icon blue children_add" data-child-template-cmd="classic_child1"><i class="fa fa-caret-square-o-down"></i></span>
				<span class="round_icon red delete"><i class="fa fa-trash"></i></span>
				<span class="round_icon green dupplicate"><i class="fa fa-plus"></i></span>
			</label>
		</fieldset>
		<?php endfor; ?>
	</div>
</div><!-- /category -->
</div><!-- /sortable -->

<div class="zone_add_from_ext">
	<span class="round_icon big green exterior_add" data-group-target="children_group_erer" data-child-template-cmd="classic_child1">
		<i class="fa fa-plus"></i>
	</span>
	<span class="text">
		Morbi sed augue nisi. Vivamus vehicula eros in lorem auctor, adipiscing pretium urna pulvinar. Praesent vitae imperdiet ante. Mauris eu pellentesque magna. Donec consectetur mauris orci, ultricies congue mauris ultricies vel. Aliquam ac lectus massa. Ut ac est turpis.
	</span>
</div>
</div><!-- /form -->



































<div class="form">

<div class="children_templates">
	<div class="category" data-child-template="classic_child1">
		<div>
			<?php for($i=1;$i<=3;$i++) : ?>
			<?php
				if($i==1){$lang="fr";}
				if($i==2){$lang="nl";}
				if($i==3){$lang="en";}
			?>
			<fieldset data-lang-iso="<?php echo $lang; ?>">
				<label>
					<input type="hidden" value="0" class="sortable_get_position">
					<span class="round_icon gray_on_white move"><i class="fa fa-arrows"></i></span>
				</label>
			
				<label>
					<span class="name">batiment</span>
					<input type="text" size="60" name="" data-name="building" value="">
					
					<span class="customErrorValidation"></span>
					<span class="clear"></span>
				</label>

				<label>
					<span class="round_icon blue children_add" data-child-template-cmd="classic_child1"><i class="fa fa-caret-square-o-down"></i></span>
					<span class="round_icon red delete"><i class="fa fa-trash"></i></span>
					<!--<span class="round_icon green dupplicate"><i class="fa fa-plus"></i></span>-->
				</label>
			</fieldset>
			<?php endfor; ?>
		</div>
	</div><!-- \category -->
</div>

</div><!-- /form -->


</form>
<?php include("./inc/footer.php"); ?>