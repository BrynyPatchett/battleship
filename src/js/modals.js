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


function namesModal() {
  let nameTitleDiv = modalTitle("Enter Player Names");

  let continueButton = modalButton("Play Game", "playgame");


  let p1Label= document.createElement("label");
  p1Label.classList.add("label");
  p1Label.textContent = "Player One Name"
  p1Label.htmlFor = "PlayerOneName"

  let p1input = document.createElement("input");
  p1input.placeholder = "Player One"
  p1input.id = "playeroneinput"
  p1input.Name = "PlayerOneName"
  p1input.value = "Player One"

  let p2Label= document.createElement("label");
  p2Label.classList.add("label");
  p2Label.textContent = "Player Two Name"
  p2Label.htmlFor = "PlayerTneName"

  let p2input = document.createElement("input");
  p2input.placeholder = "Player Two"
  p2input.id = "playertwoinput"
  p1input.Name = "PlayerTwoName"
  p2input.value = "Player Two"



  let modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  modalContent.appendChild(nameTitleDiv);
  modalContent.appendChild(p1Label);
  modalContent.appendChild(p1input);
  modalContent.appendChild(p2Label);
  modalContent.appendChild(p2input);
  modalContent.appendChild(continueButton);


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

export { selectGameModal, playerWinModal, namesModal };
