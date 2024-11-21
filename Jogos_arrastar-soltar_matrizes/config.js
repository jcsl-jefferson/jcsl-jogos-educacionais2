document.getElementById('configForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const bgColor = document.getElementById('bgColor').value;
    const textColor = document.getElementById('textColor').value;

    // Salva as configurações no localStorage
    localStorage.setItem('bgColor', bgColor);
    localStorage.setItem('textColor', textColor);

    // Aplica as configurações imediatamente
    applyStyles(bgColor, textColor);
});

// Função para aplicar estilos
function applyStyles(bgColor, textColor) {
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
}

// Carregar configurações ao iniciar a página
window.onload = function() {
    const savedBgColor = localStorage.getItem('bgColor') || '#ffffff';
    const savedTextColor = localStorage.getItem('textColor') || '#000000';

    document.getElementById('bgColor').value = savedBgColor;
    document.getElementById('textColor').value = savedTextColor;

    applyStyles(savedBgColor, savedTextColor);
};