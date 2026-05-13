// Variáveis de Estado do Jogo
let palavraSecretaOriginal = ""; // Guarda a palavra COM acento para exibir
let palavraSecreta = "";
let linhaAtual = 0;
let letraAtual = 0;
const TENTATIVAS = 6;
const TAMANHO_PALAVRA = 5;

let proximoMarco = 1000;        // A cada 500 pontos, o tempo diminui
let tempoMinimo = 60;          // O limite mínimo (1 minuto)
let reducaoDeTempo = 60;

let tempoInicial = 300; // Tempo que a rodada começa (em segundos)
let vidasIniciais = 4;
let tempoRestante = tempoInicial; 
let vidasAtuais = vidasIniciais;
let cronometro; // Variável para guardar o intervalo do timer
let pontuacaoTotal = 0; // Começa o jogo com 0 pontos

const tabuleiro = document.getElementById('tabuleiro');

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

function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Atualiza o texto na tela (formato MM:SS)
function atualizarDisplayTempo() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;
    
    // O padStart garante que fique "05" em vez de "5"
    const textoMinutos = String(minutos).padStart(2, '0');
    const textoSegundos = String(segundos).padStart(2, '0');
    
    document.getElementById('tempo-display').innerText = `${textoMinutos}:${textoSegundos}`;
}

function iniciarCronometro() {
    clearInterval(cronometro); 
    
    // Resetando com base na variável configurável
    tempoRestante = tempoInicial; 
    atualizarDisplayTempo();
    atualizarBackgroundPorTempo(); // Função nova para o visual Roguelike!

    cronometro = setInterval(() => {
        tempoRestante--;
        atualizarDisplayTempo();
        
        // Efeito visual: A cada minuto que passa, o fundo muda
        if (tempoRestante % 60 === 0) {
            atualizarBackgroundPorTempo();
        }

        if (tempoRestante <= 0) {
            clearInterval(cronometro);
            perderVida("O tempo acabou! ⏱️");
        }
    }, 1000);
}

// 2. Busca a palavra no seu servidor
async function sortearPalavra() {
    try {
        const res = await fetch('/api/palavra');
        const dados = await res.json();
        if (dados.sucesso) {
            // Guarda a original (ex: "CAFÉ")
            palavraSecretaOriginal = dados.palavra.toUpperCase();
            
            // Cria a versão para o jogo comparar (ex: "CAFE")
            palavraSecreta = removerAcentos(palavraSecretaOriginal);
            
            console.log("Palavra sorteada (para testes):", palavraSecretaOriginal);
            
            linhaAtual = 0;
            letraAtual = 0;
            criarTabuleiro();
            iniciarCronometro(); 
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

    // 1. LER O QUE O JOGADOR DIGITOU
    for (let i = 0; i < TAMANHO_PALAVRA; i++) {
        const quadrado = document.getElementById(`quadrado-${indexBase + i}`);
        palpite += quadrado.innerText;
    }

    // 2. VALIDAR
    const cores = validarChute(palpite, palavraSecreta);

    // 3. PINTAR
    for (let i = 0; i < TAMANHO_PALAVRA; i++) {
        const quadrado = document.getElementById(`quadrado-${indexBase + i}`);
        quadrado.classList.add(cores[i]);
    }

    // 4. SE GANHOU A RODADA
    if (palpite === palavraSecreta) {
        clearInterval(cronometro); 
        
        // --- NOVIDADE: REVELAR OS ACENTOS NA TELA ---
        for (let i = 0; i < TAMANHO_PALAVRA; i++) {
            const quadrado = document.getElementById(`quadrado-${indexBase + i}`);
            quadrado.innerText = palavraSecretaOriginal[i]; // Substitui pela letra com acento!
        }
        // --------------------------------------------

        const pontosGanhos = calcularPontosRodada(linhaAtual);
        pontuacaoTotal += pontosGanhos;
        document.getElementById('pontos-display').innerText = pontuacaoTotal;

        // Lógica de Redução de Tempo (Roguelike)
        let mensagemNivel = "";
        if (pontuacaoTotal >= proximoMarco) {
            if (tempoInicial > tempoMinimo) {
                tempoInicial -= reducaoDeTempo;
                if (tempoInicial < tempoMinimo) tempoInicial = tempoMinimo;
                mensagemNivel = `\n🔥 O JOGO FICOU MAIS DIFÍCIL! O tempo inicial caiu para ${tempoInicial} segundos!`;
            }
            proximoMarco += 500; 
        }

        setTimeout(() => {
            alert(`Você acertou! 🎉 +${pontosGanhos} Pontos!\nSua pontuação total é: ${pontuacaoTotal}${mensagemNivel}\n\nPreparando a próxima palavra...`);
            sortearPalavra(); 
        }, 500); 
        return; 
    }

    // Passa para a próxima linha
    linhaAtual++;
    letraAtual = 0;

    // 5. SE PERDEU A RODADA (Acabaram as tentativas)
    if (linhaAtual === TENTATIVAS) {
        clearInterval(cronometro);
        setTimeout(() => {
            perderVida(`Você não descobriu a palavra! Era: ${palavraSecretaOriginal}`);
        }, 500);
    }
}

function atualizarDisplayVidas() {
    document.getElementById('vidas-display').innerText = vidasAtuais;
    
    // Efeito de Blur Vermelho se estiver com 1 vida (conforme seu PDF)
    if (vidasAtuais === 1) {
        document.body.style.boxShadow = "inset 0 0 100px rgba(255, 0, 0, 0.5)";
    } else {
        document.body.style.boxShadow = "none";
    }
}

function atualizarBackgroundPorTempo() {
    // Cálculo simples: quanto menos tempo, mais roxo o fundo fica
    const minutosPassados = Math.floor((tempoInicial - tempoRestante) / 60);
    const intensidadeRoxo = minutosPassados * 20; // Aumenta o tom de roxo
    document.body.style.backgroundColor = `rgb(${11 - intensidadeRoxo}, ${15 - intensidadeRoxo}, ${25 + intensidadeRoxo})`;
}

function perderVida(mensagem) {
    vidasAtuais--;
    atualizarDisplayVidas();

    if (vidasAtuais <= 0) {
        alert(`${mensagem}\nGAME OVER! Suas vidas acabaram.\nSua Pontuação Final foi: ${pontuacaoTotal} 🏆`);
        
        // --- REINICIA TODO O ESTADO DO JOGO ---
        vidasAtuais = vidasIniciais;
        pontuacaoTotal = 0; 
        document.getElementById('pontos-display').innerText = pontuacaoTotal; 
        
        // Reinicia a mecânica de redução de tempo
        tempoInicial = 300;     // Volta para os 5 minutos originais
        proximoMarco = 500;     // Volta para o primeiro marco
        
        sortearPalavra();
    } else {
        alert(`${mensagem}\nVocê perdeu 1 vida! Vidas restantes: ${vidasAtuais}`);
        sortearPalavra(); 
    }
}

// Calcula os pontos baseados na tentativa atual
function calcularPontosRodada(tentativa) {
    if (tentativa === 0) return 200; // Acertou de primeira
    if (tentativa === 1) return 100; // Acertou de segunda
    
    // A partir da terceira (índice 2 em diante), diminui 20 pontos por tentativa
    // Ex: índice 2 = 80 pts | índice 3 = 60 pts | índice 4 = 40 pts | índice 5 = 20 pts
    return 100 - ((tentativa - 1) * 20); 
}

// INICIALIZAÇÃO AUTOMÁTICA
// Removemos a ligação com o botão antigo e apenas chamamos a função direto
sortearPalavra();

// Inicialização
criarTabuleiro();
