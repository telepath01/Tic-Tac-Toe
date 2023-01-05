'use strict';
const gameManager = (function () {
  const gamePlayers = [
    // First Player
    {
      name: 'Player 1',
      text: 'X',
      turn: 1,
    },
    // Second Player
    {
      name: 'Player 2',
      text: 'O',
      turn: 2,
    },
    // Computer
    {
      name: 'AI',
      text: 'O',
      turn: 2,
    },
  ];

  let turn = 1; //This value can only be 1 or 2

  const gameBoardElements = () => {
    const gridSquares = document.querySelectorAll('.grid-square');
    return gridSquares;
  };
  const sidebarElements = () => {
    const sidebarbuttons = document.querySelectorAll('.sidebar-btn');
    const resetbtn = document.getElementById('reset');
    sidebarbuttons.forEach((button) => {
      button.addEventListener('click', () => {
        if (button.id === 'pvp') {
          console.log('PVP Selected');
        } else if (button.id === 'pvc') {
          console.log('PVC Selected');
        } else if (button.id === 'reset') {
          console.log('Reset Selected');
        }
      });
    });
  };
  return { gameBoardElements, sidebarElements };
})();
gameManager.sidebarElements();
gameManager.gameBoardElements();

const array1 = [];
let grids = [1, 2, 3, 4, 5];
array1.push(grids);
