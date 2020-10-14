<?
// + - что то взяли, что то собрали.

if($_POST['action'] == 'get') { 
    $arr = [
        'cont' => '2',
        'title' => 'item'
    ];
   
    $arResult = [
        'result' => $arr,
        'text' => 'success',
        'status' => 'ok'
    ];

    echo json_encode($arResult);
} else {
    $arResult = [
        'result' => [],
        'text' => 'method not found',
        'status' => 'error'
    ];
    echo json_encode($arResult);

}

