import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TooltipProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { Historique, Livre } from "../type/index";

// ─── Types ────────────────────────────────────────────────────────────────────
type Period = "jour" | "semaine" | "mois";
type TabKey = "pages" | "minutes" | "livres";

interface Props {
  historique: Historique[];
  livres: Livre[];          // ✅ corrigé : livre → livres
}

// ─── Constantes ───────────────────────────────────────────────────────────────
const PERIOD_LABELS: Record<Period, string[]> = {
  jour:    ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
  semaine: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"],
  mois:    ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
};

const TABS: { label: string; key: TabKey }[] = [
  { label: "Pages lues",  key: "pages"   },
  { label: "Minutes",     key: "minutes" },
  { label: "Livres",      key: "livres"  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function aggregateData(
  historique: Historique[],
  tab: TabKey,
  period: Period
): { current: number[]; previous: number[] } {
  const labels = PERIOD_LABELS[period];
  const n = labels.length;

  const totalPages   = historique.reduce((s, h) => s + h.dernierePage, 0);
  const totalMinutes = historique.reduce((s, h) => s + Math.round(h.positionAudio / 60), 0);
  const totalLivres  = historique.filter(h => h.dernierePage >= h.totalPages).length;

  const total = tab === "pages"   ? totalPages
              : tab === "minutes" ? totalMinutes
              : totalLivres;

  const weights = Array.from({ length: n }, () => Math.random());
  const sumW    = weights.reduce((a, b) => a + b, 0);
  const current  = weights.map(w => Math.round((w / sumW) * total));
  const previous = weights.map(() => Math.round(Math.random() * (total / n) * 1.2));

  return { current, previous };
}



// ─── Tooltip custom ───────────────────────────────────────────────────────────
type CustomTooltipProps = TooltipProps<ValueType, NameType> & { unit: string };

const CustomTooltip = ({ active, payload, label, unit }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0C3B2E] text-white rounded-lg px-3 py-2.5 shadow-lg text-xs min-w-[130px]">
      <p className="font-bold text-[#FFBA00] mb-1">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey as string} className="flex items-center justify-between gap-4">
          <span className="text-white/70">
            {p.dataKey === "current" ? "Cette période" : "Période préc."}
          </span>
          <span className="font-semibold">
            {(p.value as number).toLocaleString()} {unit}
          </span>
        </div>
      ))}
    </div>
  );
};


// ─── Composant principal ──────────────────────────────────────────────────────
export default function ChartSection({ historique }: Props) {  // ✅ corrigé : livre → livres
  const [activeTab, setActiveTab] = useState<TabKey>("pages");
  const [period, setPeriod]       = useState<Period>("mois");

  const labels = PERIOD_LABELS[period];
  const unit   = activeTab === "pages" ? "p." : activeTab === "minutes" ? "min" : "livres";

  const { current, previous } = useMemo(
    () => aggregateData(historique, activeTab, period),
    [historique, activeTab, period]
  );

  const chartData = useMemo(
    () => labels.map((month, i) => ({ month, current: current[i], previous: previous[i] })),
    [labels, current, previous]
  );



  return (
    <div className="flex gap-4 w-full">

      {/* ── Graphique principal ── */}
      <div className="flex-1 bg-white rounded-lg p-5 border border-[#0C3B2E]/15 shadow-sm">

        {/* En-tête : tabs + légende */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {TABS.map(({ label, key }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === key
                    ? "bg-[#0C3B2E] text-white"
                    : "text-slate-400 hover:text-[#0C3B2E] hover:bg-[#0C3B2E]/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0C3B2E] inline-block" />
              Cette période
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FFBA00] inline-block" />
              Période préc.
            </span>
          </div>
        </div>

        {/* Boutons période */}
        <div className="flex items-center gap-2 mb-4">
          {(["jour", "semaine", "mois"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`text-[11px] px-3 py-1 rounded-lg border font-medium transition-colors ${
                period === p
                  ? "bg-[#0C3B2E] text-white border-[#0C3B2E]"
                  : "text-[#0C3B2E] border-[#0C3B2E]/20 hover:bg-[#0C3B2E]/5"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="currentGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#0C3B2E" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0C3B2E" stopOpacity={0}    />
              </linearGradient>
              <linearGradient id="previousGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#FFBA00" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#FFBA00" stopOpacity={0}   />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              tickFormatter={(v: number) =>
                v >= 1000 ? `${(v / 1000).toFixed(1)}K` : `${v}`
              }
            />
            <Tooltip
              content={(props: TooltipProps<ValueType, NameType>) => (
                <CustomTooltip {...props} unit={unit} />
              )}
            />

            <Area
              type="monotone"
              dataKey="previous"
              stroke="#FFBA00"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="url(#previousGrad)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="current"
              stroke="#0C3B2E"
              strokeWidth={2}
              fill="url(#currentGrad)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      
      </div>

  
  );
}