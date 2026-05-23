import { useEffect, useState } from "react";

import {
  connectSocket,
  onUtilisateurStatus,
  disconnectSocket,
} from "../composant/status.socket";

export function useUtilisateurStatus(userId: number) {
  const [status, setStatus] =
    useState<"ONLINE" | "OFFLINE">("OFFLINE");

  useEffect(() => {
    if (!userId) return;

    // connect + identify
    connectSocket(userId);

    // listen status changes
    onUtilisateurStatus((data) => {
      if (data.userId === userId) {
        setStatus(data.status);
      }
    });

    return () => {
      disconnectSocket();
    };
  }, [userId]);

  return status;
}