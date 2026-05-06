const {
    converterMetroParaPe, converterPeParaMetro,
    converterKmParaMilha, converterMilhaParaKm,
    converterCmParaPolegada, converterPolegadaParaCm,
    converterKgParaLibra, converterLibraParaKg,
    converterFahrenheitParaCelsius, converterCelsiusParaFahrenheit,
    converterKelvinParaCelsius, converterCelsiusParaKelvin,
    converterRealParaDolar, converterDolarParaReal,
    converterRealParaEuro, converterEuroParaReal,
    converterRealParaWon, converterWonParaReal,
    converterHorasParaMs, converterMsParaHoras
} = require('./ferramentas');


//METRO PARA PÉS
test('Converte 1 metro para pés', () => {
    expect(converterMetroParaPe(1)).toBeCloseTo(3.28084);
});
test('Converte 10 metros para pés', () => {
    expect(converterMetroParaPe(10)).toBeCloseTo(32.8084);
});
test('Converte 0 metros para pés', () => {
    expect(converterMetroParaPe(0)).toBe(0);
});



//PES PARA METRO
test('Converte 1 pé para metro', () => {
    expect(converterPeParaMetro(1)).toBeCloseTo(0.3048);
});
test('Converte 10 pés para metros', () => {
    expect(converterPeParaMetro(10)).toBeCloseTo(3.048);
});
test('Converte 0 pés para metros', () => {
    expect(converterPeParaMetro(0)).toBe(0);
});



//KM PARA MILHA
test('Converte 1 quilômetro para milha', () => {
    expect(converterKmParaMilha(1)).toBeCloseTo(0.621371);
});
test('Converte 10 quilômetros para milhas', () => {
    expect(converterKmParaMilha(10)).toBeCloseTo(6.21371);
});
test('Converte 0 quilômetros para milhas', () => {
    expect(converterKmParaMilha(0)).toBe(0);
});



//MILHA PARA KM
test('Converte 1 milha para quilômetro', () => {
    expect(converterMilhaParaKm(1)).toBeCloseTo(1.60934);
});
test('Converte 10 milhas para quilômetros', () => {
    expect(converterMilhaParaKm(10)).toBeCloseTo(16.0934);
});
test('Converte 0 milhas para quilômetros', () => {
    expect(converterMilhaParaKm(0)).toBe(0);
});



//CM PARA POLEGADA
test('Converte 1 centímetro para polegada', () => {
    expect(converterCmParaPolegada(1)).toBeCloseTo(0.393701);
});
test('Converte 10 centímetros para polegadas', () => {
    expect(converterCmParaPolegada(10)).toBeCloseTo(3.93701);
});
test('Converte 0 centímetros para polegadas', () => {
    expect(converterCmParaPolegada(0)).toBe(0);
});



//POLEGADA PARA CM
test('Converte 1 polegada para centímetros', () => {
    expect(converterPolegadaParaCm(1)).toBe(2.54);
});
test('Converte 10 polegadas para centímetros', () => {
    expect(converterPolegadaParaCm(10)).toBe(25.4);
});
test('Converte 0 polegadas para centímetros', () => {
    expect(converterPolegadaParaCm(0)).toBe(0);
});



//KG PARA LIBRA
test('Converte 1 quilograma para libras', () => {
    expect(converterKgParaLibra(1)).toBeCloseTo(2.20462);
});
test('Converte 10 quilogramas para libras', () => {
    expect(converterKgParaLibra(10)).toBeCloseTo(22.0462);
});
test('Converte 0 quilogramas para libras', () => {
    expect(converterKgParaLibra(0)).toBe(0);
});



//LIBRA PARA KG
test('Converte 1 libra para quilograma', () => {
    expect(converterLibraParaKg(1)).toBeCloseTo(0.453592);
});
test('Converte 10 libras para quilogramas', () => {
    expect(converterLibraParaKg(10)).toBeCloseTo(4.53592);
});
test('Converte 0 libras para quilogramas', () => {
    expect(converterLibraParaKg(0)).toBe(0);
});



//FAHRENHEIT PARA CELSIUS
test('Converte 1 fahrenheit para celsius', () => {
    expect(converterFahrenheitParaCelsius(1)).toBeCloseTo(-17.2222);
});
test('Converte 10 fahrenheit para celsius', () => {
    expect(converterFahrenheitParaCelsius(10)).toBeCloseTo(-12.2222);
});
test('Converte 0 fahrenheit para celsius', () => {
    expect(converterFahrenheitParaCelsius(0)).toBeCloseTo(-17.7778);
});



