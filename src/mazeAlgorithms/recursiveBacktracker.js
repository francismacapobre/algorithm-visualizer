export const recursiveBacktracker = (grid) => {
  const borderedGrid = initBorders(grid);
  const randomizedMazeGrid = depthFirstSearch(borderedGrid);
  return randomizedMazeGrid;
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
  return row % 4 === 0 || col % 4 === 0;
};

const depthFirstSearch = (borderedGrid) => {
  var currentNode = borderedGrid[2][2];
  var visitedNodes = [];
  var openingNodes = [];
  var nodesStack = [];
  visitedNodes.push(currentNode);
  while (!!currentNode) {
    var nextNode = checkUnvisitedNeighbors(
      currentNode,
      borderedGrid,
      visitedNodes
    );
    if (nextNode) {
      visitedNodes.push(nextNode);
      declareOpenings(borderedGrid, currentNode, nextNode, openingNodes);
      nodesStack.push(currentNode);
      currentNode = nextNode;
    } else {
      currentNode = nodesStack.pop();
    }
  }

  return generateMazeOpenings(borderedGrid, openingNodes);
};

const checkUnvisitedNeighbors = (currentNode, borderedGrid, visitedNodes) => {
  var unvisitedNeighbors = [];
  if (currentNode.row >= 6) {
    var top = borderedGrid[currentNode.row - 4][currentNode.col];
  }
  if (currentNode.col <= 42) {
    var right = borderedGrid[currentNode.row][currentNode.col + 4];
  }
  if (currentNode.row <= 14) {
    var bottom = borderedGrid[currentNode.row + 4][currentNode.col];
  }
  if (currentNode.col >= 6) {
    var left = borderedGrid[currentNode.row][currentNode.col - 4];
  }
  if (top && !visitedNodes.includes(top)) {
    unvisitedNeighbors.push(top);
  }
  if (right && !visitedNodes.includes(right)) {
    unvisitedNeighbors.push(right);
  }
  if (bottom && !visitedNodes.includes(bottom)) {
    unvisitedNeighbors.push(bottom);
  }
  if (left && !visitedNodes.includes(left)) {
    unvisitedNeighbors.push(left);
  }

  var randomNeighbor = selectRandomNeighbor(unvisitedNeighbors);
  return randomNeighbor;
};

const selectRandomNeighbor = (unvisitedNeighbors) => {
  if (unvisitedNeighbors.length > 0) {
    var i = Math.floor(Math.random() * Math.floor(unvisitedNeighbors.length));
    return unvisitedNeighbors[i];
  } else {
    return undefined;
  }
};

const declareOpenings = (borderedGrid, currentNode, nextNode, openingNodes) => {
  var classifyNeighbor;
  if (nextNode.row - currentNode.row === -4) {
    classifyNeighbor = "top";
  } else if (nextNode.col - currentNode.col === 4) {
    classifyNeighbor = "right";
  } else if (nextNode.row - currentNode.row === 4) {
    classifyNeighbor = "bottom";
  } else {
    classifyNeighbor = "left";
  }
  switch (classifyNeighbor) {
    case "top":
      openingNodes.push(borderedGrid[currentNode.row - 2][currentNode.col - 1]);
      openingNodes.push(borderedGrid[currentNode.row - 2][currentNode.col]);
      openingNodes.push(borderedGrid[currentNode.row - 2][currentNode.col + 1]);
      break;
    case "right":
      openingNodes.push(borderedGrid[currentNode.row - 1][currentNode.col + 2]);
      openingNodes.push(borderedGrid[currentNode.row][currentNode.col + 2]);
      openingNodes.push(borderedGrid[currentNode.row + 1][currentNode.col + 2]);
      break;
    case "bottom":
      openingNodes.push(borderedGrid[currentNode.row + 2][currentNode.col - 1]);
      openingNodes.push(borderedGrid[currentNode.row + 2][currentNode.col]);
      openingNodes.push(borderedGrid[currentNode.row + 2][currentNode.col + 1]);
      break;
    case "left":
      openingNodes.push(borderedGrid[currentNode.row - 1][currentNode.col - 2]);
      openingNodes.push(borderedGrid[currentNode.row][currentNode.col - 2]);
      openingNodes.push(borderedGrid[currentNode.row + 1][currentNode.col - 2]);
      break;
    default:
      break;
  }
};

const generateMazeOpenings = (borderedGrid, openingNodes) => {
  const randomizedMazeGrid = borderedGrid.slice();
  for (let row = 0; row < 21; row++) {
    for (let col = 0; col < 49; col++) {
      const node = borderedGrid[row][col];
      if (openingNodes.includes(node)) {
        const newNode = {
          ...node,
          isWall: !node.isWall,
        };
        borderedGrid[row][col] = newNode;
      }
    }
  }

  return randomizedMazeGrid;
};
