import React, { Component } from "react";

export default class MazeGenerator extends Component {
  render() {
    return (
      <>
        <h5 className="sub-header">
          Generate (or draw) a maze until you find one you like.
        </h5>
        <button
          className="action-button"
          onClick={() => this.props.handleGenerateMaze()}
        >
          Generate Wide Maze
        </button>
        <button
          className="action-button"
          onClick={() => this.props.handleGenerateMazeNarrow()}
        >
          Generate Narrow Maze
        </button>
        <button
          className="reset-button"
          onClick={() => this.props.handleClearMaze()}
        >
          Clear Maze
        </button>
        <button
          className="continue-button"
          onClick={() => this.props.handleContinue()}
        >
          Continue
        </button>
      </>
    );
  }
}
