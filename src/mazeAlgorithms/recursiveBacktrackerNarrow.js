export const recursiveBacktrackerNarrow = grid => {
  const borderedGrid = initBorders(grid);
  const randomizedMazeGrid = depthFirstSearch(borderedGrid);
  return randomizedMazeGrid;
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

  return borderedGrid;
};

const isBorder = (row, col) => {
  return (
    row !== 0 &&
    col !== 0 &&
    row !== 20 &&
    col !== 48 &&
    (row % 2 !== 0 || col % 2 !== 0)
  );
};

const depthFirstSearch = borderedGrid => {
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
  if (currentNode.row >= 4) {
    var top = borderedGrid[currentNode.row - 2][currentNode.col];
  }
  if (currentNode.col <= 45) {
    var right = borderedGrid[currentNode.row][currentNode.col + 2];
  }
  if (currentNode.row <= 17) {
    var bottom = borderedGrid[currentNode.row + 2][currentNode.col];
  }
  if (currentNode.col >= 4) {
    var left = borderedGrid[currentNode.row][currentNode.col - 2];
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

  // returns undefined if there are no unvisited neighbors
  var randomNeighbor = selectRandomNeighbor(unvisitedNeighbors);
  return randomNeighbor;
};

const selectRandomNeighbor = unvisitedNeighbors => {
  if (unvisitedNeighbors.length > 0) {
    var i = Math.floor(Math.random() * Math.floor(unvisitedNeighbors.length));
    return unvisitedNeighbors[i];
  } else {
    return undefined;
  }
};

const declareOpenings = (borderedGrid, currentNode, nextNode, openingNodes) => {
  var classifyNeighbor;
  if (nextNode.row - currentNode.row === -2) {
    classifyNeighbor = "top";
  } else if (nextNode.col - currentNode.col === 2) {
    classifyNeighbor = "right";
  } else if (nextNode.row - currentNode.row === 2) {
    classifyNeighbor = "bottom";
  } else {
    classifyNeighbor = "left";
  }
  switch (classifyNeighbor) {
    case "top":
      openingNodes.push(borderedGrid[currentNode.row - 1][currentNode.col]);
      break;
    case "right":
      openingNodes.push(borderedGrid[currentNode.row][currentNode.col + 1]);
      break;
    case "bottom":
      openingNodes.push(borderedGrid[currentNode.row + 1][currentNode.col]);
      break;
    case "left":
      openingNodes.push(borderedGrid[currentNode.row][currentNode.col - 1]);
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
          isWall: !node.isWall
        };
        borderedGrid[row][col] = newNode;
      }
    }
  }

  return randomizedMazeGrid;
};
