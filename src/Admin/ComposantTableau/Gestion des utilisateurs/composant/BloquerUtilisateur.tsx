import React, { useEffect, useState } from "react";
import { Users, Ban } from "lucide-react";

import type { User } from "../type/GestionUtilisateurType";
import { socket } from "../../../../SOCKET/composant/socket";
import { SOCKET_EVENTS } from "../../../../SOCKET/composant/events";

interface Props {
  users?: User[];
  loading: boolean;
  onBlock: (id: number) => void;
}

const obtenirInitiales = (nom: string) =>
  nom.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

export default function ListeUtilisateurs({ users = [], loading, onBlock }: Props) {

  const [liveUsers, setLiveUsers] = useState<User[]>(users);

  useEffect(() => {
    setLiveUsers(users);
    socket.on(SOCKET_EVENTS.USER_STATUS, (data) => {
      setLiveUsers((prev) =>
        prev.map((user) =>
          user.id === data.userId
            ? { ...user, statut: data.status === "ONLINE" ? "ACTIF" : "BLOQUE" }
            : user
        )
      );
    });
    return () => { socket.off(SOCKET_EVENTS.USER_STATUS); };
  }, [users]);

  if (loading) {
    return (
      <div className="p-4 text-sm animate-pulse" style={{ color: "#6b7280" }}>
        Chargement utilisateurs...
      </div>
    );
  }

  const actifs = liveUsers.filter((u) => u.statut === "ACTIF").length;

  return (
    <div className="rounded-[28px] p-4 shadow" style={{ background: "#fdf6f0" }}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-4">

        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
            style={{ background: "#ffffff" }}
          >
            <Users className="w-4 h-4" style={{ color: "#6b7280" }} />
          </div>

          <div>
            <p className="font-semibold text-sm" style={{ color: "#1a1a2e" }}>
              Utilisateurs
            </p>
            <p className="text-xs" style={{ color: "#6b7280" }}>
              {liveUsers.length} total
            </p>
          </div>
        </div>

        <div className="text-xs flex items-center gap-1" style={{ color: "#374151" }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ecb8d" }} />
          {actifs} en ligne
        </div>

      </div>

      {/* ── Liste ── */}
      <div className="flex flex-col gap-2 max-h-[340px] overflow-y-auto">

        {liveUsers.map((user) => {
          const actif = user.statut === "ACTIF";

          return (
            <div
              key={user.id}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: "#ffffff" }}
            >

              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "#f3f1ff", color: "#a78bfa" }}
              >
                {obtenirInitiales(user.nom)}
              </div>

              {/* Infos */}
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: "#1a1a2e" }}>
                  {user.nom}
                </p>
                <p className="text-xs" style={{ color: "#6b7280" }}>
                  {user.email}
                </p>
              </div>

              {/* Statut */}
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: actif ? "#fde8d8" : "#fff5f3",
                  color:      actif ? "#4ecb8d" : "#fbbf24",
                }}
              >
                {user.statut}
              </span>

              {/* Bloquer */}
              {actif && (
                <button
                  onClick={() => onBlock(user.id)}
                  className="text-xs flex items-center gap-1 hover:opacity-70 transition-opacity"
                  style={{ color: "#fbbf24" }}
                >
                  <Ban className="w-3 h-3" />
                  Bloquer
                </button>
              )}

            </div>
          );
        })}

      </div>
    </div>
  );
}