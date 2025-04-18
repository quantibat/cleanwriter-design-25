import React from "react";

const getColor = (percentage) => {
  if (percentage >= 80) return "#00FFAB";   
  if (percentage >= 50) return "#FFD700";   
  return "#FF4C4C";                         
};

const LinearProgressBar = ({ score}) => {
  const percentage = (score *100) / 5;
  const color = getColor(percentage);

  return (
    <div className="w-full mt-4">
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-500 ease-in-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <p className={`text-gray-400 mt-1 text-right text-xs`}>
          {(percentage)}%
      </p>
    </div>
  );
};

export default LinearProgressBar;
