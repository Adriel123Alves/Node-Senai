const btnIniciar = document.getElementById('btn-iniciar');
const divPalavra = document.getElementById('palavra-secreta');

btnIniciar.addEventListener('click', async () => {
    divPalavra.innerText = "Sorteando...";
    
    try {
        // Faz a requisição para a rota que criamos no server.js
        const resposta = await fetch('/api/palavra');
        const dados = await resposta.json();

        if (dados.sucesso) {
            divPalavra.innerText = dados.palavra;
        } else {
            divPalavra.innerText = "Erro: " + dados.mensagem;
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        divPalavra.innerText = "Erro ao conectar com o servidor.";
    }
});