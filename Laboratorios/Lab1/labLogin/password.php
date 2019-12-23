<?php
// Include config file
require_once "scripts/config.php";

$controller = new ControllerUsuarios();

// Define variables and initialize with empty values
$username = $password_old = $password_new1 = $password_old2 = "";
$username_err = $password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){

    $controller->validate_password();
    $controller->change_password();
    
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

    <title>Password change</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <!-- Custom styles for this template -->
    <link href="./styles/password.css" rel="stylesheet">
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
                        <h5 class="card-title text-center">Password Change</h5>

                        <form class="form-password" data-toggle="validator" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                            <div class="inline-form">
                                <div class="form-group  form-label-group left-form">
                                    <input type="text" name="username" id="inputUser" class="form-control" placeholder="Username"
                                    data-error="Please enter your username" required>
                                    <label for="inputUser">Username</label>
                                    <div style="margin-top:5px" class="help-block with-errors"></div>
                                </div>
                                <div class="form-group pass-show right-form">
                                    <div class="form-label-group">
                                        <input name="oldpassword" type="password" id="oldPassword" class="form-control"
                                            placeholder="Old password" data-toggle="password"
                                            data-error="Please input your old password"
                                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" required>
                                        <label for="oldPassword">Old password</label>
                                        <div style="margin-top:5px" class="help-block with-errors"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="inline-form">

                                <div class="form-group pass-show-left left-form">
                                    <div class="form-label-group">
                                        <input name="newpassword" type="password" id="newPassword" class="form-control"
                                            placeholder="New Password" data-toggle="password"
                                            data-error="Password must include 1 uppercase, lowercase, number and be 8-15 characters long"
                                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" required>
                                        <label for="newPassword">New password</label>
                                        <div style="margin-top:5px" class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="form-group pass-show right-form">
                                    <div class="form-label-group">
                                        <input name="confirmpassword" type="password" id="confirmPassword" class="form-control"
                                            placeholder="Confirm" data-toggle="password"
                                            data-error="Password must include 1 uppercase, lowercase, number and be 8-15 characters long"
                                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" required>
                                        <label for="confirmPassword">Confirm</label>
                                        <div style="margin-top:5px" class="help-block with-errors"></div>
                                    </div>
                                </div>
                            </div>
                            <span class="help-block with-errors"><?php echo $username_err; ?></span>
                            <button id="change-btn" class="btn btn-lg btn-primary btn-block text-uppercase"
                                type="submit">Change password</button>
                        </form>
                        <hr class="my-4">
                        <p class="message">Forgot your password? <a href="password.php">Recover password</a> or
                            <a href="login.php">Back to sign in</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="./scripts/password.js"></script>
</body>

</html>