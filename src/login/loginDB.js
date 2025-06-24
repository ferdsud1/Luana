const db = require('../db');

async function validarLogin(event,login,senha){

    const resultado = await db.query('select * from usuarios where login = $1 and senha = $2 ',[login,senha])

    if(resultado.rows.length > 0 ){
        return resultado
    }

    return false
}

module.exports = {
    validarLogin
}