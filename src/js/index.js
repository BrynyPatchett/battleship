import Gameboard from "./gameboard.js";
import Player from "./player.js";
import Computer from "./computer.js";
import { CreateGameBoard, updateBoardName } from "./board.js";
let currentDirection;
let currentLocations = [];
let ships = [5, 4, 3, 3, 2];
let selectedShipIndex = 0;
let currentPlayer = 0;


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
  removeHoverFromTiles(playerLeftTiles);
  //list of ships, add click event, then remove after each one placed
  currentDirection = 0;
  //add hover selection UI to boatin
  initaliseGame(playerRightTiles, gameboardRight, 0);
});

selectedPvP.addEventListener("click", () => {
  console.log("selected Player Versus Player");
  console.log("Display player names");
  modal.style.display = "none";
  currentDirection = 0;
  removeHoverFromTiles(playerLeftTiles);
  addHoverPlacementToBoard(playerRightTiles, 1);
});

function removeHoverFromTiles(tiles) {
  [...tiles.children].forEach((element) => {
    element.classList.add("disabled");
  });
}

function addHoverToTiles(tiles) {
  [...tiles.children].forEach((element) => {
    element.classList.remove("disabled");
  });
}
let test;

function initaliseGame(tiles, gameBoard, isPvP) {
  [...tiles.children].forEach((element) => {
    element.addEventListener(
      "mouseover",
      (test = function () {
        hoverPlacementPreview(element, tiles);
      })
    );
    element.addEventListener("click", () => {
      let coords = { x: +element.dataset.col, y: +element.dataset.row };
      if (
        gameBoard.AddShipToGrid(
          ships[selectedShipIndex],
          coords,
          currentDirection
        )
      ) {
        currentLocations.forEach((element) => {
          element.classList.add("occupied");
        });
        selectedShipIndex++;
        if (selectedShipIndex === ships.length) {
          console.log("removing click from" + element);
          //replacing elements removes all listeners

          isPvP
            ? console.log(
                "PvP Move onto next player, show blank screen,tear down events and add to other grid"
              )
            : startPvEgame(tiles);
        }
      }
    });
  });
}

function hoverPlacementPreview(element, tiles) {
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

function startPvEgame(tiles) {
  [...tiles.children].forEach((x) => {
    let clone = x.cloneNode(true);
    x.parentNode.replaceChild(clone, x);
  });
  removeHoverFromTiles(playerRightTiles);
  addHoverToTiles(playerLeftTiles);
  //simulate Game


  let computer = new Computer("Computer", gameboardLeft);
  computer.placeRandomShipsOnBoard();
  console.log(computer.gameBoard);
  let player = new Player("Player", computer.gameBoard);
  console.log(player);
  computer = new Computer("Computer", gameboardRight);

  console.log(computer);

  [...playerLeftTiles.children].forEach((element) => {
    element.addEventListener("click", () => {
      console.log(player.gameBoard.AllSunk())
      console.log(computer.gameBoard.AllSunk())
      if (
        player.gameBoard.AllSunk() !== true &&
        computer.gameBoard.AllSunk() !== true
      ) {
        let coords = { x: +element.dataset.col, y: +element.dataset.row };
        let move = player.MakeMove(coords);
        if (move === 1) {
          element.classList.add("hit");
        } else if(move === 0) {
          element.classList.add("miss");
        }
        else{
          console.log("Bad Move");
          return
        }
        if (player.gameBoard.AllSunk()) {
          console.log(player.playerName + "Wins");
        }
        let pcMove = computer.MakeRandomMove();
        let shotTile = playerRightTiles.querySelector(`[data-row="${pcMove.coords.y}"][data-col="${pcMove.coords.x}"]`)
        if (pcMove.status === 1){
              shotTile.classList.add("hit");
            }else{
              shotTile.classList.add("miss");
            }
            if (computer.gameBoard.AllSunk()) {
               console.log(computer.playerName +  "Wins");
            }

      }
    });
  });

}