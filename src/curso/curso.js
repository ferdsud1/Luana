

const paragrafo = document.getElementById('teste');
const tabelacurso = document.getElementById('cursosTableDados');
const modalNomecurso = document.getElementById('curso-nome');
const modaldescricaocurso = document.getElementById('curso-descricao');
const modalIDcurso = document.getElementById('curso-id');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoIncluir = document.getElementById('btn-incluir');
botaoIncluir.addEventListener('click', limparDados)
botaoSalvar.addEventListener('click', funcaoSalvar)
botaoExcluir.addEventListener('click', excluircurso)




function mostrarDetalhes(nome, descricao, id) {
    modalIDcurso.value = id;
    modaldescricaocurso.value = descricao;
    modalNomecurso.value = nome;
}
function limparDados() {
    mostrarDetalhes('', '', '')

}
async function funcaoSalvar() {
    cursoNome = modalNomecurso.value
    cursodescricao = modaldescricaocurso.value
    if (modalIDcurso.value === '') {
        if (cursoNome === '' || cursodescricao === '') {
            return
        }
        await window.senacAPI.salvarCurso(cursoNome, cursodescricao)
        carregarcursos();
        mostrarDetalhes('', '', '')
        return
    }
    else {

        await alterarcurso()
        carregarcursos();
        mostrarDetalhes('', '', '')
        return

    }

}

async function alterarcurso() {
    const pID = modalIDcurso.value;
    const pNome = modalNomecurso.value;
    const pdescricao = modaldescricaocurso.value;



    const retorno = await window.senacAPI.alterarCurso(pNome, pdescricao, pID);

    carregarcursos();
    mostrarDetalhes("", "", "");
}

async function excluircurso() {
    const pID = modalIDcurso.value;


    const retorno = await window.senacAPI.excluirCurso(pID);


    //após deleção atualiza a lista de cursos

    carregarcursos();
    mostrarDetalhes('', '', '')
}


async function carregarcursos() {


    const listacursos = await window.senacAPI.buscarCurso();
    tabelacurso.innerHTML = "";

    console.log(listacursos)
    listacursos.forEach(criarLinhacurso)

    if (!listacursos.length > 0) {

        tabelacurso.textContent = "sem dados"
    }

    lucide.createIcons(); // renderiza os ícones do Lucide

}

function criarLinhacurso(curso) {
    //paragrafo.textContent = paragrafo.textContent + curso.nome

    //linha 
    const linha = document.createElement("tr");

    //nome
    const celulanome = document.createElement("td");
    celulanome.textContent = curso.nome;
    linha.appendChild(celulanome);

    //descricao
    const celuladescricao = document.createElement("td");
    celuladescricao.textContent = curso.descricao;
    linha.appendChild(celuladescricao);

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(curso.nome, curso.descricao, curso.id) }
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


    //final adiciono a linha criada com descricao,nome e botao à tabela
    tabelacurso.appendChild(linha);

}
carregarcursos()