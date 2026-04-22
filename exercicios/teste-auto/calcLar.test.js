const calcLar = require('./calcLar');

test("Subtrair 100 e 60, retornar 40: ",() => {
    expect(calcLar(100,60)).toBe(40);
})

test("Subtrair 250 e 180, retornar 70: ",() => {
    expect(calcLar(250,180)).toBe(70);
})

test("Subtrair 80 e 80, retornar 0: ",() => {
    expect(calcLar(80,80)).toBe(0);
})