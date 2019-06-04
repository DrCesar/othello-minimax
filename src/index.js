// const socket = require('socket.io-client')('http://192.168.1.127:4000');
const socket = require('socket.io-client')('http://192.168.1.148:4000');
const tournamentID = 142857;

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const neighbors = [ 
  [ 1, 8, 9 ],
  [ 0, 2, 8, 9, 10 ],
  [ 1, 3, 9, 10, 11 ],
  [ 2, 4, 10, 11, 12 ],
  [ 3, 5, 11, 12, 13 ],
  [ 4, 6, 12, 13, 14 ],
  [ 5, 7, 13, 14, 15 ],
  [ 6, 14, 15 ],
  [ 0, 1, 9, 16, 17 ],
  [ 0, 1, 2, 8, 10, 16, 17, 18 ],
  [ 1, 2, 3, 9, 11, 17, 18, 19 ],
  [ 2, 3, 4, 10, 12, 18, 19, 20 ],
  [ 3, 4, 5, 11, 13, 19, 20, 21 ],
  [ 4, 5, 6, 12, 14, 20, 21, 22 ],
  [ 5, 6, 7, 13, 15, 21, 22, 23 ],
  [ 6, 7, 14, 22, 23 ],
  [ 8, 9, 17, 24, 25 ],
  [ 8, 9, 10, 16, 18, 24, 25, 26 ],
  [ 9, 10, 11, 17, 19, 25, 26, 27 ],
  [ 10, 11, 12, 18, 20, 26, 27, 28 ],
  [ 11, 12, 13, 19, 21, 27, 28, 29 ],
  [ 12, 13, 14, 20, 22, 28, 29, 30 ],
  [ 13, 14, 15, 21, 23, 29, 30, 31 ],
  [ 14, 15, 22, 30, 31 ],
  [ 16, 17, 25, 32, 33 ],
  [ 16, 17, 18, 24, 26, 32, 33, 34 ],
  [ 17, 18, 19, 25, 27, 33, 34, 35 ],
  [ 18, 19, 20, 26, 28, 34, 35, 36 ],
  [ 19, 20, 21, 27, 29, 35, 36, 37 ],
  [ 20, 21, 22, 28, 30, 36, 37, 38 ],
  [ 21, 22, 23, 29, 31, 37, 38, 39 ],
  [ 22, 23, 30, 38, 39 ],
  [ 24, 25, 33, 40, 41 ],
  [ 24, 25, 26, 32, 34, 40, 41, 42 ],
  [ 25, 26, 27, 33, 35, 41, 42, 43 ],
  [ 26, 27, 28, 34, 36, 42, 43, 44 ],
  [ 27, 28, 29, 35, 37, 43, 44, 45 ],
  [ 28, 29, 30, 36, 38, 44, 45, 46 ],
  [ 29, 30, 31, 37, 39, 45, 46, 47 ],
  [ 30, 31, 38, 46, 47 ],
  [ 32, 33, 41, 48, 49 ],
  [ 32, 33, 34, 40, 42, 48, 49, 50 ],
  [ 33, 34, 35, 41, 43, 49, 50, 51 ],
  [ 34, 35, 36, 42, 44, 50, 51, 52 ],
  [ 35, 36, 37, 43, 45, 51, 52, 53 ],
  [ 36, 37, 38, 44, 46, 52, 53, 54 ],
  [ 37, 38, 39, 45, 47, 53, 54, 55 ],
  [ 38, 39, 46, 54, 55 ],
  [ 40, 41, 49, 56, 57 ],
  [ 40, 41, 42, 48, 50, 56, 57, 58 ],
  [ 41, 42, 43, 49, 51, 57, 58, 59 ],
  [ 42, 43, 44, 50, 52, 58, 59, 60 ],
  [ 43, 44, 45, 51, 53, 59, 60, 61 ],
  [ 44, 45, 46, 52, 54, 60, 61, 62 ],
  [ 45, 46, 47, 53, 55, 61, 62, 63 ],
  [ 46, 47, 54, 62, 63 ],
  [ 48, 49, 57 ],
  [ 48, 49, 50, 56, 58 ],
  [ 49, 50, 51, 57, 59 ],
  [ 50, 51, 52, 58, 60 ],
  [ 51, 52, 53, 59, 61 ],
  [ 52, 53, 54, 60, 62 ],
  [ 53, 54, 55, 61, 63 ],
  [ 54, 55, 62 ] 
];

const moveTypes = [
  {
    step: -9,
    validator: (index) => index > -1 && index % 8 < (index + 9) % 8
  },
  {
    step: -8,
    validator: (index) => index > -1 
  },
  {
    step: -7,
    validator: (index) => index > -1 && index % 8 > (index + 7) % 8
  },
  {
    step: -1,
    validator: (index) => index > -1 && index % 8 < (index + 1) % 8
  },
  {
    step: 1,
    validator: (index) => index < 64 && index % 8 > (index - 1) % 8
  },
  {
    step: 7,
    validator: (index) => index < 64 && index % 8 < (index - 7) % 8
  },
  {
    step: 8,
    validator: (index) => index < 64
  },
  {
    step: 9,
    validator: (index) => index < 64 && index % 8 > (index - 9) % 8
  }
];


