import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { timeFormatter } from "./utils";
import LightCircle from "./components/LightCircle";

const trafficLightSequence = [
  { color: "red", duration: 5000 },
  { color: "yellow", duration: 2000 },
  { color: "green", duration: 3000 },
];
const TrafficLight = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());
  const timeRemaining = useRef(trafficLightSequence[0].duration);
  const [count, setCount] = useState(timeRemaining.current);
  let intervalId = useRef();
  let timeoutId = useRef();

  const runTrafficLight = () => {
    timeoutId.current = setTimeout(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % trafficLightSequence.length); // if LHS > RHS, return LHS else perform operation.
      timeRemaining.current = trafficLightSequence[(currentColorIndex + 1) % trafficLightSequence.length].duration;
    }, timeRemaining.current);
    setStartTime(Date.now()); // get time when the traffic light was triggered. i.e initally or on resume.
    startCountDown();
  };

  const startCountDown = () => {
    console.log("Countdown Time remaining: ", timeRemaining);
    setCount(timeRemaining.current);
    intervalId.current = setInterval(() => {
      setCount((prevVal) => prevVal - 1000);
    }, 1000);
  };

  const pauseTrafficLight = () => {
    clearTimeout(timeoutId.current);
    clearInterval(intervalId.current);
    const elapsedTime = Date.now() - startTime;
    timeRemaining.current = Math.max(timeRemaining.current - elapsedTime, 0);
    // console.log("Paused time left: ", timeRemaining.current - elapsedTime);
  };

  useEffect(() => {
    if (isRunning) {
      runTrafficLight();
    } else {
      pauseTrafficLight();
    }
    return () => {
      clearTimeout(timeoutId.current);
      clearInterval(intervalId.current);
    };
  }, [isRunning, currentColorIndex]);

  const handlePauseResume = () => {
    setIsRunning(!isRunning);
  };
  return (
    <div className="trafficLightContainer">
      {trafficLightSequence.map((trafficLight, index) => (
        <LightCircle
          color={currentColorIndex === index ? trafficLight.color : "lightgrey"}
          key={trafficLight.color + index}
          time={currentColorIndex === index && timeFormatter(count)}
        />
      ))}
      <button className="btn" onClick={handlePauseResume}>
        {isRunning ? "Pause" : "Resume"}
      </button>
      <div className="pedestrainsSign">
        {currentColorIndex <= 0 ? <p>Pesdestrains can walk</p> : <p>Pesdestrains cannot walk</p>}
      </div>
    </div>
  );
};

export default TrafficLight;
