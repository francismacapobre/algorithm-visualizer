import React, { Component } from "react";
import Node from "./Node/Node";
import { astar } from "../algorithms/aStar";
import { dijkstra } from "../algorithms/dijkstra";
import { recursiveBacktracker } from "../mazeAlgorithms/recursiveBacktracker";
import { recursiveBacktrackerNarrow } from "../mazeAlgorithms/recursiveBacktrackerNarrow";
import { breadthFirstSearch } from "../algorithms/breadthFirstSearch";
import { depthFirstSearch } from "../algorithms/depthFirstSearch";
import { getNodesInShortestPathOrder } from "./utilityFunctions";
import "./AlgoVisualizer.css";
import MazeGenerator from "./components/MazeGenerator";
import AlgoSelection from "./components/AlgoSelection";

const START_NODE_ROW = 2;
const START_NODE_COL = 2;
const FINISH_NODE_ROW = 18;
const FINISH_NODE_COL = 46;

export default class AlgoVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      phase: 0
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

  handleContinue() {
    var newPhase = this.state.phase + 1;
    this.setState({ phase: newPhase });
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

  animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder) {
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
      }, 30 * i);
    }
  }

  visualizeAlgo(algo) {
    this.handleContinue();
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    var visitedNodesInOrder = [];
    switch (algo) {
      case "dijkstra":
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        break;
      case "astar":
        visitedNodesInOrder = astar(grid, startNode, finishNode);
        break;
      case "bfs":
        visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
        break;
      case "dfs":
        visitedNodesInOrder = depthFirstSearch(grid, startNode, finishNode);
        break;
    }
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    var phaseView;
    switch (this.state.phase) {
      case 0:
        phaseView = (
          <MazeGenerator
            handleGenerateMaze={this.handleGenerateMaze.bind(this)}
            handleGenerateMazeNarrow={this.handleGenerateMazeNarrow.bind(this)}
            handleClearMaze={this.handleClearMaze.bind(this)}
            handleContinue={this.handleContinue.bind(this)}
          />
        );
        break;
      case 1:
        phaseView = (
          <AlgoSelection handleVisualize={algo => this.visualizeAlgo(algo)} />
        );
        break;
      case 2:
        phaseView = (
          <>
            <h5 className="sub-header">
              3) Whenever you're ready, reset the visualizer.
            </h5>
            <button
              className="action-button"
              onClick={() => this.handleReset()}
            >
              Reset
            </button>
          </>
        );
        break;
    }

    return (
      <div className="main">
        <div className="header-div">
          <h1 className="header">Graph Algorithm Visualizer</h1>
        </div>
        <div className="content">
          <div className="button-container">{phaseView}</div>
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
