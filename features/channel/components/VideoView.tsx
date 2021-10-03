import {
  Center,
  Heading,
  Image,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { channelAction } from "../channelSlice";
import { selectChannel } from "../channelSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hook";

function VideoView() {
  const dispatch = useAppDispatch();
  const channel = useAppSelector(selectChannel);

  return (
    <>
      <Center>
        <Table
          size="sm"
          colorScheme="teal"
          w={{ base: "100%", sm: "100%", md: "100%", lg: "90%" }}
          variant="striped"
        >
          <Tbody>
            <Tr mt={3}>
              <Td w="10px">
                <Heading
                  as="h6"
                  fontSize={{ base: "10px", sm: "14px", md: "16px" }}
                >
                  1
                </Heading>
              </Td>
              <Td w={{ base: "500px", sm: "150px", md: "120px", lg: "150px" }}>
                <Image
                  src="https://i.ytimg.com/vi/9agRVkYiUFc/hqdefault.jpg"
                  w={{ base: "3px", sm: "50px", md: "100px", lg: "100px" }}
                  h={{ base: "30px", sm: "50px", md: "100px", lg: "100px" }}
                  borderRadius="full"
                  shadow="inherit"
                />
              </Td>
              <Td w={{ base: "170px", sm: "300px", md: "300px", lg: "600px" }}>
                <Heading
                  as="article"
                  fontSize={{ base: "5px", sm: "10px", md: "16px" }}
                >
                  How To Regain Sculpt Details After Retopology
                </Heading>
              </Td>
              <Td w="100px">
                <Stat>
                  <StatLabel textAlign="center" my={3}>
                    10000
                  </StatLabel>
                  <StatHelpText
                    fontSize={{ base: "10px", sm: "14px", md: "16px" }}
                    textAlign="center"
                  >
                    <StatArrow type="increase" />
                    400
                  </StatHelpText>
                </Stat>
              </Td>
              <Td w="200px">
                <Stat>
                  <StatLabel textAlign="center" my={3}>
                    10000
                  </StatLabel>
                  <StatHelpText
                    fontSize={{ base: "10px", sm: "14px", md: "16px" }}
                    textAlign="center"
                  >
                    <StatArrow type="increase" />
                    400
                  </StatHelpText>
                </Stat>
              </Td>
              <Td>
                <Text textAlign="center">150/200</Text>
              </Td>
              <Td w="50px">
                <Stat>
                  <StatHelpText
                    fontSize={{ base: "10px", sm: "14px", md: "16px" }}
                  >
                    <StatArrow type="increase" />
                    400
                  </StatHelpText>
                </Stat>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Center>
    </>
  );
}

export default VideoView;
