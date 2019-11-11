import React, { Component } from "react";

export default class AlgoSelection extends Component {
  render() {
    return (
      <>
        <h5 className="sub-header">
          2) Select a pathfinding algorithm to visualize.
        </h5>
        <button
          className="action-button"
          onClick={() => this.props.handleVisualize("dijkstra")}
        >
          Dijkstra's Algorithm
        </button>
        <button
          className="action-button"
          onClick={() => this.props.handleVisualize("astar")}
        >
          A* Search Algorithm
        </button>
        <button
          className="action-button"
          onClick={() => this.props.handleVisualize("dfs")}
        >
          Depth-first Search Algorithm
        </button>
        <button
          className="action-button"
          onClick={() => this.props.handleVisualize("bfs")}
        >
          Breadth-first Search Algorithm
        </button>
      </>
    );
  }
}
