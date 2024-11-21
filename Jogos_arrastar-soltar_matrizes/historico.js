window.onload = function() {
    // Aplicar estilos de cor
    const savedBgColor = localStorage.getItem('bgColor') || '#ffffff';
    const savedTextColor = localStorage.getItem('textColor') || '#000000';

    document.body.style.backgroundColor = savedBgColor;
    document.body.style.color = savedTextColor;

    const tabelaResultados = document.getElementById('tabelaResultados').getElementsByTagName('tbody')[0];
    const historico = JSON.parse(localStorage.getItem('historico')) || [];

    historico.forEach(resultado => {
        const row = tabelaResultados.insertRow();
        row.insertCell(0).innerText = resultado.nome;
        row.insertCell(1).innerText = resultado.data;
        row.insertCell(2).innerText = resultado.tempo;
        row.insertCell(3).innerText = resultado.pontuacao;
    });
};