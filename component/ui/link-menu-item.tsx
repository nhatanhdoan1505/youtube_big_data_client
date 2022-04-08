import { useAppDispatch, useAppSelector } from "@app/index";
import { Text } from "@chakra-ui/react";
import { selectSortType, selectTotalPage, youtubeAction } from "@store/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function LinkMenuItem({
  href,
  title,
  type,
}: {
  href: string;
  title: string;
  type:
    | "views"
    | "likes"
    | "commentCount"
    | "gapViews"
    | "subscribe"
    | "numberVideos"
    | "gapSubscribes"
    | "gapNumberVideos"
    | "overview"
    | "topVideo"
    | "allVideo"
    | "dailyStat"
    | "history"
    | "videoHistory"
    | "about";
}) {
  const router = useRouter();
  const sortTypeSelector = useAppSelector(selectSortType);
  const totalPageSelector = useAppSelector(selectTotalPage);
  const [isActive, setIsActive] = useState<boolean>(type === sortTypeSelector);
  const dispatch = useAppDispatch();

  const handlerClick = () => {
    router.push(`${href}/1`);
    dispatch(
      youtubeAction.setPagination({
        pageNumber: 1,
        totalPage: totalPageSelector,
        type,
      })
    );
  };

  useEffect(() => {
    setIsActive(type === sortTypeSelector);
  }, [sortTypeSelector]);

  return (
    <Text
      href={href}
      title={title}
      fontWeight="semibold"
      _hover={{ cursor: "pointer" }}
      borderBottom={isActive ? "4px solid brown" : ""}
      color={isActive ? "black" : "#9b9b9b"}
      pb={3}
      onClick={handlerClick}
      textAlign="center"
    >
      {title}
    </Text>
  );
}
