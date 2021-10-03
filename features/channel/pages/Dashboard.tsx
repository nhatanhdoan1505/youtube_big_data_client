import { VStack, Select, Box, Center } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { channelAction, selectChannels, selectLabel } from "../channelSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { useRouter } from "next/router";
import * as _ from "lodash";
import { IChannel } from "../../../models";
import ChannelView from "../components/ChannelView";

function Dashboard() {
  const [label, setLabel] = useState("");

  const router = useRouter();
  const channels = useAppSelector(selectChannels);
  const labels = useAppSelector(selectLabel);
  const [channelsPick, setChannelsPick] = useState<IChannel[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(channelAction.queryAllChannel());
  }, []);

  const handleChoseLabel = (event: ChangeEvent<HTMLSelectElement>) => {
    setLabel(event.target.value);
    const channelData = channels.filter((c) => c.label === event.target.value);
    setChannelsPick(channelData);
  };

  useEffect(() => {
    if (labels) {
      const channelData = channels.filter((c) => c.label === label);
      setChannelsPick(channelData);
    }
  }, [channels]);

  return (
    <Center my={6}>
      <Box w={{ base: "100%", sm: "100%", md: "80%", lg: "70%" }} x>
        <VStack>
          <Select
            placeholder="Select label"
            colorScheme="teal.500"
            onChange={handleChoseLabel}
          >
            {_.uniq(labels).map((l) => (
              <option value={l} key={l}>
                {l}
              </option>
            ))}
          </Select>
          <ChannelView channels={channelsPick} />
        </VStack>
      </Box>
    </Center>
  );
}

export default Dashboard;
