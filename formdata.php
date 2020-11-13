<?php
// print_r($_POST);die;
require("src/PHPMailer.php");
require("src/SMTP.php");
if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['tel'])&&$_POST['tel']!="")){

    $email = $_POST['email'];
    $name = $_POST['name'];
    $phone = $_POST['tel'];
    $form_name = $_POST['form-name'];
    $source = $_POST['come_fr'];
    $region = $_POST['country'];

    $mail = new PHPMailer\PHPMailer\PHPMailer(true);                              // Passing `true` enables exceptions
    try {
        
        //Server settings
        $mail->SMTPDebug = 1;                                 // Enable verbose debug output
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'myotpravitel@gmail.com';                 // SMTP username
        $mail->Password = 'myotpravitel2018';                           // SMTP password
        $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465;                                    // TCP port to connect to
        $mail->CharSet = 'UTF-8';

        //Recipients
        $mail->setFrom('myotpravitel@gmail.com', 'Форма');
        $mail->AddAddress('zakaz@gok5.ru', 'Jkjk');
        //$mail->AddAddress('xjoha@mail.ru', 'Jkjk');

           // Add a recipient
        
        //Content
        $mail->isHTML(true);                                  // Set email format to HTML
        

             $mail->Subject = 'Форма - ' . $form_name;
             $mail->Body    = '<h3> Форма : ' . $form_name . '<h3>' .
                              '<h3> Email : ' . $email . '<h3>' .
                              '<h3> Телефон : ' . $phone . '<h3>' . 
                              '<h3> Имя : ' . $name . '<h3>' . 
                              '<h3> Источник : ' . $source . '<h3>' . 
                              '<h3> Регион  : ' . $region . '<h3>';
        
       

        $mail->send();
        
        // return 'success';
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }
}

