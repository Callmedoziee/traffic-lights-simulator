import { useEffect, useMemo, useState } from "react";
import LightCircle from "./components/lightCircle/lightCircle";
import "./styles.css";

const TrafficLight = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

const trafficLightSequence = useMemo(() => [
    { color: "red", duration: 5000 },
    { color: "yellow", duration: 2000 },
    { color: "green", duration: 5000 },
], []);

    useEffect(() => {
        let intervalId;
        const runTrafficLight = () => {
            intervalId = setTimeout(() => {
                setCurrentColorIndex((prevIndex) => (prevIndex + 1) % trafficLightSequence.length);
            }, trafficLightSequence[currentColorIndex].duration);
        };

        if (isRunning) {
            runTrafficLight();
        }

        return () => clearInterval(intervalId);
    }, [currentColorIndex, isRunning, trafficLightSequence]);

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    return (
        <div className="trafficLightContainer">
            {trafficLightSequence.map((trafficLight, index) => (
                <LightCircle color={currentColorIndex === index ? trafficLight.color : "lightgrey"} key={index} />
            ))}
            <button className="btn" onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
        </div>
    );
};

export default TrafficLight;
