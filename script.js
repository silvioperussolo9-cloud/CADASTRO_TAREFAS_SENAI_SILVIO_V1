// Seleção de elementos do DOM
const campoTarefa = document.getElementById('campo-tarefa');
const botaoAdicionar = document.getElementById('botao-adicionar');
const listaTarefas = document.getElementById('lista-tarefas');
const contadorTarefas = document.getElementById('contador-tarefas');
const botaoAlternarTema = document.getElementById('botao-alternar-tema');
const iconeTema = botaoAlternarTema.querySelector('i');

// Recupera as tarefas do LocalStorage ou inicia uma lista vazia
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// Função para salvar as tarefas no navegador
function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para atualizar o texto do contador na interface
function atualizarContador() {
    const total = tarefas.length;
    contadorTarefas.textContent = `${total} ${total === 1 ? 'tarefa' : 'tarefas'} na lista`;
}

// Função responsável por renderizar a lista na tela
function renderizarTarefas() {
    // Limpa a lista antes de renderizar novamente
    listaTarefas.innerHTML = '';

    tarefas.forEach((tarefa, index) => {
        const itemLista = document.createElement('li');

        // Adiciona a classe 'concluido' se a tarefa estiver marcada como concluída
        itemLista.className = `item-tarefa ${tarefa.concluida ? 'concluido' : ''}`;

        // Estrutura HTML de cada item com os ícones iguais aos da imagem
        itemLista.innerHTML = `
            <span>${tarefa.texto}</span>
            <div class="acoes-tarefa">
                <button class="botao-acao concluir" onclick="alternarConcluido(${index})">
                    <i class="fa-regular fa-circle-check"></i>
                </button>
                <button class="botao-acao excluir" onclick="excluirTarefa(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        listaTarefas.appendChild(itemLista);
    });

    atualizarContador();
}

// Função global para alternar o estado de concluído
window.alternarConcluido = function(index) {
    tarefas[index].concluida = !tarefas[index].concluida;
    salvarTarefas();
    renderizarTarefas();
};

// Função global para excluir a tarefa
window.excluirTarefa = function(index) {
    tarefas.splice(index, 1);
    salvarTarefas();
    renderizarTarefas();
};

// Função responsável por adicionar uma nova tarefa
function adicionarTarefa() {
    const textoTarefa = campoTarefa.value.trim();

    if (textoTarefa === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }

    // Adiciona a tarefa na array
    tarefas.push({ texto: textoTarefa, concluida: false });

    campoTarefa.value = '';
    salvarTarefas();
    renderizarTarefas();
}

// Evento para alternar entre Modo Claro e Escuro, com correção de ícone
botaoAlternarTema.addEventListener('click', () => {
    document.body.classList.toggle('modo-escuro');

    if (document.body.classList.contains('modo-escuro')) {
        iconeTema.classList.remove('fa-moon');
        iconeTema.classList.add('fa-sun');
    } else {
        iconeTema.classList.remove('fa-sun');
        iconeTema.classList.add('fa-moon');
    }
});

// Escutadores de Eventos (Event Listeners)
botaoAdicionar.addEventListener('click', adicionarTarefa);

campoTarefa.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        adicionarTarefa();
    }
});

// Renderiza as tarefas armazenadas ao carregar a página
renderizarTarefas();