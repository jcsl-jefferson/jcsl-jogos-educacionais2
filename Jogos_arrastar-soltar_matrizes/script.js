const perifericosContainer = document.getElementById('perifericos');
const caixas = document.querySelectorAll('.caixa');
let pontuacao = 0;
let tempo = 0;
let temporizador;
let jogoAtivo = false; // Flag para verificar se o jogo está ativo
let startTime; // Variável para armazenar o tempo de início
let jogadorAtual = "Jefferson Carlos"; // Nome do jogador fixo, você pode alterá-lo conforme necessário

// Função para aplicar estilos
function applyStyles(bgColor, textColor) {
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
}

// Carregar configurações ao iniciar o jogo
window.onload = function() {
    const savedBgColor = localStorage.getItem('bgColor') || '#ffffff';
    const savedTextColor = localStorage.getItem('textColor') || '#000000';

    applyStyles(savedBgColor, savedTextColor);
    
    carregarJogadores();
    carregarImagens();
};

// Carregar jogadores ao iniciar o jogo
function carregarJogadores() {
    const jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];
    
    if (jogadores.length > 0) {
        jogadorAtual = jogadores[0].nome; // Selecionar o primeiro jogador como exemplo
        document.getElementById("jogadorAtual").innerText = `Jogando: ${jogadorAtual}`;
    } else {
        document.getElementById("jogadorAtual").innerText = "Nenhum jogador cadastrado.";
    }
}

// Carregar imagens do localStorage
function carregarImagens() {
    const imagens = JSON.parse(localStorage.getItem('imagens')) || [];
    
    perifericosContainer.innerHTML = ''; // Limpa as imagens antes de recarregar

    imagens.forEach(imagem => {
        const imgElement = document.createElement('img');
        imgElement.src = imagem.src; // URL da imagem em base64
        imgElement.alt = imagem.titulo;
        imgElement.draggable = true;
        imgElement.id = imagem.titulo.toLowerCase(); // ID baseado no título

        imgElement.addEventListener('dragstart', dragStart);
        
        perifericosContainer.appendChild(imgElement);
   });

   // Adiciona eventos de drop nas caixas após adicionar as imagens
   caixas.forEach(caixa => {
       caixa.addEventListener('dragover', dragOver);
       caixa.addEventListener('drop', drop);
   });
}

// Função para finalizar o jogo
document.getElementById("finalizarJogo").addEventListener("click", function() {
   clearInterval(temporizador); // Para o temporizador se estiver ativo

   const endTime = new Date(); // Captura o tempo de término
   const totalTime = Math.floor((endTime - startTime) / 1000); // Calcula o tempo total em segundos

   alert(`Parabéns ${jogadorAtual}! Você completou o jogo com ${pontuacao} pontos em ${totalTime} segundos.`);
   document.getElementById("mensagemFinal").innerText = `Você completou o jogo com ${pontuacao} pontos em ${totalTime} segundos.`;

   // Registra os resultados no histórico
   registrarResultado(jogadorAtual, totalTime, pontuacao);

   // Redirecionar para a página de histórico
   window.location.href = 'historico.html';
});

// Função para registrar resultados no histórico
function registrarResultado(nomeJogador, tempo, pontuacao) {
   let historico = JSON.parse(localStorage.getItem('historico')) || [];
   
   const resultado = {
       nome: nomeJogador,
       data: new Date().toLocaleString(),
       tempo: tempo,
       pontuacao: pontuacao
   };

   historico.push(resultado);
   localStorage.setItem('historico', JSON.stringify(historico));
}

// Função para arrastar imagens
function dragStart(e) {
   e.dataTransfer.setData('text/plain', e.target.id);

   // Inicia o timer ao mover a primeira imagem
   if (!jogoAtivo) {
       startTimer();
       jogoAtivo = true; // Marca que o jogo está ativo
       startTime = new Date(); // Captura o tempo de início
   }
}

function dragOver(e) {
   e.preventDefault(); // Permite que a caixa receba a imagem arrastada
}

function drop(e) {
   e.preventDefault();
   
   const id = e.dataTransfer.getData('text/plain');
   
   const tipoResposta = e.target.dataset.respostaType;

   const imagens = JSON.parse(localStorage.getItem('imagens')) || [];
   const imagemCadastrada = imagens.find(img => img.titulo.toLowerCase() === id);

   if (imagemCadastrada) {
       if (imagemCadastrada.resposta === tipoResposta) {
           alert('Resposta correta!');
           pontuacao += 10; 
           atualizarPontuacao(); 
       } else {
           alert(`Resposta errada! A resposta correta é ${imagemCadastrada.resposta}.`);
       }
       
       // Faz a imagem desaparecer
       const periferico = document.getElementById(id); // Referência à imagem arrastada
       periferico.style.transition = "opacity 0.5s"; // Transição suave
       periferico.style.opacity = '0'; // Faz a imagem desaparecer
       
       setTimeout(() => {
           periferico.style.display = 'none'; // Remove a imagem após a transição

           // Verifica se todas as imagens foram movidas
           if (perifericosContainer.children.length === 0) {
               finalizarJogo(); // Finaliza o jogo se não houver mais imagens
           }
       }, 500); // Tempo deve ser igual ao da transição
   }
}

// Função para iniciar o temporizador (se necessário)
function startTimer() {
   clearInterval(temporizador); // Limpa qualquer temporizador anterior

   temporizador = setInterval(() => {
       tempo++;
       document.getElementById("temporizador").innerText = `Tempo: ${tempo}s`;
   }, 1000); // Atualiza a cada segundo
}

// Função para atualizar a pontuação na tela
function atualizarPontuacao() {
   document.getElementById('pontuacao').innerText = `Pontuação: ${pontuacao}`;
}

// Carregar as imagens ao iniciar o jogo
carregarImagens();