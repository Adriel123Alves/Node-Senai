const calcVit = require('./calcVit');

test("Calcular 10 vitorias e 5 empates, retornar 9 pontos: ",() => {
    expect(calcVit(10,5)).toBe(35);
})

test("Calcular 3 vitorias 2 empates, retornar 11 pontos: ",() => {
    expect(calcVit(3,2)).toBe(11);
})

test("Calcular 0 vitorias 7 empates, retornar 7 pontos: ",() => {
    expect(calcVit(0,7)).toBe(7);
})