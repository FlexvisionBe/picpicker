</div><!-- \wrapper -->
</form>

<script src="https://code.jquery.com/jquery-1.12.3.min.js" integrity="sha256-aaODHAgvwQW1bFOGXMeX+pC4PZIPsvn2h1sArYOhgXQ=" crossorigin="anonymous"></script>
<!--[if lt IE 9]>
    <script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
<![endif]-->
<script type="text/javascript" src="<?php echo $pathLinkFile; ?>js/jquery.actual.js"></script>
<script type="text/javascript" src="<?php echo $pathLinkFile; ?>js/picker.js"></script>
<script type="text/javascript" src="<?php echo $pathLinkFile; ?>js/picker.date.js"></script>
<script type="text/javascript" src="<?php echo $pathLinkFile; ?>js/picker.time.js"></script>
<script type="text/javascript" src="<?php echo $pathLinkFile; ?>js/jquery-validation/jquery.validate.min.js"></script>
<script type="text/javascript" src="<?php echo $pathLinkFile; ?>js/jquery-ui.min.js"></script>
<script type="text/javascript" src="<?php echo $pathLinkFile; ?>/../../../formflex.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.1/js/select2.min.js"></script>
<script type="text/javascript" src="<?php echo $pathLinkFile; ?>js/monjquery.js"></script>
</body>
</html>
<script>
$(document).ready(function(){
	var msg_error = $(".customErrorValidation:eq(0)").html();
	 $(".customErrorValidation").html(msg_error);
});
</script>