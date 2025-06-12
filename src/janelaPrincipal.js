const path = require('path')
const { BrowserWindow } = require('electron')

let janelaPrincipal

function createMainWindow() {
    janelaPrincipal = new BrowserWindow({
        width: 700,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    janelaPrincipal.loadFile('src/index.html')

    janelaPrincipal.on('closed', () => {
        janelaPrincipal = null
    })

    return janelaPrincipal
}

function getJanelaPrincipal() {
    return janelaPrincipal
}

module.exports = {
    createMainWindow,
    getJanelaPrincipal
}