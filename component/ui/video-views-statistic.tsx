import { videoApi } from "@api/index";
import { useAppDispatch } from "@app/index";
import { Box, VStack, Text, Select, Divider } from "@chakra-ui/react";
import { useVideoViewsStatistic } from "@hook/index";
import { youtubeAction } from "@store/index";
import { beautyNumberDisplay } from "@utils/index";
import { useEffect, useState } from "react";
import { VideoViewStatisticChart } from ".";
import { TableVideo } from ".";

export function VideoViewsStatistic() {
  const { videoViewsStatistic } = useVideoViewsStatistic();
  const [averageVideoView, setAverageVideoView] = useState<number>(null!);
  const [viewScope, setViewScope] = useState<number[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (videoViewsStatistic) {
      dispatch(youtubeAction.setLoading({ loading: false }));
      return;
    }
    dispatch(youtubeAction.setLoading({ loading: true }));
  }, [videoViewsStatistic]);

  useEffect(() => {
    const getVideoViewsAverage = async () => {
      const res = await videoApi.getVideoViewsAverage();
      setAverageVideoView(res);
    };
    getVideoViewsAverage();
  }, []);

  useEffect(() => {
    if (videoViewsStatistic && viewScope.length === 0) {
      setViewScope([
        videoViewsStatistic.viewsGap[0],
        videoViewsStatistic.viewsGap[1],
      ]);
    }
  }, [videoViewsStatistic]);

  useEffect(() => {
    if (viewScope.length > 0) {
      dispatch(
        youtubeAction.preSetVideoSortList({
          type: "videoView",
          viewScope: viewScope,
        })
      );
    }
  }, [viewScope]);

  const render =
    videoViewsStatistic && averageVideoView ? (
      <VStack w="100%">
        <Text fontWeight="medium" my={5}>
          Average -{" "}
          <Text display="inline" color="red.400" fontWeight="light">
            {beautyNumberDisplay(averageVideoView.toString())}
          </Text>{" "}
          views
        </Text>
        <Box maxWidth="600px" w="100%">
          <VideoViewStatisticChart videoViewsStatistic={videoViewsStatistic} />
        </Box>
        <Divider />
        <Divider />
        <VStack w="100%">
          {viewScope.length > 0 && (
            <VStack>
              <Text fontWeight="bold" mt={10}>
                Top Video Has Views{" "}
                {viewScope[0] ===
                videoViewsStatistic.viewsGap[
                  videoViewsStatistic.viewsGap.length - 1
                ]
                  ? "Larger"
                  : "Average"}{" "}
                of{" "}
                <Text display="inline" color="red.400">
                  {beautyNumberDisplay(viewScope[0].toString())}
                  {viewScope[1]
                    ? ` ~ ${beautyNumberDisplay(viewScope[1].toString())}`
                    : null}
                </Text>{" "}
                Views
              </Text>
              <Select
                placeholder={`${beautyNumberDisplay(
                  viewScope[0].toString()
                )} views`}
                onChange={(e) => {
                  if (+e.target.value === viewScope[0]) return;
                  if (
                    +e.target.value ===
                    videoViewsStatistic.viewsGap[
                      videoViewsStatistic.viewsGap.length - 1
                    ]
                  ) {
                    setViewScope([+e.target.value]);
                    return;
                  }
                  setViewScope([
                    +e.target.value,
                    videoViewsStatistic.viewsGap[
                      videoViewsStatistic.viewsGap.indexOf(+e.target.value) + 1
                    ],
                  ]);
                }}
              >
                {videoViewsStatistic.viewsGap.map((v) => (
                  <option value={v} key={v}>
                    {beautyNumberDisplay(v.toString())}
                  </option>
                ))}
              </Select>
            </VStack>
          )}
          <TableVideo />
        </VStack>
      </VStack>
    ) : null;
  return render;
}
