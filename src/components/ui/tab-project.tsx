import React from "react";

const steps = [
  { id: 1, label: "Job details" },
  { id: 2, label: "Application form" },
  { id: 3, label: "Preview" },
];

const StepProgress = ({ currentStep }) => {
  return (
    <div className="bg-[#1e293b] flex items-center justify-between text-gray-300 rounded-lg shadow px-4 py-3 w-full">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center w-full">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full border text-sm font-semibold ${
              currentStep > step.id
                ? "bg-indigo-600 text-white"
                : currentStep === step.id
                ? "border-indigo-600 text-indigo-600"
                : "border-gray-300 text-gray-400"
            }`}
          >
            {currentStep > step.id ? "✓" : `0${step.id}`}
          </div>
          <div
            className={`ml-2 text-sm ${
              currentStep >= step.id
                ? "text-black font-medium"
                : "text-gray-400"
            }`}
          >
            {step.label}
          </div>
          {index < steps.length - 1 && (
            <div className="flex-grow border-t border-gray-300 mx-4" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepProgress;
