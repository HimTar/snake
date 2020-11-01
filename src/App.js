import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./actions";
import SnakeGame from "./components/SnakeGame/SnakeMain";
import Sliders from "./components/Sliders/SlidersMain";

function App() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <Router>
      <Route path="/" component={SnakeGame} />
    </Router>
  );
}

export default App;
