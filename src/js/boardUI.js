export function CreateGameBoard(){
    let gameBoard = document.createElement('div');
    gameBoard.classList.add('board');

    let namePlace = document.createElement('div');
    namePlace.classList.add('name');
    namePlace.textContent = "Player";

    gameBoard.appendChild(namePlace);

    let tiles = document.createElement('div');
    tiles.classList.add('tiles');

    let gridSize = 10;

    for(let y = 0; y < gridSize; y++){
        for(let x = 0; x < gridSize; x++){
            let tile = document.createElement('div');
            tile.classList.add('tile');
            tile.dataset.row = y;
            tile.dataset.col = x;
            tiles.appendChild(tile);
        }
    }

    gameBoard.appendChild(tiles);
    return gameBoard;

}

export function updateBoardName(board,name){
    board.querySelector(".name").textContent = name;
}