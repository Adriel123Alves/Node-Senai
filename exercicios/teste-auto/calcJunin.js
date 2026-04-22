function calcJunin(salarioM,diasT){
    calculo = salarioM / diasT
    let arredondado = Math.round(calculo * 100) / 100;
    return arredondado;
}

module.exports = calcJunin;