import { io, Socket } from "socket.io-client";
import { ENV } from "../constante/contante";

export const socket: Socket = io(ENV.SOCKET_URL, {
  autoConnect: false,
});