import { Box, Text } from "@chakra-ui/layout";
import { Flex, Heading, VStack } from "@chakra-ui/react";
import { useSystemStat } from "@hook/index";
import { beautyNumberDisplay } from "@utils/index";
import React, { ReactElement } from "react";

export function HeroSection(): ReactElement {
  const { views, subscribers, numberVideos, numberChannels } = useSystemStat();
  return (
    <Box bgGradient="linear(to-l, #cc2b5e, #753a88)" w="100%" py={16}>
      <VStack>
        <Text
          as="caption"
          fontSize="20px"
          w="100%"
          fontWeight="light"
          color="white"
          my={10}
          letterSpacing="2px"
          lineHeight="10"
        >
          We Track and Provide Statistical Analysis of <br />
          <span style={{ fontWeight: "bold" }}>
            {beautyNumberDisplay(numberChannels.toString())} Hot Channels for
            Kids
          </span>
        </Text>

        <Flex w="800px" justifyContent="space-between" alignContent="center">
          <VStack>
            <Heading as="h4" fontSize="10px" fontWeight="bold" color="#D3E4CD">
              VIEWS
            </Heading>
            <Heading color="white" as="h5" fontWeight="light">
              {beautyNumberDisplay(views.toString())}
            </Heading>
          </VStack>
          <VStack>
            <Heading as="h4" fontSize="10px" fontWeight="bold" color="#D3E4CD">
              SUBSCRIBERS
            </Heading>
            <Heading color="white" as="h5" fontWeight="light">
              {beautyNumberDisplay(subscribers.toString())}
            </Heading>
          </VStack>
          <VStack>
            <Heading as="h4" fontSize="10px" fontWeight="bold" color="#D3E4CD">
              VIDEOS
            </Heading>
            <Heading color="white" as="h5" fontWeight="light">
              {beautyNumberDisplay(numberVideos.toString())}
            </Heading>
          </VStack>
        </Flex>
      </VStack>
    </Box>
  );
}
