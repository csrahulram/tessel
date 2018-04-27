(function(){
    var btn;
    document.body.onload = function(){
        btn = document.getElementById('tessel_btn');
        btn.addEventListener('click', toggle);
    };

    var state = 0;
    var http = new XMLHttpRequest();
    function toggle(){
        if(state == 0){
            state = 1;
            btn.classList.add('red');
        } else {
            state = 0;
            btn.classList.remove('red');
        }

        sendData(state);
    }

    function sendData(data){
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                console.log('Success');
            }
        }

        http.open('POST', '/toggle');
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        


        http.send(JSON.stringify({'data':data}));
    }
}())