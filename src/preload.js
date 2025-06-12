const { contextBridge, ipcRenderer } = require('electron')

function buscarPaciente() {
    return ipcRenderer.invoke('buscar-paciente');
}

function excluirPaciente(id) {
    return ipcRenderer.invoke('deletar-paciente', id);
}

function alterarPaciente(id, nome, nascimento) {
    return ipcRenderer.invoke('alterar-paciente', id, nome, nascimento);
}


function adicionarPaciente(nome, nascimento) {
    return ipcRenderer.invoke('adicionar-paciente', nome, nascimento)
}


contextBridge.exposeInMainWorld('BancoDadosAPI',

    {
        buscarPaciente: buscarPaciente,
        excluirPaciente: excluirPaciente,
        alterarPaciente: alterarPaciente,
        adicionarPaciente: adicionarPaciente
      
    }
)

function abrirPaciente() {
    ipcRenderer.send('abrir-paciente');
}

contextBridge.exposeInMainWorld('janelaAPI', {
    abrirPaciente: abrirPaciente
 
}
)
