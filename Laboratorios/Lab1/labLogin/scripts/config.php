<?php

class DAOUsuarios
{
    public $mysqli;
    function __construct(){
        define('DB_SERVER', 'localhost');
        define('DB_USERNAME', 'root');
        define('DB_PASSWORD', '');
        define('DB_NAME', 'logindb');
        
        /* Attempt to connect to MySQL database */
        $this->mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
        
        // Check connection
        if($this->mysqli === false){
            die("ERROR: Could not connect. " . $mysqli->connect_error);
        }
    }

    function close(){
        $this->mysqli->close();
    }

    function register_user(){
        // Check input errors before inserting in database
        $GLOBALS["firstname"] = $_POST["firstname"];
        $GLOBALS["lastname"] = $_POST["lastname"];
        $GLOBALS["date"] = date('Y-m-d', strtotime($_POST['date']));
        $GLOBALS["email"] = $_POST["email"];
        $GLOBALS["username"] = $_POST["username"];
        $GLOBALS["phone"] = $_POST["phone"];

        if(empty($GLOBALS["username_err"]) && empty($GLOBALS["password_err"]) && empty($GLOBALS["confirm_password_err"])){
            // Prepare an insert statement
            $GLOBALS["password"] = $_POST["password"];
            $sql = "INSERT INTO users (username, firstname, lastname, birth_date, email, pass) VALUES (?, ?, ?, ?, ?, ?)";
            if($stmt = $this->mysqli->prepare($sql)){
                // Bind variables to the prepared statement as parameters
                $stmt->bind_param("ssssss", $GLOBALS["username"], $GLOBALS["firstname"], $GLOBALS["lastname"], $GLOBALS["date"], $GLOBALS["email"],$GLOBALS["password"]);
                // Attempt to execute the prepared statement
                if($stmt->execute()){
                    // Redirect to login page
                    header("location: login.php");
                } else{
                    echo "Something went wrong. Please try again later.";
                }
            }
            
            // Close statement
        $stmt->close();
        }
    } 
    
    function login(){
        // Validate credentials
        if(empty($GLOBALS["username_err"]) && empty($GLOBALS["password_err"])){
            // Prepare a select statement
            $sql = "SELECT username, pass FROM users WHERE username = ?";
            
            if($stmt =  $this->mysqli->prepare($sql)){
                // Bind variables to the prepared statement as parameters
                $stmt->bind_param( "s", $param_username);
                
                // Set parameters
                $param_username = $GLOBALS["username"];
                
                // Attempt to execute the prepared statement
                if($stmt->execute()){
                    // Store result
                    $stmt->store_result();
                    
                    // Check if username exists, if yes then verify password
                    if($stmt->num_rows == 1){                    
                        // Bind result variables
                        $stmt->bind_result($GLOBALS["username"], $hashed_password);
                        if($stmt->fetch()){
                            if($GLOBALS["password"] == $hashed_password){
                                // Password is correct, so start a new session
                                session_start();
                                
                                // Store data in session variables
                                $_SESSION["loggedin"] = true;
                                $_SESSION["username"] = $GLOBALS["username"];                            
                                
                                // Redirect user to welcome page
                                header("location: welcome.php");
                            } else{
                                // Display an error message if password is not valid
                                $GLOBALS["password_err"] = "The password you entered was not valid.";
                            }
                        }
                    } else{
                        // Display an error message if username doesn't exist
                        $GLOBALS["username_err"] = "No account found with that username.";
                    }
                } else{
                    echo "Oops! Something went wrong. Please try again later.";
                }
            }
            
            // Close statement
            $stmt->close();
        }
    }

