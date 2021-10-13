import {
  Box,
  Button,
  Center,
  HStack,
  Select, VStack
} from "@chakra-ui/react";
import * as _ from "lodash";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { IChannel } from "../../../models";
import { channelAction, selectChannels, selectLabel } from "../channelSlice";
import ChannelTable from "../components/ChannelTable";

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
    const date = channelData
      .filter((c) => c.date.includes("|"))
      .map((c) => c.date.split("|")[c.date.split("|").length - 1])
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())[0];
      
    dispatch(channelAction.setDate(date));
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
      <Box w={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }} mx={5}>
        <VStack>
          <HStack w="100%">
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
            <Button
              colorScheme="teal.500"
              variant="outline"
              onClick={() => router.push("/admin/")}
            >
              Back to Admin
            </Button>
          </HStack>
          <ChannelTable channels={channelsPick} />
        </VStack>
      </Box>
    </Center>
  );
}

export default Dashboard;
