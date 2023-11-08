import Gameboard from "./gameboard.js";
import Player from "./player.js";
import Computer from "./computer.js";
import { CreateGameBoard, updateBoardName } from "./boardUI.js";
import Game from "./game";
import { selectGameModal, playerWinModal,namesModal } from "./modals";

let currentDirection;
let currentLocations = [];
let ships = [5, 4, 3, 3, 2];
let selectedShipIndex = 0;
let currentPlayer = 0;
let currentTiles;
let enemyTiles;
let game;
let inputDisabled = false;
let playerNames = ["Player One","Player Two"]

const modal = document.querySelector(".modal");
let modalContent = selectGameModal();
modal.appendChild(modalContent);

const turnButton = document.querySelector("#next-turn");

const controlMessage = document.querySelector(".control-message");


turnButton.addEventListener('click',()=>{
 turnButton.style.display = "none";
  inputDisabled = false;
 showOccupied(enemyTiles);
   addHoverToTiles(currentTiles);
})

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
selectedPvP.addEventListener("click", displayNameModal);

function displayNameModal(){
  modalContent.style.display = "none";
  let namesSelector = namesModal();
  modal.appendChild(namesSelector);
 let playerOneName = namesSelector.querySelector("#playeroneinput")
  let playerTwoName = namesSelector.querySelector("#playertwoinput")

  namesSelector.querySelector("#playgame").addEventListener("click",()=>{
    let p1Name = playerOneName.value;
    let p2Name = playerTwoName.value;
    if(!/\S/.test(p1Name)){
      p1Name = "Player One"
    }
    if(!/\S/.test(p2Name)){
      p2Name = "Player Two"
    }
    playerNames = [p1Name,p2Name];
    modal.removeChild(modal.lastElementChild);
    modalContent.style.display = "flex";
    initPvPGame();
  });
  
}


function initPvEGame() {
  modal.style.display = "none";

  updateBoardName(playerRightBoard, "You");
  updateBoardName(playerLeftBoard, "Computer");
  playerNames[0] = "";
  removeHoverFromTiles(playerLeftTiles);
  //list of ships, add click event, then remove after each one placed
  currentDirection = 0;
  //add hover selection UI to boatin
  initaliseGame(playerRightTiles, gameboardRight, 0);
}

function initPvPGame() {
  updateBoardName(playerRightBoard, playerNames[0]);
  updateBoardName(playerLeftBoard, playerNames[1]);
  modal.style.display = "none";
  currentDirection = 0;
  currentPlayer =0;
  removeHoverFromTiles(playerLeftTiles);
  currentTiles = playerRightTiles;
  initaliseGame(playerRightTiles, gameboardRight, 1);
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
   currentTiles = tiles;
  document.addEventListener("keydown", rotateShip);
  controlMessage.style.display = "flex";
  controlMessage.textContent = playerNames[currentPlayer] + " Click to place ship. Press 'space' to rotate.";

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
          document.removeEventListener("keydown", rotateShip);
     
          if (isPvP > 0) {
              removeHoverPlacementToBoard(tiles)
            //if PvP = 1, first player setup complete setup second player, else ,play PvP game
            if (isPvP === 1) {
              currentLocations = [];
              removeHoverFromTiles(playerRightTiles);
              //list of ships, add click event, then remove after each one placed
              currentDirection = 0;
              //add hover selection UI to boatin
              selectedShipIndex = 0;
              hideOccupied(playerRightTiles);
              resetBoard(tiles);
              currentPlayer = 1;
              initaliseGame(playerLeftTiles, gameboardLeft, 2);
            } else {
              console.log("startPvPgame(tiles)");
              startPvPgame();
            }
          } else {
            startPvEgame(tiles);
          }
        }
      }
    });
  });
}

