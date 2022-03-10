import { useAppSelector } from "@app/index";
import { Button, HStack, Icon, Table, Text, VStack } from "@chakra-ui/react";
import { Pagination } from "@component/ui";
import {
  selectTotalPage,
  selectVideoInformation,
  selectVideoList,
  selectSortType,
  selectLoading,
} from "@store/index";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { ModalVideo } from ".";

const TITLE = {
  views: "Most Views",
  likes: "Most Likes",
  commentCount: "Most Comments",
  gapViews: "Hot Videos",
};

export function TableContainerFull({
  children,
}: {
  children: React.ReactNode;
}) {
  const videoListSelector = useAppSelector(selectVideoList);
  const totalPageSelector = useAppSelector(selectTotalPage);
  const videoInformationSelector = useAppSelector(selectVideoInformation);
  const videoSortTypeSelector = useAppSelector(selectSortType);
  const loadingSelector = useAppSelector(selectLoading);

  return (
    <>
      <VStack
        boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;"
        py={5}
        borderRadius="8px"
      >
        <HStack
          alignItems="center"
          justifyContent="space-between"
          w="100%"
          px={5}
        >
          <HStack>
            <Text as="h6" fontWeight="extrabold">
              {TITLE[videoSortTypeSelector]}
            </Text>
            <HStack>
              <Icon as={AiFillCaretLeft} />
              <Icon as={AiFillCaretRight} />
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
            <Button colorScheme="gray" size="sm">
              Daily
            </Button>
            <Button colorScheme="facebook" size="sm">
              Weekly
            </Button>
            <Button colorScheme="linkedin" size="sm">
              Monthly
            </Button>
          </HStack>
        </HStack>
        <Table variant="simple" colorScheme="red" size="sm">
          {children}
        </Table>
        {videoListSelector.length > 0 && totalPageSelector > 1 ? (
          <Pagination />
        ) : null}
      </VStack>
      {videoInformationSelector ? (
        <ModalVideo {...videoInformationSelector} />
      ) : null}
    </>
  );
}
