import {
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import VideoRow from "./VideoRow";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  selectChannel,
  selectVideoChart,
  selectVideoChartId,
  selectVideoList,
  channelAction,
} from "../channelSlice";
import { optimizeVideoData } from "../../../utils/common";
import Chart from "../components/Chart";
import { optimizeVideoDataForChart } from "../../../utils/common";
import { IVideo } from "../../../models";

interface IVideoProps extends IVideo {
  gapViews: string;
}

function VideoView() {
  const channel = useAppSelector(selectChannel);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const videoChart = useAppSelector(selectVideoChart);
  const videoChartId = useAppSelector(selectVideoChartId);
  const videoList = useAppSelector(selectVideoList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    videoChartId && onOpen();
  }, [videoChartId]);

  useEffect(() => {
    channel && dispatch(channelAction.sortVideo("views"));
  }, [channel]);

  const onClickSortView = () => {
    channel && dispatch(channelAction.sortVideo("views"));
  };

  const onClickSortGapView = () => {
    channel && dispatch(channelAction.sortVideo("gapViews"));
  };

  return (
    <>
      <Center>
        <Drawer isOpen={isOpen} onClose={onClose} size="full" placement="top">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              {videoChartId ? (
                <Chart {...optimizeVideoDataForChart(videoChart)} />
              ) : null}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Table
          size="sm"
          colorScheme="teal"
          w={{ base: "100%", sm: "100%", md: "100%", lg: "90%" }}
          variant="simple"
        >
          <Thead>
            <Tr>
              <Th>{`${channel ? channel.videoList.length : "No"}`}</Th>
              <Th>Title</Th>
              <Th onClick={onClickSortView} _hover={{ cursor: "pointer" }}>
                View
              </Th>
              <Th onClick={onClickSortGapView} _hover={{ cursor: "pointer" }}>
                Gap View
              </Th>
              <Th>Like/Dislike</Th>
            </Tr>
          </Thead>
          <Tbody>
            {channel &&
              videoList.map((v, index) => (
                <VideoRow
                  {...v}
                  gapViews={v.gapViews}
                  key={`${v.id}${Math.random()}`}
                  index={(index + 1).toString()}
                />
              ))}
          </Tbody>
        </Table>
      </Center>
    </>
  );
}

export default VideoView;
