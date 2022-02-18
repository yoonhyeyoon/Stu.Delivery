import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from "./StopWatch.module.css";
import Button from "@mui/material/Button";
// this value is 1/100th of a second, the interval
// needed to increment the stopwatch correctly
const INTERVAL_TIME = 10;

function TimeUnit({ unit }) {
  return (
    <span className="time">
      {unit < 10 ? 0 : ""}
      {unit}
    </span>
  );
}

function DisplayedTime({ time }) {
  const minutes = Math.floor(time / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const oneHundredthOfASecond = time % 100;

  return (
    <div className="stopwatch">
      <TimeUnit unit={minutes} />
      <span className="colon">:</span>
      <TimeUnit unit={seconds} />
      <span className="colon">:</span>
      <TimeUnit unit={oneHundredthOfASecond} />
    </div>
  );
}

function StopWatch() {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const incrementor = useCallback(() => {
    setTime((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(incrementor, INTERVAL_TIME);
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [isActive]);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <div className={styles.watch_wrap}>
      <DisplayedTime
        className={styles.time}
        style={{ color: "red" }}
        time={time}
      />

      <div className={styles.buttons}>
        <Button onClick={handleStartStop}>{isActive ? "STOP" : "START"}</Button>
        <Button onClick={handleReset}>RESET</Button>
      </div>
    </div>
  );
}
export default StopWatch;
