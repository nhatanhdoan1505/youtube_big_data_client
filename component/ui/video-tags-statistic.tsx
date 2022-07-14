import { useAppDispatch } from "@app/index";
import {
  Divider,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useVideoTagsStatistic } from "@hook/index";
import { youtubeAction } from "@store/index";
import { beautyNumberDisplay } from "@utils/index";
import * as _ from "lodash";
import { useEffect, useState } from "react";
import { TableVideo, TagsStatisticChart } from ".";

export function VideoTagsStatistic() {
  const { videoTagsStatistic } = useVideoTagsStatistic();
  const [numberTags, setNumberTags] = useState<number>(null!);
  const [triggerChange, setTriggerChange] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (videoTagsStatistic) {
      dispatch(youtubeAction.setLoading({ loading: false }));
      return;
    }
    dispatch(youtubeAction.setLoading({ loading: true }));
  }, [videoTagsStatistic]);

  useEffect(() => {
    if (videoTagsStatistic && numberTags === null) {
      setNumberTags(+videoTagsStatistic.recommendedTags);
    }
  }, [videoTagsStatistic]);

  useEffect(() => {
    if (!numberTags) return;

    if (triggerChange) {
      clearTimeout();
      setTimeout(() => {
        setTriggerChange(false);
      }, 1000);
      return;
    }

    dispatch(
      youtubeAction.preSetVideoSortList({
        type: "tagsTrend",
        numberTags,
      })
    );
  }, [numberTags, triggerChange]);

  const render = videoTagsStatistic ? (
    <VStack w="100%">
      <VStack w="100%">
        <VStack w="100%" alignItems="start" m={5} px={6}>
          <Text fontWeight="medium">
            Recommended -{" "}
            <Text display="inline" color="red.400" fontWeight="light">
              {videoTagsStatistic.recommendedTags}
            </Text>
          </Text>
          <Text fontWeight="medium" mx={5}>
            Average{" "}
            <Text display="inline" color="red.400" fontWeight="light">
              {beautyNumberDisplay(
                videoTagsStatistic.averageViewsRecommendedTags.toString()
              )}
            </Text>{" "}
            views
          </Text>
        </VStack>
        <TagsStatisticChart videoTagsStatistic={videoTagsStatistic} />
      </VStack>
      <Divider />
      <Divider />
      <VStack w="100%">
        {numberTags ? (
          <>
            <Text fontWeight="bold" mt={10}>
              Top Video Recommended Tags{" "}
              <Text display="inline" color="red.400">
                {beautyNumberDisplay(numberTags.toString())}
              </Text>
            </Text>
            <NumberInput
              value={numberTags}
              min={_.min(videoTagsStatistic.tags.map((n) => +n))}
              max={_.max(videoTagsStatistic.tags.map((n) => +n))}
              onChange={(e) => {
                setTriggerChange(true);
                setNumberTags(+e);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </>
        ) : null}

        <TableVideo />
      </VStack>
    </VStack>
  ) : null;
  return render;
}
