import { LinkIcon } from "@chakra-ui/icons";
import {
  Heading,
  HStack,
  Image,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatNumber,
  Td,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { beautyNumberDisplay } from "../../../utils/common";
import { channelAction } from "../channelSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hook";

function ChannelRow({
  index,
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
  index: number;
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
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onclickChannelRow = (e: any) => {
    dispatch(channelAction.getChannelByIdSuccess(null!));
    dispatch(channelAction.resetVideoChart(null));
    e.preventDefault();
    router.push(`/channel/${id}`);
  };

  return (
    <>
      <Tr _hover={{ cursor: "pointer" }}>
        <Td>{index}</Td>
        <Td>
          <HStack spacing="5">
            <Image
              src={channelThumnail}
              alt={title}
              borderRadius="base"
              w="30%"
              boxShadow="base"
            />

            <Heading
              as="article"
              fontSize={{
                base: "0.9rem",
                sm: "0.5rem",
                md: "0.7rem",
                lg: "1rem",
              }}
              onClick={onclickChannelRow}
            >
              {title}
            </Heading>
            <a href={urlChannel} target="_blank">
              <LinkIcon />
            </a>
          </HStack>
        </Td>
        <Td>
          <StatGroup>
            <Stat mr={5}>
              <StatNumber fontSize={{ base: "10px", sm: "14px", md: "16px" }}>
                {beautyNumberDisplay(numberVideos)}
              </StatNumber>
            </Stat>
          </StatGroup>
        </Td>
        <Td>
          <StatGroup>
            <Stat>
              <StatHelpText fontSize={{ base: "10px", sm: "14px", md: "16px" }}>
                {+gapNumberVideos >= 0 ? (
                  <StatArrow type="increase" />
                ) : (
                  <StatArrow type="increase" />
                )}
                {beautyNumberDisplay(gapNumberVideos)}
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Td>
        <Td>
          <StatGroup>
            <Stat mr={5}>
              <StatNumber fontSize={{ base: "10px", sm: "14px", md: "16px" }}>
                {beautyNumberDisplay(subscribe)}
              </StatNumber>
            </Stat>
          </StatGroup>
        </Td>
        <Td>
          <StatGroup>
            <Stat>
              <StatHelpText fontSize={{ base: "10px", sm: "14px", md: "16px" }}>
                {+gapSubcribe >= 0 ? (
                  <StatArrow type="increase" />
                ) : (
                  <StatArrow type="increase" />
                )}
                {beautyNumberDisplay(gapSubcribe)}
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Td>
        <Td>
          <StatGroup>
            <Stat mr={5}>
              <StatNumber fontSize={{ base: "10px", sm: "14px", md: "16px" }}>
                {beautyNumberDisplay(views)}
              </StatNumber>
            </Stat>
          </StatGroup>
        </Td>
        <Td>
          <StatGroup>
            <Stat>
              <StatHelpText fontSize={{ base: "10px", sm: "14px", md: "16px" }}>
                {+gapViews >= 0 ? (
                  <StatArrow type="increase" />
                ) : (
                  <StatArrow type="increase" />
                )}
                {beautyNumberDisplay(gapViews)}
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Td>
      </Tr>
    </>
  );
}

export default ChannelRow;
