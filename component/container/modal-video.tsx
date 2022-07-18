import { useAppDispatch, useAppSelector } from "@app/index";
import {
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ModalVideoInformation } from "@component/ui";
import { ISortVideo } from "@models/index";
import { selectIsShowModal, youtubeAction } from "@store/index";
import { formatDate, removeHtmlEntities } from "@utils/index";
import { AiFillRightCircle } from "react-icons/ai";

export function ModalVideo(videoInformation: ISortVideo) {
  const { onClose } = useDisclosure();
  const isShowModalSelector = useAppSelector(selectIsShowModal);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(youtubeAction.setIsShowModal(false));
    onClose();
  };

  return (
    <Modal
      onClose={closeModal}
      isOpen={isShowModalSelector}
      scrollBehavior="inside"
      size="2xl"
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader backgroundColor="#4a4a4a">
          <Link
            href={`/channel/overview/${videoInformation.channelInformation.id}`}
            _hover={{ textDecoration: "none" }}
          >
            <HStack alignItems="center" fontSize="0.8rem">
              <Image
                src={videoInformation.channelInformation.channelThumbnail}
                alt={videoInformation.channelInformation.title}
                maxWidth="30px"
              />
              <Text color="white">
                {removeHtmlEntities(videoInformation.channelInformation.title)}
              </Text>
              <Icon as={AiFillRightCircle} color="white" />
            </HStack>
          </Link>
          <ModalCloseButton color="white" />
        </ModalHeader>
        <ModalBody>
          <Grid templateColumns="repeat(5, 1fr)">
            <GridItem colSpan={2}>
              <Link
                href={`https://www.youtube.com/watch?v=${videoInformation.id}`}
                target="_blank"
              >
                <Image
                  src={videoInformation.thumbnail}
                  alt={videoInformation.title}
                />
              </Link>
            </GridItem>
            <GridItem colSpan={3} px={2} w="100%">
              <VStack
                w="100%"
                h="100%"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Link
                  href={`https://www.youtube.com/watch?v=${videoInformation.id}`}
                  target="_blank"
                  _hover={{ cursor: "pointer" }}
                >
                  <Text fontSize="1rem" fontWeight="semibold">
                    {removeHtmlEntities(videoInformation.title)}
                  </Text>
                </Link>
                <Text fontSize="0.8rem" fontWeight="medium">
                  {formatDate(videoInformation.publicAt)}
                </Text>
              </VStack>
            </GridItem>
          </Grid>
          <ModalVideoInformation {...videoInformation} />
          <VStack
            justifyContent="center"
            alignItems="flex-start"
            py={4}
            px={4}
            my={2}
            borderRadius="base"
            boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
          >
            <Text fontWeight="bold">Tags</Text>
            <Text fontWeight="thin" maxWidth="100%" fontSize="0.7rem">
              {videoInformation.tags.join(",")}
            </Text>
          </VStack>
          <VStack
            justifyContent="center"
            alignItems="flex-start"
            py={4}
            px={4}
            my={2}
            borderRadius="base"
            boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
          >
            <Text fontWeight="bold">Description</Text>
            <Text
              fontWeight="thin"
              maxWidth="100%"
              fontSize="0.7rem"
              wordBreak="break-word"
              whiteSpace="pre-wrap"
            >
              {videoInformation.description}
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
