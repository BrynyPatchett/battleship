 export default class Player{

    constructor(playerName,gameBoard){
        this.playerName = playerName;
        this.gameBoard = gameBoard;
    }

    MakeMove(coords){
        try{
            return this.gameBoard.ReceiveAttack(coords);
        }
        catch{
            return -1;
        }
    }
}