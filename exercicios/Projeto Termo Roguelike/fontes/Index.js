import { pegarPalavra } from "./db.js";

const campoPalpite = document.getElementById('tentativa');
const campoCorreto = document.getElementById('correto');
const campoErrado = document.getElementById('errado');
const campoInexistente = document.getElementById('inexistente');
const campoTentativas = document.getElementById('tentativas');

let tentativas = 0; 
let palavraSecreta = ""; 

async function iniciarJogo() {
    try {
        const resultado = await pegarPalavra();
        if (resultado && resultado.palavra) {
            palavraSecreta = resultado.palavra.toLowerCase();
            console.log("Palavra carregada! (Escondida do console do usuário, claro)");
        } else {
            console.error("Nenhuma palavra retornada do banco.");
        }
    } catch (erro) {
        console.error("Erro ao conectar no banco:", erro);
    }
}

iniciarJogo();

function validar() {
    if (!palavraSecreta) {
        alert("Aguarde, a palavra ainda está sendo carregada!");
        return;
    }

    let palpite = campoPalpite.value.toLowerCase();

    if (palpite.length !== palavraSecreta.length) {
        alert(`O palpite deve ter exatas ${palavraSecreta.length} letras!`);
        return;
    }

    campoCorreto.innerHTML = "Lugar Correto: ";
    campoErrado.innerHTML = "Lugar Errado: ";
    campoInexistente.innerHTML = "Não tem: ";
    campoTentativas.innerHTML = "Tentativa: ";

    if (tentativas >= 5) {
        alert("Você atingiu o limite de 5 tentativas!");
        return; 
    }
    
    tentativas++;

    for (let i = 0; i < palavraSecreta.length; i++) {
        if (palavraSecreta[i] === palpite[i]) {
            campoCorreto.innerHTML += palpite[i].toUpperCase() + " ";
        } 
        else if (palavraSecreta.includes(palpite[i])) {
            campoErrado.innerHTML += palpite[i].toUpperCase() + " ";
        } 
        else {
            campoInexistente.innerHTML += palpite[i].toUpperCase() + " ";
        }
    }

    campoTentativas.innerHTML += tentativas;
    
    if (palavraSecreta === palpite) {
        alert("Parabéns, você acertou a palavra!");
    }
}

window.validar = validar;