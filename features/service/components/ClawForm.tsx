import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import * as _ from "lodash";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { channelAction, selectLabel } from "../../channel/channelSlice";
import Channel from "../../channel/components/Channel";
import {
  selectChannelsResult,
  selectIsFail,
  selectIsSuccess,
  selectLoading,
  serviceAction,
} from "../serviceSlice";

function ClawForm() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoading);
  const isSuccess = useAppSelector(selectIsSuccess);
  const isFail = useAppSelector(selectIsFail);
  const channels = useAppSelector(selectChannelsResult);
  const labels = useAppSelector(selectLabel);

  const toast = useToast();

  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [isFirst, setIsFirst] = useState(true);

  const handerTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUrl(event.target.value);
  };
  const handerInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };
  const chooseLabelHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setLabel(event.target.value);
  };

  const handerClaw = () => {
    if (!url || !label) {
      toast({
        title: "Insufficient Value",
        description: "Fill both url and label",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      setIsFirst(false);
      let endpoint = url.replace(/\n/g, ",");
      dispatch(serviceAction.sendRequest({ url: endpoint, label }));
    }
  };

  useEffect(() => {
    dispatch(channelAction.queryAllChannel());
  }, []);

  useEffect(() => {
    if (!isFirst && isFail)
      toast({
        title: "Some thing went wrong",
        description: "Server has error",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });

    if (isSuccess) {
      toast({
        title: "Progress success",
        description: "View DB for the information",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  }, [isLoading]);

  return (
    <>
      <Box>
        <Flex my={5}>
          <Textarea
            size="lg"
            placeholder="Enter url channel"
            onChange={handerTextAreaChange}
          />
          <Input
            type="text"
            w="150px"
            mx={5}
            placeholder="Label"
            onChange={handerInputChange}
            textAlign="center"
            value={label}
          />
          <Select
            placeholder="Select label"
            colorScheme="teal.500"
            onChange={chooseLabelHandler}
            w="250px"
          >
            {_.uniq(labels).map((l) => (
              <option value={l} key={l}>
                {l}
              </option>
            ))}
          </Select>
        </Flex>
        <Divider />
        <Button my={4} onClick={handerClaw} isLoading={isLoading}>
          Run
        </Button>
        <Button
          mx={4}
          my={4}
          onClick={() => router.push("/admin/dashboard")}
          colorScheme="telegram"
        >
          Dashboard
        </Button>
      </Box>
      {channels.map((c) => (
        <Channel
          id={c.id}
          key={c.id}
          channelThumnail={c.channelThumnail}
          title={c.title}
          subscribe={c.subscribe}
          views={c.views}
          gapViews="0"
          gapNumberVideos="0"
          numberVideos={c.numberVideos}
          gapSubcribe="0"
          urlChannel={c.urlChannel}
        />
      ))}
    </>
  );
}

export default ClawForm;
