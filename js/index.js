import Gameboard from "./gameboard.js";
import Player from "./player.js";
import Computer from "./computer.js";


let compWins = 0;
let computer2Wins = 0;

for (let i = 0; i < 100; i++) {
  let coordi = 0;
  let gameboard = new Gameboard(10);

let shiplength = 2;
let coords = { x: 0, y: 0 };
gameboard.AddShipToGrid(shiplength, coords, 0);

shiplength = 3;
coords = { x: 6, y: 4 };
gameboard.AddShipToGrid(shiplength, coords, 1);

shiplength = 3;
coords = { x: 6, y: 7 };
gameboard.AddShipToGrid(shiplength, coords, 1);

shiplength = 4;
coords = { x: 0, y: 3 };
gameboard.AddShipToGrid(shiplength, coords, 0);

shiplength = 5;
coords = { x: 0, y: 9 };
gameboard.AddShipToGrid(shiplength, coords, 0);

let gameboardPC = new Gameboard(10);

shiplength = 2;
coords = { x: 0, y: 0 };
gameboardPC.AddShipToGrid(shiplength, coords, 0);

shiplength = 3;
coords = { x: 6, y: 4 };
gameboardPC.AddShipToGrid(shiplength, coords, 1);

shiplength = 3;
coords = { x: 6, y: 7 };
gameboardPC.AddShipToGrid(shiplength, coords, 1);

shiplength = 4;
coords = { x: 0, y: 3 };
gameboardPC.AddShipToGrid(shiplength, coords, 0);

shiplength = 5;
coords = { x: 0, y: 9 };
gameboardPC.AddShipToGrid(shiplength, coords, 0);


let computer = new Computer("Computer", gameboardPC);
let computer2 = new Computer("Computer2", gameboard);


  while (
    computer.gameBoard.AllSunk() !== true &&
    computer2.gameBoard.AllSunk() !== true
  ) {
    computer2.MakeRandomMove();
    if (computer2.gameBoard.AllSunk()) {
       console.log("Computer2 Wins");
       computer2Wins++;
      break;
    }

    computer.MakeRandomMove();
    if (computer.gameBoard.AllSunk()) {
      console.log("Computer Wins");
      compWins++;
      break;
    }

    coordi++;
  }
}

console.log(`Computer Wins: ${compWins}, Computer2 Wins: ${computer2Wins}`);