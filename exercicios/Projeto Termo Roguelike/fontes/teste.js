const palavra = "teste";
const chute = "testa"; 

let resultado = palavra.split("");
let testando = chute.split("");

function testa() {
    let copia = [...resultado]; 
    let status = new Array(testando.length);

    testando.forEach((item, index) => {
        if (item === resultado[index]) {
            status[index] = `possui "${item}" e está no lugar certo`;
            let i = copia.indexOf(item);
            copia.splice(i, 1);
        }
    });

    testando.forEach((item, index) => {
        if (status[index]) return;

        if (copia.includes(item)) {
            status[index] = `possui "${item}" (lugar errado)`;
            let i = copia.indexOf(item);
            copia.splice(i, 1);
        } else {
            status[index] = `Não possui ${item}`;
        }
    });

    status.forEach(frase => console.log(frase));
    
    if (chute === palavra) {
        console.log(`Parabéns! A palavra era ${palavra}`);
        return true;
    }
    return false;
}

function validacao() {
    for (let tent = 0; tent < 6; tent++) {
        console.log(`--- Tentativa ${tent + 1} ---`);
        let acertou = testa();
        if (acertou) break; 
    }
}

validacao();