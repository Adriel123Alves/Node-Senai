const somar = require('./somar');

test("Somar 2 e 3, retornar 5: ",() => {
    expect(somar(2,3)).toBe(5);
})

test("Somar 0 e 0, retornar 0: ",() => {
    expect(somar(0,0)).toBe(0);
})