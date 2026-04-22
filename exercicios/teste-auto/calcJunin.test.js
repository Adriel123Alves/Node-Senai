const calcJunin = require('./calcJunin');

test("Dividir 3000 por 20, retornar 150: ",() => {
    expect(calcJunin(3000,20)).toBe(150);
})

test("Dividir 4500 por 22, retornar 204.55: ",() => {
    expect(calcJunin(4500,22)).toBe(204.55);
})

test("Dividir 2000 por 10, retornar 200: ",() => {
    expect(calcJunin(2000,10)).toBe(200);
})