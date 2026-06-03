import React from "react";

interface DiagrammeItem {
  label: string;
  value: number;
}

interface Props {
  data?: DiagrammeItem[];
}

const defaultData: DiagrammeItem[] = [
  { label: "Livres", value: 120 },
  { label: "Utilisateurs", value: 80 },
  { label: "Lectures", value: 150 },
  { label: "Audio", value: 60 },
  { label: "Recherches", value: 90 },
];

const DiagrammeActivite = ({
  data = defaultData,
}: Props) => {

  const safeData = data.length > 0 ? data : defaultData;

  const max = Math.max(
    ...safeData.map((d) => d.value),
    1 // évite division par zéro
  );

  return (
    <div className="w-full bg-white rounded-xl p-3 shadow-sm border border-slate-100">

      {/* HEADER */}
      <div className="mb-3">
        <h2 className="text-sm font-bold text-slate-800">
          Activité du site
        </h2>

        <p className="text-[11px] text-slate-500">
          Vue comparative des interactions
        </p>
      </div>

      {/* GRAPH */}
      <div className="flex items-end gap-3 h-40">

        {safeData.map((item, index) => {

          const height = (item.value / max) * 120;

          return (
            <div
              key={index}
              className="flex flex-col items-center group"
            >

              {/* BAR CONTAINER */}
              <div className="relative w-7">

                {/* BACK BAR */}
                <div
                  className="absolute bottom-0 left-1 w-7 bg-slate-200 rounded-md opacity-40"
                  style={{ height: `${height}px` }}
                />

                {/* MAIN BAR */}
                <div
                  className="relative w-7 rounded-md bg-gradient-to-t from-indigo-500 to-violet-400 shadow-md transition-all duration-300 group-hover:scale-105"
                  style={{ height: `${height}px` }}
                />

              </div>

              {/* LABEL */}
              <span className="text-[10px] text-slate-500 mt-1">
                {item.label}
              </span>

              {/* VALUE */}
              <span className="text-[10px] font-semibold text-slate-700">
                {item.value}
              </span>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default DiagrammeActivite;