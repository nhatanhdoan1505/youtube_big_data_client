import { useAppDispatch, useAppSelector } from "@app/index";
import {
  Button,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Pagination } from "@component/ui";
import {
  selectAllVideoSortType,
  selectChannelList,
  selectChannelOverview,
  selectLoading,
  selectSortType,
  selectTotalPage,
  selectVideoInformation,
  selectVideoList,
  selectYoutubeObject,
  youtubeAction,
} from "@store/index";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";
import { ModalVideo } from ".";

const TITLE = {
  views: "Most Views",
  likes: "Most Likes",
  commentCount: "Most Comments",
  gapViews: "Hot Videos",
  subscribe: "Most Subscribers",
  numberVideos: "Most Number Videos",
  gapSubscribes: "Most Increased Subscribers",
  gapNumberVideos: "Most Increased Videos",
  topVideo: "Top Videos",
  allVideo: "All Videos",
  videoHistory: "Video History",
  hashtag: "Top HashTags",
  keyword: "Top Keywords",
  videoDuration: "All Videos",
  videoView: "Video View Distribution",
  tagsTrend: "All Videos",
  upload: "Upload / Week",
  channelSubscriber: "Channel Subscriber Distribution",
};

export function TableContainerFull({
  children,
}: {
  children: React.ReactNode;
}) {
  const videoListSelector = useAppSelector(selectVideoList);
  const totalPageSelector = useAppSelector(selectTotalPage);
  const videoInformationSelector = useAppSelector(selectVideoInformation);
  const sortTypeSelector = useAppSelector(selectSortType);
  const loadingSelector = useAppSelector(selectLoading);
  const youtubeObjectSelector = useAppSelector(selectYoutubeObject);
  const channelListSelector = useAppSelector(selectChannelList);
  const allVideoSortTypeSelector = useAppSelector(selectAllVideoSortType);
  const channelOverviewSelector = useAppSelector(selectChannelOverview);

  const dispatch = useAppDispatch();

  const router = useRouter();
  const onClickAllVideoSortType = (type: "oldest" | "newest" | "popular") => {
    dispatch(youtubeAction.setAllVideoSortType({ allVideoSortType: type }));
    dispatch(
      youtubeAction.setPagination({
        pageNumber: 1,
        totalPage: totalPageSelector,
        type: sortTypeSelector,
      })
    );
    return router.push(
      `/channel/allVideo/${channelOverviewSelector.id}/1?allVideoSortType=${type}`
    );
  };
  return (
    <>
      <VStack
        boxShadow="rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;"
        py={8}
        px={5}
        borderRadius="8px"
        w="100%"
      >
        <HStack
          alignItems="center"
          justifyContent="space-between"
          w="100%"
          px={5}
        >
          <HStack>
            <Text as="h6" fontWeight="extrabold">
              {TITLE[sortTypeSelector]}
            </Text>
            <HStack>
              {/* <Icon as={AiFillCaretLeft} />
              <Icon as={AiFillCaretRight} /> */}
              {loadingSelector ? (
                <Button
                  colorScheme="red"
                  isLoading={loadingSelector}
                  size="sm"
                  variant="outline"
                >
                  Loading...
                </Button>
              ) : null}
            </HStack>
          </HStack>
          <HStack>
            {sortTypeSelector === "allVideo" ? (
              <>
                <Button
                  colorScheme={
                    allVideoSortTypeSelector === "popular" ? "red" : "gray"
                  }
                  size="sm"
                  onClick={() => onClickAllVideoSortType("popular")}
                >
                  Popular
                </Button>
                <Button
                  colorScheme={
                    allVideoSortTypeSelector === "oldest" ? "red" : "gray"
                  }
                  size="sm"
                  onClick={() => onClickAllVideoSortType("oldest")}
                >
                  Oldest
                </Button>
                <Button
                  colorScheme={
                    allVideoSortTypeSelector === "newest" ? "red" : "gray"
                  }
                  size="sm"
                  onClick={() => onClickAllVideoSortType("newest")}
                >
                  Newest
                </Button>
              </>
            ) : sortTypeSelector === "videoHistory" ? (
              <>
                <InputGroup size="md">
                  <Input pr="4.5rem" type="text" placeholder="Search" />
                  <InputRightElement
                    width="4.5rem"
                    _hover={{ cursor: "pointer" }}
                  >
                    <Icon h="1.75rem" size="sm" as={AiOutlineSearch} />
                  </InputRightElement>
                </InputGroup>
              </>
            ) : null
            // (
            //   <>
            //     <Button colorScheme="gray" size="sm">
            //       Daily
            //     </Button>
            //     <Button colorScheme="facebook" size="sm">
            //       Weekly
            //     </Button>
            //     <Button colorScheme="linkedin" size="sm">
            //       Monthly
            //     </Button>
            //   </>
            // )
            }
          </HStack>
        </HStack>

        {children}

        {(videoListSelector.length > 0 && totalPageSelector > 1) ||
        (channelListSelector.length > 0 && totalPageSelector > 1) ? (
          <Pagination />
        ) : null}
      </VStack>
      {(videoInformationSelector &&
        ["hashtag", "video", "statistic"].includes(youtubeObjectSelector)) ||
      (videoInformationSelector && youtubeObjectSelector === null) ? (
        <ModalVideo {...videoInformationSelector} />
      ) : null}
    </>
  );
}
