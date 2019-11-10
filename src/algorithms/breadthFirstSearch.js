export function breadthFirstSearch(grid, startNode, finishNode) {
  var nodesQueue = [];
  var visitedNodesInOrder = [];
  var currentNode = startNode;
  nodesQueue.push(currentNode);
  visitedNodesInOrder.push(currentNode);
  currentNode.isVisited = true;
  while (!!currentNode) {
    if (currentNode === finishNode) return visitedNodesInOrder;
    var nextNode = getUnvisitedNeighbors(currentNode, grid);
    if (!!nextNode) {
      nextNode.previousNode = currentNode;
      currentNode = nextNode;
      nodesQueue.push(currentNode);
      visitedNodesInOrder.push(currentNode);
      currentNode.isVisited = true;
    } else {
      currentNode = nodesQueue.shift();
    }
  }
  return visitedNodesInOrder;
}

const getUnvisitedNeighbors = (node, grid) => {
  var neighbors = [];
  const { col, row } = node;
  // Ensure nodes are within grid
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  // Filter out visited and wall neighbors
  const unvisitedNeighbors = neighbors.filter(
    neighbor => !neighbor.isVisited && !neighbor.isWall
  );

  // Returns undefined if there are no unvisited neighbors
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

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the BFS method above.
export function getNodesInShortestPathOrderBFS(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
