import { useAppDispatch, useAppSelector } from "@app/index";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { selectUserLoading, selectUserProfile, userAction } from "@store/index";
import { formatDate } from "@utils/common";
import { useState } from "react";
import { PremiumModal } from ".";

export function EditProfile() {
  const userProfileSelector = useAppSelector(selectUserProfile);
  const userLoadingSelector = useAppSelector(selectUserLoading);

  const [newChannel, setNewChannel] = useState<string>("");
  const [isCompetitor, setIsCompetitor] = useState<boolean>(false);

  const [premiumModal, setPremiumModal] = useState<boolean>(false);

  const AVATAR_GRAY =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAADFBMVEWYmZuCg4WZmpxvcHGW7YJ5AAABTklEQVR4nO3QwQ3DMAwAMavef+cEfUW4FcgReO6w3TM/tnlPDl9Oykk5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJ/U/Y5txhuw874Aqpr4CHoAAAAABJRU5ErkJggg==";

  const deleteCompetitor = (id: string) => {
    const newCompetitorChannel = userProfileSelector.competitorChannel
      .map((c) => c.id)
      .filter((c) => c !== id);
    dispatch(
      userAction.preUpdateUserProfile({
        channel: userProfileSelector.channel.id,
        competitorChannel: newCompetitorChannel,
      })
    );
  };

  const editCompetitor = () => {
    const newCompetitorChannel = [
      ...userProfileSelector.competitorChannel.map((c) => c.id),
      newChannel,
    ];

    dispatch(
      userAction.preUpdateUserProfile({
        channel: userProfileSelector.channel.id,
        competitorChannel: newCompetitorChannel,
      })
    );
    onClose();
  };

  const editMyChannel = () => {
    dispatch(userAction.setIsFirst({ isFirst: false }));
    dispatch(
      userAction.preUpdateUserProfile({
        channel: newChannel,
        competitorChannel: userProfileSelector.competitorChannel.map(
          (c) => c.id
        ),
      })
    );
    onClose();
  };

  const onClickAddNew = () => {
    setIsCompetitor(true);
    onOpen();
  };

  const warningAvailble = (
    <Tooltip label="Channel is not availabel.We'll try to update soon!!">
      <Tag>Warning</Tag>
    </Tooltip>
  );

  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const render = userProfileSelector ? (
    <VStack w="100%">
      <HStack w="100%" boxShadow="base" borderRadius="8px" p={3}>
        <Image
          src={
            userProfileSelector && userProfileSelector.channel
              ? userProfileSelector.channel.channelThumbnail
              : AVATAR_GRAY
          }
          alt={userProfileSelector?.channel?.title}
          w="50px"
          h="50px"
          borderRadius="50%"
        />
        <Text fontSize="xl" fontWeight="extrabold">
          {userProfileSelector.channel ? userProfileSelector.channel.title : ""}
        </Text>
      </HStack>
      <VStack
        w="100%"
        boxShadow="base"
        borderRadius="8px"
        p={3}
        alignItems="flex-start"
      >
        <Text fontWeight="bold">My Information</Text>
        <Text fontWeight="semibold">
          Full Name:{" "}
          <Text display="inline" fontWeight="light">
            {userProfileSelector?.name}
          </Text>
        </Text>
        <Text fontWeight="semibold">
          Email:{" "}
          <Text display="inline" fontWeight="light">
            {userProfileSelector?.email}
          </Text>
        </Text>
        <HStack alignItems="center" w="100%">
          <Image
            src={
              userProfileSelector && userProfileSelector.channel
                ? userProfileSelector.channel.channelThumbnail
                : AVATAR_GRAY
            }
            alt={userProfileSelector?.channel?.title}
            w="40px"
            h="40px"
            borderRadius="50%"
          />
          <InputGroup>
            <InputLeftAddon children="https://www.youtube.com/channel/" />
            <Input
              type="text"
              fontSize="sm"
              disabled
              value={
                userProfileSelector.channel
                  ? userProfileSelector.channel.id
                  : ""
              }
            />
          </InputGroup>
          <Button variant="outline" onClick={onOpen}>
            Edit
          </Button>
          {userProfileSelector.channel ? (
            <Text color="red" fontSize="5px">
              {userProfileSelector.channel.isAvailable === false
                ? "Channel is not available in this system. We'll try to update soon!!"
                : null}
            </Text>
          ) : null}
        </HStack>
      </VStack>
      <VStack
        w="100%"
        boxShadow="base"
        borderRadius="8px"
        p={3}
        alignItems="flex-start"
      >
        <Text fontWeight="bold">Competitor channel</Text>
        {userProfileSelector.competitorChannel.map((c) => (
          <HStack alignItems="center" key={c.id} w="100%">
            <Image
              src={c.channelThumbnail}
              alt={c.title}
              maxWidth="40px"
              borderRadius="50%"
            />
            <InputGroup>
              <InputLeftAddon children="https://www.youtube.com/channel/" />
              <Input type="text" value={c.id} fontSize="sm" disabled />
              {c.isAvailable === false ? (
                <InputRightAddon children={warningAvailble} />
              ) : null}
            </InputGroup>
            <HStack>
              <Button
                variant="outline"
                colorScheme="red"
                onClick={() => deleteCompetitor(c.id)}
              >
                Delete
              </Button>
            </HStack>
          </HStack>
        ))}
        {userProfileSelector.competitorChannel.length < 3 ? (
          <HStack w="100%">
            <AddIcon
              mx="auto"
              _hover={{ cursor: "pointer" }}
              onClick={onClickAddNew}
            />
          </HStack>
        ) : null}
      </VStack>
      <VStack
        w="100%"
        boxShadow="base"
        borderRadius="8px"
        p={3}
        alignItems="flex-start"
      >
        <HStack justifyContent="space-between" w="100%">
          <Text fontWeight="bold">Billing Details</Text>
          <Button colorScheme="red" onClick={() => setPremiumModal(true)}>
            Up to Premium
          </Button>
        </HStack>
        <TableContainer w="100%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Title</Th>
                <Th>Payement method</Th>
                <Th>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userProfileSelector && userProfileSelector.payment
                ? userProfileSelector.payment.map((p) => (
                    <Tr>
                      <Td>{formatDate(p.date.toString())}</Td>
                      <Td>{p.title.toUpperCase()}</Td>
                      <Td>{p.method.toUpperCase()}</Td>
                      <Td isNumeric>{p.price}$</Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Channel</ModalHeader>
          <ModalCloseButton />
          <HStack p={5}>
            <InputGroup>
              <InputLeftAddon children="https://www.youtube.com/channel/" />
              <Input
                type="text"
                fontSize="sm"
                value={newChannel}
                onChange={(e) => setNewChannel(e.target.value)}
              />
            </InputGroup>
            <Button onClick={isCompetitor ? editCompetitor : editMyChannel}>
              Confirm
            </Button>
          </HStack>
        </ModalContent>
      </Modal>
      <Modal
        blockScrollOnMount={false}
        isOpen={premiumModal}
        onClose={() => setPremiumModal(false)}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Premium Account</ModalHeader>
          <PremiumModal />
        </ModalContent>
      </Modal>
    </VStack>
  ) : null;
  return render;
}
