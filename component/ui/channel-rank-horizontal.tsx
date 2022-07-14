import { useAppSelector } from "@app/index";
import { Box, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import { selectChannelOverview } from "@store/index";

export function ChannelRankHorizontal() {
  const channelOverviewSelector = useAppSelector(selectChannelOverview);
  return (
    <Grid
      templateColumns="repeat(6, 1fr)"
      w="100%"
      border="1px solid #d8d8d8"
      p={4}
      borderRadius="8px"
      gap={3}
    >
      <GridItem>
        <VStack alignItems="start">
          <Text fontWeight="bold">Video View Rank</Text>
          <Text fontWeight="bold">
            {channelOverviewSelector.rankVideoViews} th
          </Text>
        </VStack>
      </GridItem>
      <GridItem colSpan={2}>
        <VStack justifyContent="center" alignItems="center" w="100%" h="100%">
          <Box border="1px solid black" w="100%" />
        </VStack>
      </GridItem>
      <GridItem>
        <VStack alignItems="start">
          <Text fontWeight="bold">Subscriber Rank</Text>
          <Text fontWeight="bold">
            {channelOverviewSelector.rankSubscribe} th
          </Text>
        </VStack>
      </GridItem>
      <GridItem colSpan={2}>
        <VStack justifyContent="center" alignItems="center" w="100%" h="100%">
          <Box border="1px solid black" w="100%" />
        </VStack>
      </GridItem>
    </Grid>
  );
}
