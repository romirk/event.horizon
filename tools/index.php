<?php
error_reporting(~E_ALL & ~E_NOTICE);
session_start();

/**
 * @param $string
 */
function sha512($string) {return hash('sha512', $string);}

$e = false;

if (!isset($_SESSION['userinfo']['id'])) {

      if ($_POST['submit']) {
            include_once 'connection.php';
            $username = strip_tags($_POST['username']);
            $password = sha512(strip_tags($_POST['password']));
            echo "<script>console.log('$password')</script>";

            $sql   = "SELECT id, username, password, fname, lname, email, regdate FROM members WHERE username = '$username' AND active = '1' LIMIT 1";
            $query = mysqli_query($conn, $sql);

            if ($query) {
                  $row        = mysqli_fetch_row($query);
                  $userid     = $row[0];
                  $dbUsername = $row[1];
                  $dbPassword = $row[2];
                  $fname      = $row[3];
                  $lname      = $row[4];
                  $email      = $row[5];
                  $regdate    = $row[6];
            }

            if (($username == $dbUsername || $username == $email) && $password == $dbPassword) {
                  $_SESSION['userinfo'] = [
                        'username' => $username,
                        'id'       => $userid,
                        'fn'       => $fname,
                        'ln'       => $lname,
                        'email'    => $email,
                        'rd'       => $regdate];

                  if ($_GET['next'] != '') {
                        echo '<script>window.location.replace("' . strip_tags($_GET['next']) . '")</script>'; //header('Location: ' . strip_tags($_GET['next']));
                  } else {
                        echo '<script>window.location.replace("user")</script>'; //header('Location: user');
                  }

            } else {
                  $e = true;
            }

      }

} else {

      if ($_GET['next'] != '') {
            echo '<script>window.location.replace("' . strip_tags($_GET['next']) . '")</script>'; //header('Location: ' . strip_tags($_GET['next']));
      } else {
            echo '<script>window.location.replace("user")</script>'; //header('Location: user');
      }

}

?>
      <!DOCTYPE html>
      <html>

      <head>
            <meta charset="utf-8">
            <title>Login</title>
            <meta name="description" content="A website for random stuff">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="google-signin-scope" content="profile email">
            <!--<script src="../scriptsAndCss/jquery-2.1.4.min.js"></script>-->
            <!--<script src="assets/jquery-2.1.4.min.js"></script>-->
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <!-- Latest compiled and minified CSS -->
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
            <!--<link href="http://www.imagifight.in/favicon.ico" rel="shortcut icon">-->
            <!--<meta property="og:image" content="http://www.imagifight.in/favicon.ico" />-->
            <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.blue-pink.min.css">
            <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>


      </head>

      <body>
            <div class="container">
                  <?php

                  if ($e) { ?>
                        <div class="alert alert-danger">Invalid username/password.</div>
                  <?php } ?>
                  <?php

                  if ($_GET['ref'] == '401') { ?>
                        <div class="alert alert-danger"> <strong>401 UNAUTHORIZED:</strong> Login to continue.</div>
                  <?php } ?>
                  <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">

      <div class="w3-center"><br>
        <!--<span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-xlarge w3-transparent w3-display-topright" title="Close Modal">×</span>-->
        <img src="/assets/imgs/img_avatar4.png" alt="Avatar" style="width:30%" class="w3-circle w3-margin-top">
      </div>

      <form class="w3-container" action="<?php

                                                if ($_GET['next']) {echo '/auth/?next=' . $_GET['next'];} else {echo '/auth/';}

                                                ?>" method='post'>
        <div class="w3-section">
          <label><b>Username</b></label>
          <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter Username" name="username" required>
          <label><b>Password</b></label>
          <input class="w3-input w3-border" type="password" placeholder="Enter Password" name="password" required>
          <input class="w3-block w3-green w3-section mdl-button mdl-js-button mdl-js-ripple-effect" type="submit" name='submit' value='Login'>
          <!--<input class="w3-check w3-margin-top" type="checkbox" checked="checked"> Remember me-->
        </div>
      </form>

      <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
        <button onclick="document.getElementById('id01').style.display='none'" type="button" class="w3-button w3-red">Cancel</button>
        <span class="w3-right w3-padding w3-hide-small">New here? Head to the <a href="register">register page</a>.</span>
      </div>

    </div>
            </div>
      </body>

      </html>
