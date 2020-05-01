import React, { Component } from "react";

export default class AlgoSelection extends Component {
  render() {
    return (
      <>
        <button
          className="action-button"
          onClick={() => this.props.handleVisualize("dijkstra")}
        >
          <text className="button-text">Dijkstra's</text>
        </button>
        <button
          className="action-button"
          onClick={() => this.props.handleVisualize("astar")}
        >
          <text className="button-text">A* Search</text>
        </button>
        <button
          className="action-button"
          onClick={() => this.props.handleVisualize("dfs")}
        >
          <text className="button-text">DFS</text>
        </button>
        <button
          className="action-button"
          onClick={() => this.props.handleVisualize("bfs")}
        >
          <text className="button-text">BFS</text>
        </button>
      </>
    );
  }
}
