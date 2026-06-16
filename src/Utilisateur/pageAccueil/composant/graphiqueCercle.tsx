import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import type { Livre } from "../type";

interface DonutChartProps {
  livres: Livre[];
}

export default function DonutChart({ livres }: DonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<Chart | null>(null);

  const total = livres.length;

  useEffect(() => {
    if (!canvasRef.current || !livres.length) return;

    chartRef.current?.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: ["Livres disponibles"],
        datasets: [
          {
            data: [total],
            backgroundColor: ["#0C3B2E"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: false,
        cutout: "72%",
        plugins: {
          legend:  { display: false },
          tooltip: { enabled: false },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [livres, total]);

  return (
    <div className="flex flex-col gap-3">

      {/* En-tête */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#0C3B2E]">Bibliothèque</p>
        <span className="text-[11px] font-medium text-slate-400 bg-[#0C3B2E]/6 px-2.5 py-0.5 rounded-full">
          Catalogue
        </span>
      </div>

      {/* Compteur */}
      <div>
        <p className="text-2xl font-black text-[#0C3B2E] leading-none">
          {total}
          <span className="text-sm font-semibold ml-1 text-slate-400">
            livre{total > 1 ? "s" : ""}
          </span>
        </p>
      </div>

      {/* Badge */}
      <div className="self-start inline-flex items-center gap-1.5 text-[10px] font-semibold
        text-[#0C3B2E] bg-[#FFBA00]/20 border border-[#FFBA00]/40 px-2.5 py-1 rounded-full">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
        Bibliothèque disponible
      </div>

      {/* Donut */}
      <div className="relative w-[130px] h-[130px] mx-auto my-1">
        <canvas ref={canvasRef} width={130} height={130} />

        {/* Centre */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-black text-[#0C3B2E] leading-none">{total}</span>
          <span className="text-[10px] text-slate-400 mt-0.5">livres</span>
        </div>
      </div>

      {/* Légende */}
      <div className="flex items-center gap-2.5 px-1">
        <span className="w-2.5 h-2.5 rounded-full bg-[#0C3B2E] flex-shrink-0" />
        <span className="text-xs text-slate-500 flex-1">Livres disponibles</span>
        <span className="text-xs font-bold text-[#0C3B2E]">{total}</span>
      </div>

      {/* Barre de progression déco */}
      <div className="h-1 w-full bg-[#0C3B2E]/8 rounded-full overflow-hidden">
        <div className="h-full bg-[#FFBA00] rounded-full" style={{ width: "100%" }} />
      </div>
    </div>
  );
}