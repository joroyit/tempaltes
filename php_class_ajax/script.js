document.querySelector('.js-tab.get').addEventListener('click', () => {

    VLEAjax.send({
            action:'VLE\\Main\\Basket\\getBasketFast',
            idProduct:2,
            count:10
        }
    );

})