import React, { useMemo } from "react";

import type { UserView } from "../type/PanneauType";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Props {
  users: UserView[];
}

// ─── Icons (inline SVG — zero deps) ──────────────────────────────────────────
const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconCheckCircle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const IconUserX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="8.5" cy="7" r="4"/>
    <line x1="18" y1="8" x2="23" y2="13"/>
    <line x1="23" y1="8" x2="18" y2="13"/>
  </svg>
);

const IconBook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const IconTrendUp = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const IconTrendDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
    <polyline points="17 18 23 18 23 12"/>
  </svg>
);

// ─── Color system ─────────────────────────────────────────────────────────────
const TONES = {
  violet: {
    card:  "bg-violet-50 dark:bg-violet-900/30",
    icon:  "bg-violet-600 dark:bg-violet-500",
    glow:  "bg-violet-600",
    label: "text-violet-700 dark:text-violet-300",
    value: "text-violet-900 dark:text-violet-100",
    bar:   "bg-violet-600 dark:bg-violet-400",
    trend: "text-emerald-600 dark:text-emerald-400",
  },
  emerald: {
    card:  "bg-emerald-50 dark:bg-emerald-900/30",
    icon:  "bg-emerald-600 dark:bg-emerald-500",
    glow:  "bg-emerald-600",
    label: "text-emerald-700 dark:text-emerald-300",
    value: "text-emerald-900 dark:text-emerald-100",
    bar:   "bg-emerald-600 dark:bg-emerald-400",
    trend: "text-emerald-600 dark:text-emerald-400",
  },
  red: {
    card:  "bg-red-50 dark:bg-red-900/30",
    icon:  "bg-red-500 dark:bg-red-600",
    glow:  "bg-red-500",
    label: "text-red-600 dark:text-red-300",
    value: "text-red-900 dark:text-red-100",
    bar:   "bg-red-500 dark:bg-red-400",
    trend: "text-red-500 dark:text-red-400",
  },
  amber: {
    card:  "bg-amber-50 dark:bg-amber-900/30",
    icon:  "bg-amber-500 dark:bg-amber-600",
    glow:  "bg-amber-500",
    label: "text-amber-700 dark:text-amber-300",
    value: "text-amber-900 dark:text-amber-100",
    bar:   "bg-amber-500 dark:bg-amber-400",
    trend: "text-emerald-600 dark:text-emerald-400",
  },
} as const;

type Tone = keyof typeof TONES;

// ─── Card config ──────────────────────────────────────────────────────────────
interface CardConfig {
  key: string;
  label: string;
  Icon: React.FC;
  tone: Tone;
  trendDown?: boolean;
}

const CARDS: CardConfig[] = [
  { key: "total",    label: "Utilisateurs", Icon: IconUsers,       tone: "violet"  },
  { key: "actifs",   label: "Actifs",       Icon: IconCheckCircle, tone: "emerald" },
  { key: "inactifs", label: "Inactifs",     Icon: IconUserX,       tone: "red",     trendDown: true },
  { key: "livres",   label: "Livres lus",   Icon: IconBook,        tone: "amber"   },
];

// ─── Stat card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: number;
  trendText: string;
  progress: number;
  Icon: React.FC;
  tone: Tone;
  trendDown?: boolean;
}

const StatCard = ({ label, value, trendText, progress, Icon, tone, trendDown }: StatCardProps) => {
  const t = TONES[tone];
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 ${t.card} p-4 transition-shadow duration-200 hover:shadow-md`}>
      {/* Glow blob */}
      <div className={`absolute -top-5 -right-5 w-16 h-16 rounded-full opacity-10 ${t.glow}`} aria-hidden="true" />

      {/* Icon */}
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white ${t.icon}`}>
        <Icon />
      </div>

      {/* Label */}
      <p className={`text-xs font-medium mt-3 ${t.label}`}>{label}</p>

      {/* Value */}
      <p className={`text-2xl font-semibold mt-0.5 tabular-nums ${t.value}`}>{value}</p>

      {/* Trend */}
      <div className={`flex items-center gap-1 mt-2 text-[11px] ${t.trend}`}>
        {trendDown ? <IconTrendDown /> : <IconTrendUp />}
        <span>{trendText}</span>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1.5 w-full bg-white/40 dark:bg-black/20 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${t.bar}`}
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const StatusUtilisateurs = ({ users }: Props) => {
  const actifCount = useMemo(
    () => users.filter((u) => u.statut === "ACTIF").length,
    [users]
  );

  const inactifCount = users.length - actifCount;

  const totalLivres = useMemo(
    () => users.reduce((acc, u) => acc + (u.livresLus ?? 0), 0),
    [users]
  );

  const pctActif  = users.length ? Math.round((actifCount  / users.length) * 100) : 0;
  const pctInactif = users.length ? Math.round((inactifCount / users.length) * 100) : 0;

  const values: Record<string, number> = {
    total:    users.length,
    actifs:   actifCount,
    inactifs: inactifCount,
    livres:   totalLivres,
  };

  const trends: Record<string, string> = {
    total:    "+12 ce mois",
    actifs:   `${pctActif}% actifs`,
    inactifs: `${pctInactif}% inactifs`,
    livres:   "+48 ce mois",
  };

  const progress: Record<string, number> = {
    total:    100,
    actifs:   pctActif,
    inactifs: pctInactif,
    livres:   Math.min(Math.round((totalLivres / 100) * 100), 100),
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {CARDS.map(({ key, label, Icon, tone, trendDown }) => (
        <StatCard
          key={key}
          label={label}
          value={values[key]}
          trendText={trends[key]}
          progress={progress[key]}
          Icon={Icon}
          tone={tone}
          trendDown={trendDown}
        />
      ))}
    </div>
  );
};

export default StatusUtilisateurs;