//CELSIUS PARA FAHRENHEIT
test('Converte 1 celsius para fahrenheit', () => {
    expect(converterCelsiusParaFahrenheit(1)).toBe(33.8);
});
test('Converte 10 celsius para fahrenheit', () => {
    expect(converterCelsiusParaFahrenheit(10)).toBe(50);
});
test('Converte 0 celsius para fahrenheit', () => {
    expect(converterCelsiusParaFahrenheit(0)).toBe(32);
});



//KELVIN PARA CELSIUS
test('Converte 1 kelvin para celsius', () => {
    expect(converterKelvinParaCelsius(1)).toBe(-272.15);
});
test('Converte 10 kelvin para celsius', () => {
    expect(converterKelvinParaCelsius(10)).toBe(-263.15);
});
test('Converte 0 kelvin para celsius', () => {
    expect(converterKelvinParaCelsius(0)).toBe(-273.15);
});



//CELSIUS PARA KELVIN
test('Converte 1 celsius para kelvin', () => {
    expect(converterCelsiusParaKelvin(1)).toBe(274.15);
});
test('Converte 10 celsius para kelvin', () => {
    expect(converterCelsiusParaKelvin(10)).toBe(283.15);
});
test('Converte 0 celsius para kelvin', () => {
    expect(converterCelsiusParaKelvin(0)).toBe(273.15);
});



//REAL PARA DOLAR
test('Converte 10 reais para dólar (cotação 10.00)', () => {
    expect(converterRealParaDolar(10, 10)).toBe(1);
});
test('Converte 100 reais para dólar (cotação 10.00)', () => {
    expect(converterRealParaDolar(100, 10)).toBe(10);
});
test('Converte 0 reais para dólar', () => {
    expect(converterRealParaDolar(0, 5)).toBe(0);
});



//DOLAR PARA REAL
test('Converte 1 dólar para real (cotação 10.00)', () => {
    expect(converterDolarParaReal(1, 10)).toBe(10);
});
test('Converte 10 dólares para reais (cotação 5.00)', () => {
    expect(converterDolarParaReal(10, 5)).toBe(50);
});
test('Converte 0 dólares para reais', () => {
    expect(converterDolarParaReal(0, 5)).toBe(0);
});



//REAL PARA EURO
test('Converte 1 real para euro (cotação 1.00)', () => {
    expect(converterRealParaEuro(1, 1)).toBe(1);
});
test('Converte 10 reais para euro (cotação 10.00)', () => {
    expect(converterRealParaEuro(10, 10)).toBe(1);
});
test('Converte 0 reais para euro', () => {
    expect(converterRealParaEuro(0, 5)).toBe(0);
});



//EURO PARA REAL
test('Converte 1 euro para real (cotação 1.00)', () => {
    expect(converterEuroParaReal(1, 1)).toBe(1);
});
test('Converte 10 euros para reais (cotação 10.00)', () => {
    expect(converterEuroParaReal(10, 10)).toBe(100);
});
test('Converte 0 euros para reais', () => {
    expect(converterEuroParaReal(0, 5)).toBe(0);
});



//REAL PARA WON
test('Converte 1 real para won (cotação 1.00)', () => {
    expect(converterRealParaWon(1, 1)).toBe(1);
});
test('Converte 10 reais para won (cotação 10.00)', () => {
    expect(converterRealParaWon(10, 10)).toBe(1);
});
test('Converte 0 reais para won', () => {
    expect(converterRealParaWon(0, 0.004)).toBe(0);
});



//WON PARA REAL
test('Converte 1 won para real (cotação 1.00)', () => {
    expect(converterWonParaReal(1, 1)).toBe(1);
});
test('Converte 100 wons para reais (cotação 100.00)', () => {
    expect(converterWonParaReal(100, 100)).toBe(10000);
});
test('Converte 0 wons para reais', () => {
    expect(converterWonParaReal(0, 0.004)).toBe(0);
});



//HORAS PARA MILISSEGUNDOS
test('Converte 1 hora para milissegundos', () => {
    expect(converterHorasParaMs(1)).toBe(3600000);
});
test('Converte 10 horas para milissegundos', () => {
    expect(converterHorasParaMs(10)).toBe(36000000);
});
test('Converte 0 horas para milissegundos', () => {
    expect(converterHorasParaMs(0)).toBe(0);
});



//MILISSEGUNDOS PARA HORAS
test('Converte 60 milissegundos para horas', () => {
    expect(converterMsParaHoras(60)).toBeCloseTo(0.0000166667);
});
test('Converte 600 milissegundos para horas', () => {
    expect(converterMsParaHoras(600)).toBeCloseTo(0.000166667);
});
test('Converte 0 milissegundos para horas', () => {
    expect(converterMsParaHoras(0)).toBe(0);
});



// test('', () => {
//     expect(()).toBe();
// });