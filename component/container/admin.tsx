import { channelApi } from "@api/index";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Input,
  Select,
  Text,
  Textarea,
  useClipboard,
  VStack,
} from "@chakra-ui/react";
import { ServerStatus } from "@component/ui/index";
import { SocketContext } from "@context/socket";
import { EVENT } from "@models/socket";
import { adminAction, selectAdminLoading } from "@store/index";
import { useContext, useEffect, useState } from "react";

export function Admin() {
  const [service, setService] = useState<1 | 2 | 3>(1);
  const [labelList, setLabelList] = useState<string[]>([]);
  const [label, setLabel] = useState<string>(null!);
  const loadingSelector = useAppSelector(selectAdminLoading);

  const [url, setUrl] = useState<string>(null!);

  const dispatch = useAppDispatch();

  const socket = useContext(SocketContext);
  const [joined, setJoined] = useState(false);

  const { hasCopied, onCopy } = useClipboard(url);

  const handleOnclick = () => {
    if (!label) return;

    if (service === 1 && label) {
      dispatch(adminAction.setLoading({ loading: true }));
      return socket.emit(EVENT.UPDATE_CHANNEL, { label });
    }

    if (service === 2 && url) {
      let channelUrl = url.split(/\r?\n/).join(",");
      dispatch(adminAction.setLoading({ loading: true }));
      return socket.emit(EVENT.GET_NEW_CHANNEL, {
        url: channelUrl,
        label: label,
      });
    }

    if (service === 3 && label) {
      dispatch(adminAction.setLoading({ loading: true }));
      return socket.emit(EVENT.OPTIMIZE, {
        label: label,
      });
    }
  };

  useEffect(() => {
    const getLabelList = async () => {
      const labelList = await channelApi.getChannelLabel();
      setLabelList(labelList);
      setLabel(labelList[0]);
    };

    getLabelList();
  }, []);

  useEffect(() => {
    if (service) setLabel(labelList[0]);
  }, [service]);

  useEffect(() => {
    socket.on("connection", () => {
      setJoined(true);
    });
  }, [socket]);

  return (
    <Center my={5}>
      <VStack w="100%">
        <Box maxWidth="1024px" w="100%">
          <VStack justifyContent="flex-start" alignItems="flex-start">
            <HStack w="100%" justifyContent="space-between" my={5}>
              <HStack>
                <Button
                  colorScheme={service === 1 ? `red` : "gray"}
                  onClick={() => setService(1)}
                >
                  Update
                </Button>
                <Button
                  colorScheme={service === 2 ? `red` : "gray"}
                  onClick={() => setService(2)}
                >
                  Get New
                </Button>
                <Button
                  colorScheme={service === 3 ? `red` : "gray"}
                  onClick={() => setService(3)}
                >
                  Optimize
                </Button>
              </HStack>
              <HStack>
                <Text fontWeight="hairline">Label</Text>
                {service === 2 ? (
                  <Input
                    maxWidth="100px"
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                  ></Input>
                ) : null}
                <Select
                  maxWidth="150px"
                  onChange={(e) => setLabel(e.target.value)}
                >
                  {labelList.map((label) => (
                    <option value={label} key={label}>
                      {label}
                    </option>
                  ))}
                </Select>
              </HStack>
            </HStack>

            {service === 2 ? (
              <VStack w="100%" alignItems="flex-start">
                <HStack>
                  <Button
                    variant="outline"
                    colorScheme="orange"
                    size="sm"
                    onClick={() => setUrl("")}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="outline"
                    colorScheme="pink"
                    size="sm"
                    onClick={onCopy}
                  >
                    {hasCopied ? "Copied" : "Copy"}
                  </Button>
                </HStack>
                <Textarea
                  placeholder="Channel URL List"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </VStack>
            ) : null}

            <Button
              variant="outline"
              colorScheme="teal"
              onClick={handleOnclick}
              isLoading={loadingSelector}
            >
              Run
            </Button>
          </VStack>
          <Divider my={8} />
          {joined ? <ServerStatus /> : null}
        </Box>
      </VStack>
    </Center>
  );
}
