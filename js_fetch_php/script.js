function Ajax(params) {
    this.params = params || {};
    this.respons = {};

    this.joinParams();
    this.bindEvend();
}

Ajax.prototype = {

    joinParams: function () {
        let defaultParams = {
            url: '/rest_bitrix/action.php'
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

    processAjax(){

        fetch(this.params.url,{
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: 'action=write'

        })
            .then((res) => {
                this.respons = res;
                if(res.ok === true) {
                    return res.json();
                } else {
                    throw new Error("Ошибка сети");                  
                }
            })
            
    }

    bindEvend: function(){
        document.querySelector('.js-action.write').addEventListener('click', this.writeTable.bind(this))
    },
    
    writeTable: function(e){
        let btn = e.target;

        if(btn.classList.value.search(/waiting/gi) >= 0) {
            return false;
        }

        if(btn.classList.value.search(/warning/gi) >= 0){
            if(!confirm("снова выполнить запись ? - google банит за спам")) {
                return false;
            } 
        }

        let nodeResult = btn.closest('.control').querySelector('.result'),
        text = btn.innerHTML;
        
        btn.innerHTML = "Идет операция...";
        btn.classList.add('waiting');  
        
        let response = fetch(this.params.url,{
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: 'action=write'

        })
            .then((res) => {
                this.respons = res;
                if(res.ok === true) {
                    return res.json();
                } else {
                    throw new Error("Ошибка сети");                  
                }
            })
            .then(json => {
                if(typeof(json) == 'object' && !this.isEmpty(json) && json.status == 'ok') {
                    btn.innerHTML = text;
                    nodeResult.classList.add('success');
                    btn.classList.add('warning');
                    nodeResult.innerHTML = json.text;
                    btn.classList.remove('waiting');
                } else {
                    btn.innerHTML = text;
                    nodeResult.classList.add('bad');
                    nodeResult.innerHTML = 'что то пошло не так... (json)';
                    console.log(json)       
                }
            })
            .catch((error) => {
                btn.innerHTML = text;
                nodeResult.classList.add('bad');
                nodeResult.innerHTML = 'что то пошло не так...';
                alert(
                    error +'\n'
                    + 'status code: ' + this.respons.status + "\n"
                    + 'url: ' + this.respons.url
                ) 
            })        

    }
}   

var ajax = new Ajax();