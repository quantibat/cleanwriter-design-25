import React from "react";

const CompatibilityGauge = ({ value }) => {
  const getStatus = (value) => {
    if (value < 2) {
      return {
        label: "Compatibilité faible",
        color: "text-red-500",
        bg: "bg-red-600/10 shadow-[0_0_20px_4px_rgba(239,68,68,0.6)]",
      };
    } else if (value < 4) {
      return {
        label: "Compatibilité moyenne",
        color: "text-yellow-400",
        bg: "bg-yellow-300/10 shadow-[0_0_20px_4px_rgba(250,204,21,0.6)]",
      };
    } else {
      return {
        label: "Bonne opportunité",
        color: "text-green-400",
        bg: "bg-green-400/10 shadow-[0_0_20px_4px_rgba(34,197,94,0.6)]",
      };
    }
  };

  const { label, color, bg } = getStatus(value);

  return (
    <div className="py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className={`rounded px-3 py-4 ${bg} transition-all`}>
          <div className="text-center mb-4">
            <h2 className={`text-lg font-semibold ${color}`}>
              {label}
            </h2>
            <p className="text-white font-bold text-2xl">{value.toFixed(1)} / 5</p>
          </div>
          {/* Garde tes légendes actuelles en dessous si tu veux */}
        </div>
      </div>
    </div>
  );
};

export default CompatibilityGauge;
