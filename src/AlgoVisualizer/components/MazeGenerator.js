import React, { Component } from "react";

export default class MazeGenerator extends Component {
  render() {
    return (
      <>
        <button
          className="action-button"
          onClick={() => this.props.handleGenerateMaze()}
        >
          <text className="button-text">Generate Wide Maze</text>
        </button>
        <button
          className="action-button"
          onClick={() => this.props.handleGenerateMazeNarrow()}
        >
          <text className="button-text">Generate Narrow Maze</text>
        </button>
        <button
          className="action-button"
          onClick={() => this.props.handleClearMaze()}
        >
          <text className="reset-text">Clear</text>
        </button>
        <button
          className="action-button"
          onClick={() => this.props.handleContinue()}
        >
          <text className="continue-text">Continue</text>
        </button>
      </>
    );
  }
}
