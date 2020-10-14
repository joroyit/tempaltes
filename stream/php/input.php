<?
$inputText = file_get_contents('php://input');
$temp_file_name =  __DIR__.'/'.mktime().'.txt';
file_put_contents($temp_file_name,$inputText);