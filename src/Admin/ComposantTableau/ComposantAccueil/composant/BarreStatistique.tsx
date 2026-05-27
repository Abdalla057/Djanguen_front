import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface Props {
  labels: string[];
  values: number[];
  colors: string[];
}

const BarreStatistique = ({
  labels,
  values,
  colors,
}: Props) => {

  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const chartRef =
    useRef<Chart | null>(null);

  useEffect(() => {

    if (!canvasRef.current) return;

    if (!labels.length || !values.length)
      return;

    chartRef.current?.destroy();

    chartRef.current = new Chart(
      canvasRef.current,
      {
        type: "bar",

        data: {
          labels,

          datasets: [
  {
    data: values,

    backgroundColor: colors,

    borderRadius: 10,

    barThickness: 22,

    categoryPercentage: 0.6,

    barPercentage: 0.8,
  },
],
        },

        options: {
          responsive: true,

          maintainAspectRatio: false,

          plugins: {
            legend: {
              display: false,
            },
          },

          scales: {

            x: {
              grid: {
                display: false,
              },

              ticks: {
                font: {
                  size: 11,
                },
              },
            },

            y: {
              beginAtZero: true,

              grid: {
                color: "rgba(0,0,0,0.05)",
              },

              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      }
    );

    return () => {
      chartRef.current?.destroy();
    };

  }, [labels, values, colors]);

  return (
    <div className="w-full h-52">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default BarreStatistique;