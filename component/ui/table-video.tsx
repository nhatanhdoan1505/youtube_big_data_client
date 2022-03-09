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
import { beautyNumberDisplay } from "@utils/index";
import { useEffect } from "react";

export function TableVideo() {
  const videoListSelector = useAppSelector(selectVideoList);
  const pageNumberSelector = useAppSelector(selectPageNumber);
  const sortTypeSelector = useAppSelector(selectSortType);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      youtubeAction.getVideoSortList({
        type: sortTypeSelector,
        pageNumber: pageNumberSelector,
      })
    );
  }, [pageNumberSelector]);

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
            <Td>
              <HStack>
                <Image
                  src={video.thumbnail}
                  maxWidth="90px"
                  alt={video.title}
                  minWidth="60px"
                />
                <Text as="h6" maxWidth="">
                  {video.title}
                </Text>
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
