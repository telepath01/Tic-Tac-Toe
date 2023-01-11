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
    const resetButton = document.querySelector('.reset-btn');
    return { playerTurn, pvpButton, pvcButton, board, resetButton };
  };

  return { elementCreator };
})();
GameSetUp.elementCreator();

const GameFlow = (function () {
  let playerObject = [];
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
  let player1Choices = [];
  let player2Choices = [];
  const playerTurn = GameSetUp.elementCreator().playerTurn;
  const pvpButton = GameSetUp.elementCreator().pvpButton;
  const pvcButton = GameSetUp.elementCreator().pvcButton;
  const board = GameSetUp.elementCreator().board;
  const resetButton = GameSetUp.elementCreator().resetButton;
  let playersActive = false;
  let currentTurn;
  let gamewin = false;
  let player1;
  let player2;

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
        if (!gamewin) {
          if (currentTurn === playerObject[0]) {
            gridSelection(element, player1Choices);
            element.target.textContent = playerObject[0].mark;
            currentTurn = playerObject[1];
            winCheck(
              winCondition,
              player1Choices,
              playerObject[0]['player1']['playerName']
            );
            if (!gamewin) {
              turn();
            } else return;
          } else if (currentTurn === playerObject[1]) {
            element.target.textContent = playerObject[1].mark;
            gridSelection(element, player2Choices);
            currentTurn = playerObject[0];
            winCheck(
              winCondition,
              player2Choices,
              playerObject[1]['player2']['playerName']
            );
            if (!gamewin) {
              turn();
            } else return;
          }
        } else return;
      });
    });
  };

  const playerVsComputer = function () {
    player1 = Player(prompt('Player 1 Name:'));
    player2 = Player('Computer');
    playerObject.push({ player1, mark: 'X' }, { player2, mark: 'O' });
    return { player1, player2 };
  };
  const playerVsPlayer = function () {
    player1 = Player(prompt('Player 1 Name:'));
    player2 = Player(prompt('Player 2 Name:'));
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

  const winCheck = function (winCondition, player, playerName) {
    if (!gamewin) {
      winCondition.some((combination) => {
        if (
          combination[0] === player[0] &&
          combination[1] === player[1] &&
          combination[2] === player[2]
        ) {
          playerTurn.textContent = `${playerName} wins the game`;
          gamewin = true;
        } else return;
      });
    } else return;
  };

  const resetGame = function () {
    resetButton.addEventListener('click', () => {
      delete playerObject[0];
      delete playerObject[1];
      playerObject = playerObject.filter((_, index) =>
        playerObject.hasOwnProperty(index)
      );
      player1Choices = [''];
      player2Choices = [''];
      playersActive = false;
      currentTurn = playerObject[0];
      gamewin = false;
      playerTurn.textContent = 'Player 1';
      board.forEach((element) => {
        element.textContent = '';
      });
    });
  };
  return { gameCreate, resetGame };
})();
GameFlow.gameCreate();
GameFlow.resetGame();
