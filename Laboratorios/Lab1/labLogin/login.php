<?php
// Initialize the session
session_start();
 
// Check if the user is already logged in, if yes then redirect him to welcome page
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: welcome.php");
    exit;
}
 
// Include config file
require_once "scripts/config.php";
$controller = new ControllerUsuarios();
// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $controller->validate_login();
    $controller->login();
    
    // Close connection
    $controller->close();
}
?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Sign In</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <!-- Custom styles for this template -->
    <link href="./styles/login.css" rel="stylesheet">
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/1000hz-bootstrap-validator/0.11.9/validator.min.js"></script>
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5">
                    <div class="card-body">
                        <h5 class="card-title text-center">Sign In</h5>

                        <form class="form-signin" data-toggle="validator" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                            <div class="form-group form-label-group">
                                <input type="text" id="inputUser" name="username" class="form-control" placeholder="Username"
                                    pattern="^[_A-z0-9]{1,}$" data-error="Please enter your username" 
                                    value="<?php echo $username; ?>" required>
                                <label for="inputUser">Username</label>
                                <div style="margin-top:18px" class="help-block with-errors"></div>
                            </div>
                            <span class="help-block with-errors"><?php echo $username_err; ?></span>

                            <div class="form-group pass-show">
                                <div class="form-label-group">
                                    <input type="password" id="inputPassword" name="password" class="form-control"
                                        placeholder="Password" data-toggle="password"
                                        data-error="Please enter your password"
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                                        value="<?php echo $password; ?>" required>
                                    <label for="inputPassword">Password</label>
                                </div>
                            </div>
                            <span class="help-block with-errors"><?php echo $password_err; ?></span>


                            <div class="custom-control custom-checkbox mb-3">
                                <input type="checkbox" class="custom-control-input" id="customCheck1">
                                <label class="custom-control-label" for="customCheck1">Remember password</label>
                            </div>
                            <button id="login-btn" class="btn btn-lg btn-primary btn-block text-uppercase"
                                type="submit">Sign in</button>
                        </form>
                        <hr class="my-4">
                        <p class="message">Not registered? <a href="register.php">Create an account</a> or <a
                                href="password.php">Change password</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="./scripts/login.js"></script>
</body>

</html>