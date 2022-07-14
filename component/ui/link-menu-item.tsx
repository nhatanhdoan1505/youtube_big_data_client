import { useAppDispatch, useAppSelector } from "@app/index";
import { Text } from "@chakra-ui/react";
import {
  selectAllVideoSortType,
  selectSortType,
  selectTotalPage,
  youtubeAction
} from "@store/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function LinkMenuItem({
  href,
  title,
  type,
  active = true,
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
    | "about"
    | "hashtag"
    | "keyword"
    | "videoDuration"
    | "videoView"
    | "tagsTrend"
    | "upload"
    | "channelSubscriber"
    | "totalView"
    | "thumbnail"
    | "myPageOverview"
    | "vsTrend"
    | "vsCompetitor"
    | "editProfile";
  active?: boolean;
}) {
  const router = useRouter();
  const sortTypeSelector = useAppSelector(selectSortType);
  const totalPageSelector = useAppSelector(selectTotalPage);
  const allVideoSortTypeSelector = useAppSelector(selectAllVideoSortType);
  const [isActive, setIsActive] = useState<boolean>(type === sortTypeSelector);
  const dispatch = useAppDispatch();

  const handlerClick = () => {
    if (type === "allVideo") {
      router.push(
        `${href}/1?allVideoSortType=${
          allVideoSortTypeSelector ? allVideoSortTypeSelector : "newest"
        }`
      );
      dispatch(
        youtubeAction.setPagination({
          pageNumber: 1,
          totalPage: totalPageSelector,
          type,
        })
      );
      return;
    }

    if (
      [
        "hashtag",
        "keyword",
        "overview",
        "videoHistory",
        "about",
        "myPageOverview",
        "vsTrend",
        "vsCompetitor",
        "editProfile",
      ].includes(type)
    ) {
      router.push(`${href}`);
      dispatch(
        youtubeAction.setPagination({
          pageNumber: 1,
          totalPage: 1,
          type,
        })
      );
      return;
    }

    if (
      [
        "videoDuration",
        "videoView",
        "tagsTrend",
        "upload",
        "channelSubscriber",
        "totalView",
        "thumbnail",
      ].includes(type)
    ) {
      router.push(`${href}`);
      dispatch(
        youtubeAction.setPagination({
          pageNumber: 1,
          totalPage: totalPageSelector,
          type,
        })
      );
      return;
    }

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
      color={isActive ? "" : "#9b9b9b"}
      pb={3}
      onClick={active ? handlerClick : () => console.log(active)}
      textAlign="center"
    >
      {title}
    </Text>
  );
}
