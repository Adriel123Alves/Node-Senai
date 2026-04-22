const calcPe = require('./calcPe');

test("Subtrair 5000 e 1200, retornar 3800: ",() => {
    expect(calcPe(5000,1200)).toBe(3800);
})

test("Subtrair 3000 e 3000, retornar 0: ",() => {
    expect(calcPe(3000,3000)).toBe(0);
})

test("Subtrair 4500 e 2000, retornar 2500: ",() => {
    expect(calcPe(4500,2000)).toBe(2500);
})