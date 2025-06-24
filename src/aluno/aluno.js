

const paragrafo = document.getElementById('teste');
const tabelaAluno = document.getElementById('alunosTableDados');
const modalNomeAluno = document.getElementById('aluno-nome');
const modalMatriculaAluno = document.getElementById('aluno-matricula');
const modalIDAluno = document.getElementById('aluno-id');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoIncluir = document.getElementById('btn-incluir');
botaoIncluir.addEventListener('click', limparDados)
botaoSalvar.addEventListener('click', funcaoSalvar)
botaoExcluir.addEventListener('click', excluirAluno)




function mostrarDetalhes(nome, matricula, id) {
    modalIDAluno.value = id;
    modalMatriculaAluno.value = matricula;
    modalNomeAluno.value = nome;
}
function limparDados() {
    mostrarDetalhes('', '', '')

}
async function funcaoSalvar() {
    alunoNome = modalNomeAluno.value
    alunoMatricula = modalMatriculaAluno.value
    if (modalIDAluno.value === '') {
        if (alunoNome === '' || alunoMatricula === '') {
            return
        }
        await window.senacAPI.salvarAluno(alunoNome, alunoMatricula)
        carregarAlunos();
        mostrarDetalhes('', '', '')
        return
    }
    else {

        await alterarAluno()
        carregarAlunos();
        mostrarDetalhes('', '', '')
        return

    }

}

async function alterarAluno() {
    const pID = modalIDAluno.value;
    const pNome = modalNomeAluno.value;
    const pMatricula = modalMatriculaAluno.value;



    const retorno = await window.senacAPI.alterarAluno(pNome, pMatricula, pID);

    carregarAlunos();
    mostrarDetalhes("", "", "");
}

async function excluirAluno() {
    const pID = modalIDAluno.value;


    const retorno = await window.senacAPI.excluirAlunos(pID);


    //após deleção atualiza a lista de alunos

    carregarAlunos();
    mostrarDetalhes('', '', '')
}


async function carregarAlunos() {


    const listaAlunos = await window.senacAPI.buscarAlunos();
    tabelaAluno.innerHTML = "";

    console.log(listaAlunos)
    listaAlunos.forEach(criarLinhaAluno)

    if (!listaAlunos.length > 0) {

        tabelaAluno.textContent = "sem dados"
    }

    lucide.createIcons(); // renderiza os ícones do Lucide

}

function criarLinhaAluno(aluno) {
    //paragrafo.textContent = paragrafo.textContent + aluno.nome

    //linha 
    const linha = document.createElement("tr");

    //nome
    const celulanome = document.createElement("td");
    celulanome.textContent = aluno.nome;
    linha.appendChild(celulanome);

    //matricula
    const celulaMatricula = document.createElement("td");
    celulaMatricula.textContent = aluno.matricula;
    linha.appendChild(celulaMatricula);

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(aluno.nome, aluno.matricula, aluno.id) }
    );


    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);

    const iconeIncluir = document.getElementById('iIncluir')
    iconeIncluir.setAttribute('data-lucide', 'plus')
    const iconeSalvar = document.getElementById('iSalvar')
    iconeSalvar.setAttribute('data-lucide', 'save-all')
    const iconeExcluir = document.getElementById('iExcluir')
    iconeExcluir.setAttribute('data-lucide', 'trash2')

    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);


    //final adiciono a linha criada com matricula,nome e botao à tabela
    tabelaAluno.appendChild(linha);

}
carregarAlunos()