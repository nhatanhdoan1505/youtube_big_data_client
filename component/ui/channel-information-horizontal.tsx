import { Text, SimpleGrid, VStack } from "@chakra-ui/react";
import { ISortChannel } from "@models/index";
import { beautyNumberDisplay, formatDate, formatDuration } from "@utils/index";
import { useAppSelector } from "@app/index";
import { selectChannelOverview } from "@store/index";

export function ChannelInformationHorizontal() {
  const channelOverviewSelector = useAppSelector(selectChannelOverview);

  const render = channelOverviewSelector ? (
    <SimpleGrid
      spacing="40px"
      columns={7}
      border="1px solid #d8d8d8"
      p={4}
      borderRadius="8px"
      w="100%"
    >
      <VStack>
        <Text fontWeight="bold">Views</Text>
        <Text fontWeight="semibold">
          {beautyNumberDisplay(channelOverviewSelector.views.toString())}
        </Text>
        <Text fontWeight="thin">
          {beautyNumberDisplay(channelOverviewSelector.viewsPerDay.toString())}/
          Day
        </Text>
      </VStack>
      <VStack>
        <Text fontWeight="bold">Subscribers</Text>
        <Text fontWeight="semibold">
          {beautyNumberDisplay(channelOverviewSelector.subscribe.toString()) ===
          "-1"
            ? null
            : beautyNumberDisplay(channelOverviewSelector.subscribe.toString())}
        </Text>
        <Text fontWeight="thin">
          {beautyNumberDisplay(
            channelOverviewSelector.subscribePerDay.toString()
          )}{" "}
          / Day
        </Text>
      </VStack>
      <VStack>
        <Text fontWeight="bold">Videos</Text>
        <Text fontWeight="semibold">
          {beautyNumberDisplay(channelOverviewSelector.numberVideos.toString())}
        </Text>
      </VStack>
      <VStack alignItems="center">
        <Text fontWeight="bold">Duration</Text>
        <Text fontWeight="semibold">
          {formatDuration(+channelOverviewSelector.durationPerVideo)}
        </Text>
      </VStack>
      <VStack alignItems="center">
        <Text fontWeight="bold">Upload</Text>
        <Text fontWeight="semibold">
          {channelOverviewSelector.uploadPerWeek}
        </Text>
        <Text fontWeight="thin">/ Week</Text>
      </VStack>
      <VStack alignItems="center">
        <Text fontWeight="bold">Joined</Text>
        <Text fontWeight="semibold">
          {formatDate(channelOverviewSelector.publishedAt).split(",")[0]}
        </Text>
      </VStack>
      <VStack alignItems="center">
        <Text fontWeight="bold">Subs Growth</Text>
        <Text fontWeight="semibold">
          {beautyNumberDisplay(
            channelOverviewSelector.subscribeGrowPer10K.toString()
          )}
        </Text>
        <Text fontWeight="thin">/ 10K Views</Text>
      </VStack>
    </SimpleGrid>
  ) : null;
  return render;
}
