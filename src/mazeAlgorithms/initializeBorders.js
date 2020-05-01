export const initializeBorders = (grid) => {
  return initBorders(grid);
};

const initBorders = (grid) => {
  const borderedGrid = grid.slice();
  for (let row = 0; row < 21; row++) {
    for (let col = 0; col < 49; col++) {
      const node = borderedGrid[row][col];
      if (isBorder(row, col)) {
        const newNode = {
          ...node,
          isWall: !node.isWall,
        };
        borderedGrid[row][col] = newNode;
      }
    }
  }

  return borderedGrid;
};

const isBorder = (row, col) => {
  return row === 0 || row === 20 || col === 0 || col === 48;
};
