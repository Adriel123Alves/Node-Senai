const campoSecreto = document.getElementById('secreto');
const campoPalpite = document.getElementById('tentativa');
const campoCorreto = document.getElementById('correto');
const campoErrado = document.getElementById('errado');
const campoInexistente = document.getElementById('inexistente');
const campoTentativas = document.getElementById('tentativas')
tentativas = 0;

function validar() {

    let secreta = campoSecreto.value;
    let palpite = campoPalpite.value;

    campoCorreto.innerHTML = "Lugar Correto: ";
    campoErrado.innerHTML = "Lugar Errado: ";
    campoInexistente.innerHTML = "Não tem: ";
    campoTentativas.innerHTML = "Tentativa: "  

    if (tentativas >= 5) {
        alert("Você atingiu o limite de 5 tentativas!");
        return; 
    }
    tentativas++;

    for (let i in secreta) {

        if (secreta[i] == palpite[i]) {
            campoCorreto.innerHTML += palpite[i].toUpperCase() + " ";
        } 
        else if (secreta.includes(palpite[i])) {
            campoErrado.innerHTML += palpite[i].toUpperCase() + " ";
        } 
        else {
            campoInexistente.innerHTML += palpite[i].toUpperCase() + " ";
        }
    }

    campoTentativas.innerHTML += tentativas;
}