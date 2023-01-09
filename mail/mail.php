<?php

$to_email = "yuvraj@revamph.co.in";
$subject = "Hello";
$body = "Hi here i am";
$headers = "From: yuvrajgrover6@gmail.com"

if(mail($to_email,$subject,$body,$headers)){
    echo "email succyes";

}else{
    echo "error";
}



?>