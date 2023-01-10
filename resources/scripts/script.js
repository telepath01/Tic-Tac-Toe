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
    [1, 2, 3][(4, 5, 6)][(7, 8, 9)][(1, 4, 7)][(2, 5, 8)][(3, 6, 9)][(1, 5, 9)][
      (3, 5, 7)
    ],
  ];
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
          element.target.textContent = playerObject[0].mark;
          currentTurn = playerObject[1];
          turn();
        } else if (currentTurn === playerObject[1]) {
          element.target.textContent = playerObject[1].mark;
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
  return { gameCreate };
})();
GameFlow.gameCreate();
