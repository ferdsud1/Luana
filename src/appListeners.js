const { ipcMain } = require('electron')
const {
    buscarprof,
    deletarprof,
    alterarprof,
    salvarprof,
} = require('./professor/profDB')
const {
    buscarAlunos,
    deletarAluno,
    alterarAluno,
    salvarAluno,
} = require('./aluno/alunoDB');
const {
    buscarcurso,
    deletarcurso,
    alterarcurso,
    salvarcurso,
} = require('./curso/cursoDB')
const {
    buscarmateria,
    deletarmateria,
    alterarmateria,
    salvarmateria,
} = require('./materia/materiaDB')
const { modalAbrirProfessor } = require('./janelaModal');
const { modalAbrirAluno } = require('./janelaModal')
const { modalAbrirCurso } = require('./janelaModal')
const { modalAbrirMateria } = require('./janelaModal');
const {modalAbrirNota } = require ('./janelaModal')
const { buscarnota,
    filtrarnota,
    deletarnota,
    alterarnota,
    salvarnota
} = require('./notas/notaDB');

const {validarLogin} = require('./login/loginDB');
const { createMainWindow } = require('./janelaPrincipal');


function registrarLoginHandler(){
    ipcMain.handle('validar-login',validarLogin);
}


function registrarAlunoHandler() {
    ipcMain.handle('buscar-alunos', buscarAlunos);
    ipcMain.handle('deletar-alunos', deletarAluno);
    ipcMain.handle('alterar-aluno', alterarAluno)
    ipcMain.handle('salvar-aluno', salvarAluno)
}

function registrarProfHandler() {
    ipcMain.handle('buscar-prof', buscarprof);
    ipcMain.handle('deletar-prof', deletarprof);
    ipcMain.handle('alterar-prof', alterarprof)
    ipcMain.handle('salvar-prof', salvarprof)
}
function registrarCursoHandler() {
    ipcMain.handle('buscar-curso', buscarcurso)
    ipcMain.handle('deletar-curso', deletarcurso)
    ipcMain.handle('alterar-curso', alterarcurso)
    ipcMain.handle('salvar-curso', salvarcurso)
}
function registrarMateriaHandler() {
    ipcMain.handle('buscar-materia', buscarmateria)
    ipcMain.handle('deletar-materia', deletarmateria)
    ipcMain.handle('alterar-materia', alterarmateria)
    ipcMain.handle('salvar-materia', salvarmateria)

}
function registrarNotaHandler() {
    ipcMain.handle('buscar-nota', buscarnota)
    ipcMain.handle('deletar-nota', deletarnota)
    ipcMain.handle('alterar-nota', alterarnota)
    ipcMain.handle('salvar-nota', salvarnota)
    ipcMain.handle('filtrar-nota', filtrarnota)

}
function registrarJanelas() {
    ipcMain.on('abrir-aluno', modalAbrirAluno)
    ipcMain.on('abrir-professor', modalAbrirProfessor)
    ipcMain.on('abrir-curso', modalAbrirCurso)
    ipcMain.on('abrir-materia', modalAbrirMateria)
    ipcMain.on('abrir-nota',modalAbrirNota)
    ipcMain.on('abrir-menu',createMainWindow)

}
function registrarListeners() {
        registrarLoginHandler(),
        registrarCursoHandler(),
        registrarAlunoHandler(),
        registrarProfHandler(),
        registrarJanelas(),
        registrarMateriaHandler(),
        registrarNotaHandler()
}
module.exports = {
    registrarListeners
}