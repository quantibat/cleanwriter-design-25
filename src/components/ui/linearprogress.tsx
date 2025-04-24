
import React from "react";

const getColor = (score) => {
  if (score >= 4) return "#00FFAB";   
  if (score >= 2.5) return "#FFD700";   
  return "#FF4C4C";                         
};

const LinearProgressBar = ({ score }) => {
  const percentage = (score * 20); // Convert score to percentage (5 -> 100%)
  const color = getColor(score);

  return (
    <div className="w-full mt-4">
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-500 ease-in-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <p className="text-gray-400 mt-1 text-right text-xs">
        {score.toFixed(1)}/5
      </p>
    </div>
  );
};

export default LinearProgressBar;
