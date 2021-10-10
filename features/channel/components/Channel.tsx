import {
  Box,
  Flex,
  Heading,
  Image,
  VStack,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  StatHelpText,
  StatArrow,
  HStack,
  Badge,
  Tag,
  Button,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { channelAction, selectLoading } from "../channelSlice";
import { beautyNumberDisplay } from "../../../utils/common";
import Link from "next/link";

function Channel({
  channelThumnail,
  title,
  subscribe,
  views,
  numberVideos,
  gapViews,
  gapSubcribe,
  gapNumberVideos,
  id,
  urlChannel,
}: {
  id: string;
  channelThumnail: string;
  title: string;
  subscribe: string;
  views: string;
  numberVideos: string;
  gapViews: string;
  gapSubcribe: string;
  gapNumberVideos: string;
  urlChannel: string;
}) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);

  const handleDeleteBtn = () => {
    dispatch(channelAction.deleteChannel(id));
  };
  return (
    <Flex
      direction="row"
      mr="auto"
      ml={{ base: "0px", sm: "15px", md: "250px" }}
      w={{ base: "100%", sm: "70%", md: "60%" }}
      pl={0}
      shadow="base"
      borderRadius="initial"
      border="GrayText"
      p={3}
    >
      <Flex shadow="lg" mr={3} align="center" justifyContent="center" w={1 / 4}>
        <Image src={channelThumnail} alt={title} borderRadius="base" />
      </Flex>
      <Flex direction="column">
        <Heading as="h2" fontSize={{ base: "14px", sm: "18px", md: "24px" }}>
          {title}
        </Heading>
        <a href={urlChannel} target="_blank">
          <HStack spacing={5} mt={4}>
            <StatGroup>
              <Stat mr={5}>
                <StatLabel fontSize={{ base: "10px", sm: "14px", md: "16px" }}>
                  Subscribe
                </StatLabel>
                <StatNumber fontSize={{ base: "10px", sm: "14px", md: "16px" }}>
                  {beautyNumberDisplay(subscribe)}
                </StatNumber>
                <StatHelpText
                  fontSize={{ base: "10px", sm: "14px", md: "16px" }}
                >
                  {+gapSubcribe >= 0 ? (
                    <StatArrow type="increase" />
                  ) : (
                    <StatArrow type="increase" />
                  )}
                  {beautyNumberDisplay(gapSubcribe)}
                </StatHelpText>
              </Stat>
              <Stat mr={5}>
                <StatLabel fontSize={{ base: "10px", sm: "14px", md: "16px" }}>
                  Views
                </StatLabel>
                <StatNumber fontSize={{ base: "10px", sm: "14px", md: "16px" }}>
                  {beautyNumberDisplay(views)}
                </StatNumber>
                <StatHelpText
                  fontSize={{ base: "10px", sm: "14px", md: "16px" }}
                >
                  {+gapViews >= 0 ? (
                    <StatArrow type="increase" />
                  ) : (
                    <StatArrow type="increase" />
                  )}
                  {beautyNumberDisplay(gapViews)}
                </StatHelpText>
              </Stat>
              <Stat mr={5}>
                <StatLabel fontSize={{ base: "10px", sm: "14px", md: "16px" }}>
                  Videos
                </StatLabel>
                <StatNumber fontSize={{ base: "10px", sm: "14px", md: "16px" }}>
                  {beautyNumberDisplay(numberVideos)}
                </StatNumber>
                <StatHelpText
                  fontSize={{ base: "10px", sm: "14px", md: "16px" }}
                >
                  {+gapNumberVideos >= 0 ? (
                    <StatArrow type="increase" />
                  ) : (
                    <StatArrow type="increase" />
                  )}
                  {beautyNumberDisplay(gapNumberVideos)}
                </StatHelpText>
              </Stat>
            </StatGroup>
          </HStack>
        </a>
        <Button
          size="md"
          colorScheme="red"
          borderRadius="full"
          _hover={{ cursor: "pointer" }}
          mt={4}
          fontSize={{ base: "10px", sm: "14px", md: "16px" }}
          textAlign="center"
          alignItems="center"
          variant="outline"
          onClick={handleDeleteBtn}
          isLoading={loading}
        >
          Delete
        </Button>
      </Flex>
    </Flex>
  );
}

export default Channel;
