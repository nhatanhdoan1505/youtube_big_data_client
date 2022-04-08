import { useAppDispatch, useAppSelector } from "@app/index";
import {
  HStack,
  Image,
  Link,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { ISortVideo } from "@models/index";
import {
  selectChannelOverview,
  selectPageNumber,
  selectSortType,
  selectVideoList,
  selectYoutubeObject,
  youtubeAction,
} from "@store/index";
import {
  beautyNumberDisplay,
  formatDate,
  removeHtmlEntities,
} from "@utils/index";
import { useEffect } from "react";

export function TableVideo() {
  const videoListSelector = useAppSelector(selectVideoList);
  const pageNumberSelector = useAppSelector(selectPageNumber);
  const sortTypeSelector = useAppSelector(selectSortType);
  const youtubeObjectSelector = useAppSelector(selectYoutubeObject);
  const channelOverviewSelector = useAppSelector(selectChannelOverview);

  const dispatch = useAppDispatch();

  const handlerClickVideo = (video: ISortVideo) => {
    dispatch(youtubeAction.setVideoInformationModal(video));
    dispatch(youtubeAction.setIsShowModal(true));
  };

  useEffect(() => {
    if (!youtubeObjectSelector && channelOverviewSelector) {
      dispatch(
        youtubeAction.preSetVideoSortList({
          type: sortTypeSelector,
          pageNumber: pageNumberSelector,
          id: channelOverviewSelector.id,
        })
      );
    } else {
      dispatch(
        youtubeAction.preSetVideoSortList({
          type: sortTypeSelector,
          pageNumber: pageNumberSelector,
        })
      );
    }
  }, [pageNumberSelector, sortTypeSelector]);

  return (
    <>
      <Thead>
        <Tr>
          <Th>No</Th>
          <Th>Title</Th>
          <Th>Views</Th>
          <Th>Likes</Th>
          <Th>Comments</Th>
          <Th>Published</Th>
        </Tr>
      </Thead>
      <Tbody>
        {videoListSelector.map((video: ISortVideo, index: number) => (
          <Tr key={video.id}>
            <Td>{index + 1}</Td>
            <Td _hover={{ cursor: "pointer" }}>
              <HStack>
                <Image
                  src={video.thumbnail}
                  maxWidth="90px"
                  alt={video.title}
                  minWidth="60px"
                  onClick={() => handlerClickVideo(video)}
                />
                <VStack alignItems="flex-start">
                  <Text
                    as="h6"
                    fontSize="0.9rem"
                    fontWeight="semibold"
                    onClick={() => handlerClickVideo(video)}
                  >
                    {removeHtmlEntities(video.title)}
                  </Text>
                  <Link
                    href={`/channel/overview/${video.channelInformation.id}`}
                    _hover={{ textDecoration: "none" }}
                  >
                    <Text as="h6" fontSize="0.6rem" fontWeight="light">
                      {removeHtmlEntities(video.channelInformation.title)}
                    </Text>
                  </Link>
                </VStack>
              </HStack>
            </Td>
            <Td>
              <VStack>
                <Text textAlign="center">
                  {beautyNumberDisplay(video.views.toString())}
                </Text>
                <Text color="#0484d8" textAlign="center">
                  +{beautyNumberDisplay(video.gapViews.toString())}
                </Text>
              </VStack>
            </Td>
            <Td>
              <Text textAlign="center">
                {beautyNumberDisplay(video.likes.toString()) === "-1"
                  ? "-"
                  : beautyNumberDisplay(video.likes.toString())}
              </Text>
            </Td>
            <Td>
              <Text textAlign="center">
                {beautyNumberDisplay(video.commentCount.toString()) === "-1"
                  ? "-"
                  : beautyNumberDisplay(video.commentCount.toString())}
              </Text>
            </Td>
            <Td>
              <Text>{formatDate(video.publicAt)}</Text>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </>
  );
}
