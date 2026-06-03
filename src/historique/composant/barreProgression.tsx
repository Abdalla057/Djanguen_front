import React from "react";

type ColorVariant = "teal" | "amber" | "purple";

interface ProgressBarProps {
  value: number;
  total: number;
  color?: ColorVariant;
}


const TRACK: Record<ColorVariant, string> = {
  teal:   "bg-teal-100",
  amber:  "bg-amber-100",
  purple: "bg-purple-100",
};

const FILL: Record<ColorVariant, string> = {
  teal:   "bg-teal-500",
  amber:  "bg-amber-500",
  purple: "bg-purple-500",
};

export function ProgressBar({ value, total, color = "teal" }: ProgressBarProps) {
  const pct = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${TRACK[color]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${FILL[color]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-gray-400 min-w-[30px] text-right">{pct}%</span>
    </div>
  );
}