    function change_password(){
        // Check input errors before inserting in database
        if(empty($GLOBALS["username_err"]) && empty($GLOBALS["password_err"]) && empty($GLOBALS["confirm_password_err"])){
            // Prepare an insert statement
            $sql = "UPDATE users SET pass = ? WHERE username = ?";
            $password_new1 = $_POST["newpassword"];
            if($stmt = $this->mysqli->prepare($sql)){
                // Bind variables to the prepared statement as parameters
                $stmt->bind_param( "ss", $password_new1, $GLOBALS["username"]);
                // Attempt to execute the prepared statement
                if($stmt->execute()){
                    // Redirect to login page
                    header("location: login.php");
                } else{
                    echo "Something went wrong. Please try again later.";
                }
            }
            
            // Close statement
            $stmt->close();
        }
    }
}

class ValidacionUsuarios
{
    function validate_registration($dao){ 
        // Validate username
        if(empty(trim($_POST["username"]))){
            $GLOBALS["username_err"] = "Please enter a username.";
        } else{
            // Prepare a select statement
            $sql = "SELECT username FROM users WHERE username = ?";
            
            if($stmt = $dao->mysqli->prepare($sql)){
                // Bind variables to the prepared statement as parameters
                $stmt->bind_param("s", $param_username);
                
                // Set parameters
                $param_username = trim($_POST["username"]);
                
                // Attempt to execute the prepared statement
                if($stmt->execute()){
                    /* store result */
                    $stmt->store_result();
                    if($stmt->num_rows == 1){
                        $GLOBALS["username_err"] = "This username is already taken.";
                    } else{
                        $GLOBALS["username"] = trim($_POST["username"]);
                    }
                } else{
                    echo "Oops! Something went wrong. Please try again later.";
                }
            }
            
            // Close statement
        $stmt->close();
        }
    }
    function validate_login($dao){
        // Check if username is empty
        if(empty(trim($_POST["username"]))){
            $GLOBALS["username_err"] = "Please enter username.";
        } else{
            $GLOBALS["username"] = trim($_POST["username"]);
        }
        
        // Check if password is empty
        if(empty(trim($_POST["password"]))){
            $GLOBALS["password_err"] = "Please enter your password.";
        } else{
            $GLOBALS["password"] = trim($_POST["password"]);
        }
        
    }

    function validate_password($dao){
        // Validate username
        if(empty(trim($_POST["username"]))){
            $GLOBALS["username_err"] = "Please enter a username.";
        } else{
            // Prepare a select statement
            $sql = "SELECT username, pass FROM users WHERE username = ? AND pass = ?";
            if($stmt = $dao->mysqli->prepare($sql)){
                // Bind variables to the prepared statement as parameters
                $stmt->bind_param("ss", $param_username,$GLOBALS["password_old"]);
                
                // Set parameters
                $param_username = trim($_POST["username"]);
                $GLOBALS["password_old"] = $_POST["oldpassword"];
                // Attempt to execute the prepared statement
                $result = $stmt->execute();
                if($result){
                    /* store result */
                    $stmt->store_result();
                    
                    if($stmt->num_rows() == 1){
                        if($_POST["newpassword"] === $_POST["oldpassword"]){
                            $GLOBALS["username_err"] = "New password can't be the same as the old password.";
                        }
                        elseif($_POST["newpassword"] !== $_POST["confirmpassword"]){
                            $GLOBALS["username_err"] = "New password doesn't match confirmed password.";
                        }
                        else{
                            $GLOBALS["username"] = $param_username;
                        }
            
                    } else{
                        $GLOBALS["username_err"] = "Wrong username or password";
                    }
                } else{
                    echo "Oops! Something went wrong. Please try again later.";
                }

            }
            // Close statement
            $stmt->close();
        }
    }
}

class ControllerUsuarios{
    public $dao;
    public $valid;
    function __construct(){
        $this->dao = new DAOUsuarios();
        $this->valid = new ValidacionUsuarios();
    }
    
    function validate_registration(){
        $this->valid->validate_registration($this->dao);
    }

    function validate_login(){
        $this->valid->validate_login($this->dao);
    }

    function validate_password(){
        $this->valid->validate_password($this->dao);
    }

    function register_user(){
        $this->dao->register_user();
    } 

    function login(){
        $this->dao->login();

    }
    function change_password(){
        $this->dao->change_password();
    }
    function close(){
        $this->dao->close();
    }
}


?>