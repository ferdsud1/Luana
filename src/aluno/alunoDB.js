const db = require('../db');
const { ipcMain } = require('electron')

async function buscarAlunos() {

    const resultado = await db.query('SELECT * FROM alunos order by id')

    return resultado.rows;

}

async function deletarAluno(event,pId){    
    event =''
    const resultado = await db.query('DELETE FROM alunos WHERE ID = $1',[pId]);
    return resultado.rows;

}
async function alterarAluno(event, pNome, pMatricula, pId) {
    event =''
    const resultado2 = await db.query('UPDATE public.alunos SET nome = $1, matricula = $2 WHERE id = $3', [pNome, pMatricula, pId]);
    return resultado2.rows;

}
async function salvarAluno(event,alunoNome, alunoMatricula){
    event = ''
    const resultado = await db.query('INSERT INTO public.alunos(nome, matricula)VALUES ($1, $2);', [alunoNome, alunoMatricula]);
    return resultado.rows;
}




module.exports = {
   buscarAlunos,
   deletarAluno,
   alterarAluno,
   salvarAluno,
}