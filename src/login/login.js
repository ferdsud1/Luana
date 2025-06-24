const login = document.getElementById('login');
const senha = document.getElementById('senha');
const btn_acessar = document.getElementById('acessar');
const msg = document.getElementById('msg');

btn_acessar.addEventListener('click', validarLogin)


async function validarLogin() {

    const retorno = await window.senacAPI.validarLogin(login.value, senha.value);
    if (retorno) {
        msg.textContent = "deu bom";
        msg.style.color = 'green';
        await window.JanelaAPI.abrirJanelaPrincipal();
    }
    else {

        msg.textContent = "deu erro";
        msg.style.color = 'red';
    }

}