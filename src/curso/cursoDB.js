const db = require('../db');
const { ipcMain } = require('electron')
async function buscarcurso() {

    const resultado = await db.query('SELECT * FROM cursos order by id')

    return resultado.rows;

}

async function deletarcurso(event,cursoId){    
    const resultado = await db.query('DELETE FROM cursos WHERE id = $1',[cursoId]);
    return resultado.rows;

}
async function alterarcurso(event, cursoNome, cursoDescricao, cursoId) {
    event =''
    const resultado2 = await db.query('UPDATE public.cursos SET nome = $1, descricao = $2 WHERE id = $3', [cursoNome, cursoDescricao, cursoId]);
    return resultado2.rows;

}
async function salvarcurso(event,cursoNome, cursoDescricao){
    event = ''
    const resultado = await db.query('INSERT INTO public.cursos(nome, descricao)VALUES ($1, $2);', [cursoNome, cursoDescricao]);
    return resultado.rows;
}




module.exports = {
    buscarcurso,
    deletarcurso,
    alterarcurso,
    salvarcurso,
}