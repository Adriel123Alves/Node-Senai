const calcDev = require('./calcDev');

test("Calcular 10 clts, 5 estagiarios e 3 pjs, retornar 18: ",() => {
    expect(calcDev(10,5,3)).toBe(18);
})

test("Calcular 25 clts, 10 estagiarios e 15 pjs, retornar 50: ",() => {
    expect(calcDev(25,10,15)).toBe(50);
})

test("Calcular 8 clts, 2 estagiarios e 0 pjs, retornar 10: ",() => {
    expect(calcDev(8,2,0)).toBe(10);
})