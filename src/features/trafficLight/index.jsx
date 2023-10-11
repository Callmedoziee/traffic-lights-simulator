import { useEffect, useRef, useState } from "react";
import LightCircle from "./components/lightCircle";
import "./styles.css";

const trafficLightSequence = [
  { color: "red", duration: 5000 },
  { color: "yellow", duration: 2000 },
  { color: "green", duration: 5000 },
];
const TrafficLight = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());
  const timeRemaining = useRef(trafficLightSequence[0].duration);
  let timeoutId;

  // Function runs from the onset or when the user clicks play
  const runTrafficLight = () => {
    console.log(timeRemaining);
    // it executes after a delayed time, the code within changes the currentColorIndex in a way that its index would loop once it gets to the last item in the array
    timeoutId = setTimeout(() => {
      setCurrentColorIndex((prevIndex) => {
        // Operation would end up being a loop as the (last index + 1 ) would be equal to the length of the array and return 0 (going back to the first element index)
        timeRemaining.current = trafficLightSequence[(prevIndex + 1) % trafficLightSequence.length].duration; // if LHS > RHS, return LHS else perform operation.
        return (prevIndex + 1) % trafficLightSequence.length;
      });
    }, timeRemaining.current);
    setStartTime(Date.now()); // get time when the traffic light was triggered. i.e initally or on resume.
  };

  useEffect(() => {
    if (isRunning) {
      runTrafficLight();
    } else {
      clearTimeout(timeoutId);
      const elapsedTime = Date.now() - startTime;
      timeRemaining.current = timeRemaining.current - elapsedTime;
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isRunning, timeRemaining.current, currentColorIndex, trafficLightSequence]);

  const handlePauseResume = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="trafficLightContainer">
      {trafficLightSequence.map((trafficLight, index) => (
        <LightCircle color={currentColorIndex === index ? trafficLight.color : "lightgrey"} key={index} />
      ))}
      <button className="btn" onClick={handlePauseResume}>
        {isRunning ? "Pause" : "Resume"}
      </button>
      <div className="pedestrainsSign">
        {currentColorIndex === 0 || currentColorIndex === 1 ? (
          <p>Pesdestrains can walk</p>
        ) : (
          <p>Pesdestrains cannot walk</p>
        )}
      </div>
    </div>
  );
};

export default TrafficLight;
