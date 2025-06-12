

const paragrafo = document.getElementById('teste');
const tabelaPaciente = document.getElementById('pacienteTableDados');
const modalNomePaciente = document.getElementById('paciente-nome');
const modalNascimentoPaciente = document.getElementById('paciente-matricula');
const modalIDPaciente = document.getElementById('paciente-id');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoAlterar = document.getElementById('btn-salvar');
const botaoLimpar = document.getElementById('btn-limpar');

//botao salvar ou adicionar
botaoAlterar.addEventListener('click', adionarAlterarPaciente)


//botao excluir
botaoExcluir.addEventListener('click', excluirPaciente)

//botao limpar
botaoLimpar.addEventListener('click', limpar)

function mostrarDetalhes(nome, nascimento, id) {
    modalIDPaciente.value = id;
    modalNascimentoPaciente.value = nascimento;
    modalNomePaciente.value = nome;
}

function limpar() {
    modalIDPaciente.value = ""
    modalNomePaciente.value = ""
    modalNomePaciente.value = ""
}



function adionarAlterarPaciente() {
    if (modalIDPaciente.value != '') {
        alterarPaciente()
    }
    else {
        adicionarPaciente()
    }
}

async function alterarPaciente() {
    await window.BancoDadosAPI.alterarPaciente(modalIDPaciente.value, modalNomePaciente.value, modalNascimentoPaciente.value)
    carregarPasciente()
    modalIDPaciente.value = ""
    modalNascimentoPaciente.value = ""
    modalNomePaciente.value = ""
}


async function adicionarPaciente() {
    await window.BancoDadosAPI.adicionarPaciente(modalNomePaciente.value, modalNascimentoPaciente.value)
    carregarAlunos()
    modalIDPaciente.value = ""
    modalNascimentoPaciente.value = ""
    modalNomePaciente.value = ""
}


async function excluirPaciente() {
    const id = modalIDPaciente.value;
    console.log("vou deletar o id ", id);

    await window.BancoDadosAPI.excluirPaciente(id);

    //após deleção atualiza a lista de pacientes
    carregarAlunos();

    modalIDPaciente.value = ""
    modalNascimentoPaciente.value = ""
    modalNomePaciente.value = ""
}


async function carregarPasciente() {


    const listaPaciente = await window.BancoDadosAPI.buscarPaciente();
    tabelaPaciente.innerHTML = "";

    
    listaPaciente.forEach(criarLinhaPaciente)

    if (!listaPaciente.length > 0) {

        tabelaPaciente.textContent = "sem dados"
    }

    lucide.createIcons(); // renderiza os ícones do Lucide

}

function criarLinhaPaciente(paciente) {
    //paragrafo.textContent = paragrafo.textContent + paciente.nome

    //linha 
    const linha = document.createElement("tr");

    //nome
    const celulaNome = document.createElement("td");
    celulaNome.textContent = paciente.nome;
    linha.appendChild(celulaNome);

    //matricula
    const celulaNascimento = document.createElement("td");
    celulaNascimento.textContent = paciente.nascimento;
    linha.appendChild(celulaNascimento);
   

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(paciente.nome, paciente.nascimento, paciente.id) }
    );
    botao.textContent = '';
    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);
    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    

    //final adiciono a linha criada com nascimento,nome e botao à tabela
    tabelaPaciente.appendChild(linha);


}

carregarPasciente()