const db = require('../db');
const { ipcMain } = require('electron')
async function buscarmateria() {

    const resultado = await db.query(`
        select materias.id as id, materias.nome as nome, materias.descricao as descricao, materias.idcurso as idcurso, cursos.id as cursoid, cursos.nome as cursonome from public.materias
        join public.cursos on cursos.id = materias.idcurso`)

    return resultado.rows;

}

async function deletarmateria(event, materiaId) {
    event = ''
    const resultado = await db.query('DELETE FROM materias WHERE id = $1', [materiaId]);
    return resultado.rows;

}
async function alterarmateria(event, materiaNome, materiaDescricao, materiaCursoId, materiaId) {
    event = ''
    const resultado2 = await db.query('UPDATE public.materias SET nome = $1, descricao = $2, idcurso = $3 WHERE id = $4', [materiaNome, materiaDescricao, materiaCursoId, materiaId]);
    return resultado2.rows;

}
async function salvarmateria(event, materiaNome, materiaDescricao, materiaCursoId) {
    event = ''
    const resultado = await db.query('INSERT INTO public.materias(nome, descricao, idcurso)VALUES ($1, $2, $3);', [materiaNome, materiaDescricao, materiaCursoId]);
    return resultado.rows;
}



module.exports = {
    buscarmateria,
    deletarmateria,
    alterarmateria,
    salvarmateria,

}