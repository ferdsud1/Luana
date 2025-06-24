const db = require('../db');
const { ipcMain } = require('electron')
async function buscarnota() {
    const resultado = await db.query(`
        SELECT 
            notas.id as id,
            alunos.id as aluno_id,
            alunos.nome as aluno,
            professores.id as professor_id,
            professores.nome as professor,
            materias.id as materia_id,
            materias.nome as materia,
            notas.avaliacao
        FROM notas 
        JOIN professores ON professores.id = notas.id_professor 
        JOIN alunos ON alunos.id = notas.id_aluno 
        JOIN materias ON materias.id = notas.id_materia
    `);
    return resultado.rows;
}
async function filtrarnota(event,filtro) {
  event =''  
  const resultado = await db.query(`
        SELECT 
            notas.id as id,
            alunos.id as aluno_id,
            alunos.nome as aluno,
            professores.id as professor_id,
            professores.nome as professor,
            materias.id as materia_id,
            materias.nome as materia,
            notas.avaliacao
        FROM notas 
        JOIN professores ON professores.id = notas.id_professor 
        JOIN alunos ON alunos.id = notas.id_aluno 
        JOIN materias ON materias.id = notas.id_materia
        where notas.id_materia = $1`, [filtro]
    );
    return resultado.rows;
}


async function deletarnota(event,notaId){  
    event = ''  
    const resultado = await db.query('DELETE FROM notas WHERE id = $1',[notaId]);
    return resultado.rows;

}
async function alterarnota(event,notaProfId, notaAlunoId, notaMateriaId, avaliacao ,notaId) {
    event = '';
    const resultado2 = await db.query(
      `UPDATE public.notas 
       SET id_professor = $1, id_aluno = $2, id_materia = $3, avaliacao=$4
       WHERE id = $5`,
      [notaProfId, notaAlunoId, notaMateriaId, avaliacao, notaId]
    );
    return resultado2.rows;
  }
  
async function salvarnota(event, notaProfId, notaAlunoId, notaMateriaId, notaAvaliacao) {
    event = '';
    const resultado = await db.query(
      `INSERT INTO public.notas (id_professor, id_aluno, id_materia, avaliacao)
       VALUES ($1, $2, $3, $4) RETURNING *;`,
      [notaProfId, notaAlunoId, notaMateriaId, notaAvaliacao]
    );
    return resultado.rows;
  }


module.exports = {
    buscarnota,
    filtrarnota,
    deletarnota,
    alterarnota,
    salvarnota,
    
}