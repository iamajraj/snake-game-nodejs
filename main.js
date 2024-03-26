const readline = require('readline');

let board = [
  [
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
  ],
  [
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
  ],
  [
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
  ],
  [
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
  ],
  [
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
  ],
  [
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
  ],
  [
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
  ],
  [
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
  ],
  [
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
  ],
  [
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
    '🔳',
  ],
];

let snakehead = '🐍';
let snakePos = [0, 0];
let direction = 'right';
let tailEmoji = '🔹';
let tailPrevPositions = [];
let tail = 0;
let gameOver = false;
let food = '🚩';
let foodPos = [3, 5];

const CONDITIONS = ['up', 'down', 'left', 'right'];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
readline.emitKeypressEvents(process.stdin);

process.stdin.on('keypress', (ch, key) => {
  if (key) {
    if (CONDITIONS.includes(key.name)) {
      direction = key.name;
    }
  }

  if (key && key.ctrl && key.name === 'c') {
    process.stdin.pause();
    gameOver = true;
  }
});

process.stdin.setRawMode(true);

const main = async () => {
  while (!gameOver) {
    console.log('POINTS: ', tail);
    updateTail();

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (snakePos[0] === row && snakePos[1] === col) {
          process.stdout.write(Buffer.from(snakehead));

          if (snakePos[0] === foodPos[0] && snakePos[1] === foodPos[1]) {
            tail++;
            let foodX = Math.floor(Math.random() * board.length);
            let foodY = Math.floor(Math.random() * board[0].length);

            foodPos = [foodX, foodY];
          }
        } else if (foodPos[0] === row && foodPos[1] === col) {
          process.stdout.write(Buffer.from(food));
        } else {
          process.stdout.write(Buffer.from(String(board[row][col])));
        }
      }
      process.stdout.write('\n');
    }

    if (direction === 'right') {
      if (snakePos[1] + 1 < board[0].length) {
        snakePos[1] += 1;
      } else {
        gameOver = true;
      }
    } else if (direction === 'left') {
      if (snakePos[1] > 0) {
        snakePos[1] -= 1;
      } else {
        gameOver = true;
      }
    } else if (direction === 'up') {
      if (snakePos[0] > 0) {
        snakePos[0] -= 1;
      } else {
        gameOver = true;
      }
    } else if (direction === 'down') {
      if (snakePos[0] + 1 < board.length) {
        snakePos[0] += 1;
      } else {
        gameOver = true;
      }
    }

    await wait(300);
    if (!gameOver) {
      console.clear();
    } else {
      console.log('GAME OVER!!!');
    }
  }
};

const updateTail = () => {
  if (tailPrevPositions.length > tail) {
    const tailToRemove = tailPrevPositions.pop();
    const [row, col] = tailToRemove;
    if (row >= 0 && row < board.length && col >= 0 && col < board[0].length) {
      board[row][col] = '🔳';
    }
  }

  tailPrevPositions.unshift([...snakePos]);

  tailPrevPositions.forEach((pos) => {
    const [row, col] = pos;
    if (row >= 0 && row < board.length && col >= 0 && col < board[0].length) {
      board[row][col] = tailEmoji;
    }
  });

  if (snakePos[1] >= board[0].length) {
    const newWidth = snakePos[1] + 1;
    board.forEach((row) => {
      while (row.length < newWidth) {
        row.push('🔳');
      }
    });
  }
};

main();
