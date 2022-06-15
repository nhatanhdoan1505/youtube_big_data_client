import { useAppDispatch } from "@app/index";
import { HStack, Progress, Text, VStack } from "@chakra-ui/react";
import { SocketContext } from "@context/socket";
import { EVENT, IServerStatus } from "@models/socket";
import { adminAction } from "@store/index";
import { useContext, useEffect, useState } from "react";

export function ServerStatus() {
  const [serverStatus, setServerStatus] = useState<IServerStatus>(null!);
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.emit(EVENT.SERVER_READY);
    socket.on(EVENT.SERVER_READY, ({ data }: { data: IServerStatus }) => {
      setServerStatus(data);
    });
    return () => setServerStatus(null!);
  }, [socket]);

  useEffect(() => {
    if (!serverStatus) return;
    dispatch(adminAction.setLoading({ loading: !serverStatus.ready }));
  }, [serverStatus]);

  const render = serverStatus ? (
    <VStack>
      <HStack w="100%" justifyContent="flex-start">
        <Text fontWeight="bold">
          {serverStatus.ready
            ? "SERVER IS AVAILABLE"
            : !serverStatus.ready && serverStatus.serviceRunning === "UPDATE"
            ? "Updating Channel Information"
            : !serverStatus.ready && serverStatus.serviceRunning === "GET"
            ? "Getting Channel Information"
            : "Optimizing Data"}
        </Text>
        <Text>
          {!serverStatus.ready
            ? `${serverStatus.numberWorked} / ${serverStatus.total}`
            : null}
        </Text>
      </HStack>
      {!serverStatus.ready ? (
        <Progress
          w="100%"
          hasStripe
          value={Math.trunc(
            (serverStatus.numberWorked * 100) / serverStatus.total
          )}
        />
      ) : null}
    </VStack>
  ) : null;
  return render;
}
