<?
// + - что то взяли, что то собрали.

$arr = [
    'cont' => '2',
    'title' => 'item'
];

if(1) {
    $arResult = [
        'result' => $arr,
        'text' => 'success',
        'status' => 'ok'
    ];

    echo json_encode($arResult);
} else {
    $arResult = [
        'result' => [],
        'text' => 'mrthod not found',
        'status' => 'error'
    ]
    echo json_encode($arResult);

}

