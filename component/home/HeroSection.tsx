import { Center, Text } from "@chakra-ui/layout";
import { Flex, Heading, VStack } from "@chakra-ui/react";
import React, { ReactElement } from "react";

interface Props {
  channels: string;
  views: string;
  subscribes: string;
  videos: string;
}

function HeroSection({
  channels,
  views,
  videos,
  subscribes,
}: Props): ReactElement {
  return (
    <Center bgGradient="linear(to-l, #cc2b5e, #753a88)" py="60px">
      <VStack>
        <Text
          as="caption"
          fontSize="20px"
          w="500px"
          fontWeight="light"
          color="white"
          mb={8}
          letterSpacing="2px"
          lineHeight="10"
        >
          We Track and Provide Statistical Analysis of <br />
          <span style={{ fontWeight: "bold" }}>
            {channels} Hot Channels for Kids
          </span>
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

export default HeroSection;
