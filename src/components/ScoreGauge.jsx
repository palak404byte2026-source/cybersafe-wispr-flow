import React from 'react';

export default function ScoreGauge({ score = 0, size = 180, strokeWidth = 14, showDetails = true }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc gauge showing 75% circle (270 degrees)
  const arcLength = circumference * 0.75;
  const normalizedScore = Math.min(100, Math.max(0, Math.round(score)));
  const strokeDashoffset = arcLength - (arcLength * normalizedScore) / 100;

  // Exact 4 levels: Needs Improvement, Fair, Good, Intelligent / Excellent
  let strokeColor = '#ef4444'; // Red
  let statusText = 'Needs Improvement';
  let badgeBg = 'bg-red-500/10 text-red-400 border-red-500/30';

  if (normalizedScore >= 85) {
    strokeColor = '#10b981'; // Emerald
    statusText = 'Intelligent / Excellent';
    badgeBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  } else if (normalizedScore >= 65) {
    strokeColor = '#06b6d4'; // Cyan
    statusText = 'Good';
    badgeBg = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
  } else if (normalizedScore >= 40) {
    strokeColor = '#f59e0b'; // Amber
    statusText = 'Fair';
    badgeBg = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  } else {
    strokeColor = '#ef4444'; // Red
    statusText = 'Needs Improvement';
    badgeBg = 'bg-red-500/10 text-red-400 border-red-500/30';
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
              filter: `drop-shadow(0 0 10px ${strokeColor}90)`
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-mono text-white">
            {normalizedScore}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">
            / 100 Score
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="mt-2 text-center">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${badgeBg}`}>
            <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: strokeColor }}></span>
            {statusText}
          </span>
        </div>
      )}
    </div>
  );
}
