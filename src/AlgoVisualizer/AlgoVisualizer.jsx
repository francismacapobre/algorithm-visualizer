import React, { Component } from "react";
import Node from "./Node/Node";
import { astar, getNodesInShortestPathOrderAStar } from "../algorithms/aStar";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { recursiveBacktracker } from "../mazeAlgorithms/recursiveBacktracker";
import "./AlgoVisualizer.css";
import { recursiveBacktrackerNarrow } from "../mazeAlgorithms/recursiveBacktrackerNarrow";
import {
  breadthFirstSearch,
  getNodesInShortestPathOrderBFS
} from "../algorithms/breadthFirstSearch";
import { getNodesInShortestPathOrderDFS } from "../algorithms/depthFirstSearch";

const START_NODE_ROW = 2;
const START_NODE_COL = 2;
const FINISH_NODE_ROW = 18;
const FINISH_NODE_COL = 46;

export default class AlgoVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleClearMaze() {
    const resetGrid = getInitialGrid();
    this.setState({ grid: resetGrid });
  }

  handleGenerateMaze() {
    const resetGrid = getInitialGrid();
    const borderedGrid = recursiveBacktracker(resetGrid);
    this.setState({ grid: borderedGrid });
  }

  handleGenerateMazeNarrow() {
    const resetGrid = getInitialGrid();
    const borderedGrid = recursiveBacktrackerNarrow(resetGrid);
    this.setState({ grid: borderedGrid });
  }

  handleReset() {
    window.location.reload();
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateAStar(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateBreadthFirstSearch(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateDepthFirstSearch(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  visualizeBreadthFirstSearch() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(finishNode);
    this.animateBreadthFirstSearch(
      visitedNodesInOrder,
      nodesInShortestPathOrder
    );
  }

  visualizeDepthFirstSearch() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderDFS(finishNode);
    this.animateDepthFirstSearch(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeAStar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderAStar(
      finishNode
    );
    this.animateAStar(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <div className="main">
        <div className="header-div">
          <h1 className="header">Pathfinding Algorithm Visualizer</h1>
        </div>
        <div className="content">
          <div className="buttonContainer">
            <h5 className="sub-header">
              1) Generate a maze using a depth-first-search recursive
              backtracker (or draw your own)
            </h5>
            <button
              className="maze-button"
              onClick={() => this.handleGenerateMaze()}
            >
              Generate Wide Maze
            </button>
            <button
              className="maze-button"
              onClick={() => this.handleGenerateMazeNarrow()}
            >
              Generate Narrow Maze
            </button>
            <button
              className="reset-button"
              onClick={() => this.handleClearMaze()}
            >
              Clear Maze
            </button>
            <h5 className="sub-header">
              2) Select a pathfinding algorithm to visualize
            </h5>
            <button
              className="algo-button"
              onClick={() => this.visualizeDijkstra()}
            >
              Dijkstra's Algorithm
            </button>
            <button
              className="algo-button"
              onClick={() => this.visualizeAStar()}
            >
              A* Search Algorithm
            </button>
            <button
              className="algo-button"
              onClick={() => this.visualizeDepthFirstSearch()}
            >
              Depth-first Search Algorithm
            </button>
            <button
              className="algo-button"
              onClick={() => this.visualizeBreadthFirstSearch()}
            >
              Breadth-first Search Algorithm
            </button>
            <h5 className="sub-header">3) Reset the visualizer</h5>
            <button className="reset-button" onClick={() => this.handleReset()}>
              Reset Visualizer
            </button>
          </div>
          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const { row, col, isFinish, isStart, isWall } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) =>
                          this.handleMouseDown(row, col)
                        }
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp()}
                        row={row}
                      ></Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className="footer">
          <h5 className="header">Built by Francis Macapobre</h5>
        </div>
      </div>
    );
  }
}

// Initialize a 21 x 49 grid
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 21; row++) {
    const currentRow = [];
    for (let col = 0; col < 49; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    gcost: Infinity,
    hcost: Infinity,
    fcost: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
