const { BrowserWindow } = require('electron')
const path = require('path');
const { getJanelaPrincipal } = require('./janelaPrincipal');

function criarJanelaModal(telaPai,arquivohtml) {
    const janela = new BrowserWindow({
        width: 800,
        height: 600,

        modal:true,
        parent: telaPai,

        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    janela.loadFile(arquivohtml);

    return janela;
};
function modalAbrirProfessor(){
    let mainWindow= getJanelaPrincipal();
    if (mainWindow){
        criarJanelaModal(mainWindow, './src/professor/prof.html')
    }
    else{
        console.warn("Não foi possivel abrir a modal : Janela Principal")
    }
}
function modalAbrirAluno(){
    let mainWindow= getJanelaPrincipal();
    if (mainWindow){
        criarJanelaModal(mainWindow, './src/aluno/aluno.html')
    }
    else{
        console.warn("Não foi possivel abrir a modal : Janela Principal")
    }
}
function modalAbrirCurso(){
    let mainWindow= getJanelaPrincipal();
    if (mainWindow){
        criarJanelaModal(mainWindow, './src/curso/curso.html')
    }
    else{
        console.warn("Não foi possivel abrir a modal : Janela Principal")
    }
}
function modalAbrirMateria(){
    let mainWindow= getJanelaPrincipal();
    if (mainWindow){
        criarJanelaModal(mainWindow, './src/materia/materia.html')
    }
    else{
        console.warn("Não foi possivel abrir a modal : Janela Principal")
    }
}
function modalAbrirNota(){
     let mainWindow= getJanelaPrincipal();
    if (mainWindow){
        criarJanelaModal(mainWindow, './src/notas/nota.html')
    }
    else{
        console.warn("Não foi possivel abrir a modal : Janela Principal")
    }
}

module.exports={
    criarJanelaModal,
    modalAbrirProfessor,
    modalAbrirAluno,
    modalAbrirCurso,
    modalAbrirMateria,
    modalAbrirNota  
}