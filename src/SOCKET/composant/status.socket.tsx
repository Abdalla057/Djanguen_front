import { socket } from "./socket";
import { SOCKET_EVENTS } from "./events";

/* =========================================================
   CONNECT SOCKET + IDENTIFY USER
========================================================= */
export function connectSocket(userId: number) {
  socket.connect();

  socket.emit(SOCKET_EVENTS.IDENTIFY, {
    userId,
  });
}

/* =========================================================
   LISTEN USER STATUS
========================================================= */
export function onUtilisateurStatus(
  callback: (data: {
    userId: number;
    status: "ONLINE" | "OFFLINE";
  }) => void
) {
  socket.on(SOCKET_EVENTS.USER_STATUS, callback);
}

/* =========================================================
   DISCONNECT SOCKET
========================================================= */
export function disconnectSocket() {
  socket.disconnect();
}