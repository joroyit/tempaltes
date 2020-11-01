<?

class Basket
{

    public $test_pub = 1;
    private $test3_prv = 1;

    public function getBasketFast($date)
    {
        #code...
        if(1) {
            $this->respons($date, true);
        }
    }

    private function respons($msg, $type = false) 
    {
        header('Content-type: application/json');
        if($type) {
            echo json_encode(['status' => 'ok', 'msg' => $msg]);
        } else {
            echo json_encode(['status' => 'error', 'msg' => $msg]);
        }
    }
    
}
