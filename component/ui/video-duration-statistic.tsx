import { useAppDispatch } from "@app/index";
import { Divider, Text, VStack } from "@chakra-ui/react";
import { useVideoDurationStatistic } from "@hook/index";
import { youtubeAction } from "@store/index";
import { beautyNumberDisplay } from "@utils/index";
import { useEffect } from "react";
import { DurationStatisticChart, TableVideo } from ".";

export function DurationStatistic() {
  const { videoDurationStatistic } = useVideoDurationStatistic();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (videoDurationStatistic) {
      dispatch(youtubeAction.setLoading({ loading: false }));
      return;
    }
    dispatch(youtubeAction.setLoading({ loading: true }));
  }, [videoDurationStatistic]);

  useEffect(() => {
    if (!videoDurationStatistic) {
      dispatch(youtubeAction.setLoading({ loading: true }));
    }
    if (videoDurationStatistic !== null) {
      dispatch(
        youtubeAction.preSetVideoSortList({
          type: "videoDuration",
          duration: videoDurationStatistic.recommendedDuration,
        })
      );
    }
  }, [videoDurationStatistic]);

  return videoDurationStatistic ? (
    <VStack w="100%">
      <VStack w="100%">
        <VStack w="100%" alignItems="start" m={5} px={6}>
          <Text fontWeight="medium">
            Recommended -{" "}
            <Text display="inline" color="red.400" fontWeight="light">
              {videoDurationStatistic.recommended}
            </Text>
          </Text>
          <Text fontWeight="medium" mx={5}>
            Average{" "}
            <Text display="inline" color="red.400" fontWeight="light">
              {beautyNumberDisplay(
                videoDurationStatistic.averageViewsRecommendedDuration.toString()
              )}
            </Text>{" "}
            views
          </Text>
        </VStack>
        <DurationStatisticChart
          videoDurationStatistic={videoDurationStatistic}
        />
      </VStack>
      <Divider />
      <Divider />
      <VStack w="100%">
        <Text fontWeight="bold">Top Video Recommended Duration</Text>
        <TableVideo />
      </VStack>
    </VStack>
  ) : null;
}
