import React, { useState, useEffect, useRef } from "react";

const Clock = ({ pause, start }) => {
  const [seconds, setSeconds] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);

  useInterval(() => {
    if (!pause && start) {
      setSeconds(seconds + 1);
      if (seconds === 60) {
        setMinute(minute + 1);
        setSeconds(0);
      }
      if (minute === 60) {
        setHour(hour + 1);
        setMinute(0);
      }
    } else {
      if ((seconds !== 0 || minute !== 0 || hour !== 0) && !start) {
        setSeconds(0);
        setMinute(0);
        setHour(0);
      }
    }
  }, 1000);

  function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    });
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }, [delay]);
  }

  const doubleDigitTime = (time) => {
    return ("0" + time).slice(-2);
  };

  return (
    <div>
      <h1>Clock</h1>
      <h4
        style={{
          background: "#ff7272",
          border: "2px solid black",
          padding: "5px",
          color: "white",
        }}
      >
        {doubleDigitTime(hour)} : {doubleDigitTime(minute)} :
        {doubleDigitTime(seconds)}
      </h4>
    </div>
  );
};

export default Clock;
