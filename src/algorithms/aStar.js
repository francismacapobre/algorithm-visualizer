export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.gcost = 0;
  startNode.hcost = 0;
  startNode.fcost = 0;

  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByFCost(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.fcost === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid, finishNode);
  }
}

function sortNodesByFCost(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => handleSort(nodeA, nodeB));
}

function handleSort(nodeA, nodeB) {
  if (nodeA.fcost === nodeB.fcost) return nodeA.hcost - nodeB.hcost;
  else return nodeA.fcost - nodeB.fcost;
}

function updateUnvisitedNeighbors(node, grid, finishNode) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.gcost = node.gcost + 1;
    neighbor.hcost =
      node.hcost +
      Math.sqrt(
        Math.pow(finishNode.col - node.col, 2) +
          Math.pow(node.row - finishNode.row, 2)
      );
    neighbor.fcost = neighbor.gcost + neighbor.hcost;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}
