import { useAppDispatch, useAppSelector } from "@app/index";
import { Button } from "@chakra-ui/react";
import {
  selectAllVideoSortType,
  selectChannelOverview,
  selectPageNumber,
  selectSortType,
  selectTotalPage,
  selectYoutubeObject,
  youtubeAction,
} from "@store/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function PaginationItem({ pageNumber }: { pageNumber: number }) {
  const router = useRouter();

  const pageNumberSelector = useAppSelector(selectPageNumber);
  const sortTypeSelector = useAppSelector(selectSortType);
  const totalPageSelector = useAppSelector(selectTotalPage);
  const youtubeObjectSelector = useAppSelector(selectYoutubeObject);
  const channelOverviewSelector = useAppSelector(selectChannelOverview);
  const allVideoSortTypeSelector = useAppSelector(selectAllVideoSortType);
  const dispatch = useAppDispatch();
  const handlerClickButton = () => {
    if (!youtubeObjectSelector) {
      if (sortTypeSelector === "allVideo") {
        router.push(
          `/channel/${sortTypeSelector}/${channelOverviewSelector.id}/${pageNumber}?allVideoSortType=${allVideoSortTypeSelector}`
        );
        dispatch(
          youtubeAction.setPagination({
            pageNumber,
            totalPage: totalPageSelector,
          })
        );
        return;
      }
      router.push(
        `/channel/${sortTypeSelector}/${channelOverviewSelector.id}/${pageNumber}`
      );
      dispatch(
        youtubeAction.setPagination({
          pageNumber,
          totalPage: totalPageSelector,
        })
      );
      return;
    }
    if (youtubeObjectSelector === "hashtag") {
      dispatch(
        youtubeAction.setPagination({
          pageNumber,
          type: sortTypeSelector,
          totalPage: totalPageSelector,
        })
      );
      return;
    }
    router.push(
      `/topList/${youtubeObjectSelector}/${sortTypeSelector}/${pageNumber}`
    );

    dispatch(
      youtubeAction.setPagination({
        pageNumber,
        type: sortTypeSelector,
        totalPage: totalPageSelector,
      })
    );
  };
  const [isCurrentPage, setIsCurrentPage] = useState<boolean>(
    pageNumber === pageNumberSelector
  );

  useEffect(() => {
    setIsCurrentPage(pageNumber === pageNumberSelector);
  }, [pageNumberSelector]);

  return (
    <Button
      size="sm"
      colorScheme={isCurrentPage ? "red" : "gray"}
      onClick={handlerClickButton}
    >
      {pageNumber}
    </Button>
  );
}
