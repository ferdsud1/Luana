const db = require('../db');
const { ipcMain } = require('electron')

async function buscarprof() {

    const resultado = await db.query('SELECT * FROM professores order by id')

    return resultado.rows;

}

async function deletarprof(event,profId){    
    event =''
    const resultado = await db.query('DELETE FROM professores WHERE ID = $1',[profId]);
    return resultado.rows;

}
async function alterarprof(event, profNome, profCpf, profId) {
    event =''
    const resultado2 = await db.query('UPDATE public.professores SET nome = $1, cpf = $2 WHERE id = $3', [profNome, profCpf, profId]);
    return resultado2.rows;

}
async function salvarprof(event,profNome, profCpf){
    event = ''
    const resultado = await db.query('INSERT INTO public.professores(nome, cpf)VALUES ($1, $2);', [profNome, profCpf]);
    return resultado.rows;
}




module.exports = {
    buscarprof,
    deletarprof,
    alterarprof,
    salvarprof,
}