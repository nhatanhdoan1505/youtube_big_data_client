import { useAppDispatch, useAppSelector } from "@app/index";
import {
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { ModalVideo } from "@component/container";
import { useVideoHotListBase } from "@hook/index";
import { ISortVideo } from "@models/index";
import {
  selectChannelOverview,
  selectVideoInformation,
  youtubeAction,
} from "@store/index";
import {
  beautyNumberDisplay,
  formatDate,
  removeHtmlEntities,
} from "@utils/index";
import { useRouter } from "next/router";

export function VideoHotListBase() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handlerClickVideo = (video: ISortVideo) => {
    dispatch(youtubeAction.setVideoInformationModal(video));
    dispatch(youtubeAction.setIsShowModal(true));
  };
  const { hotVideoBaseList } = useVideoHotListBase();
  const videoInformationSelector = useAppSelector(selectVideoInformation);
  const channelOverviewSelector = useAppSelector(selectChannelOverview);
  return (
    <VStack border="1px solid #d8d8d8" p={4} borderRadius="8px" w="100%">
      <HStack w="100%" alignItems="center" justifyContent="space-between">
        <Text fontWeight="bold" fontSize="2xl">
          Top Videos
        </Text>
        <Button
          colorScheme="pink"
          size="sm"
          onClick={() =>
            router.push(`/channel/topVideo/${channelOverviewSelector.id}/1`)
          }
        >
          More
        </Button>
      </HStack>
      <Table variant="simple" colorScheme="purple">
        <Thead>
          <Tr>
            <Th>NO</Th>
            <Th>Title</Th>
            <Th>Views</Th>
            <Th>Likes</Th>
            <Th>Comments</Th>
            <Th>Published</Th>
          </Tr>
        </Thead>
        <Tbody>
          {hotVideoBaseList.length > 0 &&
            hotVideoBaseList.map((v, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>
                  <HStack
                    onClick={() => handlerClickVideo(v)}
                    _hover={{ cursor: "pointer" }}
                  >
                    <Image src={v.thumbnail} maxWidth="90px" maxHeight="50px" />
                    <Text as="h6" maxWidth="">
                      {removeHtmlEntities(v.title)}
                    </Text>
                  </HStack>
                </Td>
                <Td>
                  <VStack>
                    <Text>{beautyNumberDisplay(v.views.toString())}</Text>
                    <Text color="#0484d8">
                      +{beautyNumberDisplay(v.gapViews.toString())}
                    </Text>
                  </VStack>
                </Td>
                <Td>
                  <VStack>
                    <Text textAlign="center">
                      {+v.likes === -1
                        ? "-"
                        : beautyNumberDisplay(v.likes.toString())}
                    </Text>
                  </VStack>
                </Td>
                <Td>
                  <Text textAlign="center">
                    {beautyNumberDisplay(v.commentCount.toString()) === "-1"
                      ? "-"
                      : beautyNumberDisplay(v.commentCount.toString())}
                  </Text>
                </Td>
                <Td>
                  <Text>{formatDate(v.publicAt)}</Text>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      {videoInformationSelector ? (
        <ModalVideo {...videoInformationSelector} />
      ) : null}
    </VStack>
  );
}
