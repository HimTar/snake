import React, { Component } from "react";
import Clock from "../Clock/clock";

class SlidersMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      pause: false,
      score: 0,
      position: [],
      enimies: [
        { type: 1, position: [0, 5] },
        { type: 2, position: [2, 6] },
        { type: 1, position: [1, 7] },
      ],
    };
  }

  render() {
    return (
      <div className="SliderContainer">
        <div className="content">
          <div className="grid"></div>

          <div
            className="clock"
            style={{ textAlign: "center", margin: "auto" }}
          >
            <Clock pause={this.state.pause} start={this.state.start} />
            <button onClick={this.onStart} disabled={this.state.start}>
              <p>Start</p>
            </button>
            &nbsp;
            <button onClick={this.onPause} disabled={!this.state.start}>
              {this.state.pause ? <p>Resume</p> : <p>Pause</p>}
            </button>
            <h2>Score</h2>
            <h2>{this.state.score}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default SlidersMain;
