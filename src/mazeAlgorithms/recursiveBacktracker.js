export const recursiveBacktracker = grid => {
  const borderedGrid = initBorders(grid);
  return borderedGrid;
};

const initBorders = grid => {
  const borderedGrid = grid.slice();
  for (let row = 0; row < 21; row++) {
    for (let col = 0; col < 49; col++) {
      const node = borderedGrid[row][col];
      if (isBorder(row, col)) {
        const newNode = {
          ...node,
          isWall: !node.isWall
        };
        borderedGrid[row][col] = newNode;
      }
    }
  }
  console.log(borderedGrid);
  return borderedGrid;
};

const isBorder = (row, col) => {
  if (row % 4 === 0 || col % 4 === 0) {
    console.log("is border!");
    return true;
  }
  return false;
};
