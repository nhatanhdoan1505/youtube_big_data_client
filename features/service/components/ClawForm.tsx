import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  serviceAction,
  selectLoading,
  selectIsSuccess,
  selectIsFail,
  selectChannels,
} from "../serviceSlice";
import Channel from "../../channel/components/Channel";

function ClawForm() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoading);
  const isSuccess = useAppSelector(selectIsSuccess);
  const isFail = useAppSelector(selectIsFail);
  const channels = useAppSelector(selectChannels);

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
      dispatch(serviceAction.sendRequest({ url, label }));
    }
  };

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
            placeholder="Enter url channel splitting by `,`"
            onChange={handerTextAreaChange}
          />
          <Input
            type="text"
            w="150px"
            mx={5}
            placeholder="Label"
            onChange={handerInputChange}
            textAlign="center"
          />
        </Flex>
        <Divider />
        <Button my={4} onClick={handerClaw} isLoading={isLoading}>
          Run
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
        />
      ))}
    </>
  );
}

export default ClawForm;
