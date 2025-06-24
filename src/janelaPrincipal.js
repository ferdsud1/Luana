const { BrowserWindow } = require('electron')
const path = require('path')

let janelaPrincipal;
let janelaLogin;

function createMainWindow() {
    janelaPrincipal = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    janelaPrincipal.loadFile('./src/index.html');
    janelaPrincipal.on('closed', () => {
        janelaPrincipal = null
    })

    letLogin2 = getJanelaLogin
    janelaLogin2.close();
    return janelaPrincipal;
}

function getJanelaPrincipal() {
    return janelaPrincipal
}

function createLoginWindow() {
    janelaLogin = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }

    });
    janelaLogin.loadFile('./src/login/login.html');
}

function getJanelaLogin() {
    return janelaLogin;
}

module.exports = {
    getJanelaPrincipal,
    getJanelaLogin,
    createMainWindow,
    createLoginWindow
}