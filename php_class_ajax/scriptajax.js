function Ajax(params) {
    this.param = params || {};

    this.joinParams();
}

Ajax.prototype = {

    joinParams() {
        defaultParams = {
            'url': '/php_class_ajax/class/controller.php'
        }

        if(this.isEmpty(this.params)) {
            this.param = defaultParams;
        } else {
            for (let i in defaultParams) {
                if(!this.param[i]) {
                    this.param[i] = defaultParams[i];
                }
            }
        }
    },

    isEmpty(obj) {
        for (let key in obj) {
            return false;
        }
        return true;
    },

    send(date) {
        fetch(this.param.url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(date)
        })
    },

}