// Função para aplicar estilos
function applyStyles(bgColor, textColor) {
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
}

// Carregar configurações ao iniciar o gerenciador
window.onload = function() {
    const savedBgColor = localStorage.getItem('bgColor') || '#ffffff';
    const savedTextColor = localStorage.getItem('textColor') || '#000000';

    applyStyles(savedBgColor, savedTextColor); // Aplica as cores
    
    carregarImagens(); // Carrega as imagens após aplicar estilos
};










document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.getElementById('nome').value;

    // Verifica se já existe um jogador com o mesmo nome
    let jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];
    const jogadorExistente = jogadores.find(j => j.nome.toLowerCase() === nome.toLowerCase());

    if (jogadorExistente) {
        alert('Já existe um jogador cadastrado com esse nome.');
        return; // Interrompe a execução se o jogador já existir
    }

    // Adiciona novo jogador
    const novoJogador = { nome: nome };
    jogadores.push(novoJogador);
    localStorage.setItem('jogadores', JSON.stringify(jogadores));

    document.getElementById('mensagem').innerText = 'Jogador cadastrado com sucesso!';
    document.getElementById('formulario').reset(); // Reseta o formulário
    carregarJogadores(); // Atualiza a lista de jogadores
});

// Função para carregar os jogadores na tabela
function carregarJogadores() {
    const jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];
    
    const tbody = document.querySelector('#tabela-jogadores tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de recarregar

    jogadores.forEach((jogador, index) => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${jogador.nome}</td>
            <td>
                <button onclick="excluirJogador(${index})">Excluir</button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Função para excluir um jogador
function excluirJogador(index) {
    let jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];
    
    jogadores.splice(index, 1); // Remove o jogador do array
    localStorage.setItem('jogadores', JSON.stringify(jogadores)); // Atualiza o localStorage
    carregarJogadores(); // Atualiza a lista de jogadores
}

// Carregar os jogadores ao iniciar o gerenciador
carregarJogadores();