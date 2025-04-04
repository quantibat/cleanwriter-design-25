import React from "react";

const getColor = (score) => {
  if (score >= 80) return "#00FFAB"; // vert néon
  if (score >= 50) return "#FFD700"; // jaune néon
  return "#FF4C4C"; // rouge néon
};

const getGlow = (score) => {
  if (score >= 80) return "0 0 8px #00FFAB, 0 0 12px #00FFAB";
  if (score >= 50) return "0 0 8px #FFD700, 0 0 12px #FFD700";
  return "0 0 8px #FF4C4C, 0 0 12px #FF4C4C";
};

const ScoreCircle = ({ score }) => {
  const strokeDasharray = 2 * Math.PI * 24;
  const progress = (score / 100) * strokeDasharray;
  const color = getColor(score);
  const glow = getGlow(score);

  return (
    <div className="relative w-16 h-16">
      <svg width="64" height="64" viewBox="0 0 64 64" className="rotate-[-90deg]">
        <circle
          cx="32"
          cy="32"
          r="24"
          stroke="#2c2f33"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx="32"
          cy="32"
          r="24"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDasharray - progress}
          strokeLinecap="round"
          fill="none"
          style={{ filter: `drop-shadow(${glow})` }}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white"
        style={{ textShadow: glow }}
      >
        {score}%
      </div>
    </div>
  );
};

export default ScoreCircle;
