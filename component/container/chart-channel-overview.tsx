import { useAppDispatch, useAppSelector } from "@app/index";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import {
  NumberVideosChart,
  SubscribeChart,
  TagsChart,
  VideoViewsDistribution,
  ViewChart,
} from "@component/ui";
import { useChannelTags } from "@hook/index";
import { selectChannelOverview } from "@store/index";
import {
  beautyNumberDisplay,
  optimizeNumberVideosDataForChart,
  optimizeSubscribesDataForChart,
  optimizeViewDataForChart,
} from "@utils/index";

export function ChartChannelOverview() {
  const channelOverviewSelector = useAppSelector(selectChannelOverview);
  const { channelTagList } = useChannelTags();

  return (
    <VStack w="100%">
      <SimpleGrid
        columns={2}
        border="1px solid #d8d8d8"
        p={4}
        borderRadius="8px"
        w="100%"
      >
        <Box>
          <VStack w="100%" alignItems="start">
            <VStack alignItems="start">
              <Text fontWeight="bold" fontSize="2xl">
                Views
              </Text>
              <Text fontWeight="semibold">
                {beautyNumberDisplay(channelOverviewSelector.views.toString())}
              </Text>
            </VStack>
            <ViewChart
              {...optimizeViewDataForChart({
                viewsHistory: channelOverviewSelector.viewsHistory,
                date: channelOverviewSelector.date,
              })}
            />
          </VStack>
        </Box>
        <Box>
          <VStack w="100%" alignItems="start">
            <VStack alignItems="start">
              <Text fontWeight="bold" fontSize="2xl">
                Subscribes
              </Text>
              <Text fontWeight="semibold">
                {beautyNumberDisplay(
                  channelOverviewSelector.subscribe.toString()
                ) === "-1"
                  ? "NOT PUBLIC"
                  : beautyNumberDisplay(
                      channelOverviewSelector.subscribe.toString()
                    )}
              </Text>
            </VStack>
            <SubscribeChart
              {...optimizeSubscribesDataForChart({
                subscribesHistory: channelOverviewSelector.subscribesHistory,
                date: channelOverviewSelector.date,
              })}
            />
          </VStack>
        </Box>
        <Box>
          <VStack w="100%" alignItems="start">
            <VStack alignItems="start">
              <Text fontWeight="bold" fontSize="2xl">
                Number Videos
              </Text>
              <Text fontWeight="semibold">
                {beautyNumberDisplay(
                  channelOverviewSelector.numberVideos.toString()
                )}
              </Text>
            </VStack>
            <NumberVideosChart
              {...optimizeNumberVideosDataForChart({
                numberVideosHistory:
                  channelOverviewSelector.numberVideosHistory,
                date: channelOverviewSelector.date,
              })}
            />
          </VStack>
        </Box>
        {channelTagList ? (
          <Box>
            <VStack w="100%" alignItems="start">
              <VStack alignItems="start">
                <Text fontWeight="bold" fontSize="2xl">
                  Tags
                </Text>
                <Text fontWeight="semibold">
                  {beautyNumberDisplay(channelTagList.average.toString())}
                </Text>
              </VStack>
              <TagsChart />
            </VStack>
          </Box>
        ) : null}
      </SimpleGrid>
      <Box border="1px solid #d8d8d8" w="100%" borderRadius="8px" p={3}>
        <VStack w="100%" alignItems="start">
          <Text fontWeight="bold" fontSize="2xl">
            Video Views Distribution
          </Text>
          <VideoViewsDistribution />
        </VStack>
      </Box>
    </VStack>
  );
}
