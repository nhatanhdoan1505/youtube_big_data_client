import { useAppSelector } from "@app/index";
import { HStack, Image, Link, Text, VStack } from "@chakra-ui/react";
import { ChartChannelOverview } from "@component/container";
import { selectChannelOverview } from "@store/youtube";
import { ChannelInformationHorizontal, ChannelRankHorizontal } from ".";

export function MyChannelOverview() {
  const channelOverviewSelector = useAppSelector(selectChannelOverview);
  return channelOverviewSelector ? (
    <VStack>
      <HStack justifyContent="flex-start" alignItems="center" w="100%" py={5}>
        <Image
          src={channelOverviewSelector.channelThumbnail}
          alt={channelOverviewSelector.title}
          maxWidth="60px"
          maxHeight="60px"
          borderRadius="50%"
        />
        <Link
          href={`https://www.youtube.com/channel/${channelOverviewSelector.id}`}
          target="_blank"
        >
          <Text fontWeight="bold">{channelOverviewSelector.title}</Text>
        </Link>
      </HStack>
      <ChannelRankHorizontal />;
      <ChannelInformationHorizontal />
      <ChartChannelOverview />
    </VStack>
  ) : null;
}
