import { useAppDispatch, useAppSelector } from "@app/index";
import {
  HStack,
  Image,
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
  selectPageNumber,
  selectSortType,
  selectVideoList,
  youtubeAction,
} from "@store/index";
import { beautyNumberDisplay, removeHtmlEntities } from "@utils/index";
import { useEffect } from "react";

export function TableVideo() {
  const videoListSelector = useAppSelector(selectVideoList);
  const pageNumberSelector = useAppSelector(selectPageNumber);
  const sortTypeSelector = useAppSelector(selectSortType);

  const dispatch = useAppDispatch();

  const handlerClickVideo = (video: ISortVideo) => {
    dispatch(youtubeAction.setVideoInformationModal(video));
    dispatch(youtubeAction.setIsShowModal(true));
  };

  useEffect(() => {
    dispatch(
      youtubeAction.getVideoSortList({
        type: sortTypeSelector,
        pageNumber: pageNumberSelector,
      })
    );
  }, [pageNumberSelector, sortTypeSelector]);

  return (
    <>
      <Thead>
        <Tr>
          <Th>Rank</Th>
          <Th>Title</Th>
          <Th>Views</Th>
          <Th>Likes</Th>
          <Th>DisLikes</Th>
          <Th>Comments</Th>
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
                  <Text as="h6" fontSize="0.6rem" fontWeight="light">
                    {removeHtmlEntities(video.channelInformation.title)}
                  </Text>
                </VStack>
              </HStack>
            </Td>
            <Td>
              <VStack>
                <Text>{beautyNumberDisplay(video.views.toString())}</Text>
                <Text color="#0484d8">
                  +{beautyNumberDisplay(video.gapViews.toString())}
                </Text>
              </VStack>
            </Td>
            <Td>
              <Text>{beautyNumberDisplay(video.likes.toString())}</Text>
            </Td>
            <Td>
              <Text>{beautyNumberDisplay(video.dislikes.toString())}</Text>
            </Td>
            <Td>
              <Text>{beautyNumberDisplay(video.commentCount.toString())}</Text>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </>
  );
}
