const { buscarPaciente, deletarPaciente, alterarPaciente, adicionarPaciente } = require('./paciente/pacienteDB')
const { ipcMain } = require('electron')
const { modalAbrirPaciente} = require('./janelaModal')


function registrarPacienteHandler() {
    ipcMain.handle('buscar-paciente', buscarPaciente)
    ipcMain.handle('deletar-professor', deletarPaciente)
    ipcMain.handle('alterar-professor', alterarPaciente)
    ipcMain.handle('adicionar-paciente', adicionarPaciente)
}



function registrarJanelas() {
    ipcMain.on('abrir-paciente', modalAbrirPaciente)
 
}



function registrarListeners() {
    registrarPacienteHandler()
    registrarJanelas()
 
}

module.exports = {
    registrarListeners
}