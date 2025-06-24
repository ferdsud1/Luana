const paragrafo = document.getElementById('teste');
const tabelamateria = document.getElementById('materiasTableDados');
const modalNomemateria = document.getElementById('materia-nome');
const modaldescricaomateria = document.getElementById('materia-descricao');
const modalIDmateria = document.getElementById('materia-id');
const modalCursoMateriaID = document.getElementById('materia-curso-id');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoIncluir = document.getElementById('btn-incluir');

botaoIncluir.addEventListener('click', limparDados);
botaoSalvar.addEventListener('click', funcaoSalvar);
botaoExcluir.addEventListener('click', excluirmateria);

function mostrarDetalhes(nome, descricao, id, idcurso) {
    modalIDmateria.value = id;
    modaldescricaomateria.value = descricao;
    modalNomemateria.value = nome;
    modalCursoMateriaID.value = (typeof idcurso === 'object') ? String(idcurso.id) : String(idcurso);

}

function limparDados() {
    mostrarDetalhes('', '', '', '');
}

async function funcaoSalvar() {
    const materiaNome = modalNomemateria.value;
    const materiadescricao = modaldescricaomateria.value;
    const materiaCursoId = modalCursoMateriaID.value;

    if (modalIDmateria.value === '') {
        if (materiaNome === '' || materiadescricao === '') {
            return;
        }
        await window.senacAPI.salvarMateria(materiaNome, materiadescricao, materiaCursoId);
        carregarmaterias();
        mostrarDetalhes('', '', '', '');
        return;
    } else {
        await alterarmateria();
        mostrarDetalhes('', '', '', '');
        return;
    }
}

async function alterarmateria() {
    const pID = modalIDmateria.value;
    const pNome = modalNomemateria.value;
    const pdescricao = modaldescricaomateria.value;
    const pcursoID = modalCursoMateriaID.value;

    await window.senacAPI.alterarMateria(pNome, pdescricao, pcursoID, pID );
    carregarmaterias();
    mostrarDetalhes("", "", "", '');
}

async function excluirmateria() {
    const pID = modalIDmateria.value;
    await window.senacAPI.excluirMateria(pID);
    carregarmaterias();
    mostrarDetalhes('', '', '', '');
}

async function carregarmaterias() {
    const listamaterias = await window.senacAPI.buscarMateria();
    
    tabelamateria.innerHTML = "";

    listamaterias.forEach(criarLinhamateria);

    if (listamaterias.length === 0) {
        tabelamateria.textContent = "sem dados";
    }

    atualizarDropdownComIdCurso();
    lucide.createIcons(); // renderiza os ícones do Lucide
}

function criarLinhamateria(materia) {
    const linha = document.createElement("tr");

    const celulanome = document.createElement("td");
    celulanome.textContent = materia.nome;
    linha.appendChild(celulanome);

    const celuladescricao = document.createElement("td");
    celuladescricao.textContent = materia.descricao;
    linha.appendChild(celuladescricao);

    const celulaCursoId = document.createElement("td");
    celulaCursoId.textContent = typeof materia.idcurso === 'object'
        ? `${materia.idcurso.id} - ${materia.idcurso.nome}`
        : materia.cursonome;
    linha.appendChild(celulaCursoId);

    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click", function () {
        mostrarDetalhes(materia.nome, materia.descricao, materia.id, materia.idcurso);
    });

    const icone = document.createElement("i");
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);

    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    tabelamateria.appendChild(linha);

    // Atualiza os ícones dos botões principais
    const iconeIncluir = document.getElementById('iIncluir');
    iconeIncluir.setAttribute('data-lucide', 'plus');
    const iconeSalvar = document.getElementById('iSalvar');
    iconeSalvar.setAttribute('data-lucide', 'save-all');
    const iconeExcluir = document.getElementById('iExcluir');
    iconeExcluir.setAttribute('data-lucide', 'trash2');
}

function criarDropDown(cursos) {
    const dropdown = document.getElementById("materia-curso-id");
    dropdown.innerHTML = ""; // limpa o dropdown antes de adicionar

    cursos.forEach(curso => {
        const option = document.createElement("option");
        option.value = curso.id;
        option.textContent = `${curso.id} - ${curso.nome}`;
        dropdown.appendChild(option);
    });
}

async function atualizarDropdownComIdCurso() {
    const dropdown = document.getElementById("materia-curso-id");
    dropdown.innerHTML = "";

    const cursos = await window.senacAPI.buscarCurso();

    cursos.forEach(curso => {
        const option = document.createElement("option");
        option.value = curso.id;
        option.textContent = `${curso.id} - ${curso.nome}`;
        dropdown.appendChild(option);
    });
}

carregarmaterias();
