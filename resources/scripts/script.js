'use strict';

const Player = (name) => {
  const playerName = name;
  return { playerName };
};

const GameSetUp = (function () {
  const elementCreator = function () {
    const playerTurn = document.querySelector('.player-turn');
    const pvpButton = document.querySelector('.pvp-btn');
    const pvcButton = document.querySelector('.pvc-btn');
    const board = document.querySelectorAll('.position-card');
    return { playerTurn, pvpButton, pvcButton, board };
  };

  return { elementCreator };
})();
GameSetUp.elementCreator();

const GameFlow = (function () {
  const playerObject = [];
  const winCondition = [
    ['pos1', 'pos2', 'pos3'],
    ['pos4', 'pos5', 'pos6'],
    ['pos7', 'pos8', 'pos9'],
    ['pos1', 'pos4', 'pos7'],
    ['pos2', 'pos5', 'pos8'],
    ['pos3', 'pos6', 'pos9'],
    ['pos1', 'pos5', 'pos9'],
    ['pos3', 'pos5', 'pos7'],
  ];
  const player1Choices = [];
  const player2Choices = [];
  const playerTurn = GameSetUp.elementCreator().playerTurn;
  const pvpButton = GameSetUp.elementCreator().pvpButton;
  const pvcButton = GameSetUp.elementCreator().pvcButton;
  const board = GameSetUp.elementCreator().board;
  let playersActive = false;
  let currentTurn;

  const gameCreate = function () {
    pvpButton.addEventListener('click', () => {
      if (!playersActive) {
        playerVsPlayer();
        playersActive = true;
        currentTurn = playerObject[0];
        turn();
        onTurns();
      } else return;
    });

    pvcButton.addEventListener('click', () => {
      if (!playersActive) {
        playerVsComputer();
        playersActive = true;
        currentTurn = playerObject[0];
        turn();
      }
    });
  };

  const onTurns = function () {
    board.forEach((cell) => {
      cell.addEventListener('click', (element) => {
        if (currentTurn === playerObject[0]) {
          gridSelection(element, player1Choices);
          element.target.textContent = playerObject[0].mark;
          currentTurn = playerObject[1];
          winCheck(winCondition, player1Choices);
          turn();
        } else if (currentTurn === playerObject[1]) {
          element.target.textContent = playerObject[1].mark;
          gridSelection(element, player2Choices);
          currentTurn = playerObject[0];
          turn();
        }
      });
    });
  };

  const playerVsComputer = function () {
    const player1 = Player(prompt('Player 1 Name:'));
    const player2 = Player('Computer');
    playerObject.push({ player1, mark: 'X' }, { player2, mark: 'O' });
    return { player1, player2 };
  };
  const playerVsPlayer = function () {
    const player1 = Player(prompt('Player 1 Name:'));
    const player2 = Player(prompt('Player 2 Name:'));
    playerObject.push({ player1, mark: 'X' }, { player2, mark: 'O' });
    return { player1, player2 };
  };

  const turn = function () {
    // console.log(playerObject[0]['player1']['playerName']);
    if (currentTurn === playerObject[0]) {
      playerTurn.textContent = `${playerObject[0]['player1']['playerName']}'s Turn`;
    } else if (currentTurn === playerObject[1]) {
      playerTurn.textContent = `${playerObject[1]['player2']['playerName']}'s Turn`;
    } else if (currentTurn === '') {
      playerTurn.textContent = `${playerObject[0]['player1']['playerName']}'s Turn`;
    }
  };

  const gridSelection = function (index, player) {
    player.push(index.target.id);
  };

  const winCheck = function (winCondition, player) {
    
  };
  return { gameCreate };
})();
GameFlow.gameCreate();
