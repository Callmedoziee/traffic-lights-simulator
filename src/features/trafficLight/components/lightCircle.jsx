const LightCircle = ({ color, time }) => {
  return (
    <div className="circle" style={{ backgroundColor: color }}>
      <p className="time">{time}</p>
    </div>
  );
};

export default LightCircle;
