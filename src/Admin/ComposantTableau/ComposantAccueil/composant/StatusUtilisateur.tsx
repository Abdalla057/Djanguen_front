import React, { useMemo } from "react";
import { Users, CheckCircle, UserX, BookOpen, TrendingUp, TrendingDown } from "lucide-react";
import type { UserView } from "../type/PanneauType";

interface Props {
  users: UserView[];
}

const CARDS = [
  {
    key    : "total",
    label  : "Total utilisateurs",
    sub    : "+12 ce mois",
    up     : true,
    Icon   : Users,
    color  : {
      card  : "bg-gradient-to-br from-violet-50 to-white border-violet-200",
      icon  : "bg-violet-700",
      label : "text-violet-700",
      val   : "text-violet-900",
      bar   : "bg-violet-700",
    },
  },
  {
    key    : "actifs",
    label  : "Actifs",
    up     : true,
    Icon   : CheckCircle,
    color  : {
      card  : "bg-gradient-to-br from-emerald-50 to-white border-emerald-200",
      icon  : "bg-emerald-600",
      label : "text-emerald-700",
      val   : "text-emerald-900",
      bar   : "bg-emerald-600",
    },
  },
  {
    key    : "inactifs",
    label  : "Inactifs",
    sub    : "-3 ce mois",
    up     : false,
    Icon   : UserX,
    color  : {
      card  : "bg-gradient-to-br from-red-50 to-white border-red-200",
      icon  : "bg-red-500",
      label : "text-red-600",
      val   : "text-red-900",
      bar   : "bg-red-500",
    },
  },
  {
    key    : "livres",
    label  : "Livres lus",
    sub    : "+48 ce mois",
    up     : true,
    Icon   : BookOpen,
    color  : {
      card  : "bg-gradient-to-br from-amber-50 to-white border-amber-200",
      icon  : "bg-amber-600",
      label : "text-amber-700",
      val   : "text-amber-900",
      bar   : "bg-amber-600",
    },
  },
] as const;

const StatusUtilisateurs = ({ users }: Props) => {

  const actifCount = useMemo(
    () => users.filter((u) => u.statut === "ACTIF").length,
    [users]
  );
  const inactifCount = users.length - actifCount;
  const totalLivres  = useMemo(
    () => users.reduce((acc, u) => acc + (u.livresLus ?? 0), 0),
    [users]
  );
  const pctActif = users.length ? Math.round((actifCount / users.length) * 100) : 0;

  const values: Record<string, number> = {
    total   : users.length,
    actifs  : actifCount,
    inactifs: inactifCount,
    livres  : totalLivres,
  };

  const subs: Record<string, string> = {
    total   : "+12 ce mois",
    actifs  : `${pctActif}% du total`,
    inactifs: "-3 ce mois",
    livres  : "+48 ce mois",
  };

  const barWidths: Record<string, number> = {
    total   : 72,
    actifs  : pctActif,
    inactifs: users.length ? Math.round((inactifCount / users.length) * 100) : 0,
    livres  : Math.min(Math.round((totalLivres / Math.max(totalLivres, 1)) * 85), 100),
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
      {CARDS.map(({ key, label, up, Icon, color }) => (
        <div
          key={key}
          className={`
            relative overflow-hidden
            rounded-[18px] p-4 border
            ${color.card}
          `}
        >
          {/* Cercle décoratif */}
          <div className={`absolute -top-3 -right-3 w-16 h-16 rounded-full opacity-10 ${color.icon}`} />

          {/* Icône */}
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color.icon}`}>
            <Icon className="w-4 h-4 text-white" />
          </div>

          {/* Label */}
          <p className={`text-[11px] font-medium mb-1 ${color.label}`}>{label}</p>

          {/* Valeur */}
          <p className={`text-[26px] font-semibold leading-none mb-1.5 ${color.val}`}>
            {values[key]}
          </p>

          {/* Badge tendance */}
          <span
            className={`
              inline-flex items-center gap-1 text-[10px] font-medium
              px-2 py-0.5 rounded-full
              ${up ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"}
            `}
          >
            {up
              ? <TrendingUp  className="w-3 h-3" />
              : <TrendingDown className="w-3 h-3" />
            }
            {subs[key]}
          </span>

          {/* Barre de progression */}
          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-black/5 rounded-b-[18px]">
            <div
              className={`h-full rounded-b-[18px] transition-all duration-500 ${color.bar}`}
              style={{ width: `${barWidths[key]}%` }}
            />
          </div>

        </div>
      ))}
    </div>
  );
};

export default StatusUtilisateurs;