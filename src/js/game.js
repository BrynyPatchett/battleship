export default class Game {
  players = [];

  constructor(playerOne, playerTwo) {
    this.players.push(playerOne);
    this.players.push(playerTwo);
    this.currentPlayerIndex = 0;
    this.currentPlayer = this.players[this.currentPlayerIndex];
    
  }

  MakeMove(coords) {
    let moveResult;
    console.log(this.currentPlayer);
    let move = this.currentPlayer.MakeMove(coords);
    if (move === 1) {
      moveResult = 1;
      console.log(this.currentPlayer.gameBoard.AllSunk());
      if (this.currentPlayer.gameBoard.AllSunk() !== true) {
        this.switchPlayerTurn();
        return moveResult;
      }
      
      moveResult = 2;
    } else if (move === 0) {
      moveResult = 0;
      this.switchPlayerTurn();
    } else {
      console.log("Bad Move");
      moveResult = -1;
    }
    return moveResult;
  }

  switchPlayerTurn() {
    this.currentPlayerIndex = (++this.currentPlayerIndex) % 2;
    this.currentPlayer = this.players[this.currentPlayerIndex];
    console.log(this.currentPlayer.playerName + "TURN");
  }
}
