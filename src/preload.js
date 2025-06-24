const { contextBridge, ipcRenderer } = require('electron')
//--------------------------------------------------//   
function buscarAlunos() {
    return ipcRenderer.invoke('buscar-alunos');
}
function excluirAlunos(pID) {
    return ipcRenderer.invoke('deletar-alunos', pID);
}
function alterarAluno(pNome, pMatricula, pID) {
    return ipcRenderer.invoke('alterar-aluno', pNome, pMatricula, pID);
}
function salvarAluno(alunoNome, alunoMatricula) {
    return ipcRenderer.invoke('salvar-aluno', alunoNome, alunoMatricula)
}
//--------------------------------------------------//   
function buscarProf() {
    return ipcRenderer.invoke('buscar-prof');
}
function excluirProf(profID) {
    return ipcRenderer.invoke('deletar-prof', profID);
}
function alterarProf(profNome, profMatricula, profID) {
    return ipcRenderer.invoke('alterar-prof', profNome, profMatricula, profID);
}
function salvarProf(profNome, profMatricula) {
    return ipcRenderer.invoke('salvar-prof', profNome, profMatricula)
}
//--------------------------------------------------//   
function buscarCurso() {
    return ipcRenderer.invoke('buscar-curso');
}
function excluirCurso(cursoID) {
    return ipcRenderer.invoke('deletar-curso', cursoID);
}
function alterarCurso(cursoNome, cursoDescricao, cursoID) {
    return ipcRenderer.invoke('alterar-curso', cursoNome, cursoDescricao, cursoID);
}
function salvarCurso(cursoNome, cursoDescricao) {
    return ipcRenderer.invoke('salvar-curso', cursoNome, cursoDescricao)
}
//--------------------------------------------------//   
function buscarMateria() {
    return ipcRenderer.invoke('buscar-materia');
}
function excluirMateria(materiaID) {
    return ipcRenderer.invoke('deletar-materia', materiaID);
}
function alterarMateria(materiaNome, materiaDescricao,materiaCursoId, materiaID) {
    return ipcRenderer.invoke('alterar-materia', materiaNome, materiaDescricao, materiaCursoId, materiaID);
}
function salvarMateria(materiaNome, materiaDescricao, materiaCursoId) {
    return ipcRenderer.invoke('salvar-materia', materiaNome, materiaDescricao, materiaCursoId)
}
//--------------------------------------------------//   
function buscarNota() {
    return ipcRenderer.invoke('buscar-nota');
}
function filtrarNota(filtro){
    return ipcRenderer.invoke('filtrar-nota', filtro)
}
function excluirNota(notaID) {
    return ipcRenderer.invoke('deletar-nota', notaID);
}
function alterarNota(notaAlunoId, notaProfId,  notaMateriaId, avaliacao ,notaId) {
    return ipcRenderer.invoke('alterar-nota', notaAlunoId, notaProfId,  notaMateriaId, avaliacao ,notaId);
}
function salvarNota(notaProfId, notaAlunoId, notaMateriaId, notaAvaliacao) {
    return ipcRenderer.invoke('salvar-nota', notaProfId, notaAlunoId, notaMateriaId, notaAvaliacao)
}
//--------------------------------------------------//   

function validarLogin(usuario, senha){
    return ipcRenderer.invoke('validar-login', usuario, senha);
}

contextBridge.exposeInMainWorld('senacAPI',

    {
//--------------------------------------------------//        
        buscarAlunos: buscarAlunos,
        excluirAlunos: excluirAlunos,
        alterarAluno: alterarAluno,
        salvarAluno: salvarAluno,
//--------------------------------------------------//
        buscarProf: buscarProf,
        excluirProf: excluirProf,
        alterarProf: alterarProf,
        salvarProf: salvarProf,
//--------------------------------------------------//
        buscarCurso: buscarCurso,
        excluirCurso: excluirCurso,
        alterarCurso: alterarCurso,
        salvarCurso: salvarCurso,
//--------------------------------------------------//        
        buscarMateria: buscarMateria,
        excluirMateria: excluirMateria,
        alterarMateria: alterarMateria,
        salvarMateria: salvarMateria,
//--------------------------------------------------//        
        buscarNota:buscarNota,
        filtrarNota: filtrarNota,
        excluirNota:excluirNota,
        alterarNota: alterarNota,
        salvarNota:salvarNota,
//--------------------------------------------------//     
        validarLogin
    }


)
function abrirAluno(){
    ipcRenderer.send('abrir-aluno')
}
function abrirProfessor(){
    ipcRenderer.send('abrir-professor')
}
function abrirCurso(){
    ipcRenderer.send('abrir-curso')
}
function abrirMateria(){
    ipcRenderer.send('abrir-materia')
}
function abrirNota(){
    ipcRenderer.send('abrir-nota')
    
}
console.log("ola pessoAL")
function abrirJanelaPrincipal(){
  ipcRenderer.send('abrir-menu')
}

contextBridge.exposeInMainWorld('janelaAPI',
    {
        abrirAluno,
        abrirProfessor,
        abrirCurso,
        abrirMateria,
        abrirNota,
        abrirJanelaPrincipal
    }
)