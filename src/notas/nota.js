const tabelanota = document.getElementById('notasTableDados');
const modalIDnota = document.getElementById('nota-id');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoIncluir = document.getElementById('btn-incluir');
const botaoFiltrar = document.getElementById('btnFiltro')
const botaoLimparFiltro = document.getElementById("btn-limparFiltro")

const dropdownAluno = document.getElementById('aluno-nome');
const dropdownProfessor = document.getElementById('professor-nome');
const dropdownMateria = document.getElementById('materia-nome');
const dropdownAvaliacao = document.getElementById('avaliacao');
const dropDownFiltro = document.getElementById('filtro')

botaoFiltrar.addEventListener('click',filtrarNotas)
botaoLimparFiltro.addEventListener('click',limparFiltro)
botaoLimparFiltro.addEventListener('click', filtrarNotas)
botaoIncluir.addEventListener('click', limparDados);
botaoSalvar.addEventListener('click', funcaoSalvar);
botaoExcluir.addEventListener('click', excluirnota);

function mostrarDetalhes(alunoId, professorId, notaId, avaliacao, materiaId) {
    modalIDnota.value = notaId;
    dropdownAluno.value = alunoId;
    dropdownProfessor.value = professorId;
    dropdownMateria.value = materiaId;
    dropdownAvaliacao.value = avaliacao;
}

function limparDados() {
    mostrarDetalhes('', '', '', '', '');
}
//Função utilizada somente para limpar o filtro de matérias
function limparFiltro(){
    dropDownFiltro.value = 0
}
//Função utilizada para salvar tanto uma alteração em um dado existente
//Quanto para criar um novo registro
async function funcaoSalvar() {
    const alunoId = dropdownAluno.value;
    const professorId = dropdownProfessor.value;
    const materiaId = dropdownMateria.value;
    const avaliacaoNota = dropdownAvaliacao.value;

    //Vai verificar se campo ID foi preenchido dentro do modal
    //Caso não tenha sido preenchido, quer dizer que não há um registro, então criará um registro
    //Caso tenha sido preenchido, vai alterar os dados daquele registro selecionado
    if (modalIDnota.value === '') {
        await window.senacAPI.salvarNota(professorId, alunoId, materiaId, avaliacaoNota);
        limparDados()
    } else {
        await window.senacAPI.alterarNota(professorId, alunoId,  materiaId, avaliacaoNota, modalIDnota.value);
       limparDados()
    }

    await carregarnotas();
    limparDados();
}
//Função utilizada para excluir um registro do banco de dados
//Quando foi executada, rodará um DELETE baseado no ID do registro e limpará os dados de dentro do modal
async function excluirnota() {
    const pID = modalIDnota.value;
    if (pID) {
        await window.senacAPI.excluirNota(pID);
        await carregarnotas();
        limparDados();
    }
}
//Função utilizada para criar a funcionalidade do filtro de matérias
//Roda um comando SQL onde utiliza um WHERE para filtrar os dados baseados na matéria selecionada
async function filtrarNotas() {
    const filtro = dropDownFiltro.value; // obtém o valor já selecionado
    // Se a opção "Todas as Matérias" for selecionada (valor "0")
    if (filtro === '0' || filtro === 0) {
        await carregarnotas();
        return; // sai da função para não continuar filtrando
    }
    const filtroMaterias = await window.senacAPI.filtrarNota(filtro);
    tabelanota.innerHTML = '';
    //Verifica caso não há dados para preencher os registros
    //Se não houver, exibirá a mensagem "Sem dados", caso tenha, irá exibir normalmente
    if (!filtroMaterias || filtroMaterias.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");
        celula.textContent = "Sem dados";
        linha.appendChild(celula);
        tabelanota.appendChild(linha);
    } else {
        filtroMaterias.forEach(criarLinhanota);
    }
    //Iniciador para os codigos de icones na função criarLinhanota
    lucide.createIcons();
}
//Função utilizada para carregar todos os dados da tabela notas sem a intervenção do filtro de matérias
//Carregará todos os dados da tabela de notas utilizando a função declara na API senacAPI
async function carregarnotas() {
    if (dropDownFiltro.value=0){
        filtrarNotas(filtro)
    }
    const listanotas = await window.senacAPI.buscarNota();
    tabelanota.innerHTML = "";
    //Caso não houver dados, carregara a mensagem "Sem dados"
    if (!listanotas || listanotas.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");
        celula.textContent = "Sem dados";
        linha.appendChild(celula);
        tabelanota.appendChild(linha);
        return;
    }

    listanotas.forEach(criarLinhanota);
    //Iniciador para os codigos de icones da função criarLinhanota
    lucide.createIcons();
}
//Função utilizada para carregar cada linha dos registros da tabela de notas

