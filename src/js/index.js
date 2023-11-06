import Gameboard from "./gameboard.js";
import Player from "./player.js";
import Computer from "./computer.js";
import { CreateGameBoard, updateBoardName } from "./boardUI.js";
import Game from "./game";
import { selectGameModal, playerWinModal } from "./modals";

let currentDirection;
let currentLocations = [];
let ships = [5, 4, 3, 3, 2];
let selectedShipIndex = 0;

const modal = document.querySelector(".modal");
let modalContent = selectGameModal();
modal.appendChild(modalContent);

let gameboardRight = new Gameboard(10);
let gameboardLeft = new Gameboard(10);

const gameInterface = document.querySelector(".game");
let playerLeftBoard = CreateGameBoard();
let playerRightBoard = CreateGameBoard();

gameInterface.insertBefore(playerLeftBoard, gameInterface.firstChild);
gameInterface.appendChild(playerRightBoard);
let playerLeftTiles = playerLeftBoard.querySelector(".tiles");
let playerRightTiles = playerRightBoard.querySelector(".tiles");

let selectedPvE = modalContent.querySelector("#PvE");
let selectedPvP = modalContent.querySelector("#PvP");
selectedPvE.addEventListener("click", initPvEGame);
selectedPvP.addEventListener("click", initPvPGame);





function initPvEGame() {
  modal.style.display = "none";
  updateBoardName(playerLeftBoard, "Computer");
  updateBoardName(playerRightBoard, "You");
  removeHoverFromTiles(playerLeftTiles);
  //list of ships, add click event, then remove after each one placed
  currentDirection = 0;
  //add hover selection UI to boatin
  initaliseGame(playerRightTiles, gameboardRight, 0);
}

function initPvPGame() {
  // console.log("selected Player Versus Player");
  // console.log("Display player names");
  // modal.style.display = "none";
  // currentDirection = 0;
  // removeHoverFromTiles(playerLeftTiles);
  // addHoverPlacementToBoard(playerRightTiles, 1);
}

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

function initaliseGame(tiles, gameBoard, isPvP) {
document.addEventListener("keydown",rotateShip);

  [...tiles.children].forEach((element) => {
    element.addEventListener("mouseover", () => {
      hoverPlacementPreview(element, tiles);
    });
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
  // currentLocations = [];
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

  if(currentLocations !== undefined)
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
  let player = new Player("You", computer.gameBoard);
  computer = new Computer("Computer", gameboardRight);

  let game = new Game(player, computer);

  [...playerLeftTiles.children].forEach((element) => {
    element.addEventListener("click", () => {
      //make Player Move
      let coords = { x: +element.dataset.col, y: +element.dataset.row };
      let move = game.MakeMove(coords);
      if (move === 2) {
        element.classList.add("hit");
        displayEndScreen(player.playerName);
        return;
      } else if (move === 1) {
        element.classList.add("hit");
      } else if (move === 0) {
        element.classList.add("miss");
      } else {
        return;
      }
      //make AI move
      let pcMoveCoords = computer.GenerateRandomMove();
      move = game.MakeMove(pcMoveCoords);
      let shotTile = playerRightTiles.querySelector(
        `[data-row="${pcMoveCoords.y}"][data-col="${pcMoveCoords.x}"]`
      );
      if (move === 2) {
        shotTile.classList.add("hit");
        displayEndScreen(computer.playerName);
        return;
      } else if (move === 1) {
        shotTile.classList.add("hit");
      } else if (move === 0) {
        shotTile.classList.add("miss");
      } else {
        return;
      }
    });
  });
}

function displayEndScreen(player) {
  modal.removeChild(modal.firstChild);
  let winnerDiv = playerWinModal(player);
  modal.appendChild(winnerDiv);
  modal.style.display = "flex";
  winnerDiv.querySelector("#newgame");
  winnerDiv.addEventListener("click", resetGame);
}

function resetGame() {
  playerLeftBoard = CreateGameBoard();
  playerRightBoard = CreateGameBoard();
 
 
  gameInterface.firstElementChild.remove();
  gameInterface.lastElementChild.remove();
 
 
   gameInterface.insertBefore(playerLeftBoard, gameInterface.firstChild);
   gameInterface.appendChild(playerRightBoard);
   playerLeftTiles = playerLeftBoard.querySelector(".tiles");
   playerRightTiles = playerRightBoard.querySelector(".tiles");
 
   modal.firstElementChild.remove();
   modal.appendChild(modalContent);
 
   gameboardRight = new Gameboard(10);
   gameboardLeft = new Gameboard(10);
 
   selectedShipIndex = 0;
 

}


function rotateShip(e){
  console.log(e.code === "Space");
  if(currentDirection === 0){
    currentDirection = 1;
  }
  else{
    currentDirection = 0;
  }
  if(currentLocations.length > 0){
    
    let currentLocation = currentLocations[0];
    hoverPlacementPreview(currentLocation,playerRightTiles);
  }
}


