export const enum EVENT {
  SERVER_READY = "server_ready",
  GET_NEW_CHANNEL = "get_new_channel",
  UPDATE_CHANNEL = "update_channel",
  RESULT = "result",
  OPTIMIZE = "optimize",
}

export interface IServerStatus {
  ready: boolean;
  serviceRunning: "UPDATE" | "GET" | "OPTIMIZE";
  total: number;
  numberWorked: number;
}
