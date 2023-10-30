import Player from "../player";
import Gameboard from "../gameboard";

describe("Player initialisation", () => {
  test("Player has correct name and reference to gameboard it is playing on", () => {
    let playerName = "Test";
    let gameBoard = new Gameboard(2);
    let player = new Player(playerName, gameBoard)
    expect(player.playerName).toEqual("Test");
    expect(player.gameBoard.grid).toEqual([[0,0],[0,0]]);
  });
});


describe("Player makes moves on board", () => {
    test("GameBoard Reflects players move (hit)", () => {
      let playerName = "Test";
      let gameBoard = new Gameboard(10);
      gameBoard.AddShipToGrid(2,{x:0,y:0},0)
      let player = new Player(playerName, gameBoard);
      expect(player.MakeMove({x:0,y:0})).toBe(1);
      expect(player.gameBoard.grid[0]).toEqual([-1,1,0,0,0,0,0,0,0,0]);
      expect(player.gameBoard.ships[0].hits).toEqual(1);
    });

    test("GameBoard Reflects players moves (hit and sink)", () => {
        let playerName = "Test";
        let gameBoard = new Gameboard(10);
        gameBoard.AddShipToGrid(2,{x:0,y:0},0)
        let player = new Player(playerName, gameBoard);
        expect(player.MakeMove({x:0,y:0})).toBe(1);
        expect(player.gameBoard.grid[0]).toEqual([-1,1,0,0,0,0,0,0,0,0]);
        expect(player.MakeMove({x:1,y:0})).toBe(1);
        expect(player.gameBoard.grid[0]).toEqual([-1,-1,0,0,0,0,0,0,0,0]);
        expect(player.gameBoard.ships[0].hits).toEqual(2);
        expect(player.gameBoard.ships[0].isSunk()).toBe(true);
      });

      test("Player recieves false Make Move if attemping to use same coord as previous shot", () => {
        let playerName = "Test";
        let gameBoard = new Gameboard(10);
        gameBoard.AddShipToGrid(2,{x:0,y:0},0)
        let player = new Player(playerName, gameBoard);
        expect(player.MakeMove({x:0,y:0})).toBe(1);
        expect(player.gameBoard.grid[0]).toEqual([-1,1,0,0,0,0,0,0,0,0]);
        expect(player.MakeMove({x:0,y:0})).toBe(-1);
        expect(player.gameBoard.grid[0]).toEqual([-1,1,0,0,0,0,0,0,0,0]);
      });

      test("Player recieves -1 Make Move if attemping to use out of board shot", () => {
        let playerName = "Test";
        let gameBoard = new Gameboard(10);
        gameBoard.AddShipToGrid(2,{x:0,y:0},0)
        let player = new Player(playerName, gameBoard);
        expect(player.MakeMove({x:-1,y:-1})).toBe(-1);
      });

      test("Player recieves 0 Make Move if miss", () => {
        let playerName = "Test";
        let gameBoard = new Gameboard(10);
        gameBoard.AddShipToGrid(2,{x:0,y:0},0)
        let player = new Player(playerName, gameBoard);
        expect(player.MakeMove({x:5,y:5})).toBe(0);
      });

    
  });
