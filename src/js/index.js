import Gameboard from "./gameboard.js";
import Player from "./player.js";
import Computer from "./computer.js";
import boardUI from "./board.js";


// let compWins = 0;
// let computer2Wins = 0;

// for (let i = 0; i < 100; i++) {
//   let coordi = 0;
//   let gameboard = new Gameboard(10);
//   let gameboardPC = new Gameboard(10);

// let shiplength = 2;
// let coords = { x: 0, y: 0 };
// gameboard.AddShipToGrid(shiplength, coords, 0);
// gameboardPC.AddShipToGrid(shiplength, coords, 0);

// shiplength = 3;
// coords = { x: 6, y: 4 };
// gameboard.AddShipToGrid(shiplength, coords, 1);
// gameboardPC.AddShipToGrid(shiplength, coords, 1);

// shiplength = 3;
// coords = { x: 6, y: 7 };
// gameboard.AddShipToGrid(shiplength, coords, 1);
// gameboardPC.AddShipToGrid(shiplength, coords, 1);

// shiplength = 4;
// coords = { x: 0, y: 3 };
// gameboard.AddShipToGrid(shiplength, coords, 0);
// gameboardPC.AddShipToGrid(shiplength, coords, 1);

// shiplength = 5;
// coords = { x: 0, y: 9 };
// gameboard.AddShipToGrid(shiplength, coords, 0);
// gameboardPC.AddShipToGrid(shiplength, coords, 1);



// let computer = new Computer("Computer", gameboardPC);
// let computer2 = new Computer("Computer2", gameboard);


//   while (
//     computer.gameBoard.AllSunk() !== true &&
//     computer2.gameBoard.AllSunk() !== true
//   ) {
//     computer2.MakeRandomMove();
//     if (computer2.gameBoard.AllSunk()) {
//        console.log("Computer2 Wins");
//        computer2Wins++;
//       break;
//     }

//     computer.MakeRandomMove();
//     if (computer.gameBoard.AllSunk()) {
//       console.log("Computer Wins");
//       compWins++;
//       break;
//     }

//     coordi++;
//   }
// }

// console.log(`Computer Wins: ${compWins}, Computer2 Wins: ${computer2Wins}`);


let gameboard = new Gameboard(10);
let gameboardPC = new Gameboard(10);


const gameInterface = document.querySelector(".game");
let playerLeftBoard = new boardUI();
let playerRightBoard = new boardUI();

gameInterface.insertBefore(playerLeftBoard,gameInterface.firstChild)
gameInterface.appendChild(playerRightBoard);
let playerLeftTiles = playerLeftBoard.querySelector('.tiles');
let playerRightTiles = playerRightBoard.querySelector('.tiles');

[...playerLeftTiles.children].forEach(element => {
  element.addEventListener('click',()=>{
    console.log(`x: ${element.dataset.col} y: ${element.dataset.row}`);
    // element.classList.add("hit");
  })
});

[...playerRightTiles.children].forEach(element => {
  element.addEventListener('click',()=>{
    console.log(`x: ${element.dataset.col} y: ${element.dataset.row}`);
    // element.classList.add("miss");
  })
});

let computer = new Computer("Computer", gameboardPC);
let computer2 = new Computer("Computer2", gameboard);
//place random ships on computer grid
computer.placeRandomShipsOnBoard();
computer2.placeRandomShipsOnBoard();

//simulate game

  while (
    computer.gameBoard.AllSunk() !== true &&
    computer2.gameBoard.AllSunk() !== true
  ) {

    let pcMove = computer2.MakeRandomMove();
    let shotTile = playerLeftTiles.querySelector(`[data-row="${pcMove.coords.y}"][data-col="${pcMove.coords.x}"]`)
    if (pcMove.status === 1){
      shotTile.classList.add("hit");
    }else{
      shotTile.classList.add("miss");
    }
    if (computer2.gameBoard.AllSunk()) {
       console.log("Computer2 Wins");
      break;
    }

    
     pcMove = computer.MakeRandomMove();
     shotTile = playerRightTiles.querySelector(`[data-row="${pcMove.coords.y}"][data-col="${pcMove.coords.x}"]`)
    if (pcMove.status === 1){
      shotTile.classList.add("hit");
    }else{
      shotTile.classList.add("miss");
    }
 
    if (computer.gameBoard.AllSunk()) {
       console.log("Computer Wins");
      break;
    }
  }



