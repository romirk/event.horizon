
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
				<meta charset='utf-8'/>
  		  <title>Verify email</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="google-signin-scope" content="profile email">
        <meta name="google-site-verification" content="vaGeS1Gwx-Sx_QKGg7DTGVHOF10W5vT_IFt_R065KFE" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.blue-pink.min.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
        <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
        <link rel="icon" href="/assets/favicon.ico">
</head>
<body>
	<div class='container'>
    <!-- start header div -->
		<h3><code>randomthoughts</code></h3>
    <!-- end header div -->

    <!-- start wrap div -->
    <div id="container-fluid">
        <!-- start PHP code -->
        <?php
				if(isset($_GET['hash']) && !empty($_GET['hash'])){
        			$hash = strip_tags($_GET['hash']); // Set hash variable
        			$email = strip_tags($_GET['email']);
        			include_once "connection.php";

				    $q = mysqli_query($conn, "SELECT `email`, `hash`, `active` FROM `members` WHERE `email`='".$email."' AND `hash`='".$hash."' AND `active`='0'");
				    $m = mysqli_num_rows($q);

        			if($m > 0){
    			        mysqli_query($conn, "UPDATE `members` SET `active`='1' WHERE `email`='".$email."' AND `hash`='".$hash."' AND `active`='0'") or die(mysqli_error($conn));
            			echo '<div class="alert alert-success">Your account has been activated, you can now <a href="/auth/">login</a>.</div>';
    			    }else{
    			        // No match -> invalid url or account has already been activated.
    			        echo '<div class="alert alert-warning">The url is either invalid or you already have activated your account.</div>';
    			    }

    			}else{
    			    // Invalid approach
    			    echo '<div class="alert alert-danger">Invalid approach, please use the link that has been send to your email.</div>';
    			}
			?>
        <!-- stop PHP Code -->


    </div>
   </div>
    <!-- end wrap div -->
</body>
</html>