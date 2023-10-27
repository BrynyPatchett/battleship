import Ship from "./ship";

export default class Gameboard {
  ships = [];
  constructor(gridSize) {
    this.grid = new Array(gridSize);
    this.gridSize = gridSize;
    for (let i = 0; i < gridSize; i++) {
      this.grid[i] = Array(gridSize).fill(0);
    }
  }
  //direction 1 = veritcal, 0 = horizontal
  AddShipToGrid(shiplength, coords, direction) {
    if (direction === 1) {
      if (this.validVerticalInput(coords, shiplength) === false) {
        return false;
      }
      this.ships.push(new Ship(shiplength));
      let ship = this.ships[this.ships.length - 1];
      this.placeShipVertical(coords, ship, this.ships.length);
    } else {
      if (this.validHorizontalInput(coords, shiplength) === false) {
        return false;
      }
      this.ships.push(new Ship(shiplength));
      let ship = this.ships[this.ships.length - 1];
      this.placeShipHorizontal(coords, ship, this.ships.length);
    }
    return true;
  }
  //worry ship placement later
  // isValidPlacement(){}

  placeShipHorizontal(coords, ship, shipid) {
    for (let i = 0; i < ship.length; i++) {
      this.grid[coords.y][coords.x + i] = shipid;
    }
  }
  placeShipVertical(coords, ship, shipid) {
    for (let i = 0; i < ship.length; i++) {
      this.grid[coords.y + i][coords.x] = shipid;
    }
  }

  AllSunk() {
    this.ships.forEach((x) => {
      if (x.isSunk() == false) {
        return false;
      }
    });
    return true;
  }

  validHorizontalInput(coords, length) {
    for (let i = 0; i < length; i++) {
      if(this.validInput(coords.y, coords.x + i) === false){
        return false;
      }
    }
    return true;
  }
  validVerticalInput(coords, length) {
    for (let i = 0; i < length; i++) {
        if(this.validInput(coords.y + i, coords.x) === false){
        return false;
      }
    }
    return true;
  }

  validInput(y, x) {
    if (
      x >= this.gridSize ||
      x < 0 ||
      y >= this.gridSize ||
      y < 0 ||
      this.grid[y][x] !== 0
    ) {
      return false;
    }
    return true;
  }
}
