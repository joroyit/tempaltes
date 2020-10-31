<?
require_once(__DIR__.'/../lib/Controller.php');
$ledata = json_decode(file_get_contents('php://input'),true);
// echo '<pre>'; var_dump($ledata); echo '</pre>';

new Controller($ledata);