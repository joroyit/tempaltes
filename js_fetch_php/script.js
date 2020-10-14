function Ajax(params) {
    this.params = params || {};
    this.respons = {};

    this.joinParams();
    this.bindEvend();
}

Ajax.prototype = {

    joinParams: function () {
        let defaultParams = {
            url: '/js_fetch_php/process.php'
        }

        if(this.isEmpty(this.params)){
            this.params = defaultParams;
        }else{
            for(let i in defaultParams){
                if(!this.params[i]){
                    this.params[i] = defaultParams[i];
                }
            }
        }
    },

    isEmpty: function(obj) {
        for (let key in obj) {
            return false;
        }
        return true;
    },

    processAjax(body, url = this.params.url){
        return fetch(url,{
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: body
        })
            .then((res) => {
                this.respons = res;
                if(res.ok === true) {
                    return res.json();
                } else {
                    throw new Error("Ошибка сети");                  
                }
            })        
    },

    bindEvend: function(){
        document.querySelector('.js-tab.get').addEventListener('click', this.getTable.bind(this))
    },
    
    getTable: function(e){
        let btn = e.target;

        if(btn.classList.value.search(/waiting/gi) >= 0) {
            return false;
        }

        let nodeResult = btn.closest('.xxx').querySelector('.result'),
        btnText = btn.innerHTML;
        
        btn.innerHTML = "Идет операция...";
        btn.classList.add('waiting');  
        
        let response = this.processAjax('action=get',)
            .then((json) => {
                if(typeof(json) == 'object' && !this.isEmpty(json) && json.status == 'ok') {
                    this.outTableDate(json,nodeResult);
                    btn.innerHTML = btnText;
                    btn.classList.remove('waiting');
                } else {
                    btn.innerHTML = "Пустой... json";
                    console.log(this.respons);
                    console.log(json);
                }

            })
            .catch((error) => {
                btn.innerHTML = "Ошибка...";
                console.log(this.respons);
                console.log(error);
                
            })
            
    },

    outTableDate (json, node) {
        console.log(json);
        console.log(node);
    }


}   

var ajax = new Ajax();