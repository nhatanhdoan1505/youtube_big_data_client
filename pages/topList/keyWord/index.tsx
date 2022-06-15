import { useAppDispatch, useAppSelector } from "@app/index";
import { HStack, Text } from "@chakra-ui/react";
import { Header } from "@component/common";
import { HashTag, TableContainerFull, Keyword } from "@component/container";
import { LinkMenuItem } from "@component/ui";
import { MainLayout } from "@layout/index";
import { NextPageWithLayout } from "@models/index";
import {
  selectLoading,
  selectPageNumber,
  selectSearchHashtagAndKeyword,
  selectSortType,
  selectYoutubeObject,
  youtubeAction,
} from "@store/index";
import { useEffect } from "react";

const TopKeyword: NextPageWithLayout<null> = () => {
  const dispatch = useAppDispatch();
  const sortTypeSelector = useAppSelector(selectSortType);
  const youtubeObjectSelector = useAppSelector(selectYoutubeObject);
  const pageNumberSelector = useAppSelector(selectPageNumber);
  const searchHashtagAndKeywordSelector = useAppSelector(
    selectSearchHashtagAndKeyword
  );
  const loadingSelector = useAppSelector(selectLoading);

  useEffect(() => {
    if (
      !sortTypeSelector ||
      (sortTypeSelector === "keyword" &&
        !loadingSelector &&
        youtubeObjectSelector === "hashtag")
    ) {
      dispatch(youtubeAction.preSetHashtagAndKeyword({ type: "keyword" }));
    }
    if (!youtubeObjectSelector) {
      dispatch(youtubeAction.setYoutubeObject({ youtubeObject: "hashtag" }));
    }
    dispatch(
      youtubeAction.setPagination({
        pageNumber: 1,
        totalPage: 1,
        type: "keyword",
      })
    );
  }, [youtubeObjectSelector, sortTypeSelector]);

  useEffect(() => {
    if (
      searchHashtagAndKeywordSelector &&
      youtubeObjectSelector === "hashtag" &&
      sortTypeSelector === "keyword" &&
      !loadingSelector
    ) {
      dispatch(
        youtubeAction.setIsFirstSetSearchHashtagAndKeyword({
          isFirstSearchHashtagAndKeyword: false,
        })
      );
      dispatch(
        youtubeAction.preSetVideoListByTag({
          keyword: searchHashtagAndKeywordSelector._id,
          pageNumber: pageNumberSelector,
        })
      );
    }
  }, [pageNumberSelector, searchHashtagAndKeywordSelector, sortTypeSelector]);

  return (
    <>
      <Header title="YoutubeData - Top List" />
      <HStack mb={6} alignItems="center" justifyContent="inherit">
        <Text as="h1" fontSize="1.5rem" fontWeight="bold" mr={7}>
          Top KeyWords
        </Text>
        <HStack>
          <LinkMenuItem
            href="/topList/hashTag/"
            title="Top HashTags"
            type="hashtag"
          />
          <LinkMenuItem
            href="/topList/keyWord/"
            title="Top KeyWords"
            type="keyword"
          />
        </HStack>
      </HStack>
      <TableContainerFull>
        <Keyword />
      </TableContainerFull>
    </>
  );
};

TopKeyword.Layout = MainLayout;

export default TopKeyword;
