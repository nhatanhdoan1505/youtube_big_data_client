import {
  Grid,
  GridItem,
  HStack,
  Image,
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
import { ISortVideo } from "@models/index";
import { ModalVideoInformation } from "@component/ui";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@app/index";
import { selectIsShowModal, youtubeAction } from "@store/index";
import { AiFillRightCircle } from "react-icons/ai";
import { Icon } from "@chakra-ui/react";

export function ModalVideo(videoInformation: ISortVideo) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <HStack alignItems="center" fontSize="0.8rem">
            <Image
              src="https://yt3.ggpht.com/ytc/AKedOLQxUEO9NcX8w8qLnme3pyzOSifRagvrLGv4nJfhQHXYRHZ2A7rAa59q1O0a_FYp=s800-c-k-c0x00ffffff-no-rj"
              alt={videoInformation.channelInformation.title}
              maxWidth="30px"
            />
            <Text color="white">
              {videoInformation.channelInformation.title}
            </Text>
            <Icon as={AiFillRightCircle} color="white" />
          </HStack>
          <ModalCloseButton color="white" />
        </ModalHeader>
        <ModalBody>
          <Grid templateColumns="repeat(5, 1fr)">
            <GridItem colSpan={2}>
              <Image
                src={videoInformation.thumbnail}
                alt={videoInformation.title}
              />
            </GridItem>
            <GridItem colSpan={3} px={2} w="100%">
              <VStack
                w="100%"
                h="100%"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Text fontSize="1rem" fontWeight="semibold">
                  {videoInformation.title}
                </Text>
                <Text fontSize="0.8rem" fontWeight="medium">
                  {new Date(videoInformation.publicAt).toLocaleString()}
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
