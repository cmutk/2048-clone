import { reactive, computed, readonly } from "vue";
const getEmptyBoard = () => [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
const hasValue = (board, value) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === value) {
        return true;
      }
    }
  }
  return false;
};
const isFull = (board) => {
  return !hasValue(board, 0);
};
const getRandomPosition = () => {
  const rowPos = Math.floor(Math.random() * 4);
  const colPos = Math.floor(Math.random() * 4);
  return [rowPos, colPos];
};
const generateRandom = (board) => {
  if (isFull(board)) {
    return board;
  }
  let [row, col] = getRandomPosition();
  while (board[row][col] !== 0) {
    [row, col] = getRandomPosition();
  }
  board[row][col] = 2;
  return board;
};

const compress = (board) => {
  const newBoard = getEmptyBoard();
  for (let i = 0; i < board.length; i++) {
    let columnIndex = 0;
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== 0) {
        newBoard[i][columnIndex] = board[i][j];
        columnIndex++;
      }
    }
  }
  return newBoard;
};
const merge = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length - 1; j++) {
      if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
        board[i][j] = board[i][j] * 2;
        board[i][j + 1] = 0;
      }
    }
  }
  return board;
};

const moveLeft = (board) => {
  const newBoard = compress(board);
  const newBoard2 = merge(newBoard);
  return compress(newBoard2);
};
const reverse = (board) => {
  const reverseBoard = getEmptyBoard();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      reverseBoard[i][j] = board[i][board[i].length - 1 - j];
    }
  }
  return reverseBoard;
};

const moveRight = (board) => {
  const reversedBoard = reverse(board);
  const newBoard = moveLeft(reversedBoard);
  return reverse(newBoard);
};
const rotateLeft = (board) => {
  const rotateBoard = getEmptyBoard();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      rotateBoard[i][j] = board[j][board[i].length - 1 - i];
    }
  }
  return rotateBoard;
};
const rotateRight = (board) => {
  const rotateBoard = getEmptyBoard();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      rotateBoard[i][j] = board[board[i].length - 1 - j][i];
    }
  }
  return rotateBoard;
};
const moveUp = (board) => {
  const rotateBoard = rotateLeft(board);
  const newBoard = moveLeft(rotateBoard);
  return rotateRight(newBoard);
};
const moveDown = (board) => {
  const rotateBoard = rotateRight(board);
  const newBoard = moveLeft(rotateBoard);
  return rotateLeft(newBoard);
};
const hasDiff = (board, updatedBoard) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== updatedBoard[i][j]) {
        return true;
      }
    }
  }
  return false;
};
const checkIsOver = (board) => {
  if (hasDiff(board, moveLeft(board))) {
    return false;
  }
  if (hasDiff(board, moveRight(board))) {
    return false;
  }
  if (hasDiff(board, moveUp(board))) {
    return false;
  }
  if (hasDiff(board, moveDown(board))) {
    return false;
  }
  return true;
};

const checkWin = (board) => {
  return hasValue(board, 2048);
};

const initialBoard = generateRandom(getEmptyBoard());
const state = reactive({ board: initialBoard, result: null });

const getters = {
  getBoard: () => {
    return computed(() => state.board);
  },
  getResult: () => {
    return computed(() => state.result);
  },
};

const actions = {
  left: (currentBoard) => {
    const newBoard = moveLeft(currentBoard);
    actions.updateBoard(newBoard);
    actions.checkEndGame(currentBoard);
  },
  right: (currentBoard) => {
    const newBoard = moveRight(currentBoard);
    actions.updateBoard(newBoard);
    actions.checkEndGame(currentBoard);
  },
  up: (currentBoard) => {
    const newBoard = moveUp(currentBoard);
    actions.updateBoard(newBoard);
    actions.checkEndGame(currentBoard);
  },
  down: (currentBoard) => {
    const newBoard = moveDown(currentBoard);
    actions.updateBoard(newBoard);
    actions.checkEndGame(currentBoard);
  },
  checkEndGame: (currentBoard) => {
    if (checkWin(currentBoard)) {
      const result = {
        showDialog: true,
        message: "Congratulations! You have won! ",
        buttonText: "Play Again",
      };
      actions.updateResult({ result });
    }
    if (checkIsOver(currentBoard)) {
      const result = {
        showDialog: true,
        message: "Game Over...",
        buttonText: "Try Again",
      };
      actions.updateResult({ result });
    }
  },
  updateBoard: (newBoard) => {
    state.board = generateRandom(newBoard);
  },
  updateResult: ({ result }) => {
    state.result = result;
  },
};
export default () => ({
  state: readonly(state),
  ...getters,
  ...actions,
});
