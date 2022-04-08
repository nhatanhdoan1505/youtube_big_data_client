import { HStack, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { useAppSelector } from "@app/index";
import { selectYoutubeObject } from "@store/index";

interface Props {
  title: string;
  href: string;
  youtubeObject: "video" | "channel" | "hashtag";
}

export function MenuItem({ title, href, youtubeObject }: Props): ReactElement {
  const router = useRouter();
  const youtubeObjectSelector = useAppSelector(selectYoutubeObject);
  const [isActive, setIsActive] = useState<boolean>(false);

  const handlerOnClick = () => {
    router.push(href);
  };

  useEffect(() => {
    setIsActive(youtubeObjectSelector === youtubeObject);
  }, [youtubeObjectSelector]);
  return (
    <>
      <HStack
        _hover={{
          cursor: "pointer",
          backgroundColor: "#99A799",
          color: "white",
        }}
        p={3}
        justifyContent="center"
        alignItems="center"
        maxWidth="10rem"
        backgroundColor={isActive ? "#99A799" : ""}
        onClick={handlerOnClick}
      >
        <Text fontWeight="bold">{title}</Text>
      </HStack>
    </>
  );
}
