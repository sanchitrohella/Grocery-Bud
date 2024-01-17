import React, { useState, useEffect } from "react";

const ProgressBar = ({ totalTime, className, hovered, color, closeBox }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let interval;
    if (!hovered) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          // Decrease progress by a certain amount
          const decrement = 100 / totalTime;
          const newProgress = prevProgress - decrement;

          // Clear interval when progress reaches 0
          if (newProgress <= 0) {
            console.log("Entered Clear", hovered);
            clearInterval(interval);
            closeBox();
          }

          return newProgress;
        });
      }, 1000);
    } // Update progress every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [hovered, totalTime, closeBox]);

  return (
    <div className={className}>
      <div
        style={{
          width: `${progress}%`,
          height: "6px",
          backgroundColor: `${color}`,
          transition: "width 1s linear",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
