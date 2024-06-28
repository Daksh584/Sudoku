const isValid = (grid, row, col, num) => {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num || grid[x][col] === num) {
      return false;
    }
  }

  const startRow = row - row % 3;
  const startCol = col - col % 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }

  return true;
};

const solveSudoku = (grid) => {
  const findEmpty = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === '') {
          return [i, j];
        }
      }
    }
    return null;
  };

  const emptyPos = findEmpty();
  if (!emptyPos) return true;

  const [row, col] = emptyPos;

  for (let num = 1; num <= 9; num++) {
    if (isValid(grid, row, col, num.toString())) {
      grid[row][col] = num.toString();

      if (solveSudoku(grid)) {
        return true;
      }

      grid[row][col] = '';
    }
  }

  return false;
};

export default solveSudoku;