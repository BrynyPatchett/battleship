function selectGameModal() {
  let GameTitleDiv = modalTitle("Select Game Type");

  let pveButton = modalButton("Player vs Computer", "PvE");
  let pvpButton = modalButton("Player vs Player", "PvP");

  let modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  modalContent.appendChild(GameTitleDiv);
  modalContent.appendChild(pveButton);
  modalContent.appendChild(pvpButton);

  return modalContent;
}

function modalTitle(title) {
  let modalTitleDiv = document.createElement("div");
  modalTitleDiv.classList.add("game-choice");
  modalTitleDiv.textContent = title;
  return modalTitleDiv;
}

function modalButton(text, id) {
  let button = document.createElement("div");
  button.classList.add("game-button");
  button.textContent = text;
  button.id = id;
  return button;
}

function playerWinModal(playerName) {
    let winDiv = modalTitle(`${playerName} won!`);
    let newGameButton = modalButton("New Game", "newgame");

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
  
    modalContent.appendChild(winDiv);
    modalContent.appendChild(newGameButton);
  
    return modalContent;
}

export { selectGameModal, playerWinModal };
