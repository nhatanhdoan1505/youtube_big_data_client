import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io(`http://${process.env.SERVER_ADDRESS}:8080`);
export const SocketContext = createContext(socket);
