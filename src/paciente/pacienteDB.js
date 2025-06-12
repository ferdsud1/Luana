const db = require('../db')

async function buscarPaciente() {
    const resultado = await db.query('SELECT * FROM clinica.paciente order by id')
    return resultado.rows;

}

async function deletarPaciente(event,id){    
    const resultado = await db.query('DELETE FROM clinica.paciente WHERE ID = $1',[id]);
    return resultado.rows;

}

async function alterarPaciente(event, id, nome, nascimento) {
    const resultado = await db.query('UPDATE  clinica.paciente SET nome = $1, data_nascimento = $2 WHERE id = $3', [nome, nascimento, id])
    return resultado.rows
}

async function adicionarPaciente(event, nome, nascimento){
    const resultado = await db.query('INSERT INTO clinica.paciente (nome, data_nascimento) VALUES ($1, $2)', [nome, nascimento])
    return resultado.rows
}

module.exports = {
    buscarPaciente,
    deletarPaciente,
    alterarPaciente,
    adicionarPaciente
}