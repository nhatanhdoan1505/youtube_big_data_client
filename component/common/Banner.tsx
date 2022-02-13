import { Center, Text } from "@chakra-ui/layout";
import { Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import React, { ReactElement } from "react";

interface Props {
  title: string;
  views: number;
  subscribes: number;
  videos: number;
}

function Banner({ title, views, videos, subscribes }: Props): ReactElement {
  return (
    <Center>
      <VStack>
        <Text
          as="caption"
          fontSize="20px"
          w="500px"
          fontWeight="light"
          color="white"
          my={6}
        >
          {title}
        </Text>
        <Flex w="800px" justifyContent="space-between" alignContent="center">
          <VStack>
            <Heading as="h4" fontSize="10px" fontWeight="bold" color="#D3E4CD">
              VIEWS
            </Heading>
            <Heading color="white" as="h5" fontWeight="light">
              {views}
            </Heading>
          </VStack>
          <VStack>
            <Heading as="h4" fontSize="10px" fontWeight="bold" color="#D3E4CD">
              SUBCRIBES
            </Heading>
            <Heading color="white" as="h5" fontWeight="light">
              {subscribes}
            </Heading>
          </VStack>
          <VStack>
            <Heading as="h4" fontSize="10px" fontWeight="bold" color="#D3E4CD">
              VIDEOS
            </Heading>
            <Heading color="white" as="h5" fontWeight="light">
              {videos}
            </Heading>
          </VStack>
        </Flex>
      </VStack>
    </Center>
  );
}

export default Banner;
