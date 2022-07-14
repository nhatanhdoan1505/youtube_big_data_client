import { useAppDispatch, useAppSelector } from "@app/index";
import { HStack, Text } from "@chakra-ui/layout";
import { selectYoutubeObject, youtubeAction } from "@store/index";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

interface Props {
  title: string;
  href: string;
  youtubeObject: "video" | "channel" | "hashtag" | "statistic";
  linkColor: string;
}

export function MenuItem({
  title,
  href,
  youtubeObject,
  linkColor,
}: Props): ReactElement {
  const router = useRouter();
  const youtubeObjectSelector = useAppSelector(selectYoutubeObject);
  const [isActive, setIsActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handlerOnClick = () => {
    dispatch(youtubeAction.setYoutubeObject({ youtubeObject }));
    dispatch(youtubeAction.setPagination({ pageNumber: 1, totalPage: 1 }));
    router.push(href);
  };

  const activeButton = {
    backgroundColor: "#ed64a6",
    color: "white",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;",
    borderRadius: "5px",
  };

  useEffect(() => {
    setIsActive(youtubeObjectSelector === youtubeObject);
  }, [youtubeObjectSelector]);
  return (
    <>
      <HStack
        _hover={{
          cursor: "pointer",
          backgroundColor: "#ed64a6",
          color: "white",
          borderRadius: "5px",
        }}
        p={3}
        justifyContent="center"
        alignItems="center"
        maxWidth="10rem"
        onClick={handlerOnClick}
        fontWeight={500}
        color={linkColor}
        {...(isActive ? { ...activeButton } : null)}
      >
        <Text fontWeight="bold">
          {title}
        </Text>
      </HStack>
    </>
  );
}
