function converterMetroParaPe(metros) {
    const pes = metros * 3.281;
    return pes;
}

function converterPeParaMetro(pes) {
    const metros = pes / 3.281;
    return metros;
}



function converterKmParaMilha(quilometros) {
    const milhas = quilometros * 0.621371;
    return milhas;
}

function converterMilhaParaKm(milhas) {
    const quilometros = milhas / 0.621371;
    return quilometros;
}



function converterCmParaPolegada(centimetros) {
    const polegadas = centimetros / 2.54;
    return polegadas;
}

function converterPolegadaParaCm(polegadas) {
    const centimetros = polegadas * 2.54;
    return centimetros;
}



function converterKgParaLibra(quilos) {
    const libras = quilos * 2.20462;
    return libras;
}

function converterLibraParaKg(libras) {
    const quilos = libras / 2.20462;
    return quilos;
}



function converterFahrenheitParaCelsius(fahrenheit) {
    const celsius = (fahrenheit - 32) * 5 / 9;
    return celsius;
}

function converterCelsiusParaFahrenheit(celsius) {
    const fahrenheit = (celsius * 9 / 5) + 32;
    return fahrenheit;
}



function converterKelvinParaCelsius(kelvin) {
    const celsius = kelvin - 273.15;
    return celsius;
}

function converterCelsiusParaKelvin(celsius) {
    const kelvin = celsius + 273.15;
    return kelvin;
}



function converterRealParaDolar(reais, cotacaoDolar) {
    const dolares = reais / cotacaoDolar;
    return dolares;
}

function converterDolarParaReal(dolares, cotacaoDolar) {
    const reais = dolares * cotacaoDolar;
    return reais;
}



function converterRealParaEuro(reais, cotacaoEuro) {
    const euros = reais / cotacaoEuro;
    return euros;
}

function converterEuroParaReal(euros, cotacaoEuro) {
    const reais = euros * cotacaoEuro;
    return reais;
}



function converterRealParaWon(reais, cotacaoWon) {
    const wons = reais / cotacaoWon;
    return wons;
}

function converterWonParaReal(wons, cotacaoWon) {
    const reais = wons * cotacaoWon;
    return reais;
}



function converterHorasParaMs(horas) {
    const milissegundos = horas * 60 * 60 * 1000;
    return milissegundos;
}

function converterMsParaHoras(milissegundos) {
    const horas = milissegundos / (60 * 60 * 1000);
    return horas;
}


module.exports = {
    converterMetroParaPe,
    converterPeParaMetro,
    converterKmParaMilha,
    converterMilhaParaKm,
    converterCmParaPolegada,
    converterPolegadaParaCm,
    converterKgParaLibra,
    converterLibraParaKg,
    converterFahrenheitParaCelsius,
    converterCelsiusParaFahrenheit,
    converterKelvinParaCelsius,
    converterCelsiusParaKelvin,
    converterRealParaDolar,
    converterDolarParaReal,
    converterRealParaEuro,
    converterEuroParaReal,
    converterRealParaWon,
    converterWonParaReal,
    converterHorasParaMs,
    converterMsParaHoras
};