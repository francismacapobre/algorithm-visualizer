export function depthFirstSearch(grid, startNode, finishNode) {
  var nodesStack = [];
  var visitedNodesInOrder = [];
  var currentNode = startNode;
  nodesStack.push(currentNode);
  visitedNodesInOrder.push(currentNode);
  currentNode.isVisited = true;
  while (!!currentNode) {
    if (currentNode === finishNode) return visitedNodesInOrder;
    var nextNode = getNextNode(currentNode, grid);
    if (!!nextNode) {
      nextNode.previousNode = currentNode;
      currentNode = nextNode;
      nodesStack.push(currentNode);
      visitedNodesInOrder.push(currentNode);
      currentNode.isVisited = true;
    } else {
      currentNode = nodesStack.pop();
    }
  }
  return visitedNodesInOrder;
}

const getNextNode = (node, grid) => {
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
  var nextNode = selectNeighbor(unvisitedNeighbors);
  return nextNode;
};

const selectNeighbor = unvisitedNeighbors => {
  if (unvisitedNeighbors.length > 0) {
    return unvisitedNeighbors.pop();
  } else {
    return undefined;
  }
};
