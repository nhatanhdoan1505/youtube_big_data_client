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
import { ISortVideo } from "@models/index";
import { beautyNumberDisplay } from "@utils/index";

export function HotVideoBase({ videoList }: { videoList: ISortVideo[] }) {
  return (
    <Table variant="simple" colorScheme="purple">
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Views</Th>
        </Tr>
      </Thead>
      <Tbody>
        {videoList.length > 0 &&
          videoList.map((v, index) => (
            <Tr key={index}>
              <Td>
                <HStack>
                  <Image src={v.thumbnail} maxWidth="90px" maxHeight="50px" />
                  <Text as="h6" maxWidth="">
                    {v.title}
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
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
}
