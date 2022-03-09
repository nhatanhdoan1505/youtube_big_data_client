import {
  HStack,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { IHotChannel } from "@models/index";
import { beautyNumberDisplay } from "@utils/index";

export function HotChannelBase({
  channelList,
}: {
  channelList: IHotChannel[];
}) {
  return (
    <Table variant="simple" colorScheme="red">
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Subscribers</Th>
        </Tr>
      </Thead>
      <Tbody>
        {channelList.length > 0 &&
          channelList.map((c, index) => (
            <Tr key={index}>
              <Td>
                <HStack>
                  <Image
                    src={c.channelThumbnail}
                    maxWidth="90px"
                    maxHeight="50px"
                  />
                  <Text as="h6" maxWidth="">
                    {c.title}
                  </Text>
                </HStack>
              </Td>
              <Td>
                <VStack>
                  <Text>{beautyNumberDisplay(c.subscribe.toString())}</Text>
                  <Text color="#0484d8">
                    {+c.gapSubscribes >= 0 ? "+" : "-"}
                    {beautyNumberDisplay(c.gapSubscribes.toString())}
                  </Text>
                </VStack>
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
}
