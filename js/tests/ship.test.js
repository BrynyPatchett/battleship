import Ship from '../ship'

describe('Ship refelects passed variables', () =>{
    test('Ship with 2 length', () => {
        expect(new Ship(2)).toEqual({length:2, hits:0})
    });

    test('Ship with 2 length', () => {
        expect(new Ship(2)).toEqual({length:2, hits:0})
    });
});



describe('Ship damage reflected on Hit call', () =>{
    test('Ship hit and takes damage', () => {
        let ship = new Ship(2);
        ship.hit();
        expect(ship).toEqual({length:2,hits:1});
    })
});

describe('Ship damage reflected on Hit calls ', () =>{

    test('Ship hit and takes damage', () => {
        let ship = new Ship(2);
        expect(ship.isSunk()).toBe(false);
    })
    
    test('Ship hit and takes damage', () => {
        let ship = new Ship(2);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    })
});