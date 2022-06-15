import { useAppDispatch, useAppSelector } from "@app/index";
import {
  HStack,
  Image,
  keyframes,
  Link,
  Table,
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
  selectLoading,
  selectSearchHashtagAndKeyword,
  selectSortType,
  selectVideoList,
  youtubeAction,
} from "@store/index";
import {
  beautyNumberDisplay,
  formatDate,
  removeHtmlEntities,
  splitTextByKeyword,
} from "@utils/index";

export function TableVideo() {
  const videoListSelector = useAppSelector(selectVideoList);
  const sortTypeSelector = useAppSelector(selectSortType);
  const searchHashtagAndKeywordSelector = useAppSelector(
    selectSearchHashtagAndKeyword
  );

  const dispatch = useAppDispatch();

  const handlerClickVideo = (video: ISortVideo) => {
    dispatch(youtubeAction.setVideoInformationModal(video));
    dispatch(youtubeAction.setIsShowModal(true));
  };

  const loadingSelector = useAppSelector(selectLoading);

  const animationAppearanceFrames = keyframes`
    0% {opacity: 0;}
    20% {opacity: 0.25;}
    40% {opacity: 0.5;}}
    60% {opacity: 0.75;}
    80% {opacity: 0.80;}
    100% {opacity: 1;}`;
  const animation = `${animationAppearanceFrames} 1s ease-in-out alternate`;
  return (
    <Table variant="simple" colorScheme="red" size="sm">
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
        {!loadingSelector
          ? videoListSelector.map((video: ISortVideo, index: number) => (
              <Tr key={video.id} animation={animation}>
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
                      {sortTypeSelector === "keyword" ? (
                        <>
                          <Text
                            as="h6"
                            fontSize="0.9rem"
                            fontWeight="semibold"
                            onClick={() => handlerClickVideo(video)}
                            display="inline"
                          >
                            {
                              splitTextByKeyword({
                                text: removeHtmlEntities(video.title),
                                keyword: searchHashtagAndKeywordSelector._id,
                              })[0]
                            }

                            <Text color="red" display="inline">
                              {
                                splitTextByKeyword({
                                  text: removeHtmlEntities(video.title),
                                  keyword: searchHashtagAndKeywordSelector._id,
                                })[1]
                              }
                            </Text>
                            {
                              splitTextByKeyword({
                                text: removeHtmlEntities(video.title),
                                keyword: searchHashtagAndKeywordSelector._id,
                              })[2]
                            }
                          </Text>
                        </>
                      ) : (
                        <Text
                          as="h6"
                          fontSize="0.9rem"
                          fontWeight="semibold"
                          onClick={() => handlerClickVideo(video)}
                        >
                          {removeHtmlEntities(video.title)}
                        </Text>
                      )}
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
            ))
          : null}
      </Tbody>
    </Table>
  );
}