function hoverPlacementPreview(element, tiles) {
  //remove hover placement from last location

  removeHoverPlacementToBoard();
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
  if (currentLocations !== undefined)
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

function startPvPgame() {
  controlMessage.style.display = "none";
  //get rid of placement event listeners
  resetBoard(playerRightTiles);
  resetBoard(playerLeftTiles);
  //add hover to tiles of first playerr
  removeHoverFromTiles(playerRightTiles);
   addHoverToTiles(playerLeftTiles);
   inputDisabled = true;
  let playerOne = new Player(playerNames[0], gameboardLeft);
  let playerTwo = new Player(playerNames[1], gameboardRight);
  currentPlayer = 0;
   game = new Game(playerOne, playerTwo);
   enemyTiles = playerRightTiles;
     currentTiles = playerLeftTiles;
   switchDisplay(enemyTiles, currentTiles);
    hideOccupied(playerLeftTiles);
    
    

  [...playerLeftTiles.children].forEach((element) => {
    element.addEventListener("click", () => {
      if(!inputDisabled){
      enemyTiles = playerLeftTiles;
      currentTiles = playerRightTiles;
      PvPTurn(element, 0, playerOne,playerRightTiles,playerLeftTiles);
      }

    });
  });

  [...playerRightTiles.children].forEach((element) => {
    element.addEventListener("click", () => {
      if(!inputDisabled){
      enemyTiles = playerRightTiles;
      currentTiles = playerLeftTiles;
      PvPTurn(element, 1, playerTwo,playerLeftTiles,playerRightTiles);
    }
    });
  });
  
}

function startPvEgame(tiles) {
  controlMessage.style.display = "none";
  resetBoard(tiles);
  removeHoverFromTiles(playerRightTiles);
  addHoverToTiles(playerLeftTiles);
  //simulate Game

  let computer = new Computer("Computer", gameboardLeft);
  //generate sips on the blank board for the player to use
  computer.placeRandomShipsOnBoard();
  let player = new Player("You", computer.gameBoard);
  computer = new Computer("Computer", gameboardRight);

   game = new Game(player, computer);

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
      let pcMoveCoords = computer.MakeRandomMove();
      move = game.MakeMove(pcMoveCoords);

      let shotTile = playerRightTiles.querySelector(
        `[data-row="${pcMoveCoords.y}"][data-col="${pcMoveCoords.x}"]`
      );
      console.log("moveresult :"  + move + " coords : x : " + pcMoveCoords.x + ", y : " + pcMoveCoords.y);
      if (move === 2) {
        shotTile.classList.add("hit");
        displayEndScreen(computer.playerName);
        return;
      } else if (move === 1) {
        shotTile.classList.add("hit");
        console.log("ADDING HIT")
      } else if (move === 0) {
        console.log("ADDING MISS")
        shotTile.classList.add("miss");
      }
    });
  });
}

function PvPTurn(element, playerId, player) {

  if (currentPlayer === playerId) {
    let coords = { x: +element.dataset.col, y: +element.dataset.row };
    let move = game.MakeMove(coords);
    if (move === 2) {
      element.classList.add("hit");
      displayEndScreen(player.playerName);
      return;
    } else if (move === 1) {
      element.classList.add("hit");
      currentPlayer = ++currentPlayer % 2;
      switchDisplay(currentTiles, enemyTiles);
    } else if (move === 0) {
      element.classList.add("miss");
      currentPlayer = ++currentPlayer % 2;
      switchDisplay(currentTiles, enemyTiles);
    }
  }
  return;
}

function switchDisplay(currentTiles, enemyTiles) {
   inputDisabled = true;
   hideOccupied(currentTiles);
   removeHoverFromTiles(enemyTiles);
   removeHoverFromTiles(currentTiles);
   turnButton.style.display = "inline";
   turnButton.textContent = playerNames[currentPlayer] + "'s turn";
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

function rotateShip(e) {
  if (currentDirection === 0) {
    currentDirection = 1;
  } else {
    currentDirection = 0;
  }
  if (currentLocations.length > 0) {
    let currentLocation = currentLocations[0];
    hoverPlacementPreview(currentLocation, currentTiles);
  }
}

function resetBoard(tiles) {
  [...tiles.children].forEach((x) => {
    let clone = x.cloneNode(true);
    x.parentNode.replaceChild(clone, x);
  });
}


function hideOccupied(tiles) {
  tiles.querySelectorAll(".occupied").forEach((element) => {
    element.classList.remove("occupied");
    element.classList.add("occupied-hidden");
  });
}

function showOccupied(tiles) {
  tiles.querySelectorAll(".occupied-hidden").forEach((element) => {
    element.classList.remove("occupied-hidden");
    element.classList.add("occupied");
  });
}
