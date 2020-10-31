<?
require_once(__DIR__.'/Basket.php');

class Controller
{
    private $arrSend = [];
    
    public function __construct($data)
    {
        $this->assembleSend($data);        
        $this->check($data['action']);
    }

    private function check($action)
    {
        $names = explode('\\', $action);
        $class = $names[2];
        $method = $names[3];

        try {
            if(!class_exists($class)) {
                throw new Exception("class no exist");
            }
            
            $obj = new $class();
            if(!method_exists($obj, $method)) {
                throw new Exception("method in class no exist");
            }

            $obj->$method($this->arrSend);

        } catch (\Throwable $th) {
            $this->respons($th->getMessage());
        }
        
    }

    private function respons($msg) 
    {
        header('Content-type: application/json');
        echo json_encode(['status' => 'error', 'msg' => $msg]);
    }

    private function assembleSend($date)
    {
        foreach ($date as $key => $value) {
            if($key == 'action') {
                continue;
            }
            $this->arrSend[$key] = $value;
        }
    }
    
}
