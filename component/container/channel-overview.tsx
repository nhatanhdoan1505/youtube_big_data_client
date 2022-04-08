import { VStack } from "@chakra-ui/react";
import {
  ChannelInformationHorizontal,
  ChannelRankHorizontal,
  VideoHotListBase,
} from "@component/ui/index";
import { ChartChannelOverview } from "./chart-channel-overview";

export function ChannelOverview() {
  return (
    <VStack>
      <ChannelRankHorizontal />
      <ChannelInformationHorizontal />
      <ChartChannelOverview />
      <VideoHotListBase />
    </VStack>
  );
}
