import Gameboard from "./gameboard.js";
import Player from "./player.js";
import Computer from "./computer.js";
import { CreateGameBoard, updateBoardName } from "./board.js";
let currentDirection;
let currentLocations = [];
let ships = [5, 4, 3, 3, 2];
let selectedShipIndex = 0;
let currentPlayer = 0;

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

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

let gameboardRight = new Gameboard(10);
let gameboardLeft = new Gameboard(10);

const gameInterface = document.querySelector(".game");
let playerLeftBoard = CreateGameBoard();
let playerRightBoard = CreateGameBoard();

gameInterface.insertBefore(playerLeftBoard, gameInterface.firstChild);
gameInterface.appendChild(playerRightBoard);
let playerLeftTiles = playerLeftBoard.querySelector(".tiles");
let playerRightTiles = playerRightBoard.querySelector(".tiles");

let selectedPvE = document.querySelector("#PvE");
let selectedPvP = document.querySelector("#PvP");

selectedPvE.addEventListener("click", () => {
  console.log("selected Player Versus Computer");
  modal.style.display = "none";
  updateBoardName(playerLeftBoard, "Computer");
  updateBoardName(playerRightBoard, "You");
  removeHoverFromBoard(playerLeftTiles);
  //list of ships, add click event, then remove after each one placed
  currentDirection = 0;
  //add hover selection UI to boatin
  addHoverPlacementToBoard(playerRightTiles,0);
});

selectedPvP.addEventListener("click", () => {
  console.log("selected Player Versus Player");
  console.log("Display player names");
  modal.style.display = "none";
  currentDirection = 0;
  removeHoverFromBoard(playerLeftTiles);
  addHoverPlacementToBoard(playerRightTiles,1);
});

function removeHoverFromBoard(tiles) {
  [...tiles.children].forEach((element) => {
    element.classList.add("disabled");
  });
}

function addHoverToBoard(tiles) {
  [...tiles.children].forEach((element) => {
    element.classList.remove("disabled");
  });
}


function addHoverPlacementToBoard(tiles,isPvP) {
  [...tiles.children].forEach((element) => {
    element.addEventListener("mouseover",()=>{
      hoverPlacementPreview(element,tiles);
    });
    element.addEventListener("click",()=>{
      let coords = { x: +element.dataset.col, y: +element.dataset.row };
     if(gameboardRight.AddShipToGrid(ships[selectedShipIndex],coords,currentDirection)){
      currentLocations.forEach((element) => {
        element.classList.add("occupied");
      });
      selectedShipIndex++;
      if(selectedShipIndex === ships.length){
        isPvP ? console.log("PvP Move onto next player, show blank screen,tear down events and add to other grid") : console.log("PvE Start Game set up, tear dwon events and start game loop");
      }
     }
    });
  });
}

function hoverPlacementPreview(element,tiles) {
  //remove hover placement from last location
  removeHoverPlacementToBoard();
  currentLocations = [];
  let coords = { x: +element.dataset.col, y: +element.dataset.row };
  if (currentDirection === 0) {
    currentLocations = getHorizontalPlacementTiles(coords, tiles);
  } else {
    currentLocations = getVericalPlacementTiles(coords, tiles);
  }
  //if the returned coords can fit a ship, mark tiles valid else mark tiles invalid
  if (currentLocations.length == ships[selectedShipIndex]) {
    currentLocations.forEach((element) => {
      element.classList.add("valid");
    });
  } else {
    currentLocations.forEach((element) => {
      element.classList.add("hit");
    });
  }
}

function removeHoverPlacementToBoard() {
  currentLocations.forEach((element) => {
    element.classList.remove("hit");
    element.classList.remove("valid");
  });
}

function getHorizontalPlacementTiles(coords, tiles) {
  let locations = [];
  for (let i = 0; i < ships[selectedShipIndex]; i++) {
    let x = coords.x + i;
    let tile = tiles.querySelector(`[data-row="${coords.y}"][data-col="${x}"]`);
    if (tile != null && !tile.classList.contains("occupied")) {
      locations.push(tile);
    }
  }
  console.log(locations);
  return locations;
}
function getVericalPlacementTiles(coords, tiles) {
  let locations = [];
  for (let i = 0; i < ships[selectedShipIndex]; i++) {
    let tile = tiles.querySelector(
      `[data-row="${coords.y + i}"][data-col="${coords.x}"]`
    );
    if (tile != null && !tile.classList.contains("occupied")) {
      locations.push(tile);
    }
  }
  return locations;
}

//choose type of game, PvP or PvE

// [...playerLeftTiles.children].forEach(element => {
//   element.addEventListener('click',()=>{
//     console.log(`x: ${element.dataset.col} y: ${element.dataset.row}`);
//     // element.classList.add("hit");
//   })
// });

// [...playerRightTiles.children].forEach(element => {
//   element.addEventListener('click',()=>{
//     console.log(`x: ${element.dataset.col} y: ${element.dataset.row}`);
//     // element.classList.add("miss");
//   })
// });

// let computer = new Computer("Computer", gameboardPC);
// let computer2 = new Computer("Computer2", gameboard);
// //place random ships on computer grid
// computer.placeRandomShipsOnBoard();
// computer2.placeRandomShipsOnBoard();

//simulate game

// while (
//   computer.gameBoard.AllSunk() !== true &&
//   computer2.gameBoard.AllSunk() !== true
// ) {

//   let pcMove = computer2.MakeRandomMove();
//   let shotTile = playerLeftTiles.querySelector(`[data-row="${pcMove.coords.y}"][data-col="${pcMove.coords.x}"]`)
//   if (pcMove.status === 1){
//     shotTile.classList.add("hit");
//   }else{
//     shotTile.classList.add("miss");
//   }
//   if (computer2.gameBoard.AllSunk()) {
//      console.log("Computer2 Wins");
//     break;
//   }

//    pcMove = computer.MakeRandomMove();
//    shotTile = playerRightTiles.querySelector(`[data-row="${pcMove.coords.y}"][data-col="${pcMove.coords.x}"]`)
//   if (pcMove.status === 1){
//     shotTile.classList.add("hit");
//   }else{
//     shotTile.classList.add("miss");
//   }

//   if (computer.gameBoard.AllSunk()) {
//      console.log("Computer Wins");
//     break;
//   }
// }


