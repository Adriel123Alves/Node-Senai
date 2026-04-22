const parCalc = require('./parCalc');

test("Calcular 120 vezes 10 , retornar 1200: ",() => {
    expect(parCalc(120,10)).toBe(1200);
})

test("Calcular 85 vezes 5, retornar 425: ",() => {
    expect(parCalc(85,5)).toBe(425);
})

test("Calcular 199,90 vezes 3, retornar 599,70: ",() => {
    expect(parCalc(199.90,3)).toBe(599.70);
})