const tempBoard = [2,2,2,2,2,2,0,0,2,2,2,2,2,2,1,0,0,1,1,1,1,1,1,0,0,1,2,1,1,1,1,0,0,2,2,2,2,1,0,0,0,0,0,2,1,1,1,0,0,0,0,1,2,1,1,1,0,0,1,0,0,0,0,2];
const tempBoard2 = [0,0,2,2,2,0,0,0,0,2,2,1,1,1,1,0,0,1,2,1,1,1,0,0,0,0,1,2,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,2,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function getNextBoard(index, playerColor, board) {
  const opponetColor = playerColor == 1 ? 2 : 1;
  let newBoard = board.slice();
  let flips = 0;

  for (let i = 0; i < moveTypes.length; i++) {
    let move = moveTypes[i];
    let count = 0;
    let nextPos = index + move.step;
    let tempBoard = newBoard.slice()

    while (move.validator(nextPos) && board[nextPos] == opponetColor){
      nextPos += move.step;
      tempBoard[nextPos] = playerColor;
      count += 1;
    }
    if (move.validator(nextPos) && board[nextPos] == playerColor){
      flips += count;
      newBoard = tempBoard;
    }
  }
  return { flips, board: newBoard }
}

function getPosibleMoves(playerColor, board) {
  const opponentColor = playerColor == 1 ? 2 : 1;
  let moveList = [];
  let tempBoard = board.slice();

  return board
    .map((color, index) => ({ color, index }))
    .filter(cell => cell.color == opponentColor)
    .map(cell => neighbors[cell.index]
      .filter(index => board[index] == 0)
    )
    .reduce((acc, cur) => {
      for (let i = 0; i < cur.length; i++) {
        if (acc.indexOf(cur[i]) === -1)
          acc.push(cur[i]);
      }
      return acc;
    }, [])
    .map(index => {
      let res = getNextBoard(index, playerColor, board);
      return { ...res, index }
    })
    .filter(move => move.flips > 0);
}

function getBoardWeight(player, board) {
  let ones = 0;
  let twos = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i] == 1) 
      ones++;
    if (board[i] == 2)
      twos++;
  }

  if ((player.color == 1 && player.max) || (player.color == 2 && !player.max))
    return ones - twos;
  else
    return twos - ones;
}

function minimax(depth, player, move) {
  const children = getPosibleMoves(player.color, move.board);

  if (depth == 0 || children.length == 0) {
    return {index: move.index, weight: getBoardWeight(player, move.board)};
  }

  const newPlayer = {
    color: player.color == 1 ? 2 : 1,
    max: !player.max
  }

  if (player.max) {
    let maxVal = { index: 0, weight: -Number.MAX_VALUE };
    for (let i = 0; i < children.length; i++) {
      let val = minimax(depth - 1, newPlayer, children[i]);
      maxVal = maxVal.weight < val.weight ? { index: children[i].index, weight: val.weight } : maxVal;
    }
    return maxVal;
  } else {
    let minVal = { index: 0, weight: +Number.MAX_VALUE };
    for (let i = 0; i < children.length; i++) {
      let val = minimax(depth - 1, newPlayer, children[i]);
      minVal = minVal.weight > val.weight ? { index: children[i].index, weight: val.weight } : minVal;
    }
    return minVal;
  }
}

function minimaxAlphaBeta(depth, player, move, alpha, beta) {
  const children = getPosibleMoves(player.color, move.board);

  if (depth == 0 || children.length == 0) {
    return {index: move.index, weight: getBoardWeight(player, move.board)};
  }

  const newPlayer = {
    color: player.color == 1 ? 2 : 1,
    max: !player.max
  }

  if (player.max) {
    let maxVal = { index: 0, weight: -Number.MAX_VALUE };
    for (let i = 0; i < children.length; i++) {
      let val = minimax(depth - 1, newPlayer, children[i]);
      maxVal = maxVal.weight < val.weight ? { index: children[i].index, weight: val.weight } : maxVal;
      alpha = Math.max(alpha, val.weight);
      if (beta <= alpha)
        break;
    }
    return maxVal;
  } else {
    let minVal = { index: 0, weight: +Number.MAX_VALUE };
    for (let i = 0; i < children.length; i++) {
      let val = minimax(depth - 1, newPlayer, children[i]);
      minVal = minVal.weight > val.weight ? { index: children[i].index, weight: val.weight } : minVal;
      beta = Math.min(beta, val.weight);
      if (beta <= alpha)
        break;
    }
    return minVal;
  }
}

function formatBoard(board) {
  let stringBoard = [];
  let row = "";
  for (let j = 0; j < board.length; j++) {
    if (j != 0 && j % 8 == 0) {
      stringBoard.push(row);
      row = "";
    }
    row = row + board[j];
  }
  stringBoard.push(row);
  return stringBoard;
}


socket.on('connect', function() {
  socket.emit('signin', {
    user_name: 'PlayerOne',
    tournament_id: tournamentID,
    user_role: 'player'
  });

  socket.on('ok_signin', function() {
    console.log('Player ONE signed in!');

    
  });
});

socket.on('ready', function(data){
  var gameID = data.game_id;
  var playerColor = data.player_turn_id;
  var board = data.board;

  let move = minimaxAlphaBeta(4, { color: playerColor, max: true }, { board: board }, -Number.MAX_VALUE, Number.MAX_VALUE)
  console.log(formatBoard(board))
  console.log(move.index)
  console.log(playerColor)
  console.log('play')
  socket.emit('play', {
    tournament_id: tournamentID,
    player_turn_id: playerColor,
    game_id: gameID,
    movement: move.index
  });
});


socket.on('finish', function(data){
  var gameID = data.game_id;
  var playerTurnID = data.player_turn_id;
  var winnerTurnID = data.winner_turn_id;
  var board = data.board;
  
  // TODO: Your cleaning board logic here
  c
  
  socket.emit('player_ready', {
    tournament_id: tournamentID,
    player_turn_id: playerTurnID,
    game_id: gameID
  });
});

