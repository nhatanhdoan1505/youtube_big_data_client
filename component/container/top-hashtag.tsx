import { videoApi } from "@api/index";
import { useAppDispatch, useAppSelector } from "@app/index";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { TableVideo } from "@component/ui";
import { IVideoTagsAndKeywordSort } from "@models/index";
import {
  selectHashtagAndKeyword,
  selectIsFirstSetSearchHashtagAndKeyword,
  selectLoading,
  selectSearchHashtagAndKeyword,
  selectSortType,
  youtubeAction,
} from "@store/index";
import * as _ from "lodash";
import { useEffect, useState } from "react";

export function HashTag() {
  const hashtagAndKeywordSelector = useAppSelector(selectHashtagAndKeyword);
  const searchHashtagAndKeywordSelector = useAppSelector(
    selectSearchHashtagAndKeyword
  );
  const isFirstSetSearchHashtagAndKeywordSelector = useAppSelector(
    selectIsFirstSetSearchHashtagAndKeyword
  );
  const loadingSelector = useAppSelector(selectLoading);
  const sortTypeSelector = useAppSelector(selectSortType);

  const dispatch = useAppDispatch();
  const [totalPage, setTotalPage] = useState<number>(1);

  const handleOnClickHashtagAndKeyword = (value: IVideoTagsAndKeywordSort) => {
    if (
      searchHashtagAndKeywordSelector &&
      searchHashtagAndKeywordSelector._id !== value._id
    ) {
      dispatch(
        youtubeAction.setSearchHashtagAndKeyword({
          searchHashtagAndKeyword: value,
        })
      );
    }
  };

  useEffect(() => {
    if (
      hashtagAndKeywordSelector.length > 0 &&
      isFirstSetSearchHashtagAndKeywordSelector
    ) {
      dispatch(
        youtubeAction.setSearchHashtagAndKeyword({
          searchHashtagAndKeyword: hashtagAndKeywordSelector[0],
        })
      );
      dispatch(
        youtubeAction.setIsFirstSetSearchHashtagAndKeyword({
          isFirstSearchHashtagAndKeyword: false,
        })
      );
    }
  }, [hashtagAndKeywordSelector, sortTypeSelector]);

  useEffect(() => {
    if (searchHashtagAndKeywordSelector && sortTypeSelector === "hashtag") {
      const getTotalPages = async () => {
        const { totalPage } = await videoApi.getTotalVideoByTag({
          tag: searchHashtagAndKeywordSelector._id,
        });
        setTotalPage(totalPage);
      };
      getTotalPages();
    }
  }, [searchHashtagAndKeywordSelector, sortTypeSelector]);

  useEffect(() => {
    dispatch(
      youtubeAction.setPagination({
        totalPage,
        type: "hashtag",
        pageNumber: 1,
      })
    );
  }, [totalPage]);

  return (
    <VStack p={3}>
      <SimpleGrid minChildWidth="120px" spacing="0px" w="1024px" h="300px">
        {hashtagAndKeywordSelector.length > 0
          ? _.shuffle(
              hashtagAndKeywordSelector.map((e, index) => ({
                ...e,
                fontSize:
                  +index < 4
                    ? "2xl"
                    : +index < 10
                    ? "xl"
                    : +index < 15
                    ? "lg"
                    : "md",
                fontWeight:
                  +index < 4
                    ? "extrabold"
                    : +index < 10
                    ? "bold"
                    : +index < 15
                    ? "semibold"
                    : "normal",
                color:
                  +index < 4
                    ? "#f73e3e"
                    : +index < 10
                    ? "#4a4a4a"
                    : +index < 15
                    ? "gray.800"
                    : "gray.600",
              }))
            ).map(({ _id, color, fontSize, fontWeight, count }) => (
              <Box key={_id}>
                <VStack
                  justifyContent={
                    Math.random() > 0.5 ? "flex-end" : "flex-start"
                  }
                  w="100%"
                  height="100%"
                >
                  <Text
                    color={color}
                    fontWeight={fontWeight}
                    fontSize={fontSize}
                    fontFamily="Helvetica"
                    textAlign={Math.random() > 0.5 ? "left" : "right"}
                    _hover={{ cursor: "pointer", color: "#00ccff" }}
                    transition="all 1s"
                    onClick={() =>
                      handleOnClickHashtagAndKeyword({ _id, count })
                    }
                  >
                    #{_id}
                  </Text>
                </VStack>
              </Box>
            ))
          : null}
      </SimpleGrid>
      {searchHashtagAndKeywordSelector ? (
        <Text
          color="#4A4A4A"
          w="100%"
          fontWeight="extrabold"
          border="1px #d8d8d8 solid"
          p={1}
          borderRadius="8px"
        >
          Results for "
          <Text display="inline-block" color="#f73e3e">
            #{searchHashtagAndKeywordSelector._id}
          </Text>
          "
        </Text>
      ) : null}
      {!loadingSelector && searchHashtagAndKeywordSelector ? (
        <TableVideo />
      ) : null}
    </VStack>
  );
}
