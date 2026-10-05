import React from 'react';

export default function ScoreGauge({ score = 0, size = 180, strokeWidth = 14, showDetails = true }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc gauge showing 75% circle (270 degrees)
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (arcLength * Math.min(100, Math.max(0, score))) / 100;

  // Determine dynamic gradient / color
  let strokeColor = '#ef4444'; // Red
  let statusText = 'Critical Risk';
  let badgeBg = 'bg-red-500/10 text-red-400 border-red-500/30';

  if (score >= 85) {
    strokeColor = '#10b981'; // Emerald
    statusText = 'Fortified';
    badgeBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  } else if (score >= 70) {
    strokeColor = '#06b6d4'; // Cyan
    statusText = 'Robust';
    badgeBg = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
  } else if (score >= 50) {
    strokeColor = '#f59e0b'; // Amber
    statusText = 'Moderate';
    badgeBg = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  } else if (score >= 30) {
    strokeColor = '#f97316'; // Orange
    statusText = 'Vulnerable';
    badgeBg = 'bg-orange-500/10 text-orange-400 border-orange-500/30';
  }

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-135"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Animated Value track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${strokeColor}80)`
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl md:text-5xl font-extrabold tracking-tight font-mono text-white">
            {Math.round(score)}
          </span>
          <span className="text-xs uppercase tracking-wider text-slate-400 font-medium mt-0.5">
            / 100 Score
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="mt-2 text-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeBg}`}>
            <span className="w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: strokeColor }}></span>
            {statusText}
          </span>
        </div>
      )}
    </div>
  );
}
