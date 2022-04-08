import { Grid, GridItem, VStack, Text } from "@chakra-ui/react";
import { ISortVideo } from "@models/index";
import { beautyNumberDisplay } from "@utils/index";
import { ViewChart } from ".";
import { optimizeViewDataForChart, formatDuration } from "@utils/index";

export function ModalVideoInformation({
  views,
  viewsHistory,
  likes,
  commentCount,
  duration,
  gapViews,
  title,
  date,
}: ISortVideo) {
  return (
    <VStack>
      <Grid
        templateColumns="repeat(4, 1fr)"
        py={4}
        px={4}
        my={2}
        borderRadius="base"
        boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
        w="100%"
      >
        <GridItem>
          <VStack>
            <Text fontWeight="medium">Views</Text>
            <Text fontWeight="thin">
              {beautyNumberDisplay(views.toString())}
            </Text>
            <Text fontWeight="light" color="red.400">
              +{beautyNumberDisplay(gapViews.toString())}
            </Text>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack>
            <Text fontWeight="medium">Likes</Text>
            <Text fontWeight="thin">
              {beautyNumberDisplay(likes.toString())}
            </Text>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack>
            <Text fontWeight="medium">Comments</Text>
            <Text fontWeight="thin">
              {beautyNumberDisplay(commentCount.toString()) === "-1"
                ? "-"
                : beautyNumberDisplay(commentCount.toString())}
            </Text>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack>
            <Text fontWeight="medium">Video Duration</Text>
            <Text fontWeight="thin">{formatDuration(+duration)}</Text>
          </VStack>
        </GridItem>
      </Grid>
      <ViewChart {...optimizeViewDataForChart({ viewsHistory, date })} />
    </VStack>
  );
}
