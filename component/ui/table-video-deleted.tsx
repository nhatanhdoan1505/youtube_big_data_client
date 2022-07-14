import { useAppDispatch, useAppSelector } from "@app/index";
import {
  Badge,
  HStack,
  Image,
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
  selectChannelOverview,
  selectVideoDeleted,
  youtubeAction,
} from "@store/index";
import {
  beautyNumberDisplay,
  formatDate,
  getViewsVideoDeleted,
  removeHtmlEntities,
} from "@utils/index";
import { useEffect } from "react";

export function TableVideoDeleted() {
  const videoDeletedSelector = useAppSelector(selectVideoDeleted);
  const dispatch = useAppDispatch();
  const handlerClickVideo = (video: ISortVideo) => {
    let { viewsHistory, likesHistory } = video;
    let { views, likes } = getViewsVideoDeleted({ viewsHistory, likesHistory });
    video = { ...video, views: views.toString(), likes: likes.toString() };
    dispatch(youtubeAction.setVideoInformationModal(video));
    dispatch(youtubeAction.setIsShowModal(true));
  };
  const channelOverviewSelector = useAppSelector(selectChannelOverview);

  useEffect(() => {
    dispatch(
      youtubeAction.preSetVideoDeleted({ id: channelOverviewSelector.id })
    );
  }, []);

  return (
    <Table variant="simple" colorScheme="red" size="sm">
      <Thead>
        <Tr>
          <Th>No</Th>
          <Th>Title</Th>
          <Th>Status</Th>
          <Th>Views</Th>
          <Th>Date</Th>
        </Tr>
      </Thead>
      <Tbody>
        {videoDeletedSelector.map((video: ISortVideo, index: number) => (
          <Tr key={video.id}>
            <Td>{index + 1}</Td>
            <Td _hover={{ cursor: "pointer" }}>
              <HStack>
                <Badge colorScheme="red">Delete</Badge>
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
              <Text textAlign="center">Deleted</Text>
            </Td>
            <Td>
              <Text textAlign="center">
                {beautyNumberDisplay(
                  getViewsVideoDeleted({
                    viewsHistory: video.viewsHistory,
                    likesHistory: video.likesHistory,
                  }).views.toString()
                )}
              </Text>
            </Td>
            <Td>
              <Text>{formatDate(video.publicAt).split(",")[0]}</Text>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
