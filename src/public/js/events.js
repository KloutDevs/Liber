let { ipcRenderer } = require('electron');
let logInbtn = document.querySelector('.logInBtn');


logInbtn.onclick = async function(){
    
    ipcRenderer.invoke('login');
    console.log('boe')
    let data = {
        account: document.login.account.value,
        clave: document.login.clave.value
    }
    ipcRenderer.invoke('verifyLogin', {
        account: document.login.account.value,
        clave: document.login.clave.value
    });

    //let verifyLogin = ipcRenderer.invoke('verifyLogin', data);
    if(verifyLogin == true){
        ipcRenderer.invoke('login');
    }else if(verifyLogin == 20){
        
    }else if(verifyLogin == 10){

    }
};
