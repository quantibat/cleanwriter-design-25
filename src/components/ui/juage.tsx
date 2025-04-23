import React from "react";

interface ScoreGaugeProps {
  score: number; // de 0 à 5
  size?: number; // taille en px
  showLabel?: boolean; // afficher le texte
  className?: string;
}

const getColor = (percent: number) => {
  if (percent >= 80) return "#00FFAB"; // vert néon
  if (percent >= 50) return "#FFD700"; // jaune néon
  return "#FF4C4C"; // rouge néon
};

const getGlow = (percent: number) => {
  const color = getColor(percent);
  return `0 0 8px ${color}, 0 0 16px ${color}`;
};

const getLabel = (percent: number) => {
  if (percent >= 80) return "Bonne opportunité";
  if (percent >= 50) return "Compatibilité moyenne";
  return "Compatibilité faible";
};

const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  size = 96,
  showLabel = true,
  className = "",
}) => {
  const percent = Math.max(0, Math.min(100, (score / 5) * 100));
  const radius = (size / 2) - 8;
  const strokeDasharray = 2 * Math.PI * radius;
  const progress = (percent / 100) * strokeDasharray;
  const color = getColor(percent);
  const glow = getGlow(percent);
  const label = getLabel(percent);

  return (
    <div className={`relative flex flex-col items-center gap-1 ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
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
          style={{ filter: `drop-shadow(${glow})`, transition: "stroke-dashoffset 0.5s ease-out" }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="text-white text-center font-bold"
          style={{ textShadow: glow }}
        >
          <div className="text-xl">{Math.round(percent)}%</div>
        </div>
      </div>

      {showLabel && (
        <div className="text-sm font-medium text-white mt-2 text-center" style={{ textShadow: glow }}>
          {label}
        </div>
      )}
    </div>
  );
};

export default ScoreGauge;
