import { io } from "socket.io-client";
const SERVER = import.meta.env.VITE_SOCKET_URL;
const socket = io(`${SERVER}`, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: false,
});
export default socket;
