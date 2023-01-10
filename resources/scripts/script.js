'use strict';

const Player = (name) => {
  const playerName = name;
  return { playerName };
};

const GameFlow = (function () {
  const playerObject = [];
  const playerTurn = GameSetUp.elementCreator().playerTurn;
  const pvpButton = GameSetUp.elementCreator().pvpButton;
  const pvcButton = GameSetUp.elementCreator().pvcButton;
  const board = GameSetUp.elementCreator().board;
  let playersActive = false;
  let player1;
  let player2;

  const gameCreate = function () {
    pvpButton.addEventListener('click', () => {
      console.log('working');
    });
  };

  const playerVsComputer = function () {
    player1 = Player(prompt('Player 1 Name:'));
    player2 = Player('Computer');
    playerObject.push({ player1, mark: 'X' }, { player2, mark: 'O' });
  };
  const playerVsPlayer = function () {
    player1 = Player(prompt('Player 1 Name:'));
    player2 = Player(prompt('Player 2 Name:'));
    playerObject.push({ player1, mark: 'X' }, { player2, mark: 'O' });
  };
  return { gameCreate };
})();

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
GameFlow.gameCreate();
