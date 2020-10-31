<?

class Basket
{

    public $test_pub = 1;
    private $test3_prv = 1;

    public function getBasketFast($date)
    {
        #code...
        if(1) {
            $this->respons($date);
        }
    }

    private function respons($msg) 
    {
        header('Content-type: application/json');
        echo json_encode(['status' => 'error', 'msg' => $msg]);
    }
    
}
