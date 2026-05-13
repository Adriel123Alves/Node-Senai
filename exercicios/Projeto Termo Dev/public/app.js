// Variáveis de Estado do Jogo
let palavraSecreta = "";
let linhaAtual = 0;
let letraAtual = 0;
const TENTATIVAS = 6;
const TAMANHO_PALAVRA = 5;

const tabuleiro = document.getElementById('tabuleiro');
const btnIniciar = document.getElementById('btn-iniciar');

// 1. Cria o grid visual
function criarTabuleiro() {
    tabuleiro.innerHTML = ""; // Limpa se já existir
    for (let i = 0; i < TENTATIVAS * TAMANHO_PALAVRA; i++) {
        const quadrado = document.createElement('div');
        quadrado.classList.add('quadradinho');
        quadrado.setAttribute('id', `quadrado-${i}`);
        tabuleiro.appendChild(quadrado);
    }
}

// 2. Busca a palavra no seu servidor
async function sortearPalavra() {
    try {
        const res = await fetch('/api/palavra');
        const dados = await res.json();
        if (dados.sucesso) {
            palavraSecreta = dados.palavra.toUpperCase();
            console.log("Palavra sorteada (para testes):", palavraSecreta);
            linhaAtual = 0;
            letraAtual = 0;
            criarTabuleiro();
        }
    } catch (err) {
        console.error("Erro ao buscar palavra:", err);
    }
}

// 3. Captura o teclado físico
window.addEventListener('keyup', (e) => {
    const tecla = e.key.toUpperCase();

    // Se for uma letra de A-Z
    if (/^[A-Z]$/.test(tecla) && letraAtual < TAMANHO_PALAVRA) {
        const index = (linhaAtual * TAMANHO_PALAVRA) + letraAtual;
        const quadrado = document.getElementById(`quadrado-${index}`);
        quadrado.innerText = tecla;
        letraAtual++;
    }

    // Se for Backspace (apagar)
    if (tecla === "BACKSPACE" && letraAtual > 0) {
        letraAtual--;
        const index = (linhaAtual * TAMANHO_PALAVRA) + letraAtual;
        const quadrado = document.getElementById(`quadrado-${index}`);
        quadrado.innerText = "";
    }

    // Se for Enter (enviar palpite)
    if (tecla === "ENTER" && letraAtual === TAMANHO_PALAVRA) {
        verificarPalpite();
    }
});

function verificarPalpite() {
    console.log("Verificando linha", linhaAtual);
    // Próximo passo: Lógica de comparar as letras e mudar as cores!
    linhaAtual++;
    letraAtual = 0;
}

function validarChute(palpite, secreta) {
    // Começamos assumindo que todas estão erradas
    const resultado = ['errado', 'errado', 'errado', 'errado', 'errado'];
    
    // Transforma a palavra secreta num array para podermos "riscar" as letras usadas
    const letrasSecretas = secreta.split(''); 

    // 1ª Passagem: Buscar os acertos exatos (Azul/Correto)
    for (let i = 0; i < 5; i++) {
        if (palpite[i] === secreta[i]) {
            resultado[i] = 'correto';
            letrasSecretas[i] = null; // "Risca" essa letra para não ser usada no amarelo
        }
    }

    // 2ª Passagem: Buscar as posições erradas (Laranja/Lugar Errado)
    for (let i = 0; i < 5; i++) {
        if (resultado[i] !== 'correto' && letrasSecretas.includes(palpite[i])) {
            resultado[i] = 'lugar-errado';
            // Acha onde a letra está no banco e "risca" ela
            letrasSecretas[letrasSecretas.indexOf(palpite[i])] = null; 
        }
    }

    return resultado;
}

function verificarPalpite() {
    let palpite = "";
    const indexBase = linhaAtual * TAMANHO_PALAVRA;

    // 1. LER O QUE O JOGADOR DIGITOU NA TELA
    for (let i = 0; i < TAMANHO_PALAVRA; i++) {
        const quadrado = document.getElementById(`quadrado-${indexBase + i}`);
        palpite += quadrado.innerText;
    }

    // 2. USAR A NOSSA LÓGICA DE VALIDAÇÃO
    const cores = validarChute(palpite, palavraSecreta);

    // 3. PINTAR OS QUADRADINHOS COM AS CORES
    for (let i = 0; i < TAMANHO_PALAVRA; i++) {
        const quadrado = document.getElementById(`quadrado-${indexBase + i}`);
        quadrado.classList.add(cores[i]); // Adiciona a classe CSS (correto, lugar-errado, errado)
    }

    // 4. VERIFICAR SE GANHOU OU PERDEU
    if (palpite === palavraSecreta) {
        setTimeout(() => alert("Você acertou! 🎉 Sorteie uma nova palavra."), 100);
        return; // Para o jogo aqui
    }

    // Passa para a próxima linha
    linhaAtual++;
    letraAtual = 0;

    // Se acabou as tentativas (PERDEU)
    if (linhaAtual === TENTATIVAS) {
        setTimeout(() => alert(`Você perdeu! A palavra era: ${palavraSecreta}`), 100);
    }
}

// Inicialização
btnIniciar.addEventListener('click', sortearPalavra);
criarTabuleiro();
