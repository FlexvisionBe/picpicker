<?php 
$pathLinkFile="./assets/";
?>
<?php
function generateRandomString() {
	$length = rand(5, 20);
	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$charactersLength = strlen($characters);
	$randomString = '';
	for ($i = 0; $i < $length; $i++) {
		$randomString .= $characters[rand(0, $charactersLength - 1)];
	}
	return $randomString;
}
?>
<!doctype html>
<html lang="fr">
<head>
	<title>formflex</title>
	<meta name="description" content="Description courte de la page" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Language" content="fr" />
	<meta http-equiv="Content-Script-Type" content="text/javascript" />
	<?php require "./inc/lessc.inc.php";$less = new lessc;$less->compileFile("./assets/less/style_less.less", "./assets/css/style.css"); ?>
	<link href="<?php echo $pathLinkFile; ?>css/style.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo $pathLinkFile; ?>css/font-awesome.min.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo $pathLinkFile; ?>css/prettyPhoto.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo $pathLinkFile; ?>css/pickadate/default.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo $pathLinkFile; ?>css/pickadate/default.date.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo $pathLinkFile; ?>css/pickadate/default.time.css" rel="stylesheet" type="text/css" />
	<link href="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.1/css/select2.min.css" rel="stylesheet" />
	<link href="<?php echo $pathLinkFile; ?>img/favicon.png" rel="shortcut icon" type="image/png" />
	<!--link href="<?php echo $pathLinkFile; ?>css/jquery.mCustomScrollbar.css" rel="stylesheet" type="text/css" />-->
	<link href='http://fonts.googleapis.com/css?family=Dosis:400,700' rel='stylesheet' type='text/css'>
</head>

<body>


<ul id="navbar">
	<li>
		<a href="./formflex.php">
			Formflex
		</a>
	</li>
	<li>
		<a href="./picpicker.php">
			PicPicker
		</a>
	</li>
	<li>
		<a href="./sliker.php">
			SliKer
		</a>
	</li>
	<li>
		<a href="./startpack.php">
			Startpack
		</a>
	</li>
</ul>


</form>
