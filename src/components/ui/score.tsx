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

const ScoreCircle = ({ score, size = 64, taille }) => {
  const percent = (score / 5) * 100; // conversion en %
  const radius = (size / 2) - 8;
  const strokeDasharray = 2 * Math.PI * radius;
  const progress = (percent / 100) * strokeDasharray;
  const color = getColor(percent);
  const glow = getGlow(percent);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rotate-[-90deg]"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2c2f33"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
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
        className={`absolute inset-0 flex items-center justify-center font-bold text-white  ${taille}` }
        style={{ textShadow: glow }}
      >
        {Math.round(percent)}%
      </div>
    </div>
  );
};

export default ScoreCircle;

