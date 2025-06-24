
const tabelaprof = document.getElementById('profTable');

const modalNomeprof = document.getElementById('prof-nome');
const modalCpfProf = document.getElementById('prof-cpf');
const modalIDprof = document.getElementById('prof-id');

const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoIncluir = document.getElementById('btn-incluir');

botaoIncluir.addEventListener('click', limparDados)
botaoSalvar.addEventListener('click', funcaoSalvar)
botaoExcluir.addEventListener('click', excluirprof)

function mostrarDetalhes(nome, cpf, id) {
    modalIDprof.value = id;
    modalCpfProf.value = cpf;
    modalNomeprof.value = nome;
}
function limparDados() {
    mostrarDetalhes('', '', '')
}
async function funcaoSalvar() {
    profNome = modalNomeprof.value
    profCpf = modalCpfProf.value
    if (modalIDprof.value === '') {
        if (profNome === '' || profCpf === '') {
            return
        }
        await window.senacAPI.salvarProf(profNome, profCpf)
        carregarprofs();
        mostrarDetalhes('', '', '')
        return
    }
    else {
        await alterarprof()
        carregarprofs();
        mostrarDetalhes('', '', '')
        return
    }
}
async function alterarprof() {
    const pID = modalIDprof.value;
    const pNome = modalNomeprof.value;
    const pCpf = modalCpfProf.value;

    const retorno = await window.senacAPI.alterarProf(pNome, pCpf, pID);
    carregarprofs();
    mostrarDetalhes("", "", "");
}
async function excluirprof() {
    const pID = modalIDprof.value;

    const retorno = await window.senacAPI.excluirProf(pID);

    carregarprofs();
    mostrarDetalhes('', '', '')
}
async function carregarprofs() {
    const listaprofs = await window.senacAPI.buscarProf();
    tabelaprof.innerHTML = '';

    console.log(listaprofs)
    listaprofs.forEach(criarLinhaprof)

    if (!listaprofs.length > 0) {
        tabelaprof.textContent = "sem dados"
    }

    lucide.createIcons(); // renderiza os ícones do Lucide
}
function criarLinhaprof(prof) {
    const linha = document.createElement("tr");

    const celulanome = document.createElement("td");
    celulanome.textContent = prof.nome;
    linha.appendChild(celulanome);

    const celulaCpf = document.createElement("td");
    celulaCpf.textContent = prof.cpf;
    linha.appendChild(celulaCpf);

    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(prof.nome, prof.cpf, prof.id) }
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

    tabelaprof.appendChild(linha);
}
carregarprofs()
