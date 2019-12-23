<?php
// Include config file
require_once "scripts/config.php";
$controller = new ControllerUsuarios();
// Define variables and initialize with empty values
$username = $password = $firstname = $lastname = $date = $phone = $email = "";
$username_err = $password_err = $confirm_password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    $controller->validate_registration();
    $controller->register_user();
    
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

    <title>Sign Up</title>
    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <!-- Custom styles for this template -->
    <link href="./styles/register.css" rel="stylesheet">
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
                        <h5 class="card-title text-center">Sign Up</h5>

                        <form class="form-signup" data-toggle="validator" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                            <div class="inline-form">
                                <div class="form-group form-label-group left-form">
                                    <input name="firstname" type="text" id="name" class="form-control" placeholder="First Name"
                                        pattern="^[A-Za-zÀ-ÖØ-öø-ÿ]{1,}$" data-error="Please enter your name"
                                        value="<?php echo $firstname; ?>" required>
                                    <label for="name">First Name</label>
                                    <div style="margin-top:5px" class="help-block with-errors"></div>
                                </div>
                                <div class="form-group form-label-group right-form">
                                    <input name="lastname" type="text" id="lastnames" class="form-control" placeholder="Last name"
                                        pattern="^[A-Za-zÀ-ÖØ-öø-ÿ ]{1,}$"
                                        data-error="Please enter your last name" 
                                        value="<?php echo $lastname; ?>" required>
                                    <label for="lastnames">Last name</label>
                                    <div style="margin-top:5px" class="help-block with-errors"></div>
                                </div>
                            </div>
                            <div class="inline-form">
                                <div class="form-group form-label-group left-form">
                                    <input name="date" type="date" id="inputDate" class="form-control"
                                        required>
                                    <label for="inputDate">Birth Date</label>
                                </div>
                                <div class="form-group form-label-group right-form">
                                    <input name="phone" type="text" id="inputPhone" class="form-control" placeholder="Phone"
                                        required pattern="^[0-9]{8,12}$"
                                        data-error="Please enter your phone number"
                                        value="<?php echo $phone; ?>">
                                    <label for="inputPhone">Phone</label>
                                    <div style="margin-top:5px" class="help-block with-errors"></div>
                                </div>
                            </div>

                            <div class="form-group form-label-group">
                                <input name="email" type="email" id="inputEmail" class="form-control" placeholder="Email address"
                                    required data-error="Please enter a valid e-mail" value="<?php echo $email; ?>">
                                <label for="inputEmail">Email address</label>
                                <div style="margin-top:5px" class="help-block with-errors"></div>

                            </div>

                            <div class="form-group pass-show inline-form">
                                <div class="form-group form-label-group left-form">
                                    <input name="username" type="text" id="inputUser" class="form-control" placeholder="Username"
                                        required data-error="Please enter your username" value="<?php echo $username; ?>">
                                    <label for="inputUser">Username</label>
                                    <div style="margin-top:5px" class="help-block with-errors"></div>
                                </div>
                                <div class="form-group form-label-group right-form">
                                    <input name="password" type="password" id="inputPassword" class="form-control"
                                        data-toggle="password" placeholder="Password"
                                        data-error="Password must include 1 uppercase, lowercase, number and be 8-15 characters long"
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" value="<?php echo $password; ?>" required>
                                    <label for="inputPassword">Password</label>
                                    <div style="margin-top:5px" class="help-block with-errors"></div>
                                </div>
                            </div>
                            <button id="signup-btn" class="btn btn-lg btn-primary btn-block text-uppercase"
                                type="submit">Sign up</button>
                        </form>
                        <span class="help-block with-errors"><?php echo $username_err; ?></span>
                        <hr class="my-4">
                        <p class="message">Already registered? <a href="login.php">Log in instead</a> or <a
                                href="password.php">Change password</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="./scripts/register.js"></script>
</body>

</html>