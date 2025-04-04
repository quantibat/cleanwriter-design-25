import React from "react";

const getColor = (score) => {
  if (score >= 80) return "#00FFAB"; // vert néon
  if (score >= 50) return "#FFD700"; // jaune néon
  return "#FF4C4C"; // rouge néon
};

const LinearProgressBar = ({ score }) => {
  const color = getColor(score);

  return (
    <div className="w-full mt-4">
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-500 ease-in-out"
          style={{
            width: `${score}%`,
            backgroundColor: color,
          }}
        />
      </div>
      
    </div>
  );
};

export default LinearProgressBar;
