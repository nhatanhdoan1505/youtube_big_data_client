import { useAppSelector } from "@app/index";
import { VStack } from "@chakra-ui/react";
import {
  ChannelSubscriberStatistic,
  ChannelUploadStatistic,
  DurationStatistic,
  VideoTagsStatistic,
  VideoViewsStatistic,
} from "@component/ui";
import { selectSortType } from "@store/index";
import { TableContainerFull } from ".";

export function Statistic() {
  const sortTypeSelector = useAppSelector(selectSortType);

  return sortTypeSelector === "videoDuration" ? (
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
}
