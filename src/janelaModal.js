const path = require('path')
const { BrowserWindow } = require('electron')
const { getJanelaPrincipal } = require('./janelaPrincipal')



function criarJanelaModal(telaPai, arquivohtml) {
    const janela = new BrowserWindow({
        width: 800,
        height: 600,

        modal: true,
        parent: telaPai,

        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }

    })

    janela.loadFile(arquivohtml)

    return janela
}

function modalAbrirPaciente(event) {
    let mainWindow = getJanelaPrincipal()
    if (mainWindow) {
        criarJanelaModal(mainWindow, './src/paciente/paciente.html')
    }
    else {
        console.warn('Janela modal não encontrada.')
    }
}

module.exports = { criarJanelaModal, modalAbrirPaciente}