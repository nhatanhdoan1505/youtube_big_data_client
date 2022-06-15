import { useAppSelector } from "@app/index";
import {
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
import { ISortChannel } from "@models/index";
import { selectChannelList, selectLoading } from "@store/index";
import { beautyNumberDisplay, removeHtmlEntities } from "@utils/index";

export function TableChannel() {
  const channelListSelector = useAppSelector(selectChannelList);
  const loadingSelector = useAppSelector(selectLoading);

  return (
    <Table variant="simple" colorScheme="red" size="sm">
      <Thead>
        <Tr>
          <Th>No</Th>
          <Th>Title</Th>
          <Th>Views</Th>
          <Th>Subscribers</Th>
          <Th>Videos</Th>
        </Tr>
      </Thead>
      <Tbody>
        {!loadingSelector
          ? channelListSelector.map((channel: ISortChannel, index: number) => (
              <Tr key={channel.id}>
                <Td>{index + 1}</Td>
                <Td _hover={{ cursor: "pointer" }}>
                  <Link href={`/channel/overview/${channel.id}`}>
                    <HStack>
                      <Image
                        src={channel.channelThumbnail}
                        maxWidth="90px"
                        alt={channel.title}
                        minWidth="60px"
                        borderRadius="50%"
                      />
                      <VStack alignItems="flex-start" mx={3}>
                        <Text as="h6" fontSize="0.9rem" fontWeight="semibold">
                          {removeHtmlEntities(channel.title)}
                        </Text>
                      </VStack>
                    </HStack>
                  </Link>
                </Td>
                <Td>
                  <VStack alignItems="flex-start">
                    <Text>{beautyNumberDisplay(channel.views.toString())}</Text>
                    <Text color="#0484d8">
                      +{beautyNumberDisplay(channel.gapViews.toString())}
                    </Text>
                  </VStack>
                </Td>
                <Td>
                  <VStack alignItems="flex-start">
                    <Text>
                      {beautyNumberDisplay(channel.subscribe.toString())}
                    </Text>
                    {+channel.gapSubscribes >= 0 ? (
                      <Text color="#0484d8">
                        +{beautyNumberDisplay(channel.gapSubscribes.toString())}
                      </Text>
                    ) : (
                      <Text color="red">
                        -{beautyNumberDisplay(channel.gapSubscribes.toString())}
                      </Text>
                    )}
                  </VStack>
                </Td>
                <Td>
                  <VStack alignItems="flex-start">
                    <Text>
                      {beautyNumberDisplay(channel.numberVideos.toString())}
                    </Text>
                    {+channel.gapNumberVideos >= 0 ? (
                      <Text color="#0484d8">
                        +
                        {beautyNumberDisplay(
                          channel.gapNumberVideos.toString()
                        )}
                      </Text>
                    ) : (
                      <Text color="red">
                        {beautyNumberDisplay(
                          channel.gapNumberVideos.toString()
                        )}
                      </Text>
                    )}
                  </VStack>
                </Td>
              </Tr>
            ))
          : null}
      </Tbody>
    </Table>
  );
}
