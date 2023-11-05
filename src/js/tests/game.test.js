import Game from '../game';
import Player from '../player'
import Computer from '../computer';

describe('Game Initialisation', () => {

    test('Has two players', () => {
        let p1 = new Player('Player 1');
        let p2 = new Player('Player 2');
        let game = new Game(p1,p2);
        expect(game.players).toEqual([p1,p2]);
    });
    test('Has one player and computer player', () => {
        let p1 = new Player('Player 1');
        let p2 = new Computer('Player 2');
        let game = new Game(p1,p2);
        expect(game.players).toEqual([p1,p2]);
    });

    // test('Has two players and PVP', () => {
    //     let p1 = new Player('Player 1');
    //     let p2 = new Player('Player 2');
    //     let game = new Game(p1,p2,true);
    //     expect(game.players).toEqual([p1,p2]);
    //     expect(game.isPVP).toEqual(true);
    // });

    // test('Has one player and computer player and Is player versus computer', () => {
    //     let p1 = new Player('Player 1');
    //     let p2 = new Computer('Player 2');
    //     let game = new Game(p1,p2,false);
    //     expect(game.players).toEqual([p1,p2]);
    //     expect(game.isPVP).toEqual(false);
    // });
})