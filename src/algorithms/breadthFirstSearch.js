export function breadthFirstSearch(grid, startNode, finishNode) {
  var nodesQueue = [];
  var visitedNodesInOrder = [];
  var currentNode = startNode;
  nodesQueue.push(currentNode);
  visitedNodesInOrder.push(currentNode);
  currentNode.isVisited = true;
  while (!!currentNode) {
    if (currentNode === finishNode) return visitedNodesInOrder;
    var unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    while (unvisitedNeighbors.length > 0) {
      var nextNode = unvisitedNeighbors.shift();
      nextNode.previousNode = currentNode;
      currentNode = nextNode;
      nodesQueue.push(currentNode);
      visitedNodesInOrder.push(currentNode);
      currentNode.isVisited = true;
    }
    currentNode = nodesQueue.shift();
  }
  return visitedNodesInOrder;
}

const getUnvisitedNeighbors = (node, grid) => {
  var neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(
    (neighbor) => !neighbor.isVisited && !neighbor.isWall
  );
};
