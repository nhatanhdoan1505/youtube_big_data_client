import { useAppSelector } from "@app/index";
import { VStack, Text, Box } from "@chakra-ui/react";
import {
  ChannelSubscriberStatistic,
  ChannelUploadStatistic,
  DurationStatistic,
  TableVideo,
  VideoViewsStatistic,
} from "@component/ui";
import { VideoTagsStatistic } from "@component/ui";
import { selectSortType } from "@store/index";
import { TableContainerFull } from ".";

export function Statistic() {
  const sortTypeSelector = useAppSelector(selectSortType);

  const render =
    sortTypeSelector === "videoDuration" ? (
      <VStack w="100%">
        <TableContainerFull>
          <DurationStatistic />
        </TableContainerFull>
      </VStack>
    ) : sortTypeSelector === "videoView" ? (
      <TableContainerFull>
        <VideoViewsStatistic />
      </TableContainerFull>
    ) : sortTypeSelector === "tagsTrend" ? (
      <TableContainerFull>
        <VideoTagsStatistic />
      </TableContainerFull>
    ) : sortTypeSelector === "upload" ? (
      <TableContainerFull>
        <ChannelUploadStatistic />
      </TableContainerFull>
    ) : sortTypeSelector === "channelSubscriber" ? (
      <TableContainerFull>
        <ChannelSubscriberStatistic />
      </TableContainerFull>
    ) : // ) : sortTypeSelector === "totalView" ? (
    //   <h1>totalView</h1>
    // ) : sortTypeSelector === "thumbnail" ? (
    //   <h1>thumbnail</h1>
    null;
  return render;
}
