import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import type { DonutSlice } from "../type/types";

Chart.register(...registerables);

interface Props {
  slices: DonutSlice[];
  centerValue: string;
  centerLabel: string;
}

const CercleStatistique = ({ slices, centerValue, centerLabel }: Props) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {

    if (!canvasRef.current) return;
    if (!slices?.length) return;

    chartRef.current?.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: slices.map(s => s.label),
        datasets: [
          {
            data: slices.map(s => s.value),
            backgroundColor: slices.map(s => s.color),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: { display: false },
        },
      },
    });

    return () => chartRef.current?.destroy();

  }, [slices]);

  return (
    <div className="relative w-full h-44">
      <canvas ref={canvasRef} />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold">{centerValue}</span>
        <span className="text-xs text-gray-400">{centerLabel}</span>
      </div>
    </div>
  );
};

export default CercleStatistique;