function criarLinhanota(nota) {

    const linha = document.createElement("tr"); //Cria o corpo da tabela
    const celulaIconeAvaliacao = document.createElement("td")//Cria a coluna que carregará os icones de aprovado ou reprovado
    if (nota.avaliacao ==='Aprovado'){ //Verifica se o valor da coluna 'avaliacao' é Aprovado ou Reprovado e cria um insere um icone baseado nisto
    celulaIconeAvaliacao.innerHTML='<i data-lucide = "smile" class= "aprovado"></i>'
    linha.appendChild(celulaIconeAvaliacao)
}
    else{
    celulaIconeAvaliacao.innerHTML='<i data-lucide ="frown" class="reprovado"></i>'
    linha.appendChild(celulaIconeAvaliacao)    
    }
    //Cria a coluna que armazenará o nome do aluno vinculado a nota
    const celulaAluno = document.createElement("td");//Cria a coluna
    celulaAluno.textContent = nota.aluno;//Define o conteúdo dela
    linha.appendChild(celulaAluno);//Insere a Coluna no corpo da tabela

    //Cria a coluna que armazenará o nome da matéria vinculada a nota
    const celulaMateria = document.createElement("td"); 
    celulaMateria.textContent = nota.materia;
    linha.appendChild(celulaMateria);

    //Cria a coluna que armazenará o nome do professor vinculado a nota
    const celulaProfessor = document.createElement("td");
    celulaProfessor.textContent = nota.professor;
    linha.appendChild(celulaProfessor);

    //Cria a coluna que armazenará a avaliação do aluno
    const celulaAvaliacao = document.createElement("td");
    celulaAvaliacao.textContent = nota.avaliacao;
    linha.appendChild(celulaAvaliacao);
    //Cria o botão da lateral direita
    const celulaBotao = document.createElement("td");//Cria a coluna do botão
    const botao = document.createElement("button");//Cria o botão que será vinculado a coluna
    botao.innerHTML = `<i data-lucide="edit"></i>`;//Define o ícone do botão
    botao.addEventListener("click", () => {
        mostrarDetalhes(nota.aluno_id, nota.professor_id, nota.id, nota.avaliacao, nota.materia_id);
    }); //Cria o listener que irá executar a função de mostrarDetalhes, onde irá inserir os dados da nota no modal caso seja clicado
    
    //Cria todos os icones dos botões que já estão criados no HTML
   const iconeIncluir = document.getElementById('iIncluir');
if (iconeIncluir) iconeIncluir.setAttribute('data-lucide', 'plus');

const iconeSalvar = document.getElementById('iSalvar');
if (iconeSalvar) iconeSalvar.setAttribute('data-lucide', 'save-all');

const iconeExcluir = document.getElementById('iExcluir');
if (iconeExcluir) iconeExcluir.setAttribute('data-lucide', 'trash2');

const iconeFiltrar = document.getElementById('IFiltrar');
if (iconeFiltrar) iconeFiltrar.setAttribute('data-lucide', 'list-filter');

const iconeLimparFiltro = document.getElementById('IlimparFiltro');
if (iconeLimparFiltro) iconeLimparFiltro.setAttribute('data-lucide', 'refresh-ccw');
    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    tabelanota.appendChild(linha);
}
//Cria os DropDowns dos dados vinculados a nota, para que sejam alterados ou salvos 
async function preencherDropdownAlunos() {
    const alunos = await window.senacAPI.buscarAlunos();
    dropdownAluno.innerHTML = "";

    alunos.forEach(aluno => {
        const option = document.createElement("option");
        option.value = aluno.id;
        option.textContent = aluno.nome;
        dropdownAluno.appendChild(option);
    });
}

async function preencherDropdownProfessores() {
    const professores = await window.senacAPI.buscarProf();
    dropdownProfessor.innerHTML = "";

    professores.forEach(prof => {
        const option = document.createElement("option");
        option.value = prof.id;
        option.textContent = prof.nome;
        dropdownProfessor.appendChild(option);
    });
}

async function preencherDropdownMaterias() {
    const materias = await window.senacAPI.buscarMateria();
    dropdownMateria.innerHTML = "";

    materias.forEach(materia => {
        const option = document.createElement("option");
        option.value = materia.id;
        option.textContent = materia.nome;
        dropdownMateria.appendChild(option);
    });
}

function preencherDropdownAvaliacao() {
    const opcoes = ['Aprovado', 'Reprovado'];
    dropdownAvaliacao.innerHTML = "";

    opcoes.forEach(avaliacao => {
        const option = document.createElement("option");
        option.value = avaliacao;
        option.textContent = avaliacao;
        dropdownAvaliacao.appendChild(option);
    });
}
async function dropDownfiltrarMateria(){
    const materias = await window.senacAPI.buscarMateria()
    dropDownFiltro.innerHTML =''

    const todasAsOpcoes = document.createElement('option')
    todasAsOpcoes.value = 0
    todasAsOpcoes.textContent ="Todas as Matérias"

    dropDownFiltro.appendChild(todasAsOpcoes)
    materias.forEach(materia =>{
        const option = document.createElement("option")
        option.value= materia.id
        option.textContent= materia.nome
        dropDownFiltro.appendChild(option)
    })
}

async function preencherDropdowns() {
    await preencherDropdownAlunos();
    await preencherDropdownProfessores();
    await preencherDropdownMaterias();
    await preencherDropdownAvaliacao();
    await dropDownfiltrarMateria()
}

// Inicializar
preencherDropdowns();
carregarnotas();


