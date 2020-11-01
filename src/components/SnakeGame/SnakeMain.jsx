import React, { Component } from "react";
import Clock from "../Clock/clock";
import Snake from "./Snake";
import Food from "./Food";
import "./SnakeMaincss.css";

class SnakeMain extends Component {
  constructor() {
    super();
    this.state = {
      pause: false,
      start: false,
      direrction: "right",
      food: this.SnakeGenerateFood(),
      score: 0,
      snakeBlock: [
        [0, 0],
        [2, 0],
        [4, 0],
      ],
    };

    this.speed = 200;
    this.initialState = this.state;
  }

  //  LifeCycle Methods

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.start && !this.state.pause) this.snakeMove();
    }, this.speed);

    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOut();
    this.checkIfBiteItself();
    this.checkEatFood();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //  Change Direction When A key Is Pressed

  onKeyDown = (event) => {
    if (this.state.start) {
      let directionNew = null;
      let oldDirection = this.state.direrction;

      switch (event.keyCode) {
        case 38:
          if (oldDirection === "down") return;
          directionNew = "up";
          break;
        case 40:
          if (oldDirection === "up") return;
          directionNew = "down";
          break;
        case 37:
          if (oldDirection === "right") return;
          directionNew = "left";
          break;
        case 39:
          if (oldDirection === "left") return;
          directionNew = "right";
          break;
        default:
          return;
      }

      this.setState({ direrction: directionNew });
    }
  };

  //  Start and Pause Methods

  onStart = () => {
    const startNew = !this.state.start;
    this.setState({ start: startNew });
  };

  onPause = () => {
    const pauseNew = !this.state.pause;
    this.setState({ pause: pauseNew });
  };

  //  Methods To Change The Snake's State

  snakeMove = () => {
    let body = [...this.state.snakeBlock];
    let head = body[body.length - 1];

    switch (this.state.direrction) {
      case "right":
        head = [head[0] + 2, head[1]];
        break;
      case "left":
        head = [head[0] - 2, head[1]];
        break;
      case "up":
        head = [head[0], head[1] - 2];
        break;
      default:
        head = [head[0], head[1] + 2];
        break;
    }
    body.push(head);
    body.shift();
    this.setState({
      snakeBlock: body,
    });
  };

  SnakeGenerateFood = () => {
    let min = 1,
      max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
  };

  snakeEnlarge = () => {
    let newSnakeBody = [...this.state.snakeBlock];
    newSnakeBody.unshift([]);
    this.setState({ snakeBlock: newSnakeBody });
  };

  snakeSpeedIncrease = () => {
    if (this.speed > 10) {
      this.speed -= 5;
      clearInterval(this.interval);

      this.interval = setInterval(() => {
        if (this.state.start && !this.state.pause) this.snakeMove();
      }, this.speed);
    }
  };

  //  Methods To Check The Break Conditions

  checkEatFood = () => {
    const head = this.state.snakeBlock[this.state.snakeBlock.length - 1];
    const food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({ score: this.state.score + 1 });
      this.setState({ food: this.SnakeGenerateFood() });
      this.snakeEnlarge();
      this.snakeSpeedIncrease();
    }
  };

  checkIfOut = () => {
    let head = this.state.snakeBlock[this.state.snakeBlock.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  };

  checkIfBiteItself = () => {
    const body = [...this.state.snakeBlock];
    const head = body[body.length - 1];

    body.pop();

    body.forEach((value) => {
      if (value[0] === head[0] && value[1] === head[1]) {
        this.onGameOver();
      }
    });
  };

  //  Game Over Function

  onGameOver = () => {
    alert(`Game Over. Your Score is ${this.state.score}`);
    this.setState(this.initialState);
    this.speed = 200;
  };

  render() {
    return (
      <div className="SnakeContainer">
        <div className="content">
          <div className="grid">
            <Snake snakeBlock={this.state.snakeBlock} />
            <Food food={this.state.food} />
          </div>

          <div className="clock">
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

export default SnakeMain;
