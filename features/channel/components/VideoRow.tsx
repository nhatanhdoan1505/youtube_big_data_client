import {
  Heading,
  HStack,
  Image,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatNumber,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { IVideo } from "../../../models";
import { beautyNumberDisplay } from "../../../utils/common";
import { selectChannel, channelAction } from "../channelSlice";
import { AiOutlineLineChart } from "react-icons/ai";

interface IVideoPros extends IVideo {
  gapViews: string;
  index: string;
}

function VideoRow({
  title,
  thumbnail,
  views,
  gapViews,
  likes,
  dislikes,
  id,
  index,
  date,
}: IVideoPros) {
  const dispatch = useAppDispatch();
  const channel = useAppSelector(selectChannel);

  const openChart = () => {
    let video = channel.videoList.find((v) => v.id === id);

    if (video) {
      dispatch(channelAction.getVideoChart(video));
    }
  };

  return (
    <>
      <Tr>
        <Td>{index}</Td>
        <Td>
          <HStack spacing="5">
            <Image
              src={thumbnail}
              alt={title}
              borderRadius="base"
              boxShadow="base"
              maxWidth="200px"
              minWidth="80px"
              w="20%"
            />
            <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank">
              <Heading
                as="article"
                fontSize={{
                  base: "0.9rem",
                  sm: "0.5rem",
                  md: "0.7rem",
                  lg: "1rem",
                }}
              >
                {title}
              </Heading>
            </a>
            <Stack _hover={{ cursor: "pointer" }}>
              <AiOutlineLineChart onClick={openChart} />
            </Stack>
          </HStack>
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
        <Td>
          <Heading
            as="article"
            fontSize={{
              base: "0.9rem",
              sm: "0.5rem",
              md: "0.7rem",
              lg: "1rem",
            }}
          >
            {beautyNumberDisplay(likes?.toString())}/
            {beautyNumberDisplay(dislikes?.toString())}
          </Heading>
        </Td>
      </Tr>
    </>
  );
}

export default VideoRow;
