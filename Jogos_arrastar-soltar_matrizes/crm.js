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

    const titulo = document.getElementById('titulo').value;
    const imagemInput = document.getElementById('imagem');
    const resposta = document.getElementById('resposta').value;

    // Verifica se já existe uma imagem com o mesmo título
    let imagens = JSON.parse(localStorage.getItem('imagens')) || [];
    const tituloExistente = imagens.find(img => img.titulo.toLowerCase() === titulo.toLowerCase());

    if (tituloExistente) {
        alert('Já existe uma imagem cadastrada com esse título. Por favor, escolha um título diferente.');
        return; // Interrompe a execução se o título já existir
    }

    if (imagemInput.files.length > 0) {
        const imagemFile = imagemInput.files[0];

        // Verifica se o arquivo é uma imagem
        if (!imagemFile.type.startsWith('image/')) {
            alert('Por favor, selecione um arquivo de imagem.');
            return;
        }

        const reader = new FileReader();
        
        reader.onload = function(e) {
            const imagemData = {
                titulo: titulo,
                src: e.target.result, // URL da imagem em base64
                resposta: resposta
            };
            
            imagens.push(imagemData); // Adiciona a nova imagem ao array
            localStorage.setItem('imagens', JSON.stringify(imagens)); // Atualiza o localStorage

            document.getElementById('mensagem').innerText = 'Imagem cadastrada com sucesso!';
            document.getElementById('formulario').reset(); // Reseta o formulário
            carregarImagens(); // Atualiza a lista de imagens
        };

        reader.readAsDataURL(imagemFile); // Lê a imagem como uma URL base64
    } else {
        alert('Por favor, selecione uma imagem.');
    }
});

// Função para carregar as imagens na tabela
function carregarImagens() {
    const imagens = JSON.parse(localStorage.getItem('imagens')) || [];
    
    const tbody = document.querySelector('#tabela-imagens tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de recarregar

    imagens.forEach((imagem, index) => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${imagem.titulo}</td>
            <td><img src="${imagem.src}" alt="${imagem.titulo}" style="width: 50px;"></td>
            <td>${imagem.resposta}</td>
            <td>
                <button onclick="editarImagem(${index})">Alterar</button>
                <button onclick="excluirImagem(${index})">Excluir</button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Função para excluir uma imagem
function excluirImagem(index) {
    let imagens = JSON.parse(localStorage.getItem('imagens')) || [];
    
    imagens.splice(index, 1); // Remove a imagem do array
    localStorage.setItem('imagens', JSON.stringify(imagens)); // Atualiza o localStorage
    carregarImagens(); // Atualiza a lista de imagens
}

// Função para editar uma imagem
function editarImagem(index) {
    let imagens = JSON.parse(localStorage.getItem('imagens')) || [];
    
    const imagem = imagens[index];
    
    document.getElementById('titulo').value = imagem.titulo;
    
    // Para lidar com a edição da imagem, você pode permitir que o usuário selecione uma nova imagem.
    
    document.getElementById('resposta').value = imagem.resposta;

    // Remover a imagem antiga antes de editar
    excluirImagem(index);
}

// Carregar as imagens ao iniciar o gerenciador
carregarImagens();